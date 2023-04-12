"use client";
import React from "react";
import {
  Center,
  Spinner,
  Stack,
  Heading,
  SimpleGrid,
  Switch,
  FormControl,
  FormLabel,
  Text,
  Flex,
  Avatar,
  Box,
  Badge,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@chakra-ui/react";
import { useSidebar } from "@/lib/sidebar";
import PageHeader from "@/components/page-header";
import { useAsync } from "react-use";
import { datasources } from "../utils";
export default function DataSourcesClientPage() {
  const menu = useSidebar();

  const { loading: isLoading } = useAsync(async () => {
    return Promise.resolve(true);
  });
  return (
    <Stack flex={1} paddingX={4} paddingY={4} spacing={4}>
      <PageHeader
        icon={menu.find(({ id }) => id === "datasources").icon}
        title="DataSources"
      ></PageHeader>
      <SimpleGrid
        spacing={4}
        templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
      >
        {datasources.map(({ id, name, access, desc }) => (
          <Card>
            <CardHeader>
              <Flex>
                <Avatar src="https://bit.ly/sage-adebayo" />
                <Box ml="3">
                  <Text fontWeight="bold">{name}</Text>
                  <Badge ml="1" colorScheme="green">
                    {access}
                  </Badge>
                </Box>
              </Flex>
            </CardHeader>
            <CardBody>
              <Text>{desc}</Text>
            </CardBody>
            <CardFooter>
              <FormControl display="flex" alignItems="center">
                <FormLabel htmlFor={name} mb="0">
                  Enable ?
                </FormLabel>
                <Switch id={name} />
              </FormControl>
            </CardFooter>
          </Card>
        ))}
      </SimpleGrid>
      {isLoading && (
        <Center flex={1}>
          <Spinner size="sm" />
        </Center>
      )}
    </Stack>
  );
}
