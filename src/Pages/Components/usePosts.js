import { useState, useEffect } from "react";
import { supabase } from "../SupaBaseClient";

export default function usePosts() {
  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch Posts
  async function fetchPosts() {
    try {
      setLoading(true);

      let { data, error, status } = await supabase
        .from("posts")
        .select(
          `id, caption, created_at, photourl, profileid(username, avatarurl)`
        )
        .order("created_at", { ascending: false });

      if (error && status !== 406) {
        throw error;
      }
      if (data) {
        setPostData({
          id: data.id,
          caption: data.caption,
          created_at: data.created_at,
          photourl: data.photourl,
          profileid: data.profileid,
        });
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return {
    postData,
    loading,
  };
}

{
  /* async function fetchPosts(callback) {
  const { data } = await supabase
    .from("posts")
    .select(
      `id, caption, created_at, photourl, profileid(username, avatarurl)`
    )
    .order("created_at", { ascending: false });

  callback(data);
}

useEffect(() => {
  fetchPosts(setPostData);
}, []);

return {
  postData,
}; */
}
