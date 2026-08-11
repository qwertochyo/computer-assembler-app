"use client";

import { Button } from "@/components/ui/button";
import { useTransition } from "react";

interface DeleteBuildButtonProps {
  buildId: string;
  deleteAction: (formData: FormData) => Promise<void>;
}

export const DeleteBuildButton = ({
  buildId,
  deleteAction,
}: DeleteBuildButtonProps) => {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    if (!confirm("Delete build?")) {
      return;
    }

    const formData = new FormData();
    formData.set("buildId", buildId);

    startTransition(() => deleteAction(formData));
  };

  return (
    <Button
      type="button"
      variant="destructive"
      size="sm"
      disabled={isPending}
      onClick={handleClick}
    >
      {isPending ? "Deleting..." : "Delete"}
    </Button>
  );
};
