import { Inter } from "next/font/google";
import ToolsClientPage from "./client-page";

const inter = Inter({ subsets: ["latin"] });

export default function ToolsPage() {
  return <ToolsClientPage />;
}
