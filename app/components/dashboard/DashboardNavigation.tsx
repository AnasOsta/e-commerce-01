"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    title: "Dashboard",
    href: "/dashboard",
  },
  {
    title: "Orders",
    href: "/dashboard/orders",
  },
  {
    title: "Products",
    href: "/dashboard/products",
  },
  {
    title: "Banner Picture",
    href: "/dashboard/banner",
  },
];

export default function DashboardNavigation() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            link.href === pathname
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {link.title}
        </Link>
      ))}
    </>
  );
}
