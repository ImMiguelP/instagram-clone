import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  useColorModeValue,
  Textarea,
  Avatar,
} from "@chakra-ui/react";
import PersonalAvatar from "./Components/PersonalAvatar";
import useUser from "./Components/useUser";
import { supabase } from "./SupaBaseClient";

const Account = () => {
  const { loading, userData, setUserData, updateProfile } = useUser();

  return (
    <div>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Box
          maxW={"445px"}
          w={"full"}
          bg={useColorModeValue("white", "gray.900")}
          boxShadow={"2xl"}
          rounded={"lg"}
          p={6}
          textAlign={"center"}
          justifyItems={"center"}
          justifyContent={"center"}
        >
          <PersonalAvatar />
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
                value={userData.profilename}
                onChange={(e) =>
                  setUserData({ ...userData, profilename: e.target.value })
                }
                placeholder={userData.profilename || "name"}
                color={useColorModeValue("gray.800", "gray.200")}
                bg={useColorModeValue("gray.100", "gray.600")}
                rounded={"full"}
                border={0}
                _focus={{
                  bg: useColorModeValue("gray.200", "gray.800"),
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
                value={userData.username}
                onChange={(e) =>
                  setUserData({ ...userData, username: e.target.value })
                }
                placeholder={userData.username || "username"}
                color={useColorModeValue("gray.800", "gray.200")}
                bg={useColorModeValue("gray.100", "gray.600")}
                rounded={"full"}
                border={0}
                _focus={{
                  bg: useColorModeValue("gray.200", "gray.800"),
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
                value={userData.website}
                onChange={(e) =>
                  setUserData({ ...userData, website: e.target.value })
                }
                placeholder={userData.website || "website"}
                color={useColorModeValue("gray.800", "gray.200")}
                bg={useColorModeValue("gray.100", "gray.600")}
                rounded={"full"}
                border={0}
                _focus={{
                  bg: useColorModeValue("gray.200", "gray.800"),
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
                value={userData.bio}
                onChange={(e) =>
                  setUserData({ ...userData, bio: e.target.value })
                }
                placeholder={userData.bio || " bio"}
                color={useColorModeValue("gray.800", "gray.200")}
                bg={useColorModeValue("gray.100", "gray.600")}
                border={0}
                _focus={{
                  bg: useColorModeValue("gray.200", "gray.800"),
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
              _focus={{
                bg: "gray.200",
              }}
            >
              Logout
            </Button>
            <Button
              isLoading={loading}
              loadingText="Updating ..."
              onClick={updateProfile}
              flex={1}
              fontSize={"sm"}
              rounded={"full"}
              bg={"green.400"}
              color={"white"}
              boxShadow={"0 5px 20px 0px rgb(72 187 120 / 43%)"}
              _hover={{
                bg: "green.500",
              }}
              _focus={{
                bg: "green.500",
              }}
            >
              {loading || "Update"}
            </Button>
          </Stack>
        </Box>
      </Flex>
    </div>
  );
};

export default Account;
