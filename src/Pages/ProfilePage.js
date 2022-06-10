import { useEffect, useState } from "react";
import {
  Stack,
  HStack,
  VStack,
  Box,
  Avatar,
  Text,
  Link,
  Hide,
  Show,
} from "@chakra-ui/react";
import useUser from "./Components/useUser";
import IGProfilePosts from "./Components/IGProfilePosts";
import { supabase } from "./SupaBaseClient";

function ProfilePage(props) {
  const { userData, loading } = useUser();
  const [posts, setPosts] = useState([]);
  const hrefsite = userData ? "https://" + userData.website : "";

  async function fetchPosts(callback) {
    if (!userData) return;

    const { data } = await supabase
      .from("posts")
      .select(
        `id, caption, created_at, photourl, profileid(username, avatarurl)`
      )
      .filter("profileid", "eq", userData.id)
      .order("created_at", { ascending: false });

    callback(data);
  }

  useEffect(() => {
    if (loading) {
      return;
    }

    fetchPosts(setPosts);
  }, [loading]);
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
                src={userData ? userData.avatarurl : ""}
              />
              <VStack align={"middle"} spacing={"2"} w={"200px"}>
                <Text>{userData ? userData.profilename : ""}</Text>
                <Link href={hrefsite}>{userData ? userData.website : ""}</Link>
                <Text wordBreak={"break-all"}>
                  {userData ? userData.bio : ""}
                </Text>
              </VStack>
            </HStack>
            <Box w={"100%"} align="middle">
              <HStack justify={"center"} spacing={10}>
                <Link fontWeight={"bold"} fontSize={"20px"}>
                  45 <br />
                  Posts
                </Link>
                <Link fontWeight={"bold"} fontSize={"20px"}>
                  1000
                  <br />
                  Followers
                </Link>
                <Link fontWeight={"bold"} fontSize={"20px"}>
                  500
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
          {posts.map((post) => {
            return <IGProfilePosts post={post} prop={props} />;
          })}
        </div>
      </Box>
    </Stack>
  );
}

export default ProfilePage;
