import { useState, useEffect } from "react";
import {
  Image,
  Button,
  VStack,
  Text,
  Link,
  HStack,
  Avatar,
  Box,
  Divider,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Textarea,
  Hide,
} from "@chakra-ui/react";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { supabase } from "../SupaBaseClient";
import { faker } from "@faker-js/faker";

export const USERS = [];

export function createRandomUser() {
  return {
    userId: faker.datatype.uuid(),
    username: faker.internet.userName(),
    name: faker.name.findName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    password: faker.internet.password(),
    birthdate: faker.date.birthdate(),
    registeredAt: faker.date.past(),
  };
}
Array.from({ length: 6 }).forEach(() => {
  USERS.push(createRandomUser());
});

function FeedRN() {
  const suggestions = USERS;
  let fileInput;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [text, setText] = useState("");

  //Preview Upload File
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };

  //Upload File
  async function onUploadFile() {
    const postFile = selectedFile;
    const user = supabase.auth.user();
    onClose();

    await supabase.storage
      .from("posts")
      .upload(`public/${postFile.name}`, postFile, { upsert: true });

    const { publicURL } = await supabase.storage
      .from("posts")
      .getPublicUrl(`public/${postFile.name}`);

    //Upload Caption

    await supabase
      .from("posts")
      .insert([
        {
          photourl: publicURL,
          caption: text,
          profileid: user.id,
        },
      ])
      .single();
  }

  return (
    <VStack spacing={"40px"} color={"white"} pt={{ xl: 8, base: 2 }}>
      <Hide above="md">
        <Box pb={2}>
          <Link>
            <AiOutlinePlusSquare fontSize={"20px"} onClick={onOpen} />
          </Link>
        </Box>
      </Hide>
      <Hide below="md">
        <Button
          height={{ xl: "50px", base: "30px" }}
          width={{ xl: "200px", base: "100px" }}
          leftIcon={<AiOutlinePlusSquare fontSize={"1.5em"} />}
          colorScheme="gray"
          variant="outline"
          className="Button"
          onClick={onOpen}
        >
          <Hide below="xl">
            <Text color="white">New Post</Text>
          </Hide>
        </Button>
      </Hide>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={"#1B1B1B"} color="white" borderRadius={10}>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody></ModalBody>

          <ModalFooter>
            <VStack w={"100%"} spacing={5}>
              <Box w={"100%"} align={"middle"}>
                <Image
                  objectFit={"cover"}
                  height={"100%"}
                  w={"100%"}
                  src={preview}
                />
              </Box>
              <Textarea
                placeholder="Write a caption..."
                onChange={(e) => setText(e.currentTarget.value)}
              />
              <HStack w={"100%"} justify={"center"} spacing="30px">
                <Input
                  style={{ display: "none" }}
                  type="file"
                  ref={(refParam) => (fileInput = refParam)}
                  onChange={onSelectFile}
                />
                <Button
                  colorScheme="white"
                  variant="outline"
                  className="Button"
                  onClick={() => fileInput.click()}
                >
                  Pick A File
                </Button>
                <Button
                  colorScheme="white"
                  variant="outline"
                  className="Button"
                  onClick={onUploadFile}
                >
                  Share
                </Button>
              </HStack>
            </VStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Hide below="xl">
        {/* Suggestions Posts */}

        <HStack spacing={"50px"}>
          <Text fontSize={"18px"}>Suggestions For You</Text>
          <Link opacity=".5">See All</Link>
        </HStack>
        {suggestions.map((profiles) => {
          return (
            <Box w={"100%"} alignContent="center">
              <HStack spacing={"10px"} w={"100%"}>
                <Box alignSelf={"flex-start"} pl={3}>
                  <Avatar size="md" src={profiles.avatar} />{" "}
                </Box>
                <VStack pr={12} align={"start"} w={"100%"} maxW={"150px"}>
                  <Text fontSize={"md"} noOfLines={1}>
                    {profiles.username}
                  </Text>
                  <Text fontSize={"xs"} noOfLines={1} opacity=".3">
                    {profiles.name}
                  </Text>
                </VStack>
                <Box>
                  <Button colorScheme="blue" h={"30px"} alignSelf={"flex-end"}>
                    Follow
                  </Button>
                </Box>
              </HStack>
              <Divider pt={5} />
            </Box>
          );
        })}
      </Hide>
    </VStack>
  );
}

export default FeedRN;
