"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export default function NavBar() {
  return (
    <div
      className="py-4 px-6 flex items-center justify-between"
      style={{ backgroundColor: "#5851dd" }}
    >
      <div className="flex items-center">
        <p className="text-lg font-medium text-slate-200">Easy Task</p>
      </div>
    </div>
  );
}
