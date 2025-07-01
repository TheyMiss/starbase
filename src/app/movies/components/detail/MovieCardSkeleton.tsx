"use client";

import { Skeleton } from "@/app/components/ui/skeleton";

export function MovieCardSkeleton() {
  return (
    <li className="h-full border-sb-primary border-2 bg-sb-background rounded-xl overflow-hidden">
      <Skeleton className="h-64 w-full bg-sb-muted rounded-t-xl" />
      <div className="space-y-3 p-6">
        <Skeleton className="h-6 w-3/4 bg-sb-muted rounded" />
        <Skeleton className="h-4 w-full bg-sb-muted rounded" />
        <Skeleton className="h-4 w-1/2 bg-sb-muted rounded" />
      </div>
    </li>
  );
}
