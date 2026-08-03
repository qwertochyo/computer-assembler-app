import { auth } from "@/lib/auth";
import Link from "next/link";
import { Typography } from "./ui/typography";
import { HeaderNav } from "./header-nav";

export const Header = async () => {
  const session = await auth();

  return (
    <header className="container mx-auto flex items-center p-4">
      <div className="shrink-0">
        <Typography tag="h1" variant="title-lg">
          <Link href={session?.user ? "/dashboard" : "/"}>PC assembler</Link>
        </Typography>
      </div>
      <nav className="min-w-0 flex-1">
        <HeaderNav session={session} />
      </nav>
    </header>
  );
};
