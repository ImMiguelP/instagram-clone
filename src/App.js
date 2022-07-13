import { Box, ChakraProvider, Image, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import "./Pages/CSS/App.css";
import Account from "./Pages/Account";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login";
import { supabase } from "./Pages/SupaBaseClient";
import useUser from "./Pages/Components/useUser";

function App() {
  const [session, setSession] = useState(null);
  const { userData, getProfile, loading } = useUser();

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);

      getProfile();
    });
  }, []);

  if (loading) {
    return (
      <Box
        w={"100vw"}
        h={"100vh"}
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
    <ChakraProvider>
      {!session ? <Login /> : userData !== null ? <HomePage /> : <Account />}
    </ChakraProvider>
  );
}

export default App;
