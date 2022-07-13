import { React } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./CSS/App.css";
import {
  Image,
  VStack,
  GridItem,
  Grid,
  Divider,
  Text,
  Box,
  Hide,
  Show,
} from "@chakra-ui/react";
import iglogo from "../Logos/iglogo.png";
import {
  AiOutlineHome,
  AiOutlineCompass,
  AiOutlineMessage,
  AiOutlineSetting,
  AiOutlineVideoCamera,
  AiOutlineLogout,
} from "react-icons/ai";
import MessagesPage from "./MessagesPage";
import ExplorerPage from "./ExplorerPage";
import SettingsPage from "./SettingsPage";
import Reels from "./Reels";
import Feed from "./Feed";
import FeedRN from "./NavBars/FeedRN";
import RN from "./NavBars/RN";
import ProfileRn from "./NavBars/ProfileRn";
import Error from "./Error";
import MainNav from "./NavBars/MainNav";
import Logout from "./Components/Logout";
import MidNav from "./NavBars/MidNav";
import SavedPosts from "./SavedPosts";
import Userspage from "./Userspage";

const HomePage = () => {
  return (
    <Grid
      className="Bg"
      maxW={"100%"}
      mx="auto"
      templateColumns={{
        base: "1 1fr 0px",
        md: "330px 1fr 0px",
        lg: "440px 1fr 0px",
        xl: "440px 1fr 340px",
      }}
    >
      <Hide below="md">
        <GridItem color={"white"}>
          <VStack height={"100%"} align={"start"}>
            <Box w={"100%"} align={"middle"} pt={"1em"}>
              <Link to="/">
                <Image w={"150px"} verticalAlign={"middle"} src={iglogo} />
              </Link>
              <MainNav />
            </Box>
            <VStack align={"start"} pl={"2em"}>
              <Link to="/">
                <Text className="Vertical-align">
                  <AiOutlineHome className="Icon-align" />
                  Feed
                </Text>
              </Link>
              <Link to="/explore">
                <Text className="Vertical-align">
                  <AiOutlineCompass className="Icon-align" />
                  Explore
                </Text>
              </Link>
              <Link to="/reels">
                <Text className="Vertical-align">
                  <AiOutlineVideoCamera className="Icon-align" />
                  Reels
                </Text>
              </Link>

              <Divider
                orientation="horizontal"
                width="100%"
                paddingTop="20px"
              />
              <Link to="/messages">
                <div className="Vertical-align">
                  <AiOutlineMessage className="Icon-align" />
                  Direct Messages
                </div>
              </Link>
              <Link to="/settings">
                <div className="Vertical-align">
                  <AiOutlineSetting className="Icon-align" />
                  Settings
                </div>
              </Link>
              <div className="Vertical-align">
                <AiOutlineLogout className="Icon-align" /> <Logout />
              </div>
            </VStack>
          </VStack>
        </GridItem>
      </Hide>
      {/* This is the middle tab*/}
      <Show below="md">
        <MidNav />
      </Show>
      <GridItem bg={"#1B1B1B"} className="Scroll">
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/savedposts" element={<SavedPosts />} />
          <Route path="/user/:username" element={<Userspage />} />
          <Route path="/explore" element={<ExplorerPage />} />
          <Route path="/reels" element={<Reels />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </GridItem>
      <Hide below="xl">
        <GridItem>
          <Routes>
            <Route path="/" element={<FeedRN />} />
            <Route path="/profile" element={<ProfileRn />} />
            <Route path="/user/:username" element={<ProfileRn />} />
            <Route path="/savedposts" element={<RN />} />
            <Route path="/explore" element={<RN />} />
            <Route path="/reels" element={<RN />} />
            <Route path="/messages" element={<RN />} />
            <Route path="/settings" element={<RN />} />
            <Route path="*" element={<RN />} />
          </Routes>
        </GridItem>
      </Hide>
    </Grid>
  );
};

export default HomePage;
