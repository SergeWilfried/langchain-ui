"use client";
import React from "react";
import { Center, Spinner, Stack } from "@chakra-ui/react";
import { useSidebar } from "@/lib/sidebar";
import PageHeader from "@/components/page-header";
import { useTranslations } from "next-intl";

export default function SettingsClientPage() {
  const menu = useSidebar();
  const t = useTranslations("Settings");

  const { loading: isLoading } = useAsync(async () => {
    return Promise.resolve(true);
  });
  return (
    <Stack flex={1} paddingX={4} paddingY={4} spacing={4}>
      <PageHeader
        icon={menu.find(({ id }) => id === "settings").icon}
        title="Settings"
      ></PageHeader>
      {isLoading && (
        <Center flex={1}>
          <Spinner size="sm" />
        </Center>
      )}
    </Stack>
  );
}
