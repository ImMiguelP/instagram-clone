import React, { useState } from "react";
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
} from "@chakra-ui/react";

import "./CSS/modules.css";
import ReelsModal from "./Modals/ReelsModal";

const Reels = () => {
  const url =
    "https://api.unsplash.com/search/photos/?client_id=QoytrgX2D6sku9NSHup_lZKyDatZ_0gBzpI_tlPVjL8&query=";
  const [text, setText] = React.useState("");
  const [photos, setPhotos] = React.useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  var $ = document.getElementById;

  const fetchPhotos = async () => {
    if (text.length === 0) {
      return;
    }
    const response = await fetch(url + text);
    const data = await response.json();
    setPhotos(data.results);
  };

  return (
    <div>
      <VStack w="100%" align="center">
        <Input
          mt={5}
          maxW="100%"
          value={text}
          color={"white"}
          onChange={(event) => setText(event.currentTarget.value)}
        />
        <Button onClick={fetchPhotos}>Search</Button>
        <div
          style={{
            display: "flex",
            flexFlow: "row wrap",
          }}
        >
          {photos?.map((photo) => {
            return (
              <Box
                h={"20em"}
                maxH={"20em"}
                w={"20em"}
                maxW={"20em"}
                ml={10}
                mr={5}
                mb={5}
                mt={5}
              >
                <a onClick={onOpen}>
                  <Image
                    src={photo.urls.thumb}
                    alt="pht"
                    objectFit={"cover"}
                    height={"100%"}
                    w={"100%"}
                    borderRadius={"xl"}
                  />
                </a>
              </Box>
            );
          })}
        </div>
      </VStack>

      {/*Modal */}
      <Modal onClose={onClose} size={"full"} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent style={{ background: "rgba(27, 27, 27, 0.3)" }}>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ReelsModal />
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Reels;
