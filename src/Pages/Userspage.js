import { useCallback, useEffect, useState } from "react";
import {
  Stack,
  HStack,
  VStack,
  Box,
  Avatar,
  Text,
  Link,
  Button,
} from "@chakra-ui/react";

import { supabase } from "./SupaBaseClient";
import { useParams } from "react-router-dom";
import UserPosts from "./Components/UserPosts";
import useUser from "./Components/useUser";

function UsersPage(props) {
  const { userData } = useUser();
  const { username } = useParams();
  const [user, setUser] = useState([]);
  const [posts, setPosts] = useState([]);
  const [follows, setFollows] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [userFollowings, setUserFollowings] = useState([]);
  const [userFollowers, setUserFollowers] = useState([]);

  //   follows account

  const followProfile = async () => {
    if (isFollowing) {
      await supabase
        .from("following")
        .delete()
        .match({ userid: userData.id, followingid: user.id });
    } else {
      await supabase
        .from("following")
        .insert({ userid: userData.id, followingid: user.id });
    }
    fetchFollowing();
    fetchUserFollowers();
    fetchUserFollowing();
  };

  const fetchFollowing = useCallback(async () => {
    const { data } = await supabase
      .from("following")
      .select(`id, created_at,  userid, followingid`)
      .filter("userid", "eq", userData.id);
    setFollows(data);
  }, [userData, user]);

  const fetchUserFollowing = useCallback(async () => {
    const { data } = await supabase
      .from("following")
      .select(`id, created_at,  userid, followingid`)
      .filter("userid", "eq", user.id);
    setUserFollowings(data);
  }, [user]);

  const fetchUserFollowers = useCallback(async () => {
    const { data } = await supabase
      .from("following")
      .select(`id, created_at,  userid, followingid`)
      .filter("followingid", "eq", user.id);
    setUserFollowers(data);
  }, [user]);

  useEffect(() => {
    const getProfile = async () => {
      const { data } = await supabase
        .from("profiles")
        .select(`id, avatarurl,  username, profilename, bio, website`)
        .eq("username", username)
        .single();

      setUser(data);
    };
    getProfile();
  }, [username]);

  async function fetchPosts(callback) {
    if (!user) return;

    const { data } = await supabase
      .from("posts")
      .select(
        `id, caption, created_at, photourl, profileid(username, avatarurl)`
      )
      .filter("profileid", "eq", user ? user.id : "")
      .order("created_at", { ascending: false });

    callback(data);
  }

  useEffect(() => {
    fetchUserFollowers();
    fetchUserFollowing();
  }, [user]);

  useEffect(() => {
    fetchFollowing();
  }, [fetchFollowing]);

  useEffect(() => {
    fetchPosts(setPosts);
  }, [user]);

  useEffect(() => {
    setIsFollowing(follows.findIndex((f) => f.followingid === user?.id) !== -1);
  }, [follows]);

  return (
    <Stack h={"100%"} w={"100%"} color={"white"}>
      {/* Top box */}
      <Box w={"100%"} h={"300px"} mb={20}>
        <VStack align={"center"}>
          <Box>
            <HStack h={"200px"} spacing="10" pl={"30px"}>
              <Avatar
                size="xl"
                outline={"solid"}
                outlineColor={"rgba(255,255,255, .5)"}
                src={user ? user.avatarurl : ""}
              />
              <VStack align={"middle"} spacing={"2"} w={"200px"}>
                <Text>{user ? user.profilename : ""}</Text>
                <Link>{user ? user.website : ""}</Link>
                <Text wordBreak={"break-all"}>{user ? user.bio : ""}</Text>
              </VStack>
            </HStack>
            <Box align="middle">
              {userData?.id == user.id ? (
                ""
              ) : isFollowing ? (
                <Button colorScheme={"red"} w={"150px"} onClick={followProfile}>
                  Unfollow
                </Button>
              ) : (
                <Button
                  colorScheme={"blue"}
                  w={"150px"}
                  onClick={followProfile}
                >
                  Follow
                </Button>
              )}
            </Box>
            <Box w={"100%"} align="middle" pt={5}>
              <HStack justify={"center"} spacing={10}>
                <Link fontWeight={"bold"} fontSize={"20px"}>
                  {posts?.length} <br />
                  Posts
                </Link>
                <Link fontWeight={"bold"} fontSize={"20px"}>
                  {userFollowers?.length}
                  <br />
                  Followers
                </Link>
                <Link fontWeight={"bold"} fontSize={"20px"}>
                  {userFollowings?.length}
                  <br />
                  Following
                </Link>
              </HStack>
            </Box>
          </Box>
        </VStack>
      </Box>
      {/* Posts */}
      <Box align="middle">
        <div
          style={{
            display: "flex",
            flexFlow: "row wrap",
          }}
        >
          {posts?.map((post) => {
            return <UserPosts post={post} user={user} />;
          })}
        </div>
      </Box>
    </Stack>
  );
}

export default UsersPage;
