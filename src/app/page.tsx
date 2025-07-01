"use client";

import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-sb-background z-0">
      <Card className="w-full max-w-xl border-sb-primary bg-sb-background shadow-2xl rounded-2xl py-10">
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-sb-accent text-center">
            Starbase
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4 text-center">
          <p className="text-lg text-sb-light">
            Welcome to{" "}
            <span className="text-sb-accent font-semibold">Starbase</span>!
            <br />
            Explore the galaxy far, far away with a beautiful Star Wars
            encyclopedia.
          </p>
          <p className="text-base text-sb-light">
            <span className="text-sb-accent font-medium">
              Browse movies and characters
            </span>
            , read iconic opening crawls, discover character details, and
            explore connections between films—all with a modern interface.
          </p>
          <Button asChild className="mt-4 gap-2" variant="navLink">
            <Link href="/movies">
              Explore Movies
              <ArrowRight className="ml-2 size-5 text-sb-accent" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
