import React from "react";
import { Avatar, Box, Text } from "@chakra-ui/react";
import "../CSS/modules.css";

function Story({ img, username }) {
  return (
    <div>
      <Avatar
        className="outline"
        p={"2.5px"}
        bg={"#1B1B1B"}
        size="md"
        src={img}
      />
      <Text pt={2} fontSize={"xs"} noOfLines={1}>
        {username}
      </Text>
    </div>
  );
}

export default Story;
