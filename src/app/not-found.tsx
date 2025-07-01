"use client";

import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Ghost } from "lucide-react";
import { cn } from "@/app/lib/utils";

export default function NotFound() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-sb-background z-50">
      <Card className="w-full max-w-md border-sb-primary bg-sb-background shadow-2xl rounded-2xl py-10">
        <CardHeader className="flex flex-col items-center">
          <Ghost className="w-12 h-12 text-sb-accent mb-2" />
          <CardTitle className="text-4xl font-bold text-sb-accent text-center mb-1">
            404
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4 text-center">
          <p className="text-lg text-sb-light">
            Oops! That page could not be found.
          </p>
          <p className="text-base text-sb-muted-foreground">
            The Force isn&apos;t with this URL. Try exploring from the home
            page.
          </p>
          <Button asChild className={cn("mt-4")} variant="navLink">
            <Link href="/">Go Home</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
