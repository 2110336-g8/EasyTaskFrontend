"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

export default function Task() {

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Task one: Give me lunch</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="description">Description</Label>
            <CardDescription className="break-all">
              The task is all about I dont have time to wait for lunch. I hire
              you to wait in line for me and get me food. Thanks!
            </CardDescription>
          </div>
          <div className="space-y-1">
            <Label htmlFor="duration">Duration</Label>
            <CardDescription className="break-all">
              13 June 2024 - 14 July 2024
            </CardDescription>
          </div>
          <div className="space-y-1">
            <Label htmlFor="duration">Wages</Label>
            <CardDescription className="break-all">20000 Baht</CardDescription>
          </div>
          <div className="space-y-1">
            <Label htmlFor="duration">Workers needed</Label>
            <CardDescription className="break-all">3 Person(s)</CardDescription>
          </div>
          <div className="space-y-1">
            <Label htmlFor="duration">Customer</Label>
            <CardDescription className="break-all">Sunny J</CardDescription>
          </div>
        </CardContent>
        { /* tbd */}
        <CardFooter className="flex justify-center">
          <Button>
            See who apply for your task
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
