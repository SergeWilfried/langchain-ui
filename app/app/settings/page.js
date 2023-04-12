import { Inter } from "next/font/google";
import SettingsClientPage from "./client-page";

const inter = Inter({ subsets: ["latin"] });

export default function SettingsPage() {
  return <SettingsClientPage />;
}
