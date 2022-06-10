import { useState, useEffect, useCallback } from "react";
import {
  Image,
  VStack,
  Avatar,
  Stack,
  HStack,
  Link,
  Box,
  Text,
  IconButton,
  Input,
  Divider,
  FormControl,
  Button,
} from "@chakra-ui/react";
import {
  AiOutlineHeart,
  AiOutlineSend,
  AiOutlineSmile,
  AiFillHeart,
} from "react-icons/ai";
import { FiMessageCircle, FiBookmark } from "react-icons/fi";
import { supabase } from "../SupaBaseClient";
import Moment from "react-moment";

function Posts(props) {
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
            <Link>{props.post.profileid.username}</Link>
            <Link fontSize={"12px"} opacity={".5"}>
              Location
            </Link>
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
          <Box align={"end"} w={"100%"}>
            <IconButton variant="" icon={<FiBookmark fontSize={"1.6em"} />} />
          </Box>
        </HStack>
        <VStack align={"start"} w="100%">
          {likes.length > 0 && (
            <Link fontWeight={"bold"}>{likes.length} likes</Link>
          )}
          <HStack pb={3}>
            <Link fontSize={"lg"} fontWeight={"bold"}>
              {props.post.profileid.username}
            </Link>
            <Text fontSize={"md"}>{props.post.caption}</Text>
          </HStack>
          <Box className="Scroll" w={"100%"} h={"150px"}>
            {comments.map((comment) => (
              <VStack align={"self-start"} pt={1}>
                <HStack w={"100%"} spacing={3}>
                  <Link fontSize={"sm"} fontWeight={"bold"}>
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
