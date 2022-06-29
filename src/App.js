import { ChakraProvider } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import "./Pages/CSS/App.css";
import Account from "./Pages/Account";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login";
import { supabase } from "./Pages/SupaBaseClient";
import useUser from "./Pages/Components/useUser";

function App() {
  const [session, setSession] = useState(null);
  const { userData } = useUser();

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <ChakraProvider>
      {!session ? <Login /> : userData !== null ? <HomePage /> : <Account />}
    </ChakraProvider>
  );
}

export default App;
