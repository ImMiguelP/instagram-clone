import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Input,
  Stack,
  Text,
  useToast,
  Image,
  HStack,
  Hide,
} from "@chakra-ui/react";
import { useState } from "react";
import { supabase } from "./SupaBaseClient";
import iglogo from "../Logos/iglogo.png";
import loginpic from "../Logos/loginpic.png";

function Login() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const toast = useToast();

  const handleLogin = async (email) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn(
        { email },
        {
          redirectTo:
            process.env.REACT_APP_VERCEL_URL || "http://localhost:3000/",
        }
      );
      if (error) throw error;
      toast({
        title: "Account Created",
        position: "bottom",
        description: "Check your email for the login link",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        position: "bottom",
        description: error.error_description || error.message,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <Grid bg={"#0E0E10"}>
      <Flex minH={"100vh"} align={"center"} justify={"center"}>
        <HStack spacing={8} mx={"auto"} maxW={"100%"} py={12} px={6}>
          <Hide below="lg">
            <Box w={"350px"} h={"400px"}>
              <Image
                rounded={"xl"}
                w={"100%"}
                h={"100%"}
                src={loginpic}
                objectFit={"cover"}
              />
            </Box>
          </Hide>
          <Box
            bg={"#1B1B1B "}
            color="white"
            rounded={"lg"}
            boxShadow={"lg"}
            p={8}
            h={"400px"}
            w={"350px"}
          >
            <Stack align={"center"}>
              <Image src={iglogo} maxW={"150px"} />
            </Stack>

            <Stack pt={5} spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                />
                <Text opacity={"0.5"} fontSize={"xs"} pt={3}>
                  Sign in to Instagram via magic link with your email above
                </Text>
              </FormControl>
              <Stack pt={5}>
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    handleLogin(email);
                  }}
                  isLoading={loading}
                  loadingText="Signing in ..."
                  colorScheme="teal"
                  variant="outline"
                  spinnerPlacement="start"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  {loading || "Send magic link"}
                </Button>
              </Stack>
            </Stack>
          </Box>
        </HStack>
      </Flex>
    </Grid>
  );
}

export default Login;
