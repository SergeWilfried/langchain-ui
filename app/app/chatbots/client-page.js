"use client";
import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Button,
  Center,
  Container,
  FormControl,
  HStack,
  Icon,
  Switch,
  Input,
  Select,
  Badge,
  CardFooter,
  Spinner,
  Stack,
  Card,
  FormLabel,
  SimpleGrid,
  CardBody,
  Tbody,
  CardHeader,
  Text,
  Avatar,
  Box,
  Flex,
  ArrowForwardIcon,
  Tr,
  Td,
  useColorModeValue,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { bots } from "../utils";
import { TbPlus, TbTrashX } from "react-icons/tb";
import { useAsync } from "react-use";
import { useForm } from "react-hook-form";
import PageHeader from "@/components/page-header";
import { useSidebar } from "@/lib/sidebar";
import {
  createChatbot,
  getChatbots,
  getPrompTemplates,
  removeChatbotById,
} from "@/lib/api";

export default function ChatbotsClientPage() {
  const [showForm, setShowForm] = useState();
  const [chatbots, setChatbots] = useState([]);
  const [promptTemplates, setPromptTemplates] = useState([]);
  const buttonColorScheme = useColorModeValue("blackAlpha", "whiteAlpha");
  const buttonBackgroundColor = useColorModeValue("black", "white");
  const borderBottomColor = useColorModeValue("gray.50", "#333");
  const router = useRouter();
  const menu = useSidebar();

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm();

  const { loading: isLoading } = useAsync(async () => {
    const [{ data: chatbots }, { data: promptTemplates }] = await Promise.all([
      getChatbots(),
      getPrompTemplates(),
    ]);

    setChatbots(chatbots);
    setPromptTemplates(promptTemplates);

    return;
  }, [getChatbots, getPrompTemplates, setChatbots]);

  const toolsTemplates = [
    { id: 0, name: "None", enabled: true },
    { id: 1, name: "Bing Search", enabled: false },
    { id: 2, name: "Google Search", enabled: true },
  ].filter(({ enabled }) => enabled === true);

  const datasourceTemplates = [
    { id: 0, name: "None", enabled: true },
    { id: 1, name: "Excel Sheet", enabled: true },
    { id: 2, name: "PDF File", enabled: true },
    { id: 2, name: "SQL", enabled: false },
    { id: 2, name: "Google Drive", enabled: true },
  ].filter(({ enabled }) => enabled === true);

  const handleRemoveChatbot = useCallback(async (chatbotId) => {
    await removeChatbotById(chatbotId);

    setChatbots((prev) => prev.filter(({ id }) => id !== chatbotId));
  }, []);

  const onSubmit = useCallback(
    async (values) => {
      const { name, promptTemplateId } = values;
      const { data: chatbot } = await createChatbot({
        name,
        promptTemplateId: parseInt(promptTemplateId),
      });

      router.push(`/app/chatbots/${chatbot.id}`);
    },
    [router]
  );

  return (
    <Stack flex={1} paddingX={4} paddingY={4} spacing={4}>
      <PageHeader
        icon={menu.find(({ id }) => id === "chatbots").icon}
        title="Chatbots"
      >
        <HStack>
          <Button
            leftIcon={<Icon as={TbPlus} />}
            colorScheme={buttonColorScheme}
            backgroundColor={buttonBackgroundColor}
            size="sm"
            onClick={() => setShowForm(true)}
            isLoading={isSubmitting}
            loadingText="Creating..."
          >
            New chatbot
          </Button>
        </HStack>
      </PageHeader>
      {isLoading && (
        <Center flex={1}>
          <Spinner size="sm" />
        </Center>
      )}
      {!isLoading && !showForm && (
        <SimpleGrid
          spacing={4}
          templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
        >
          {bots.map(({ id, name, description, link, access }) => (
            <Card>
              <CardHeader>
                <Flex>
                  <Avatar src="https://bit.ly/sage-adebayo" />
                  <Box ml="3">
                    <Text fontWeight="bold">{name}</Text>
                    {/* display red badge if access is paid */}
                    {access === "premium" && (
                      <Badge ml="1" colorScheme="red">
                        {access}
                      </Badge>
                    )}
                    {access === "free" && (
                      <Badge ml="1" colorScheme="green">
                        {access}
                      </Badge>
                    )}
                  </Box>
                </Flex>
              </CardHeader>
              <CardBody>
                <Text fontSize="sm">{description}</Text>
              </CardBody>
              <CardFooter>
                <NextLink href={`/app/chatbots/${id}`} passHref>
                  <Button variant="outline">Configure</Button>
                </NextLink>
              </CardFooter>
            </Card>
          ))}
        </SimpleGrid>
      )}
      {showForm && (
        <Center flex={1}>
          <Container maxWidth="md" as="form" onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={6}>
              <Stack spacing={1}>
                <Icon
                  fontSize="2xl"
                  as={menu.find(({ id }) => id === "chatbots").icon}
                />
                <Text>New chatbot</Text>
                <Text fontSize="sm" color="gray.500">
                  Create a new chatbot
                </Text>
              </Stack>
              <Stack spacing={3}>
                <FormControl isInvalid={errors?.name}>
                  <Input
                    size="sm"
                    placeholder="My chatbot..."
                    {...register("name", { required: true })}
                  />
                </FormControl>
                <FormControl>
                  <Select
                    size="sm"
                    {...register("promptTemplateId")}
                    placeholder="Select prompt template"
                  >
                    {promptTemplates.map(({ id, name }) => (
                      <option key={id} value={id}>
                        {name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl>
                  <Select
                    size="sm"
                    {...register("toolId")}
                    placeholder="Add tools"
                  >
                    {toolsTemplates.map(({ id, name }) => (
                      <option key={id} value={id}>
                        {name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl>
                  <Select
                    size="sm"
                    {...register("datasourceId")}
                    placeholder="Add a datasource"
                  >
                    {datasourceTemplates.map(({ id, name }) => (
                      <option key={id} value={id}>
                        {name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </Stack>
              <HStack justifyContent="flex-end">
                <Button variant="ghost" size="sm" onClick={() => setShowForm()}>
                  Cancel
                </Button>
                <Button
                  colorScheme={buttonColorScheme}
                  backgroundColor={buttonBackgroundColor}
                  type="sumbit"
                  size="sm"
                  isLoading={isSubmitting}
                >
                  Save
                </Button>
              </HStack>
            </Stack>
          </Container>
        </Center>
      )}
    </Stack>
  );
}
