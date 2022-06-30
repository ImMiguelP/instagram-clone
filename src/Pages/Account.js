import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  Textarea,
  Image,
  Avatar,
  Link,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { supabase } from "./SupaBaseClient";

const Account = () => {
  let fileInput;
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState("null");
  const [avatarurl, setAvatarurl] = useState(null);
  const [updated, setUpdated] = useState(false);
  const [uploading, setUploading] = useState(true);
  const [preview, setPreview] = useState();
  const isInvalid = userData === "" || avatarurl === null;

  useEffect(() => {
    fetchUserData();
  }, []);

  function refreshPage() {
    window.location.reload(false);
  }

  //Preview Upload File
  useEffect(() => {
    if (!avatarurl) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(avatarurl);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [avatarurl]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setAvatarurl(undefined);
      return;
    }
    setAvatarurl(e.target.files[0]);
  };

  // update profile
  async function updateProfile() {
    try {
      setUploading(true);

      const postFile = avatarurl;
      let newAvatarUrl = null;

      if (postFile !== null) {
        await supabase.storage
          .from("avatars")
          .upload(`public/${postFile.name}`, postFile, { upsert: true });

        const { publicURL } = supabase.storage
          .from("avatars")
          .getPublicUrl(`public/${postFile.name}`);

        setUserData({ ...userData, avatarurl: publicURL });
        newAvatarUrl = publicURL;
      }
      const user = supabase.auth.user();
      await supabase.from("profiles").upsert([
        {
          id: user.id,
          avatarurl: newAvatarUrl ? newAvatarUrl : userData.avatarurl,
          profilename: userData.profilename,
          username: userData.username,
          website: userData.website,
          bio: userData.bio,
        },
      ]);
    } finally {
      setUploading(false);
    }
  }

  async function fetchUserData() {
    try {
      setLoading(true);
      const user = supabase.auth.user();
      let { data } = await supabase
        .from("profiles")
        .select(`id, avatarurl, username, website, profilename, bio`)
        .filter("id", "eq", user.id);
      setUserData(data[0]);
    } finally {
      setLoading(false);
    }
  }

  const createAccount = () => {
    updateProfile();
    setUpdated(true);
  };

  return (
    <div>
      <Flex minH={"100vh"} align={"center"} justify={"center"} bg={"#0E0E10"}>
        <Box
          maxW={"445px"}
          w={"full"}
          bg={"#1B1B1B "}
          boxShadow={"2xl"}
          rounded={"lg"}
          p={6}
          textAlign={"center"}
          justifyItems={"center"}
          justifyContent={"center"}
          color={"white"}
        >
          {updated ? (
            <Box h={"500px"}>
              <Text pb={"50px"}> Congrats Your Account Was Created </Text>
              <Image
                pb={10}
                src="https://c.tenor.com/A-ozELwp694AAAAC/thumbs-thumbs-up-kid.gif"
              />

              <Button
                bg={"White"}
                color="black"
                onClick={refreshPage}
                disabled={uploading}
              >
                Go to home page
              </Button>
            </Box>
          ) : (
            <div>
              <VStack>
                <Text
                  fontSize={"sm"}
                  fontWeight={500}
                  color={"gray.500"}
                  mb={4}
                >
                  Welcome to the creation of your profile :)
                </Text>
                <Avatar
                  size={"2xl"}
                  src={preview}
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
                <Input
                  style={{ display: "none" }}
                  type="file"
                  ref={(refParam) => (fileInput = refParam)}
                  onChange={onSelectFile}
                />
                <Link color={"#1095f6"} onClick={() => fileInput.click()}>
                  Change Profile Photo
                </Link>
              </VStack>
              <Stack spacing={4} p={4}>
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input
                    type={"text"}
                    value={userData ? userData.profilename : ""}
                    onChange={(e) =>
                      setUserData({ ...userData, profilename: e.target.value })
                    }
                    color={("gray.800", "gray.200")}
                    bg={("gray.100", "gray.600")}
                    rounded={"full"}
                    border={0}
                    _focus={{
                      bg: ("gray.200", "gray.800"),
                      outline: "none",
                    }}
                  />
                </FormControl>
              </Stack>
              <Stack spacing={4} p={4}>
                <FormControl>
                  <FormLabel>Username</FormLabel>
                  <Input
                    type={"text"}
                    value={userData ? userData.username : " "}
                    onChange={(e) =>
                      setUserData({ ...userData, username: e.target.value })
                    }
                    color={("gray.800", "gray.200")}
                    bg={("gray.100", "gray.600")}
                    rounded={"full"}
                    border={0}
                    _focus={{
                      bg: ("gray.200", "gray.800"),
                      outline: "none",
                    }}
                  />
                </FormControl>
              </Stack>
              <Stack spacing={4} p={4}>
                <FormControl>
                  <FormLabel>Website</FormLabel>
                  <Input
                    type={"text"}
                    value={userData ? userData.website : " "}
                    onChange={(e) =>
                      setUserData({ ...userData, website: e.target.value })
                    }
                    color={("gray.800", "gray.200")}
                    bg={("gray.100", "gray.600")}
                    rounded={"full"}
                    border={0}
                    _focus={{
                      bg: ("gray.200", "gray.800"),
                      outline: "none",
                    }}
                  />
                </FormControl>
              </Stack>
              <Stack spacing={4} p={4}>
                <FormControl>
                  <FormLabel>Bio</FormLabel>
                  <Textarea
                    type={"text"}
                    value={userData ? userData.bio : ""}
                    onChange={(e) =>
                      setUserData({ ...userData, bio: e.target.value })
                    }
                    color={("gray.800", "gray.200")}
                    bg={("gray.100", "gray.600")}
                    border={0}
                    _focus={{
                      bg: ("gray.200", "gray.800"),
                      outline: "none",
                    }}
                  />
                </FormControl>
              </Stack>
              <Stack mt={8} direction={"row"} spacing={4}>
                <Button
                  onClick={() => supabase.auth.signOut()}
                  flex={1}
                  fontSize={"sm"}
                  rounded={"full"}
                  _hover={{
                    bg: "red.500",
                  }}
                  bg={"red"}
                >
                  Logout
                </Button>
                <Button
                  isLoading={loading}
                  loadingText="Updating ..."
                  onClick={createAccount}
                  flex={1}
                  fontSize={"sm"}
                  rounded={"full"}
                  color={"white"}
                  boxShadow={"0 5px 20px 0px rgb(72 187 120 / 43%)"}
                  _hover={{
                    bg: "teal",
                  }}
                  bg={"blue.500"}
                  isDisabled={isInvalid}
                >
                  {loading || "Create Account"}
                </Button>
              </Stack>
            </div>
          )}
        </Box>
      </Flex>
    </div>
  );
};

export default Account;
