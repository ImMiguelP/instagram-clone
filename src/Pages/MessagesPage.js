import React, { useState } from "react";
import {
  VStack,
  Divider,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Avatar,
  AvatarBadge,
  HStack,
  Link,
  Box,
  Text,
  IconButton,
  Button,
  Input,
  InputRightElement,
  InputLeftElement,
  InputGroup,
  useDisclosure,
  Stack,
} from "@chakra-ui/react";
import {
  AiOutlineSearch,
  AiOutlinePhone,
  AiOutlineVideoCamera,
  AiOutlineInfoCircle,
  AiOutlinePicture,
  AiOutlineFileGif,
  AiOutlineHeart,
  AiOutlineSend,
} from "react-icons/ai";
import "./CSS/chat.css";
import useUser from "./Components/useUser";

const MessagesPage = () => {
  const { userData } = useUser();
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const dmFeed = {
    avatarImg:
      "https://i.pinimg.com/originals/f6/7a/3e/f67a3e568d34894c698799485eaee514.jpg",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/0/04/Pound_layer_cake.jpg",
    userName: "immiguelp",
    usersDM: "Wow this is cool!!",
    active: "Active now",
    yourMsg: "Hi how are you?",
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const handleSubmit = () => {
    setMessages([{ text }, ...messages]);
    setText("");
  };

  return (
    <Stack px={5} spacing={5} color={"white"}>
      <Box width="100%" pb={10} pt={5}>
        <Box display={"flex"} alignItems={"center"} pb={3}>
          <Text fontWeight={"bold"} fontSize={"28px"}>
            Messages
          </Text>
          <Box w="100%" align={"end"}></Box>
        </Box>

        <InputGroup className="dmInput">
          <InputLeftElement color={"white"} children={<AiOutlineSearch />} />
          <Input placeholder="Search" />
        </InputGroup>
        <Divider pt={3} />
      </Box>

      {/* Opens the dms of the person you click in a drawer from the right*/}
      {[...new Array(5)].map(() => {
        return (
          <Button ref={btnRef} colorScheme="none" onClick={onOpen} h="20">
            <HStack align={"start"}>
              <Avatar size="md" src={dmFeed.avatarImg} />
              <VStack align={"start"}>
                <Text>{dmFeed.userName}</Text>
                <Text opacity=".3">{dmFeed.usersDM}</Text>
              </VStack>
            </HStack>
          </Button>
        );
      })}

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
            <HStack padding={"25px 15px"}>
              <Box w={"100%"}>
                <HStack>
                  <Avatar src={dmFeed.avatarImg}>
                    <AvatarBadge boxSize="20px" bg="green.500" />
                  </Avatar>
                  <VStack>
                    <Text fontSize="md">{dmFeed.userName}</Text>
                    <Text fontSize="md" opacity=".3">
                      {dmFeed.active}
                    </Text>
                  </VStack>
                </HStack>
              </Box>
              <Box w={"100%"} align="end">
                <IconButton
                  variant=""
                  color={"white"}
                  icon={<AiOutlineVideoCamera fontSize={"1.5em"} />}
                />
                <IconButton
                  variant=""
                  color={"white"}
                  icon={<AiOutlineInfoCircle fontSize={"1.5em"} />}
                />
                <IconButton
                  variant=""
                  color={"white"}
                  icon={<AiOutlinePhone fontSize={"1.5em"} />}
                />
              </Box>
            </HStack>
          </DrawerHeader>

          <DrawerBody>
            <Box h={"100%"} className="DmMessages">
              <div className="message">
                <Avatar src={dmFeed.avatarImg} />
                <Text className="receivedp">Hello How are you</Text>
              </div>
              <div className="message">
                <Avatar src={dmFeed.avatarImg} />
                <Text className="receivedp">Want to hang out?</Text>
              </div>

              {messages.map((v, i) => {
                return (
                  <div key={i} className="message sent">
                    <Avatar src={userData.avatarurl} />
                    <Text className="sentp">{v.text}</Text>
                  </div>
                );
              })}
            </Box>
          </DrawerBody>

          <DrawerFooter>
            <InputGroup>
              <Input
                placeholder="Send Message..."
                type="text"
                value={text}
                onChange={(e) => setText(e.currentTarget.value)}
              />

              <InputRightElement>
                <HStack paddingRight={"100px"} spacing={"1px"}>
                  <IconButton
                    variant=""
                    icon={<AiOutlinePicture fontSize={"1.2em"} />}
                  />
                  <IconButton
                    variant=""
                    icon={<AiOutlineFileGif fontSize={"1.2em"} />}
                  />
                  <IconButton
                    variant=""
                    icon={<AiOutlineHeart fontSize={"1.2em"} />}
                    onClick={handleSubmit}
                  />
                </HStack>
              </InputRightElement>
            </InputGroup>
            <Button />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Stack>
  );
};

export default MessagesPage;
