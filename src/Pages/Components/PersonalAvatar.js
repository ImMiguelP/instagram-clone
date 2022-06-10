import { Avatar, Button, Input } from "@chakra-ui/react";
import useUser from "./useUser";

function PersonalAvatar() {
  const { userData, onSelectFile } = useUser();
  let fileInput;
  return (
    <div>
      {userData.avatarurl ? (
        <Avatar
          size={"2xl"}
          src={userData.avatarurl}
          alt="Avatar"
          mb={4}
          pos={"relative"}
          _after={{
            content: '""',
            w: 4,
            h: 4,
            bg: "green.300",
            border: "2px solid white",
            rounded: "full",
            pos: "absolute",
            bottom: 0,
            right: 3,
          }}
        />
      ) : (
        <Avatar
          size={"2xl"}
          src={userData.avatarurl}
          alt="Avatar"
          mb={4}
          pos={"relative"}
          _after={{
            content: '""',
            w: 4,
            h: 4,
            bg: "green.300",
            border: "2px solid white",
            rounded: "full",
            pos: "absolute",
            bottom: 0,
            right: 3,
          }}
        />
      )}
      <div>
        <Button
          size="sm"
          flex={1}
          mb={4}
          fontSize={"sm"}
          rounded={"full"}
          _focus={{
            bg: "gray.200",
          }}
          onClick={() => fileInput.click()}
        >
          Change Profile Photo
        </Button>
        <Input
          style={{ display: "none" }}
          type="file"
          ref={(refParam) => (fileInput = refParam)}
          onChange={onSelectFile}
        />
      </div>
    </div>
  );
}

export default PersonalAvatar;
