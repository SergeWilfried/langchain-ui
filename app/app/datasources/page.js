import { Inter } from "next/font/google";
import DataSourcesClientPage from "./client-page";

const inter = Inter({ subsets: ["latin"] });

export default function DataSourcesPage() {
  return <DataSourcesClientPage />;
}
