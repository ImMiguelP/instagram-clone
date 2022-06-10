import { useState, useEffect } from "react";
import { supabase } from "../SupaBaseClient";

export default function useUser() {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

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
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProfile();
  }, []);

  return {
    loading,
    userData,
    setUserData,
  };
}
