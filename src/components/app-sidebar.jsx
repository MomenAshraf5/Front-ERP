"use client";

import * as React from "react";

import { NavMain } from "../components/nav-main";

import { NavUser } from "../components/nav-user";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "./ui/sidebar";

import {
  LayoutDashboard,
  ListTodo,
  UserCheck,
  DoorOpen,
  ClockPlus,
  Wallet,
  Handshake,
} from "lucide-react";
import { GalleryVerticalEnd } from "lucide-react";
import { AudioWaveform } from "lucide-react";
import { Command } from "lucide-react";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: LayoutDashboard,
    },
    {
      title: "Tasks",
      url: "#",
      icon: ListTodo,
    },
    {
      title: "Attendance",
      url: "#",
      icon: UserCheck,
    },
    {
      title: "Leave",
      url: "#",
      icon: DoorOpen,
    },
    {
      title: "Overtime",
      url: "#",
      icon: ClockPlus,
    },
    {
      title: "Salary",
      url: "#",
      icon: Wallet,
    },
    {
      title: "Coaching",
      url: "#",
      icon: Handshake,
    },
  ],
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <img
        src="./logo.png"
        alt="Logo"
        className="px-12 
      pt-6"
      />
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
