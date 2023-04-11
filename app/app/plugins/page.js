import { Inter } from "next/font/google";
import PluginsClientPage from "./client-page";

const inter = Inter({ subsets: ["latin"] });

export default function PluginsPage() {
  return <PluginsClientPage />;
}
