"use client";

import { Skeleton } from "@/app/components/ui/skeleton";

export function CharacterCardSkeleton() {
  return (
    <div className="border-sb-primary border-2 bg-sb-background rounded-xl overflow-hidden">
      <Skeleton className="w-full h-64 bg-sb-muted" />
      <div className="p-4 space-y-2">
        <Skeleton className="h-6 w-3/4 bg-sb-muted" />
        <Skeleton className="h-10 w-full bg-sb-muted" />
      </div>
    </div>
  );
}
