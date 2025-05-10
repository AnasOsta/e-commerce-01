import prisma from "@/app/lib/db";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import React from "react";
import { unstable_noStore as noStore } from "next/cache";
async function getData() {
  noStore();
  const data = await prisma.banner.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return data;
}

export default async function Hero() {
  const data = await getData();
  return (
    <Carousel>
      <CarouselContent className="select-none">
        {data.map((banner) => (
          <CarouselItem key={banner.id}>
            <div className="relative h-[60vh] lg:h-[80vh]">
              <Image
                priority
                src={banner.imageString}
                alt="Banner image"
                fill
                className="object-cover object-bottom w-full h-full rounded-xl"
              />
              <div
                className="absolute top-6 left-6 bg-opacity-75 bg-black text-white p-6 
              rounded-xl shadow-lg  transition-transform hover:scale-105"
              >
                <h1 className="text-xl lg:text-4xl font-bold">
                  {banner.title}
                </h1>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {data.length > 1 && (
        <>
          <CarouselPrevious className="ml-16" />
          <CarouselNext className="mr-16" />
        </>
      )}
    </Carousel>
  );
}
