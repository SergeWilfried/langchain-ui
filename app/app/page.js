import { Inter } from "next/font/google";
import React from "react";
import { Center, Spinner, Stack } from "@chakra-ui/react";
import { useSidebar } from "@/lib/sidebar";
const inter = Inter({ subsets: ["latin"] });
import { useTranslations } from "next-intl";
import PageHeader from "@/components/page-header";

export default function Home() {
  const { loading: isLoading } = useAsync(async () => {
    return Promise.resolve(true);
  });
  const menu = useSidebar();
  const t = useTranslations("Home");

  return (
    <Stack flex={1} paddingX={4} paddingY={4} spacing={4}>
      <PageHeader
        icon={menu.find(({ id }) => id === "home").icon}
        title="Home"
      ></PageHeader>
      {isLoading && (
        <Center flex={1}>
          <Spinner size="sm" />
        </Center>
      )}
    </Stack>
  );
}
