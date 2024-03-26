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
import { useState } from "react";

export default function AcceptTask() {

  // Define state 
  const [isAccepted, setAccepted] = useState(false);

  const handleRequest = () => {
    setAccepted(true);
  };

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
        <CardFooter className="flex justify-center">
          <Button onClick={handleRequest} disabled={isAccepted}>
            {!isAccepted ? "Accept this task!" : "You have already accepted this task."} 
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
