import { useEffect, useState } from "react";
import {
  Stack,
  HStack,
  VStack,
  Box,
  Avatar,
  Text,
  Link,
} from "@chakra-ui/react";
import useUser from "./Components/useUser";

import { supabase } from "./SupaBaseClient";
import SavedPost from "./Components/SavedPost";

function SavedPosts(props) {
  const { userData, loading, follows, followers } = useUser();
  const [posts, setPosts] = useState([]);
  const hrefsite = userData ? "https://" + userData.website : "";

  async function fetchSavedPosts(callback) {
    if (!userData) return;

    const { data } = await supabase
      .from("savedposts")
      .select(
        `id, postid(id,caption, created_at, photourl), userid(username, avatarurl)`
      )
      .filter("userid", "eq", userData.id);

    callback(data);
  }

  useEffect(() => {
    if (loading) {
      return;
    }

    fetchSavedPosts(setPosts);
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
                  {posts?.length} <br />
                  Saved Posts
                </Link>
                <Link fontWeight={"bold"} fontSize={"20px"}>
                  {followers.length}
                  <br />
                  Followers
                </Link>
                <Link fontWeight={"bold"} fontSize={"20px"}>
                  {follows.length}
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
            return <SavedPost post={post} prop={props} />;
          })}
        </div>
      </Box>
    </Stack>
  );
}

export default SavedPosts;
