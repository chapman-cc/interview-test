"use client";

import { Box, Text, Button } from "@chakra-ui/react";
import Field from "./Field";
import { useLocalStorage } from "usehooks-ts";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Profile() {
  const [token, saveToken] = useLocalStorage("TOKEN", null);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const router = useRouter();

  async function fetchUserProfile() {
    try {
      const url = "/api/profile";
      const method = "POST";
      const body = JSON.stringify({ token });
      const res = await fetch(url, { method, body });
      if (!res.ok) {
        throw new Error("Fetch profile error");
      }

      const { name, email } = await res.json();
      setName(name);
      setEmail(email);
    } catch (error) {
      console.error(error);
    }
  }

  const handleLogout = () => {
    saveToken(null);
    router.push("/");
  };

  useEffect(() => {
    if (token === null) {
      router.push("/");
    }
    fetchUserProfile();
  }, []);

  return (
    <Box maxW="sm" borderWidth={1} borderRadius="lg" overflow="hidden" p={4}>
      <Text fontSize="2xl">Profile</Text>
      <Field label="Name">{name}</Field>
      <Field label="Email">{email}</Field>

      <Button
        type="button"
        colorScheme="red"
        variant="outline"
        onClick={handleLogout}
      >
        Logout
      </Button>
    </Box>
  );
}
