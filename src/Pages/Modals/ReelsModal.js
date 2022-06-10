import {
  Box,
  Image,
  VStack,
  HStack,
  Link,
  Avatar,
  IconButton,
  InputGroup,
  InputLeftElement,
  Textarea,
  Text,
  StackDivider,
} from "@chakra-ui/react";
import React from "react";
import { AiOutlineHeart, AiOutlineSend, AiOutlineSmile } from "react-icons/ai";
import { FiMessageCircle, FiBookmark } from "react-icons/fi";

const ReelsModal = () => {
  var w = window.innerWidth;
  const igFeed = {
    avatarImg:
      "https://i.pinimg.com/originals/f6/7a/3e/f67a3e568d34894c698799485eaee514.jpg",
    imageUrl:
      "https://theworldpursuit.com/wp-content/uploads/2021/01/nature-captions--scaled.jpeg",
    userName: "immiguelp",
    likes: "120,000",
    numOfComments: "129",
    usersText: "Wow this is coolssssssssssss!!",
  };

  return (
    <HStack spacing={0}>
      <Box
        boxSize={{ xl: "6xl", lg: "lg", md: "md", sm: "sm" }}
        ml={"5%"}
        className="border"
      >
        <Image
          boxSize={{ xl: "6xl", lg: "lg", md: "md", sm: "sm" }}
          objectFit={"cover"}
          src="https://theworldpursuit.com/wp-content/uploads/2021/01/nature-captions--scaled.jpeg"
        />
      </Box>
      <Box boxSize={"6xl"} className="border" background={"#1B1B1B"}>
        <VStack
          color={"white"}
          mt={".5em"}
          ml={"1em"}
          divider={<StackDivider borderColor="gray" />}
        >
          <HStack className="Feeduser">
            <Avatar
              size="sm"
              outline={"solid"}
              outlineColor={"rgba(255,255,255, .5)"}
              src={igFeed.avatarImg}
            />
            <Link>{igFeed.userName}</Link>
          </HStack>
          <Box h={"50em"} w={"100%"}>
            <VStack align={"start"} spacing={"2em"} mt={".5em"}>
              <HStack spacing={"1em"}>
                <Avatar
                  size="sm"
                  outline={"solid"}
                  outlineColor={"rgba(255,255,255, .5)"}
                  src={igFeed.avatarImg}
                />
                <Link fontSize={"lg"}>{igFeed.userName}</Link>
                <Text fontSize={"sm"}>{igFeed.usersText}</Text>
              </HStack>
              <HStack spacing={"1em"}>
                <Avatar
                  size="sm"
                  outline={"solid"}
                  outlineColor={"rgba(255,255,255, .5)"}
                  src={igFeed.avatarImg}
                />
                <Link>{igFeed.userName}</Link>
                <Text>{igFeed.usersText}</Text>
              </HStack>
              <HStack spacing={"1em"}>
                <Avatar
                  size="sm"
                  outline={"solid"}
                  outlineColor={"rgba(255,255,255, .5)"}
                  src={igFeed.avatarImg}
                />
                <Link>{igFeed.userName}</Link>
                <Text>{igFeed.usersText}</Text>
              </HStack>
            </VStack>
          </Box>

          <div className="Feeduser">
            <Box h={"6em"} mt={"-.5em"} className="border">
              <VStack align={"start"} spacing={"1em"}>
                <HStack>
                  <IconButton
                    variant=""
                    icon={<AiOutlineHeart fontSize={"1.75em"} />}
                  />
                  <IconButton
                    variant=""
                    icon={<FiMessageCircle fontSize={"1.5em"} />}
                  />
                  <IconButton
                    variant=""
                    icon={<AiOutlineSend fontSize={"1.5em"} />}
                  />
                  <IconButton
                    variant=""
                    icon={<FiBookmark fontSize={"1.5em"} />}
                  />
                </HStack>
                <Link pl={".5em"}>{igFeed.likes}</Link>
              </VStack>
            </Box>
          </div>
          <InputGroup paddingLeft={"1em"} className="border">
            <InputLeftElement paddingLeft={"1em"}>
              <IconButton
                size={"xs"}
                variant=""
                icon={<AiOutlineSmile fontSize={"2.2em"} />}
              />
            </InputLeftElement>
            <Textarea
              variant="unstyled"
              opacity=".5"
              placeholder="Add Comment"
            />
          </InputGroup>
        </VStack>
      </Box>
    </HStack>
  );
};

export default ReelsModal;
