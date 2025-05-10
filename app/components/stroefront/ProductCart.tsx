import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";

interface iAppProps {
  item: {
    id: string;
    name: string;
    description: string;
    price: number;
    images: string[];
  };
}
export default function ProductCart({ item }: iAppProps) {
  return (
    <div className="rounded-lg">
      <Carousel className="w-full mx-auto select-none">
        <CardContent className="p-0">
          {item.images.map((image, index) => (
            <CarouselItem className="p-0" key={index}>
              <div className="relative h-[330px]">
                <Image
                  src={image}
                  alt="Product image"
                  fill
                  className="object-cover object-center w-full h-full rounded-lg"
                />
              </div>
            </CarouselItem>
          ))}
        </CardContent>
        {item.images.length > 1 && (
          <>
            <CarouselPrevious className="ml-16" />
            <CarouselNext className="mr-16" />
          </>
        )}
      </Carousel>
      <div className="flex justify-between items-center mt-2">
        <h1 className="font-semibold text-xl">{item.name}</h1>
        <h3 className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/10">
          ${item.price}
        </h3>
      </div>
      <p className="text-gray-600 text-sm mt-2 line-clamp-2">
        {item.description}
      </p>
      <Button asChild className="w-full mt-5">
        <Link href={`/product/${item.id}`}>Learn More!</Link>
      </Button>
    </div>
  );
}

export function LoadingProductCard() {
  return (
    <div className="flex flex-col">
      <Skeleton className="w-full h-[330px]" />
      <div className="flex flex-col mt-2 gap-y-2">
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-full h-6" />
      </div>
      <Skeleton className="w-full h-10 mt-5" />
    </div>
  );
}
