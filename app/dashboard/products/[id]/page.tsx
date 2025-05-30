import EditForm from "@/app/components/products/EditForm";
import prisma from "@/app/lib/db";
import { notFound } from "next/navigation";
import React from "react";
import { unstable_noStore as noStore } from "next/cache";
async function getData(id: string) {
  noStore();
  const data = await prisma.product.findUnique({
    where: {
      id: id,
    },
  });
  if (!data) {
    return notFound();
  }
  return data;
}

export default async function EditRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getData(id);

  return <EditForm data={data} />;
}
