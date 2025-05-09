import prisma from "@/app/lib/db";
import ProductCart from "./ProductCart";

async function getData() {
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
export default async function FeaturedProducts() {
  const data = await getData();
  return (
    <>
      <h2 className="text-2xl font-extrabold tracking-tight">Featured Items</h2>
      <div className="mt-5 grid sm:grid-cols-2 md:grid-cols-3 gap-5">
        {data.map((product) => (
          <ProductCart key={product.id} item={product} />
        ))}
      </div>
    </>
  );
}
