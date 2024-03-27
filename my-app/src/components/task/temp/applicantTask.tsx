"use client";

import { Button } from "@/components/ui/button";
import { CalendarIcon } from "@radix-ui/react-icons"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  Avatar, 
  AvatarFallback, 
  AvatarImage 
} from "@radix-ui/react-avatar";

export default function ApplicantTask() {
    const tasks = [
        { id: 80001, name: 'Mina', description: 'Profession in Motorcycling', date: 'Jun 10, 2024'},
        { id: 80002, name: 'Nina', description: 'Profession in waiting and very patient', date: 'Jun 10, 2024' },
        { id: 80003, name: 'Jinna', description: 'The React Framework - created and maintained by @vercel', date: 'Jun 10, 2024' },
    ];

    return (
        <div className="flex justify-center items-center min-h-screen">
            <Card className="w-[400px]">
                <CardHeader>
                    <CardTitle className="text-center">Task one : Give me lunch</CardTitle>
                    <div className="text-center">
                        <CardDescription className="break-all">
                            Applicants for this task
                        </CardDescription>
                    </div>
                </CardHeader>
                <div className="relative">
                    <CardContent className="space-y-4">
                        {tasks.map((task) => (
                            <div key={task.id} className="flex space-x-4 mb-2 items-center">
                                <div className="flex justify-center items-center w-10 h-10">
                                    <Avatar style={{ width: '40px', height: '40px' }}>
                                        <AvatarImage src="https://github.com/vercel.png" />
                                        <AvatarFallback>VC</AvatarFallback>
                                    </Avatar>
                                </div>
                                <div className="space-y-1" style={{ flex: '1' }}>
                                    <h4 className="text-sm font-semibold">{task.name}</h4>
                                    <p className="text-sm">
                                        {task.description}
                                    </p>
                                    <div className="flex items-center pt-2">
                                        <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
                                        <span className="text-xs text-muted-foreground">
                                            Requested on {task.date}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-between space-y-1">
                                    <Button variant="outline" className="text-xs py-1">Accept</Button>
                                    <Button variant="destructive" className="text-xs py-1">Reject</Button>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </div>
            </Card>
        </div>
    );
}