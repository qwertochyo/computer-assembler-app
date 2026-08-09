import { Typography } from "@/components/ui/typography";
import { auth } from "@/lib/auth";
import { getMyBuilds } from "@/lib/builds";
import { redirect } from "next/navigation";
import { BuildCard } from "./components/build-card";

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
              ...
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
