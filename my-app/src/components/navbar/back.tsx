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


export default function NavigationMenuDemo() {
    return (
        <div className="bg-purple-600 text-white py-4 px-6 flex items-center justify-between" style={{ backgroundColor: "#5851dd" }}>
            {/* Logo */}
            <div className="flex items-center">
                {/* <img src="/easytask-logo.png" alt="EasyTask Logo" className="h-8 mr-2" /> */}
                <a className="text-lg font-medium text-white">EasyTask</a>
            </div>
            
            {/* Navigation Menu */}
            <NavigationMenu>
                <NavigationMenuList>
                    {/* Inbox */}
                    <NavigationMenuItem>
                        <Link href="/inbox" passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                Inbox
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    
                    {/* Your Jobs */}
                    <NavigationMenuItem>
                        <Link href="/your-jobs" passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                Your Jobs
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    
                    {/* Your Ads */}
                    <NavigationMenuItem>
                        <Link href="/your-ads" passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                Your Ads
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    
                    {/* Account */}
                    <NavigationMenuItem>
                        <Link href="/account" passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                Account
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";