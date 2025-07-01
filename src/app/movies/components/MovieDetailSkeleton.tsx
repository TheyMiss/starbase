"use client";

import { Card, CardContent } from "@/app/components/ui/card";
import { Skeleton } from "@/app/components/ui/skeleton";

export const MovieDetailSkeleton = () => {
  return (
    <div className="max-w-2xl mx-auto py-10">
      <Card>
        <article>
          <CardContent className="py-8 space-y-4">
            <Skeleton className="h-10 w-1/2" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-6 w-1/3" />
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-4 w-1/4" />
              ))}
            </div>
          </CardContent>
        </article>
      </Card>
    </div>
  );
};
