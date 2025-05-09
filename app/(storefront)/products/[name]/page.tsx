import ProductCart from "@/app/components/stroefront/ProductCart";
import prisma from "@/app/lib/db";
import { notFound } from "next/navigation";

async function getData(productCategory: string) {
  switch (productCategory) {
    case "all": {
      const data = await prisma.product.findMany({
        select: {
          name: true,
          images: true,
          price: true,
          id: true,
          description: true,
        },
        where: {
          status: "published",
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      return {
        title: "All Products",
        data: data,
      };
    }
    case "men": {
      const data = await prisma.product.findMany({
        select: {
          name: true,
          images: true,
          price: true,
          id: true,
          description: true,
        },
        where: {
          category: "men",
          status: "published",
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      return {
        title: "Products For Men",
        data: data,
      };
    }
    case "women": {
      const data = await prisma.product.findMany({
        select: {
          name: true,
          images: true,
          price: true,
          id: true,
          description: true,
        },
        where: {
          category: "women",
          status: "published",
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      return {
        title: "Products For Women",
        data: data,
      };
    }
    case "kids": {
      const data = await prisma.product.findMany({
        select: {
          name: true,
          images: true,
          price: true,
          id: true,
          description: true,
        },
        where: {
          category: "kids",
          status: "published",
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      return {
        title: "Products For Kids",
        data: data,
      };
    }
    default: {
      return notFound();
    }
  }
}
export default async function CategoryPage({
  params,
}: {
  params: { name: string };
}) {
  const { name } = await params;
  const { data, title } = await getData(name);
  return (
    <section>
      <h1 className="font-semibold text-3xl my-5">{title}</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {data.map((product) => (
          <ProductCart key={product.id} item={product} />
        ))}
      </div>
    </section>
  );
}
