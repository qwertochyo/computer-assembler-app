import { auth } from "@/lib/auth";
import { getBuildToEdit } from "@/lib/builds";
import { notFound, redirect } from "next/navigation";
import { EditBuildForm } from "./_components/edit-build-form";

interface EditBuildProps {
  params: Promise<{ buildId: string }>;
}

const EditBuildPage = async ({ params }: EditBuildProps) => {
  const session = await auth();

  if (!session?.user.id) {
    redirect("/login");
  }

  const { buildId } = await params;

  const build = await getBuildToEdit(buildId, session.user.id);

  if (!build) {
    notFound();
  }

  const buildComponents = build.components.map((buildComponent) => ({
    id: buildComponent.component.id,
    name: buildComponent.component.name,
    price: buildComponent.component.price,
    type: buildComponent.component.type,
    socket: buildComponent.component.socket,
  }));

  return (
    <div className="py-6">
      <EditBuildForm buildComponents={buildComponents} buildName={build.name} />
    </div>
  );
};

export default EditBuildPage;
