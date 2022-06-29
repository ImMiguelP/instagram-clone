import { Avatar, Button, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { supabase } from "../SupaBaseClient";
import useUser from "./useUser";

function PersonalAvatar({ url, onUpload }) {
  const [avatarurl, setAvatarurl] = useState(null);
  const [uploading, setUploading] = useState(false);
  let fileInput;

  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);

  async function downloadImage(path) {
    try {
      const { data, error } = await supabase.storage
        .from("avatars")
        .download(`public/ ${path}`);
      const url = URL.createObjectURL(data);
      setAvatarurl(url);
    } catch (error) {
      console.log("Error cant download image", error.message);
    }
  }

  async function uploadAvatar(event) {
    try {
      setUploading(true);
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("An image must be uploaded");
      }
      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      let { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(`public/ ${filePath}`, file);

      if (uploadError) {
        throw uploadError;
      }

      onUpload(filePath);
    } catch (error) {
      console.log(error.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      {avatarurl ? (
        <Avatar
          size={"2xl"}
          src={avatarurl}
          alt="Avatar"
          mb={4}
          pos={"relative"}
          _after={{
            content: '""',
            w: 4,
            h: 4,
            bg: "green.300",
            border: "2px solid white",
            rounded: "full",
            pos: "absolute",
            bottom: 0,
            right: 3,
          }}
        />
      ) : (
        <Avatar
          size={"2xl"}
          src={avatarurl}
          alt="Avatar"
          mb={4}
          pos={"relative"}
          _after={{
            content: '""',
            w: 4,
            h: 4,
            bg: "green.300",
            border: "2px solid white",
            rounded: "full",
            pos: "absolute",
            bottom: 0,
            right: 3,
          }}
        />
      )}
      <div>
        <Button
          size="sm"
          flex={1}
          mb={4}
          fontSize={"sm"}
          rounded={"full"}
          _hover={{
            bg: "green.800",
          }}
          bg={"green.300"}
          onClick={() => fileInput.click()}
          color="black"
        >
          Change Profile Photo
        </Button>
        <Input
          style={{ display: "none" }}
          type="file"
          ref={(refParam) => (fileInput = refParam)}
          onChange={uploadAvatar}
        />
      </div>
    </div>
  );
}

export default PersonalAvatar;
