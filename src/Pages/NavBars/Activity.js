import React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  IconButton,
  Button,
  Link,
  Box,
  Avatar,
  Text,
  HStack,
} from "@chakra-ui/react";
import { AiOutlineHeart } from "react-icons/ai";

const Activity = () => {
  const activityFeed = {
    avatarImg:
      "https://i.pinimg.com/originals/f6/7a/3e/f67a3e568d34894c698799485eaee514.jpg",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/0/04/Pound_layer_cake.jpg",
    userName: "immiguelp",
    usersDM: "Wow this is cool!!",
    dmReq: "1",
    active: "Active now",
    yourMsg: "Hi how are you?",
  };
  return (
    <Popover>
      <PopoverTrigger>
        <Box>
          <IconButton
            variant={""}
            icon={<AiOutlineHeart className="Icon-align" fontSize={"1.2em"} />}
          />
          <Link>Activity</Link>
        </Box>
      </PopoverTrigger>
      <PopoverContent bg={"#1B1B1B"} color={"white"}>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>
          <Button variant={""}>
            <Box>
              <Text>Follow Requests</Text>
              <Text textAlign={"start"} fontSize={14} opacity={0.5}>
                Blah + 46 others
              </Text>
            </Box>
          </Button>
        </PopoverHeader>
        <PopoverBody>
          <Box className="settingsTop">
            <Link>
              <HStack>
                <Avatar src={activityFeed.avatarImg} />
                <Text fontSize="md">{activityFeed.userName}</Text>
              </HStack>
            </Link>
            <Text fontSize={12} opacity={0.5} paddingLeft={2}>
              Started following you
            </Text>
          </Box>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default Activity;
