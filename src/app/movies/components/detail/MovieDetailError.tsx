"use client";

import { Card, CardContent } from "@/app/components/ui/card";

export const MovieDetailError = () => {
  return (
    <div className="max-w-2xl mx-auto py-10">
      <Card>
        <article>
          <CardContent className="py-8">
            <div className="text-red-500">
              Movie not found or failed to load.
            </div>
          </CardContent>
        </article>
      </Card>
    </div>
  );
};
