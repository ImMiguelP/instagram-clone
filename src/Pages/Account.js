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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import PersonalAvatar from "./Components/PersonalAvatar";
import { supabase } from "./SupaBaseClient";

const Account = () => {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [avatarurl, setAvatarurl] = useState(null);
  const [website, setWebsite] = useState(null);
  const [bio, setBio] = useState(null);
  const [profilename, setProfilename] = useState(null);
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  function refreshPage() {
    window.location.reload(false);
  }

  async function fetchUserData() {
    try {
      setLoading(true);
      const user = supabase.auth.user();
      let { data, error, status } = await supabase
        .from("profiles")
        .select(`id, avatarurl, username, website, profilename, bio`)
        .eq("id", user.id)
        .single();

      if (data) {
        setUsername(data.username);
        setAvatarurl(data.avatarurl);
        setBio(data.bio);
        setProfilename(data.profilename);
        setWebsite(data.website);
      }
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile() {
    try {
      setLoading(true);
      const user = supabase.auth.user();
      const updates = {
        id: user.id,
        username,
        profilename,
        bio,
        website,
        avatarurl,
      };
      let { error } = await supabase.from("profiles").upsert(updates, {
        returning: "minimal",
      });
      if (error) {
        throw error;
      }
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

              <Button bg={"White"} color="black" onClick={refreshPage}>
                Go to home page
              </Button>
            </Box>
          ) : (
            <div>
              <PersonalAvatar
                url={avatarurl}
                onUpload={(url) => {
                  setAvatarurl(url);
                  updateProfile({
                    username,
                    website,
                    bio,
                    profilename,
                    avatarurl: url,
                  });
                }}
              />
              <Text
                fontSize={"sm"}
                fontWeight={500}
                color={"gray.500"}
                mb={4}
              ></Text>
              <Stack spacing={4} p={4}>
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input
                    type={"text"}
                    value={profilename || ""}
                    onChange={(e) => setProfilename(e.target.value)}
                    placeholder={profilename || "name"}
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
                    value={username || ""}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder={username || "username"}
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
                    value={website || ""}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder={website || "website"}
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
                    value={bio || ""}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder={bio || " bio"}
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
                  bg={"green.400"}
                  color={"white"}
                  boxShadow={"0 5px 20px 0px rgb(72 187 120 / 43%)"}
                  _hover={{
                    bg: "teal",
                  }}
                  bg={"blue.500"}
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
