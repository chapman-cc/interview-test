import LoginForm from "./LoginForm";
import { Center } from "@chakra-ui/react";
export default function Home() {
  return (
    <main>
      <h1>Welcome to the Connexin Demo App!</h1>
      <Center h={"100vh"} bg={"#ec1c24"}>
        <LoginForm />
      </Center>
    </main>
  );
}
