import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import Link from "next/link";

const HomePage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <main className="flex flex-col items-center gap-5 min-h-screen w-full max-w-3xl py-32 px-16">
        <Typography tag="h1" variant="heading-md">
          Create your dream build
        </Typography>
        <Button>
          <Link href="/dashboard">Build</Link>
        </Button>
      </main>
    </div>
  );
};

export default HomePage;
