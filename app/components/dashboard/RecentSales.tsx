import prisma from "@/app/lib/db";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@radix-ui/react-avatar";
import { unstable_noStore as noStore } from "next/cache";
async function getData() {
  noStore();
  const data = await prisma.order.findMany({
    select: {
      amount: true,
      createdAt: true,
      id: true,
      User: {
        select: {
          email: true,
          firstName: true,
          profileImage: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 7,
  });

  return data;
}
export default async function RecentSales() {
  const data = await getData();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent sales</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-8">
        {data.map((item) => (
          <div key={item.id} className="flex items-center gap-4">
            <Avatar className="hidden sm:flex h-9 w-9">
              <AvatarFallback>
                {item.User?.firstName.slice(0, 3)}
              </AvatarFallback>
              <AvatarImage
                className="rounded-full"
                alt="Profile image"
                src={item.User?.profileImage}
              />
            </Avatar>
            <div className="grid gap-1">
              <p className="font-medium text-sm">{item.User?.firstName}</p>
              <p className="text-sm text-muted-foreground">
                {item.User?.email}
              </p>
            </div>
            <p className="ml-auto font-medium">
              +${Intl.NumberFormat("en-US").format(item.amount / 100)}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
