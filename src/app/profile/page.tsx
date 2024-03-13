"use client";

import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import Field from "./Field";
import { useLocalStorage } from "usehooks-ts";
import { useEffect, useState } from "react";

export default function Profile() {
  const [token] = useLocalStorage("TOKEN", null);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  async function fetchUserProfile() {
    const url = "/api/profile";
    const method = "POST";
    const body = JSON.stringify({ token });
    const res = await fetch(url, { method, body });
    const { name, email } = await res.json();
    setName(name);
    setEmail(email);
  }

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <Box maxW="sm" borderWidth={1} borderRadius="lg" overflow="hidden" p={4}>
      <Text fontSize="2xl">Profile</Text>
      <Field label="Name">{name}</Field>
      <Field label="Email">{email}</Field>
    </Box>
  );
}
