import React, { useState, useEffect, useCallback } from "react";
import {
  HStack,
  VStack,
  Box,
  Avatar,
  Text,
  Link,
  Button,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  StackDivider,
  IconButton,
  Input,
  FormControl,
  Hide,
  Show,
  Stack,
} from "@chakra-ui/react";
import {
  AiOutlineHeart,
  AiOutlineSend,
  AiOutlineSmile,
  AiFillHeart,
} from "react-icons/ai";
import { FiMessageCircle, FiBookmark } from "react-icons/fi";
import useUser from "./useUser";
import { supabase } from "../SupaBaseClient";
import Moment from "react-moment";

function IGProfilePosts(props) {
  const { userData } = useUser();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const user = supabase.auth.user();

  console.log(likes);

  const fetchComments = useCallback(async () => {
    const { data } = await supabase
      .from("comments")
      .select(
        `id, created_at, comment, cprofileid(username, avatarurl), postid`
      )
      .filter("postid", "eq", props.post.id)
      .order("created_at", { ascending: false });

    setComments(data);
  }, [props.post.id]);

  const likePost = async () => {
    if (hasLiked) {
      await supabase
        .from("likes")
        .delete()
        .match({ postid: props.post.id, userid: user.id });
    } else {
      await supabase.from("likes").insert({
        userid: user.id,
        postid: props.post.id,
      });
    }
    fetchLikes();
  };

  const fetchLikes = useCallback(async () => {
    const { data } = await supabase
      .from("likes")
      .select(`id, created_at, userid, postid`)
      .filter("postid", "eq", props.post.id);

    setLikes(data);
  }, [props.post.id]);

  const sendComment = async (e) => {
    e.preventDefault();
    const commentToSend = comment;
    setComment("");

    await supabase.from("comments").insert({
      comment: commentToSend,
      cprofileid: user.id,
      postid: props.post.id,
    });

    fetchComments();
  };

  useEffect(() => {
    fetchComments();
    fetchLikes();
  }, [fetchComments, fetchLikes]);

  useEffect(() => {
    setHasLiked(likes.findIndex((like) => like.userid === user?.id) !== -1);
  }, [likes]);

  const igFeed = {
    likes: "120,000",
  };

  return (
    <div>
      <Box
        h={"20em"}
        maxH={"20em"}
        w={"20em"}
        maxW={"20em"}
        ml={10}
        mr={1}
        mb={10}
        mt={5}
      >
        <a onClick={onOpen}>
          <Image
            src={props.post.photourl}
            alt="pht"
            objectFit={"cover"}
            height={"100%"}
            w={"100%"}
            borderRadius={"xl"}
          />
        </a>
      </Box>
      {/*Modal */}
      <Hide below="md">
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
                    src={props.post.photourl}
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
                        src={userData ? userData.avatarurl : ""}
                      />
                      <Link>{userData ? userData.username : ""}</Link>
                    </HStack>

                    <Box h={"35em"} w={"100%"} className="Scroll">
                      <VStack
                        align={"start"}
                        spacing={"2em"}
                        mt={".5em"}
                        ml={2}
                      >
                        <HStack>
                          <Avatar
                            size="sm"
                            outline={"solid"}
                            outlineColor={"rgba(255,255,255, .5)"}
                            src={userData ? userData.avatarurl : ""}
                          />
                          <Link>{userData ? userData.username : ""}</Link>
                          <Text>{props.post.caption}</Text>
                        </HStack>
                        {comments.map((comment) => {
                          return (
                            <HStack w={"100%"} spacing={3} align={"middle"}>
                              <Box w={"88%"}>
                                <HStack align={"middle"}>
                                  <Avatar
                                    size="sm"
                                    outline={"solid"}
                                    outlineColor={"rgba(255,255,255, .5)"}
                                    src={
                                      comment
                                        ? comment.cprofileid.avatarurl
                                        : ""
                                    }
                                  />
                                  <Link>
                                    {comment ? comment.cprofileid.username : ""}
                                  </Link>
                                  <Text wordBreak={"break-all"}>
                                    {comment ? comment.comment : ""}
                                  </Text>
                                </HStack>
                              </Box>
                              <Stack align={"end"}>
                                <Moment className="MomentSize" fromNow>
                                  {comment ? comment.created_at : ""}
                                </Moment>
                              </Stack>
                            </HStack>
                          );
                        })}
                      </VStack>
                    </Box>

                    <div className="Feeduser">
                      <Box h={"6em"} mt={"-10px"} mb={"-30px"}>
                        <VStack align={"start"}>
                          <HStack w={"100%"} spacing={3}>
                            {hasLiked ? (
                              <AiFillHeart
                                color="red"
                                fontSize={"1.75em"}
                                cursor="pointer"
                                onClick={likePost}
                              />
                            ) : (
                              <AiOutlineHeart
                                fontSize={"1.75em"}
                                cursor="pointer"
                                onClick={likePost}
                              />
                            )}
                            <FiMessageCircle
                              fontSize={"1.5em"}
                              cursor="pointer"
                            />
                            <AiOutlineSend
                              fontSize={"1.5em"}
                              cursor="pointer"
                            />
                            <Box align={"end"} w={"100%"}>
                              <IconButton
                                variant=""
                                icon={
                                  <FiBookmark
                                    fontSize={"1.6em"}
                                    cursor="pointer"
                                  />
                                }
                              />
                            </Box>
                          </HStack>
                          {likes.length > 0 && (
                            <Link fontWeight={"bold"} pl={".5em"}>
                              {likes.length} likes
                            </Link>
                          )}
                        </VStack>
                      </Box>
                    </div>
                    <FormControl pt={3}>
                      <Box w={"100%"}>
                        <form>
                          <HStack>
                            <AiOutlineSmile fontSize={"2em"} cursor="pointer" />
                            <Input
                              variant={"unstyled"}
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                              placeholder="Add a comment..."
                            />
                            <IconButton
                              variant=""
                              type="submit"
                              disabled={!comment.trim()}
                              onClick={(e) => sendComment(e, props.post.id)}
                              icon={<AiOutlineSend fontSize={"1.7em"} />}
                            />
                          </HStack>
                        </form>
                      </Box>
                    </FormControl>
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
                h={"580px"}
                mt={"15px"}
                bg={"#1B1B1B"}
                color={"white"}
              >
                <HStack mt={"15px"} ml={3}>
                  <Avatar size="sm" src={userData ? userData.avatarurl : ""} />
                  <Link>{userData ? userData.username : ""}</Link>
                </HStack>
                <Box className="border" h={"400px"} mt={"20px"}>
                  <Image
                    src={props.post.photourl}
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
                <HStack pl={3} pt={1}>
                  <Link>{userData ? userData.username : ""}</Link>
                  <Text>{props.post.caption}</Text>
                </HStack>
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Show>
    </div>
  );
}

export default IGProfilePosts;
