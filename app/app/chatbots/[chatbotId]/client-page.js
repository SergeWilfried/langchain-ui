"use client";
import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Center,
  GridItem,
  SimpleGrid,
  Spinner,
  Stack,
  StackDivider,
  Text,
  TabPanels,
  Select,
  NumberInput,
  TabPanel,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  NumberInputField,
  TabList,
  Tab,
  Tabs,
  Checkbox,
} from "@chakra-ui/react";
import { useAsync } from "react-use";
import { getChatbotById } from "@/lib/api";
import Chat from "@/components/chat";
import CodeBlock from "@/components/code-block";
import { bots } from "../../utils";
import { API_DOCS } from "@/lib/api-docs";

export default function ChatbotClientPage({ chatbotId }) {
  const [chatbot, setChatbot] = useState();
  const { loading: isLoading } = useAsync(async () => {
    // const { data } = await getChatbotById(chatbotId);
    const data = bots.filter((bot) => {
      return bot.id == chatbotId;
    })[0];
    console.log(data);
    setChatbot(data);
  }, [chatbotId]);

  return (
    <Stack flex={1} spacing={4}>
      {isLoading && (
        <Center flex={1}>
          <Spinner size="sm" />
        </Center>
      )}
      {!isLoading && (
        <SimpleGrid columns={3} flex={1}>
          <GridItem colSpan={2} borderRightWidth={0.5}>
            <Chat id={chatbotId} />
          </GridItem>
          <GridItem>
            <Stack divider={<StackDivider />} spacing={0}>
              <Text paddingY={4} paddingX={6} fontSize="sm" fontWeight={500}>
                {chatbot.name}
              </Text>
              <Stack paddingY={4} paddingX={6}>
                <Stack>
                  <Tabs variant="soft-rounded" colorScheme="green">
                    <TabList>
                      <Tab>Datasources</Tab>
                      <Tab>Tools</Tab>
                      <Tab>Fine Tune</Tab>
                    </TabList>
                    <TabPanels>
                      <TabPanel>
                        <Select placeholder="Select datasources">
                          <option value="Document">Document</option>
                          <option value="Website">Website</option>
                          <option value="Drive">Google Drive</option>
                          <option value="Github">Github</option>
                          <option value="Gitlab">Gitlab</option>
                        </Select>
                      </TabPanel>
                      <TabPanel>
                        <Stack>
                          <Stack spacing={3}>
                            <Checkbox size="md">Bing Search</Checkbox>
                            <Checkbox size="md">Google Search</Checkbox>
                            <Checkbox size="md">Weather</Checkbox>
                            <Checkbox size="md">Calculator</Checkbox>
                            <Checkbox size="md">Wolfram Alpha</Checkbox>
                          </Stack>
                          <Checkbox size="md">JSON</Checkbox>
                          <Checkbox size="md">Python</Checkbox>
                          <Checkbox size="md">SQL</Checkbox>
                        </Stack>
                      </TabPanel>
                      <TabPanel>
                        <Select placeholder="Select models">
                          <option value="gpt4">GPT4</option>
                          <option value="gpt3">GPT 3.5 Turbo</option>
                          <option value="gpt">GPT</option>
                          <option value="davinci">Text-Davinci-003</option>
                        </Select>
                        <Text>Temperature</Text>
                        <NumberInput defaultValue={0} precision={2} step={0.2}>
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      </TabPanel>
                    </TabPanels>
                  </Tabs>
                </Stack>

                <Stack>
                  <Text fontSize="sm" fontWeight={500} color="gray.500">
                    API
                  </Text>
                  <Text fontSize="sm">
                    Interact with your chatbot using the following API call
                  </Text>
                  <CodeBlock items={API_DOCS} />
                </Stack>
              </Stack>
            </Stack>
          </GridItem>
        </SimpleGrid>
      )}
    </Stack>
  );
}

ChatbotClientPage.propTypes = {
  chatbotId: PropTypes.string,
};
