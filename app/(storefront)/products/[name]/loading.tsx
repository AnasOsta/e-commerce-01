import { LoadingProductCard } from "@/app/components/stroefront/ProductCart";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function LoadingFile() {
  return (
    <div>
      <Skeleton className="h-10 w-56 my-5" />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        <LoadingProductCard />
        <LoadingProductCard />
        <LoadingProductCard />
        <LoadingProductCard />
        <LoadingProductCard />
        <LoadingProductCard />
        <LoadingProductCard />
        <LoadingProductCard />
      </div>
    </div>
  );
}
