"use client";

import {
  Box,
  Button,
  Input,
  VStack,
  Text,
  FormControl,
  FormLabel,
  Flex,
} from "@chakra-ui/react";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "usehooks-ts";

export default function LoginForm() {
  const [token, saveToken] = useLocalStorage("TOKEN", null);
  const router = useRouter();
  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={(values, {}) => {
        const method = "POST";
        const body = JSON.stringify(values);
        fetch("http://localhost:3000/api/login", { method, body })
          .then((res) => res.json())
          .then(({ token }) => saveToken(token))
          .then(() => router.push("/profile"));
      }}
    >
      {({
        values,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        isValid,
        /* and other goodies */
      }) => (
        <Box
          maxW="max-content"
          borderWidth={1}
          borderRadius="lg"
          overflow="hidden"
          p={3}
        >
          <Text fontSize={"larger"} align={"center"}>
            <Text as="b">Login</Text>
          </Text>

          <Box pt={6}>
            <form onSubmit={handleSubmit}>
              <VStack spacing={6}>
                <FormControl isRequired isInvalid={!isValid}>
                  <Flex align="center">
                    <FormLabel htmlFor="username">UserName:</FormLabel>
                    <Input
                      id="username"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.username}
                    />
                  </Flex>
                </FormControl>
                <FormControl isRequired isInvalid={!isValid}>
                  <Flex align="center">
                    <FormLabel htmlFor="password">Password:</FormLabel>
                    <Input
                      id="password"
                      type="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                    />
                  </Flex>
                </FormControl>
                <Button
                  colorScheme="blue"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Submit
                </Button>
              </VStack>
            </form>
          </Box>
        </Box>
      )}
    </Formik>
  );
}
