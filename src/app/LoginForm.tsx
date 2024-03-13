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
  FormHelperText,
} from "@chakra-ui/react";
import { error } from "console";
import { Formik, FormikConfig } from "formik";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";

type LoginForm = {
  username: string;
  password: string;
};

export default function LoginForm() {
  const [token, saveToken] = useLocalStorage("TOKEN", null);
  const router = useRouter();

  const handleSubmit: FormikConfig<LoginForm>["onSubmit"] = async (
    values,
    { setErrors }
  ) => {
    const url = "http://localhost:3000/api/login";
    const method = "POST";
    const body = JSON.stringify(values);
    const res = await fetch(url, { method, body });
    if (res.ok) {
      const { token } = await res.json();
      saveToken(token);
      router.push("/profile");
    } else {
      setErrors({ username: "Incorrect", password: "Incorrect" });
    }
  };

  useEffect(() => {
    if (token) {
      router.push("/profile");
    }
  }, []);
  return (
    <Formik<LoginForm>
      initialValues={{ username: "", password: "" }}
      onSubmit={handleSubmit}
    >
      {({
        values,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        isValid,
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
                <FormControl
                  isRequired
                  isInvalid={errors.username !== undefined}
                >
                  <Flex align="center">
                    <FormLabel htmlFor="username">UserName:</FormLabel>
                    <Input
                      id="username"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.username}
                    />
                  </Flex>
                  <FormHelperText>{errors.username}</FormHelperText>
                </FormControl>
                <FormControl
                  isRequired
                  isInvalid={errors.password !== undefined}
                >
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
                  <FormHelperText>{errors.password}</FormHelperText>
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
