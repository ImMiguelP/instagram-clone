import {
  Box,
  Button,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Input,
  Avatar,
  Text,
  Link,
  FormControl,
  FormLabel,
  FormHelperText,
  Textarea,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import useUser from "../Components/useUser";
import "../CSS/settings.css";
import { supabase } from "../SupaBaseClient";

const Editprofile = () => {
  let fileInput;
  const [userData, setUserData] = useState("null");
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  useEffect(() => {
    fetchUserData();
  }, []);

  //Preview Upload File
  useEffect(() => {
    if (!avatar) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(avatar);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [avatar]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setAvatar(undefined);
      return;
    }
    setAvatar(e.target.files[0]);
  };

  //Upload File
  async function updateProfile() {
    const postFile = avatar;
    let newAvatar = null;
    onClose();

    if (postFile !== null) {
      await supabase.storage
        .from("avatars")
        .upload(`public/${postFile.name}`, postFile, { upsert: true });

      const { publicURL } = supabase.storage
        .from("avatars")
        .getPublicUrl(`public/${postFile.name}`);

      setUserData({ ...userData, avatarurl: publicURL });
      newAvatar = publicURL;
    }
    const user = supabase.auth.user();
    await supabase
      .from("profiles")
      .update([
        {
          avatarurl: newAvatar ? newAvatar : userData.avatarurl,
          profilename: userData.profilename,
          username: userData.username,
          website: userData.website,
          bio: userData.bio,
        },
      ])
      .match({ id: user?.id });
  }

  async function fetchUserData() {
    const user = supabase.auth.user();
    const { data } = await supabase
      .from("profiles")
      .select(`id, avatarurl, username, website, profilename, bio`)
      .filter("id", "eq", user.id);
    setUserData(data[0]);
  }

  return (
    <div>
      <Box padding={"25px 0px 25px 0px"}>
        <Button
          ref={btnRef}
          colorScheme="none"
          onClick={onOpen}
          h="20"
          width="99%"
        >
          Edit Profile
        </Button>
        <Drawer
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          finalFocusRef={btnRef}
          size={"xl"}
        >
          <DrawerOverlay />
          <DrawerContent bg={"#1B1B1B"} color={"white"}>
            <DrawerCloseButton />
            <DrawerHeader>
              <Box className="settingsTop">
                <Avatar src={!preview ? userData.avatarurl : preview} />
                <div className="settingsTopStatus">
                  <Text fontSize="md">
                    {userData ? userData.profilename : " "}
                  </Text>
                  <Input
                    style={{ display: "none" }}
                    type="file"
                    ref={(refParam) => (fileInput = refParam)}
                    onChange={onSelectFile}
                  />
                  <Link color={"#1095f6"} onClick={() => fileInput.click()}>
                    Change Profile Photo
                  </Link>
                </div>
              </Box>
            </DrawerHeader>

            <DrawerBody>
              {/* name*/}
              <FormControl padding={5}>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input
                  value={userData ? userData.profilename : " "}
                  onChange={(e) =>
                    setUserData({ ...userData, profilename: e.target.value })
                  }
                />
                <FormHelperText fontSize={14}>
                  Help people discover your account by using the name you're
                  known by: either your full name, nickname, or business name.
                  You can only change your name twice within 14 days.
                </FormHelperText>
              </FormControl>
              {/* username */}
              <FormControl padding={5}>
                <FormLabel htmlFor="userName">Username</FormLabel>
                <Input
                  id="userName"
                  type="userName"
                  value={userData ? userData.username : " "}
                  onChange={(e) =>
                    setUserData({ ...userData, username: e.target.value })
                  }
                />
                <FormHelperText fontSize={14}>
                  In most cases, you'll be able to change your username back to{" "}
                  {userData ? userData.username : ""} for another 14 days.
                </FormHelperText>
              </FormControl>
              {/* website */}
              <FormControl padding={5}>
                <FormLabel htmlFor="website">Website</FormLabel>
                <Input
                  id="website"
                  type="website"
                  value={userData ? userData.website : " "}
                  onChange={(e) =>
                    setUserData({ ...userData, website: e.target.value })
                  }
                />
              </FormControl>
              {/* bio */}
              <FormControl padding={5}>
                <FormLabel htmlFor="bio">Bio</FormLabel>
                <Textarea
                  id="bio"
                  type="bio"
                  value={userData ? userData.bio : ""}
                  onChange={(e) =>
                    setUserData({ ...userData, bio: e.target.value })
                  }
                />
              </FormControl>
              {/* email */}
              <Box padding={5}>
                <Text fontSize={18}>Personal Information</Text>
                <Text fontSize={14}>
                  Provide your personal information, even if the account is used
                  for a business, a pet or something else. This won't be a part
                  of your public profile.
                </Text>
              </Box>
              <FormControl padding={5}>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input id="email" type="email" />
              </FormControl>
            </DrawerBody>

            <DrawerFooter>
              <Button
                colorScheme="blue"
                type="submit"
                form="my-form"
                onClick={updateProfile}
              >
                Save
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Box>
    </div>
  );
};

export default Editprofile;
