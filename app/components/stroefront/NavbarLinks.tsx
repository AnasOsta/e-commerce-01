import Link from "next/link";

export const navbarLinks = [
  {
    id: 0,
    name: "Home",
    href: "/",
  },
  {
    id: 1,
    name: "All Products",
    href: "/product/all",
  },
  {
    id: 2,
    name: "Men",
    href: "/product/men",
  },
  {
    id: 3,
    name: "Women",
    href: "/product/women",
  },
];
export default function NavbarLinks() {
  return (
    <div className="hidden md:flex justify-center items-center gap-4 ml-8">
      {navbarLinks.map((link) => (
        <Link key={link.id} href={link.href} className="font-medium">
          {link.name}
        </Link>
      ))}
    </div>
  );
}
