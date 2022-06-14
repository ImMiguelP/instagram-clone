import { useState, useEffect } from "react";
import {
  Image,
  Button,
  VStack,
  Text,
  HStack,
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
} from "@chakra-ui/react";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { supabase } from "../SupaBaseClient";
import useUser from "../Components/useUser";
import { Link } from "react-router-dom";

function ProfileRn() {
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
    <VStack spacing={"40px"} color={"white"} pt={8}>
      <Button
        height={"50px"}
        width={"200px"}
        leftIcon={<AiOutlinePlusSquare fontSize={"1.5em"} />}
        colorScheme="gray"
        variant="outline"
        className="Button"
        onClick={onOpen}
      >
        <Text color="white">New Post</Text>
      </Button>
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

      <div>
        <VStack pr={12} align={"start"} spacing={10} pt={15}>
          <Text>Archive</Text>
          <Text>Insight</Text>
          <Text>Your Activity</Text>
          <Text>QR Code</Text>
          <Link to="/savedposts">Saved</Link>
          <Text>Close Friends</Text>
          <Text>Discover People</Text>
        </VStack>

        <Divider pt={5} />
      </div>
    </VStack>
  );
}

export default ProfileRn;
