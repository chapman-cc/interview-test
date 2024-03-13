import { Box, Flex, Spacer, Text } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
type FieldProps = {
  label: string;
} & PropsWithChildren;

export default function Field({ label, children }: FieldProps) {
  return (
    <Box px={4} py={2}>
      <Flex justify={"start"}>
        <Text fontSize={18}>
          <Text as="b">{label}</Text>:
        </Text>
        <Box w={6} />
        <Text fontSize={18}>{children}</Text>
      </Flex>
    </Box>
  );
}
