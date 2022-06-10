import { useState, useEffect } from "react";
import { Stack, Box, Input } from "@chakra-ui/react";

import "./CSS/modules.css";
import { supabase } from "./SupaBaseClient";
import Stories from "./Components/Stories";
import Posts from "./Components/Posts";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  async function fetchPosts(callback) {
    const { data } = await supabase
      .from("posts")
      .select(
        `id, caption, created_at, photourl, profileid(username, avatarurl)`
      )
      .order("created_at", { ascending: false });

    callback(data);
  }

  useEffect(() => {
    fetchPosts(setPosts);
  }, []);

  return (
    <Stack px={5} color={"white"}>
      {/* Input Field */}
      <Box w={"100%"} align={"middle"} pt={"40px"}>
        <Input maxW="80%" color={"white"} />
      </Box>
      {/*Avatar Stories */}
      <Stories />
      {/* Post*/}
      {posts.map((post) => {
        return <Posts post={post} />;
      })}
    </Stack>
  );
};

export default Feed;
