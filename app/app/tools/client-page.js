"use client";
import React from "react";

import { useSidebar } from "@/lib/sidebar";
import PageHeader from "@/components/page-header";
import { useAsync } from "react-use";
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
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@chakra-ui/react";
export default function ToolsClientPage() {
  const menu = useSidebar();

  const { loading: isLoading } = useAsync(async () => {
    return Promise.resolve(true);
  });
  return (
    <Stack flex={1} paddingX={4} paddingY={4} spacing={4}>
      <PageHeader
        icon={menu.find(({ id }) => id === "tools").icon}
        title="Tools"
      ></PageHeader>
      <SimpleGrid
        spacing={4}
        templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
      >
        <Card>
          <CardHeader>
            <Heading size="md"> Bing Search</Heading>
          </CardHeader>
          <CardBody>
            <Text>
              View a summary of all your customers over the last month.
            </Text>
          </CardBody>
          <CardFooter>
            <FormControl display="flex" alignItems="center">
              <FormLabel htmlFor="email-bing" mb="0">
                Enable ?
              </FormLabel>
              <Switch id="email-bing" />
            </FormControl>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <Heading size="md"> Google Search</Heading>
          </CardHeader>
          <CardBody>
            <Text>
              View a summary of all your customers over the last month.
            </Text>
          </CardBody>
          <CardFooter>
            <FormControl display="flex" alignItems="center">
              <FormLabel htmlFor="email-google" mb="0">
                Enable ?
              </FormLabel>
              <Switch id="email-google" />
            </FormControl>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <Heading size="md"> Calculator</Heading>
          </CardHeader>
          <CardBody>
            <Text>
              View a summary of all your customers over the last month.
            </Text>
          </CardBody>
          <CardFooter>
            <FormControl display="flex" alignItems="center">
              <FormLabel htmlFor="email-calculator" mb="0">
                Enable
              </FormLabel>
              <Switch id="email-calculator" />
            </FormControl>{" "}
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <Heading size="md"> Wolfram Alpha</Heading>
          </CardHeader>
          <CardBody>
            <Text>
              View a summary of all your customers over the last month.
            </Text>
          </CardBody>
          <CardFooter>
            <FormControl display="flex" alignItems="center">
              <FormLabel htmlFor="email-wolfram" mb="0">
                Enable ?
              </FormLabel>
              <Switch id="email-wolfram" />
            </FormControl>{" "}
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <Heading size="md"> Weather</Heading>
          </CardHeader>
          <CardBody>
            <Text>
              View a summary of all your customers over the last month.
            </Text>
          </CardBody>
          <CardFooter>
            <FormControl display="flex" alignItems="center">
              <FormLabel htmlFor="email-weather" mb="0">
                Enable ?
              </FormLabel>
              <Switch id="email-weather" />
            </FormControl>
          </CardFooter>
        </Card>
      </SimpleGrid>
      {isLoading && (
        <Center flex={1}>
          <Spinner size="sm" />
        </Center>
      )}
    </Stack>
  );
}
