import React from "react";
import {
  Box,
  Button,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Input,
  Avatar,
  Text,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import "../CSS/settings.css";

const Changepass = (props) => {
  const settingFeed = {
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

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  return (
    <div>
      <Box padding={"25px 0px 25px 0px"}>
        <Button
          ref={btnRef}
          colorScheme="none"
          onClick={onOpen}
          h="20"
          width="99%"
        >
          Change Password
        </Button>
        <Drawer
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          finalFocusRef={btnRef}
          size={"xl"}
        >
          <DrawerOverlay />
          <DrawerContent bg={"#1B1B1B"} color={"white"}>
            <DrawerCloseButton />
            <DrawerHeader>
              <Box className="settingsTop">
                <Avatar src={settingFeed.avatarImg} />
                <div className="settingsTopStatus">
                  <Text fontSize="md">{settingFeed.userName}</Text>
                </div>
              </Box>
            </DrawerHeader>

            <DrawerBody>
              {/* old pw*/}
              <FormControl padding={5}>
                <FormLabel htmlFor="oldpw">Old Password</FormLabel>
                <Input id="oldpw" type="oldpw" />
              </FormControl>
              {/* newpw */}
              <FormControl padding={5}>
                <FormLabel htmlFor="newpw">New Password</FormLabel>
                <Input id="newpw" type="newpw" />
              </FormControl>
              {/* confirm pw */}
              <FormControl padding={5}>
                <FormLabel htmlFor="confirmpw">Confirm New Password</FormLabel>
                <Input id="confirmpw" type="confirmpw" />
              </FormControl>
            </DrawerBody>

            <DrawerFooter>
              <Button colorScheme="blue" type="submit" form="my-form">
                Change Password
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Box>
    </div>
  );
};

export default Changepass;
