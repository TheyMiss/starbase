"use client";

import { Card, CardContent, CardHeader } from "@/app/components/ui/card";
import { Skeleton } from "@/app/components/ui/skeleton";

export function CharacterDetailSkeleton() {
  return (
    <div className="max-w-lg mx-auto space-y-8">
      <Card className="border-sb-primary border-2 bg-sb-background overflow-hidden rounded-xl shadow-lg">
        <div className="relative w-full h-72">
          <Skeleton className="absolute inset-0 w-full h-full bg-sb-muted" />
        </div>
        <CardContent className="p-6 space-y-6">
          <CardHeader className="p-0">
            <Skeleton className="h-9 w-1/2 mb-2 bg-sb-muted" />
            <Skeleton className="h-5 w-1/3 bg-sb-muted" />
          </CardHeader>
          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-6 w-full bg-sb-muted" />
            ))}
            <Skeleton className="col-span-2 h-6 w-3/4 bg-sb-muted" />
          </div>
          <div className="mt-4">
            <Skeleton className="h-7 w-28 mb-2 bg-sb-muted" />
            {[...Array(2)].map((_, i) => (
              <Skeleton key={i} className="h-5 w-3/5 bg-sb-muted mb-2" />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
