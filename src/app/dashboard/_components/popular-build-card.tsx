import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPopularBuild } from "@/lib/builds";
import { formatPrice } from "@/lib/utils";
import { Eye, ThumbsUp } from "lucide-react";
import Link from "next/link";

export const PopularBuildCard = async () => {
  const builds = await getPopularBuild();

  if (builds.length === 0) {
    return (
      <Card className="w-full shrink-0">
        <CardHeader>
          <CardTitle>Popular builds</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            There are no popular builds yet
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full shrink-0">
      <CardHeader>
        <CardTitle>Popular builds</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {builds.map((build) => (
          <div
            key={build.id}
            className="flex flex-col gap-1 rounded-lg border bg-muted/30 px-3 py-2"
          >
            <div className="flex items-center justify-between gap-2">
              <p className="font-medium text-sm leading-tight min-w-0">
                {build.name}
              </p>
              <Button
                variant="ghost"
                size="icon"
                className="size-8 shrink-0"
                asChild
              >
                <Link href={`/builds/${build.id}/edit`}>
                  <Eye className="size-4" />
                </Link>
              </Button>
            </div>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span className="tabular-nums">
                {formatPrice(build.totalPrice)}
              </span>
              <span className="flex items-center gap-1">
                <ThumbsUp className="size-4" />
                {build._count.likes}
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
