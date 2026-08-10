"use client";

import { SaveBuildDialog } from "@/app/dashboard/_components/save-build-dialog";
import { TableParts } from "@/app/dashboard/_components/table-parts";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { componentCategories } from "@/lib/constants";
import { Component, ComponentType, dbTypeToCategoryId } from "@/lib/types";
import { useCallback, useMemo, useState } from "react";

interface BuildComponentInput {
  id: string;
  name: string;
  price: number;
  type: ComponentType;
  socket: string | null;
}

interface EditBuildFormProps {
  buildName: string;
  buildComponents: BuildComponentInput[];
}

const buildInitialSelected = (
  buildComponents: BuildComponentInput[]
): Record<string, Component | null> => {
  const selected: Record<string, Component | null> = {};

  for (const c of buildComponents) {
    const categoryId = dbTypeToCategoryId[c.type];

    if (categoryId) {
      selected[categoryId] = {
        id: c.id,
        name: c.name,
        price: c.price,
        type: c.type,
        socket: c.socket,
      };
    }
  }

  return selected;
};

export const EditBuildForm = ({
  buildName,
  buildComponents,
}: EditBuildFormProps) => {
  const initialSelected = useMemo(() => {
    return buildInitialSelected(buildComponents);
  }, [buildComponents]);

  const [selectedByCategory, setSelectedByCategory] =
    useState<Record<string, Component | null>>(initialSelected);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);

  const onSelectedComponent = useCallback(
    (categoryId: string, component: Component | null) => {
      setSelectedByCategory((prev) => ({
        ...prev,
        [categoryId]: component,
      }));
    },
    []
  );

  return (
    <>
      <div className="flex justify-between mb-8">
        <Typography tag="h3" variant="title-md">
          Editing build – {buildName}
        </Typography>
        <Button onClick={() => setSaveDialogOpen(true)}>Save</Button>
      </div>
      <div className="flex justify-center">
        <TableParts
          components={componentCategories}
          selectedByCategory={selectedByCategory}
          onSelectedComponent={onSelectedComponent}
        />
        <SaveBuildDialog
          open={saveDialogOpen}
          onOpenChange={setSaveDialogOpen}
          selectedByCategory={selectedByCategory}
          defaultName={buildName}
          redirectPath="/builds"
        />
      </div>
    </>
  );
};
