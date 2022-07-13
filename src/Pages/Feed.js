import { useState, useEffect } from "react";
import {
  Stack,
  Box,
  Input,
  Text,
  Image,
  VStack,
  HStack,
  Button,
  Spinner,
} from "@chakra-ui/react";
import "./CSS/modules.css";
import { supabase } from "./SupaBaseClient";
import Stories from "./Components/Stories";
import Posts from "./Components/Posts";
import { Link } from "react-router-dom";

const Feed = (props) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = supabase.auth.user();

  async function fetchPosts(callback) {
    setLoading(true);
    const { data: followers } = await supabase
      .from("following")
      .select(`followingid`)
      .eq("userid", user.id);

    const { data, error } = await supabase
      .from("posts")
      .select(
        `id, caption, created_at, photourl, profileid(id,username, avatarurl)`
      )
      .in(
        "profileid(id)",
        followers.map(({ followingid }) => followingid)
      )
      .order("created_at", { ascending: false });
    console.log(" posts", data, error);

    callback(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchPosts(setPosts);
  }, []);

  if (loading) {
    return (
      <Box
        w={"100%"}
        h={"100%"}
        bg={"#0E0E10"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Spinner w={"100px"} h={"100px"} size="xl" color="white" />
      </Box>
    );
  }

  return (
    <Stack px={5} color={"white"}>
      {/* Input Field */}
      <Box w={"100%"} align={"middle"} pt={"40px"}>
        <Input maxW="80%" color={"white"} />
      </Box>
      {/*Avatar Stories */}
      <Stories />
      {posts.length > 0 ? (
        <div>
          {posts.map((post) => {
            return <Posts post={post} props={props} />;
          })}
        </div>
      ) : (
        <VStack
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          pt={10}
        >
          <HStack>
            <Image
              h={"40px"}
              src="https://emoji.discord.st/emojis/769896ae-43a9-42f2-a1e0-5c1465a81428.gif"
            />
            <Text fontSize={"xl"} fontWeight={"bold"}>
              OOPS LOOKS LIKE YOU DONT FOLLOW ANYONE!
            </Text>
            <Image
              h={"40px"}
              src="https://emoji.discord.st/emojis/769896ae-43a9-42f2-a1e0-5c1465a81428.gif"
            />
          </HStack>
          <Text fontSize={"md"} pb={10}>
            Head over to the Explore Section to discover people :)
          </Text>

          <Image
            borderRadius={"xl"}
            src={"https://c.tenor.com/rtY9m7EokSYAAAAC/cat-loading.gif"}
          />
          <Box pt={5}>
            <Link to="/explore">
              <Button colorScheme="blue" color={"White"}>
                Explore
              </Button>
            </Link>
          </Box>
        </VStack>
      )}
    </Stack>
  );
};

export default Feed;
