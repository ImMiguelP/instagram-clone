import {
  Text,
  HStack,
  VStack,
  Box,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  StackDivider,
  Show,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import FeedRN from "./FeedRN";
import useUser from "../Components/useUser";
import Logout from "../Components/Logout";

function MainNav() {
  const { userData, loading, userPosts, follows, followers } = useUser();

  return (
    <VStack spacing={"1em"} w={"100%"} pt={"1em"}>
      <Box pb={"1em"}>
        {userData && (
          <Avatar
            size="2xl"
            outline={"solid"}
            outlineColor={"rgba(255,255,255, .5)"}
            src={userData.avatarurl}
          />
        )}
      </Box>
      <HStack>
        <VStack>
          <Text>
            <Text fontWeight={"bold"} fontSize={"xl"}>
              {userData ? userData.profilename : ""}
            </Text>
            <Link to={`/user/${userData ? userData.username : ""}`}>
              @{loading ? "" : userData ? userData.username : ""}
            </Link>
          </Text>
          <Show below="xl">
            <FeedRN />
          </Show>
          <Menu>
            <MenuButton
              px={2}
              py={1}
              transition="all .2s"
              borderRadius="2xl"
              _hover={{ bg: "rgb(38,38,38, .5)" }}
            >
              <ChevronDownIcon />
            </MenuButton>
            <MenuList bg={"#171717"} border="none" borderRadius="xl">
              <Link to={`/user/${userData ? userData.username : ""}`}>
                <MenuItem _hover={{ bg: "rgb(38,38,38, .5)" }}>
                  Profile
                </MenuItem>
              </Link>
              <Link to="/savedposts">
                <MenuItem _hover={{ bg: "rgb(38,38,38, .5)" }}>Saved</MenuItem>
              </Link>
              <Link to="settings">
                <MenuItem _hover={{ bg: "rgb(38,38,38, .5)" }}>
                  Settings
                </MenuItem>
              </Link>
              <MenuDivider borderColor={"rgba(255,255,255, .3)"} />
              <MenuItem _hover={{ bg: "rgb(38,38,38, .5)" }}>
                <Logout />{" "}
              </MenuItem>
            </MenuList>
          </Menu>
          <HStack
            divider={<StackDivider opacity={0.3} />}
            spacing={"20px"}
            pb={"5%"}
            pl={"2em"}
          >
            <Link to="/user/:username" fontSize={"16px"}>
              {userPosts.length} <br />
              Posts
            </Link>
            <Link to="/user/:username" fontSize={"16px"}>
              {followers.length}
              <br />
              Followers
            </Link>
            <Link to="/user/:username" fontSize={"16px"}>
              {follows.length} <br />
              Following
            </Link>
          </HStack>
        </VStack>
      </HStack>
    </VStack>
  );
}

export default MainNav;
