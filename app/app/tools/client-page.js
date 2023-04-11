"use client";
import React from "react";
import {
  Center,
  Spinner,
  Stack,

} from "@chakra-ui/react";
import { useSidebar } from "@/lib/sidebar";
import PageHeader from "@/components/page-header";

export default function ToolsClientPage() {
    const menu = useSidebar();

    const { loading: isLoading } = useAsync(async () => {
     return Promise.resolve(true)
    })
    return (
        <Stack flex={1} paddingX={4} paddingY={4} spacing={4}>
      <PageHeader
        icon={menu.find(({ id }) => id === "tools").icon}
        title="Tools"
      >
      </PageHeader>
      {isLoading && (
        <Center flex={1}>
          <Spinner size="sm" />
        </Center>
      )}
      </Stack>
    )
}