import { Typography } from "@/components/ui/typography";
import { auth } from "@/lib/auth";
import { getPublicBuilds } from "@/lib/builds";
import { BuildCard } from "../_components/build-card";
import { toggleLikeAction } from "../actions";
import { Button } from "@/components/ui/button";
import { ThumbsUp } from "lucide-react";
import { redirect } from "next/navigation";

const ExplorePage = async () => {
  const session = await auth();

  if (!session?.user.id) {
    redirect("/login");
  }

  const builds = await getPublicBuilds(session.user.id);

  return (
    <div className="py-6">
      <Typography tag="h1" variant="title-md">
        Public builds
      </Typography>
      {builds.length > 0 ? (
        <div className="grid gap-4 lg:grid-cols-3">
          {builds.map((build) => {
            const isLiked =
              Array.isArray(build.likes) && build.likes.length > 0;

            return (
              <BuildCard key={build.id} build={build}>
                <div className="flex flex-wrap gap-2">
                  <form action={toggleLikeAction} className="contents">
                    <input type="hidden" name="buildId" value={build.id} />
                    <Button
                      type="submit"
                      variant={isLiked ? "outline" : "secondary"}
                      size="sm"
                    >
                      <ThumbsUp
                        className={`size-4 ${isLiked ? "fill-current" : ""}`}
                      />
                      {build._count.likes}
                    </Button>
                  </form>
                </div>
              </BuildCard>
            );
          })}
        </div>
      ) : (
        <p className="text-muted-foreground">There are no public builds yet</p>
      )}
    </div>
  );
};

export default ExplorePage;
