import { useState, useEffect, useCallback } from "react";
import {
  Image,
  VStack,
  Avatar,
  Stack,
  HStack,
  Box,
  Text,
  IconButton,
  Input,
  Divider,
  FormControl,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
} from "@chakra-ui/react";
import {
  AiOutlineHeart,
  AiOutlineSend,
  AiOutlineSmile,
  AiFillHeart,
} from "react-icons/ai";
import { FiMessageCircle } from "react-icons/fi";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { supabase } from "../SupaBaseClient";
import Moment from "react-moment";
import { Link } from "react-router-dom";

function Posts(props) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [savedPost, setSavedPost] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const [hasSaved, setHasSaved] = useState(false);
  const user = supabase.auth.user();

  // Delete Post

  const deletePost = async () => {
    const { data, error } = await supabase
      .from("posts")
      .delete()
      .match({ id: props.post.id });
    console.log(data, error);
  };

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

  // Liked Post Database

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

  // Savedpost database

  const savePost = async () => {
    if (hasSaved) {
      await supabase
        .from("savedposts")
        .delete()
        .match({ postid: props.post.id, userid: user.id });
    } else {
      await supabase.from("savedposts").insert({
        userid: user.id,
        postid: props.post.id,
      });
    }
    fetchSavedPosts();
  };

  const fetchSavedPosts = useCallback(async () => {
    const { data } = await supabase
      .from("savedposts")
      .select(`id, postid, userid`)
      .filter("postid", "eq", props.post.id);
    setSavedPost(data);
  }, [props.post.id]);

  //comments Database

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
    fetchSavedPosts();
  }, [fetchComments, fetchLikes, fetchSavedPosts]);

  useEffect(() => {
    setHasLiked(likes.findIndex((like) => like.userid === user?.id) !== -1);
  }, [likes]);

  useEffect(() => {
    setHasSaved(savedPost.findIndex((save) => save.userid === user?.id) !== -1);
  }, [savedPost]);

  return (
    <div>
      <Divider pt={"10px"} pb={"30px"} />
      <VStack>
        <HStack
          align={"center"}
          width={"100%"}
          pt={"20px"}
          pb={"20px"}
          spacing={"10px"}
        >
          <Avatar
            size="md"
            outline={"solid"}
            outlineColor={"rgba(255,255,255, .5)"}
            src={props.post.profileid.avatarurl}
          />
          <VStack align={"start"}>
            <Link to={`/user/${props.post.profileid.username}`}>
              {props.post.profileid.username}
            </Link>
            <Moment className="MomentSize" fromNow>
              {props.post.created_at}
            </Moment>
          </VStack>
          <VStack w={"100%"} h={"50px"} align={"end"}>
            {props.post.profileid.id === user.id ? (
              <Menu>
                <MenuButton>
                  <BiDotsHorizontalRounded
                    fontSize={"1.75em"}
                    cursor="pointer"
                  />
                </MenuButton>
                <MenuList color={"black"}>
                  <MenuItem onClick={deletePost} color="red">
                    Delete
                  </MenuItem>
                  <MenuItem>Edit</MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <Menu>
                <MenuButton>
                  <BiDotsHorizontalRounded
                    fontSize={"1.75em"}
                    cursor="pointer"
                  />
                </MenuButton>
                <MenuList bg={"black"}></MenuList>
              </Menu>
            )}
          </VStack>
        </HStack>
        <Box w={"100%"} align={"middle"}>
          <Image
            h="614px"
            w="614px"
            objectFit="contain"
            src={props.post.photourl}
          />
        </Box>
        <HStack w={"100%"} spacing={4}>
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

          <FiMessageCircle fontSize={"1.5em"} cursor="pointer" />
          <AiOutlineSend fontSize={"1.5em"} cursor="pointer" />
          <VStack align={"end"} w={"100%"}>
            {hasSaved ? (
              <FaBookmark
                color="grey"
                className="Bookmark"
                fontSize={"1.6em"}
                cursor="pointer"
                onClick={savePost}
              />
            ) : (
              <FaRegBookmark
                fontSize={"1.6em"}
                cursor="pointer"
                onClick={savePost}
              />
            )}
          </VStack>
        </HStack>
        <VStack align={"start"} w="100%">
          {likes.length > 0 && (
            <Text fontWeight={"bold"}>{likes.length} likes</Text>
          )}
          <HStack pb={3}>
            <Link
              to={`/user/${props.post.profileid.username}`}
              fontSize={"lg"}
              fontWeight={"bold"}
            >
              {props.post.profileid.username}
            </Link>
            <Text fontSize={"md"}>{props.post.caption}</Text>
          </HStack>
          <Box className="Scroll" w={"100%"} h={"150px"}>
            {comments.map((comment) => (
              <VStack align={"self-start"} pt={1}>
                <HStack w={"100%"} spacing={3}>
                  <Link to={`/user/${comment.cprofileid.username}`}>
                    {comment ? comment.cprofileid.username : ""}
                  </Link>
                  <Text w={"100%"} fontSize={"xs"}>
                    {comment ? comment.comment : ""}
                  </Text>
                  <Stack w={"10%"} align={"end"}>
                    <Moment className="MomentSize" fromNow>
                      {comment ? comment.created_at : ""}
                    </Moment>
                  </Stack>
                </HStack>
              </VStack>
            ))}
          </Box>

          <FormControl>
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
      </VStack>
      <Divider pt={20} />
    </div>
  );
}

export default Posts;
