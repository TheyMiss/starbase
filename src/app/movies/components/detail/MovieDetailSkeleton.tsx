"use client";

import { Card, CardContent } from "@/app/components/ui/card";
import { Skeleton } from "@/app/components/ui/skeleton";

export function MovieDetailSkeleton() {
  return (
    <Card className="border-sb-primary border-2 bg-sb-background rounded-xl overflow-hidden shadow-lg">
      <div className="px-6 py-4 mb-4">
        <Skeleton className="h-10 w-1/2 mb-4 bg-sb-muted" />
        <div className="grid grid-cols-2 gap-x-6 gap-y-2">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-6 w-5/6 bg-sb-muted" />
          ))}
        </div>
      </div>
      <CardContent className="p-6 space-y-6 text-sb-light">
        <section>
          <Skeleton className="h-7 w-40 mb-2 bg-sb-muted" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full bg-sb-muted" />
            <Skeleton className="h-4 w-3/4 bg-sb-muted" />
            <Skeleton className="h-4 w-5/6 bg-sb-muted" />
            <Skeleton className="h-4 w-1/2 bg-sb-muted" />
          </div>
        </section>
        <section>
          <Skeleton className="h-7 w-36 mb-2 bg-sb-muted" />
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-9 w-40 rounded-lg bg-sb-muted" />
            ))}
          </div>
        </section>
      </CardContent>
    </Card>
  );
}
