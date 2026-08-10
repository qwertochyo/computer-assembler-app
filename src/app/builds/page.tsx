import { Typography } from "@/components/ui/typography";
import { auth } from "@/lib/auth";
import { getMyBuilds } from "@/lib/builds";
import { redirect } from "next/navigation";
import { BuildCard } from "./_components/build-card";
import { DeleteBuildButton } from "./_components/delete-build-button";
import { deleteBuildAction, setBuildPublicAction } from "./actions";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";

const BuildsPage = async () => {
  const session = await auth();

  if (!session?.user.id) {
    redirect("/login");
  }

  const builds = await getMyBuilds(session.user.id);

  return (
    <div className="py-6">
      <Typography tag="h3" variant="body-lg" className="mb-4">
        My builds
      </Typography>
      {builds.length > 0 ? (
        <div className="grid gap-5 lg:grid-cols-3">
          {builds.map((build) => (
            <BuildCard key={build.id} build={build}>
              <DeleteBuildButton
                buildId={build.id}
                deleteAction={deleteBuildAction}
              />
              <form action={setBuildPublicAction} className="contents">
                <input type="hidden" name="buildId" value={build.id} />
                <input
                  type="hidden"
                  name="isPublic"
                  value={build.isPublic ? "false" : "true"}
                />
                <Button type="submit" variant={`${build.isPublic ? "default" : "ghost"}`}>
                  <Share2
                    className={`size-4 mr-1 ${
                      build.isPublic ? "fill-background" : ""
                    }`}
                  />
                </Button>
              </form>
            </BuildCard>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">There are no saved builds yet</p>
      )}
    </div>
  );
};

export default BuildsPage;
