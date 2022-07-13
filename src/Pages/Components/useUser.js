import { useState, useEffect, useCallback } from "react";
import { supabase } from "../SupaBaseClient";

export default function useUser() {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [follows, setFollows] = useState([]);
  const [followers, setFollowers] = useState([]);

  async function getProfile() {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`id, username, website, avatarurl, profilename, bio`)
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }
      if (data) {
        setUserData({
          id: data.id,
          username: data.username,
          website: data.website,
          avatarurl: data.avatarurl,
          profilename: data.profilename,
          bio: data.bio,
        });
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }

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

  const fetchFollowing = useCallback(async () => {
    const { data } = await supabase
      .from("following")
      .select(`id, created_at,  userid, followingid`)
      .filter("userid", "eq", userData.id);
    setFollows(data);
  }, [userData]);

  const fetchFollowers = useCallback(async () => {
    const { data } = await supabase
      .from("following")
      .select(`id, created_at,  userid, followingid`)
      .filter("followingid", "eq", userData.id);
    setFollowers(data);
  }, [userData]);

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    fetchPosts(setUserPosts);
    fetchFollowing();
    fetchFollowers();
  }, [userData]);

  return {
    loading,
    userData,
    setUserData,
    userPosts,
    setUserPosts,
    followers,
    follows,

    getProfile,
  };
}
