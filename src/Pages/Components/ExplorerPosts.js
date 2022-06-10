import React from "react";
import {
  Image,
  Button,
  VStack,
  Box,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  HStack,
  Link,
  Avatar,
  IconButton,
  InputGroup,
  InputLeftElement,
  Textarea,
  Text,
  StackDivider,
  Hide,
  Show,
} from "@chakra-ui/react";
import { AiOutlineHeart, AiOutlineSend, AiOutlineSmile } from "react-icons/ai";
import { FiMessageCircle, FiBookmark } from "react-icons/fi";

function ExplorerPosts({ user, img, avatar }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
    <div>
      <Box
        h={"300px"}
        maxH={"300px"}
        w={"300px"}
        maxW={"300px"}
        ml={10}
        mr={10}
        mb={5}
        mt={5}
      >
        <a onClick={onOpen}>
          <Image
            src={img}
            alt="pht"
            objectFit={"cover"}
            height={"100%"}
            w={"100%"}
            borderRadius={"xl"}
          />
        </a>
      </Box>

      {/*Modal */}
      <Hide below={"md"}>
        <Modal onClose={onClose} size={"full"} isOpen={isOpen}>
          <ModalOverlay />
          <ModalContent style={{ background: "rgba(27, 27, 27, 0.3)" }}>
            <ModalHeader color={"white"}>
              <ModalCloseButton />
            </ModalHeader>

            <ModalBody>
              <HStack spacing={0}>
                <Box width={"800px"} h={"880px"} ml={"8%"}>
                  <Image
                    bg={"#1B1B1B"}
                    width={"800px"}
                    h={"880px"}
                    objectFit={"contain"}
                    src={img}
                  />
                </Box>
                <Box width={"800px"} h={"880px"} background={"#1B1B1B"}>
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
                        src={avatar}
                      />
                      <Link>{user}</Link>
                    </HStack>
                    <Box h={"35em"} w={"100%"} className="Scroll">
                      <VStack
                        align={"start"}
                        spacing={"2em"}
                        mt={".5em"}
                        ml={2}
                      >
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
                      </VStack>
                    </Box>

                    <div className="Feeduser">
                      <Box h={"6em"} mt={"-.5em"}>
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
                    <InputGroup paddingLeft={"1em"}>
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
            </ModalBody>
            <ModalFooter mt={-10}>
              <Button onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Hide>
      {/*Modal on phone*/}
      <Show below="md">
        <Modal onClose={onClose} size={"full"} isOpen={isOpen}>
          <ModalOverlay />
          <ModalContent style={{ background: "rgba(27, 27, 27, 0.3)" }}>
            <ModalHeader color={"white"}>
              <ModalCloseButton />
            </ModalHeader>
            <ModalBody>
              <Box
                className="border"
                h={"550px"}
                mt={"35px"}
                bg={"#1B1B1B"}
                color={"white"}
              >
                <HStack mt={"15px"} ml={3}>
                  <Avatar size="sm" src={avatar} />
                  <Link>{user}</Link>
                </HStack>
                <Box className="border" h={"400px"} mt={"20px"}>
                  <Image
                    src={img}
                    h={"100%"}
                    w={"100%"}
                    bg={"black"}
                    objectFit={"contain"}
                  />
                </Box>
                <HStack>
                  <IconButton
                    variant=""
                    icon={<AiOutlineHeart fontSize={"1.2em"} />}
                  />
                  <IconButton
                    variant=""
                    icon={<FiMessageCircle fontSize={"1.2em"} />}
                  />
                  <IconButton
                    variant=""
                    icon={<AiOutlineSend fontSize={"1.2em"} />}
                  />
                  <VStack w={"100%"} alignItems={"end"}>
                    <IconButton
                      variant=""
                      icon={<FiBookmark fontSize={"1.2em"} />}
                    />
                  </VStack>
                </HStack>
                <Text pl={3}>56 likes</Text>
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Show>
    </div>
  );
}

export default ExplorerPosts;
