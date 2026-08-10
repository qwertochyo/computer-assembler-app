import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { formatDate, formatPrice } from "@/lib/utils";
import { Pencil } from "lucide-react";
import Link from "next/link";

interface BuildCard {
  user: { email: string };
  id: string;
  name: string;
  totalPrice: number;
  createdAt: Date | null;
  components: Array<{ id: string; component: { name: string } }>;
}

interface BuildCardProps {
  build: BuildCard;
  children: React.ReactNode;
}

export const BuildCard = ({ build, children }: BuildCardProps) => {
  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-2 flex flex-row items-start justify-between gap-2">
        <div className="min-w-0 flex gap-5 items-center">
          <CardTitle>
            <Typography tag="h3" variant="body-md">
              {build.name}
            </Typography>
          </CardTitle>
          <p className="text-xs text-muted-foreground mt-1">
            Created by {build.user?.email}
          </p>
        </div>
        <div className="shrink-0">
          <Button>
            <Link href={`/builds/${build.id}/edit`}>
              <Pencil className="size-4" />
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-1 pt-0 space-y-1 gap-2">
        {build.components.length > 0 && (
          <div>
            <p className="text-sm font-medium mt-2">Components:</p>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-0.5">
              {build.components.map((buildComponent) => (
                <li key={buildComponent.id}>{buildComponent.component.name}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-row justify-between gap-2 pt-4 border-t">
        <CardDescription className="text-sm font-medium tabular-nums flex flex-col gap-2 justify-between">
          <span className="text-sky-500 text-lg font-bold">
            {formatPrice(build.totalPrice)}
          </span>
          {build.createdAt && (
            <p className="text-xs text-muted-foreground">
              {formatDate(build.createdAt)}
            </p>
          )}
          <div className="flex flex-row gap-2">{children}</div>
        </CardDescription>
      </CardFooter>
    </Card>
  );
};
