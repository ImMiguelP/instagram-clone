import {
  HStack,
  Text,
  Box,
  Stack,
  Image,
  VStack,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Divider,
} from "@chakra-ui/react";
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import {
  AiOutlineHome,
  AiOutlineCompass,
  AiOutlineMessage,
  AiOutlineVideoCamera,
} from "react-icons/ai";
import igboxlogo from "../../Logos/igboxlogo.png";
import useUser from "../Components/useUser";
import Logout from "../Components/Logout";
import FeedRN from "./FeedRN";

function MidNav() {
  const { userData } = useUser();
  return (
    <Stack w={"100%"} color="white" px={3} py={5} bg={"#1B1B1B"}>
      <Box display={"flex"} color={"white"}>
        <VStack
          h={"20px"}
          w={"100%"}
          maxW={"100%"}
          alignSelf="center"
          alignItems={"end"}
        >
          <HStack w={"100%"} spacing={4}>
            <VStack w={"100%"} alignItems={"start"}>
              <Link to="/">
                <Image h={"20px"} w={"20px"} src={igboxlogo} />
              </Link>
            </VStack>
            <Link to="/">
              <AiOutlineHome size={"20px"} />
            </Link>
            <FeedRN />
            <Link to="/explore">
              <AiOutlineCompass size={"20px"} />
            </Link>
            <Link to="/reels">
              <AiOutlineVideoCamera size={"20px"} />
            </Link>

            <Link to="/messages">
              <AiOutlineMessage size={"20px"} />
            </Link>
            <Menu>
              <MenuButton>
                {userData && <Avatar src={userData.avatarurl} size={"xs"} />}
              </MenuButton>
              <MenuList bg={"#171717"} border="none" borderRadius="xl">
                <Link to="profile">
                  <MenuItem>Profile</MenuItem>
                </Link>
                <Link to="settings">
                  <MenuItem>Settings</MenuItem>
                </Link>
                <Divider />
                <MenuItem>
                  <Logout />
                </MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </VStack>
      </Box>
    </Stack>
  );
}

export default MidNav;
