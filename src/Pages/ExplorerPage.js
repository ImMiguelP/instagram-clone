import React, { useEffect, useState } from "react";
import { VStack, Input, Text, Box } from "@chakra-ui/react";
import "./CSS/modules.css";
import ExplorerPosts from "./Components/ExplorerPosts";
import { supabase } from "./SupaBaseClient";

function ExplorerPage(props) {
  const [posts, setPosts] = useState([]);

  async function fetchPosts(callback) {
    const { data } = await supabase
      .from("posts")
      .select(
        `id, caption, created_at, photourl, profileid(id,username, avatarurl)`
      )
      .order("created_at", { ascending: false });
    callback(data);
  }

  useEffect(() => {
    fetchPosts(setPosts);
  });

  return (
    <VStack w="100%" align="center" pt={20}>
      <div
        style={{
          display: "flex",
          flexFlow: "row wrap",
        }}
      >
        {posts.map((post) => {
          return <ExplorerPosts key={post.id} post={post} props={props} />;
        })}
      </div>
    </VStack>
  );
}
export default ExplorerPage;
