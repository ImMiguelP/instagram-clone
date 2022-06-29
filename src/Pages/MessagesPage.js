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
import UserMessages from "./Components/UserMessages";

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
    <div>
      <UserMessages />
    </div>
  );
};

export default MessagesPage;
