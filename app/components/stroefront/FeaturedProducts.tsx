import prisma from "@/app/lib/db";
import ProductCart, { LoadingProductCard } from "./ProductCart";
import { Suspense } from "react";
import { unstable_noStore as noStore } from "next/cache";
async function getData() {
  noStore();
  const data = await prisma.product.findMany({
    where: {
      status: "published",
      isFeatured: true,
    },
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      images: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 3,
  });

  return data;
}
export default function FeaturedProducts() {
  return (
    <>
      <h2 className="text-2xl font-extrabold tracking-tight">Featured Items</h2>
      <Suspense fallback={<LoadingRows />}>
        <LoadFeaturedProducts />
      </Suspense>
    </>
  );
}

async function LoadFeaturedProducts() {
  const data = await getData();

  return (
    <div className="mt-5 grid sm:grid-cols-2 md:grid-cols-3 gap-5">
      {data.map((product) => (
        <ProductCart key={product.id} item={product} />
      ))}
    </div>
  );
}

function LoadingRows() {
  return (
    <div className="mt-5 grid sm:grid-cols-2 md:grid-cols-3 gap-5">
      <LoadingProductCard />
      <LoadingProductCard />
      <LoadingProductCard />
    </div>
  );
}
