import React from "react";
import { Box, Stack, Divider } from "@chakra-ui/react";
import Changepass from "./SettingsComponents/ChangePass";
import EmailNotifications from "./SettingsComponents/EmailNotifications";
import Editprofile from "./SettingsComponents/EditProfile";

function SettingsPage(props) {
  return (
    <Stack h={"100%"} justify="center">
      <Box width="100%" align="middle">
        <Divider />
        <Editprofile />
        <Divider />
        <Changepass />
        <Divider />
        <EmailNotifications />
        <Divider />
      </Box>
    </Stack>
  );
}

export default SettingsPage;
