"use client";
import Link from "next/link";
import Image from "next/image";
import { Fragment, useState } from "react";
import { usePathname } from "next/navigation";
import { Input } from "./ui/input";
import { MenuButton } from "./menuButton";
import { Button } from "./ui/button";
const navigation = [
  { name: "Community", href: "/signup" },
  { name: "Careers", href: "/careers" },
  // Add more pages as needed
];
import { Search } from "lucide-react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar({
  user,
  gasFee,
}: {
  user: any;
  gasFee: string;
}) {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex justify-between items-center flex-row">
      <MenuButton />
      <Link href="/">
        <Button variant="ghost">VPLAY</Button>
      </Link>

      <Input type="search" placeholder=" Search..." />
      <Button variant="ghost">
        <Search />
      </Button>
      <Button variant="default">
        <Link href="/accessvplay">Access Vplay</Link>
      </Button>
    </div>
  );
}
