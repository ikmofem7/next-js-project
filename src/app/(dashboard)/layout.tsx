import React, { FC, ReactNode, Suspense } from "react";
import GlassPane from "../../components/GlassPane";
import "@/styles/global.css";
import Sidebar from "@/components/SideBar";
import Greetings from "@/components/Greetings";
import GreetingsSkeleton from "@/components/GreetingsSkeleton";
// import { Inter } from "@next/font/google";

// const inter = Inter({
//   variable: "--font-inter",
// });
interface DashboardRootLayoutProps {
  children: ReactNode;
}

const DashboardRootLayout: FC<DashboardRootLayoutProps> = ({ children }) => {
  return (
    <html>
      <head />
      <body className="h-screen w-screen candy-mesh p-6">
        <GlassPane className="w-full h-full flex items-center ">
          <Sidebar />
          {children}
        </GlassPane>
        <div id="modal" />
      </body>
    </html>
  );
};

export default DashboardRootLayout;
