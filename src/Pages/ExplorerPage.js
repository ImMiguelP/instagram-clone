import React, { useState } from "react";
import { VStack, Input } from "@chakra-ui/react";

import "./CSS/modules.css";
import { faker } from "@faker-js/faker";
import ExplorerPosts from "./Components/ExplorerPosts";

export const USERS = [];

export function createRandomUser() {
  return {
    userId: faker.datatype.uuid(),
    username: faker.internet.userName(),
    avatar: faker.image.avatar(),
    postDate: faker.date.past(),
    fakepost: faker.image.abstract("", "", true),
  };
}
Array.from({ length: 25 }).forEach(() => {
  USERS.push(createRandomUser());
});

function ExplorerPage() {
  const [text, setText] = React.useState("");
  const posts = USERS;

  return (
    <VStack w="100%" align="center">
      <Input
        border="1px solid red"
        mt={5}
        maxW="50%"
        value={text}
        color={"white"}
        onChange={(event) => setText(event.currentTarget.value)}
      />

      <div
        style={{
          display: "flex",
          flexFlow: "row wrap",
        }}
      >
        {posts.map((photo) => {
          return (
            <ExplorerPosts
              key={photo.userId}
              user={photo.username}
              img={photo.fakepost}
              avatar={photo.avatar}
            />
          );
        })}
      </div>
    </VStack>
  );
}
export default ExplorerPage;
