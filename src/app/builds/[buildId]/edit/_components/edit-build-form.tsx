"use client";

import { SaveBuildDialog } from "@/components/build/save-build-dialog";
import { TableParts } from "@/components/build/table-parts";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { componentCategories } from "@/lib/constants";
import { Component, ComponentType, dbTypeToCategoryId } from "@/lib/types";
import { useMemo, useState } from "react";

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
  const initialSelected = buildInitialSelected(buildComponents);

  const [selectedByCategory, setSelectedByCategory] =
    useState<Record<string, Component | null>>(initialSelected);
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);

  const handleComponentSelect = (
    categoryId: string,
    component: Component | null
  ) => {
    setSelectedByCategory((prev) => ({ ...prev, [categoryId]: component }));
  };

  return (
    <>
      <div className="flex justify-between mb-8">
        <Typography tag="h3" variant="title-md">
          Editing build – {buildName}
        </Typography>
        <Button onClick={() => setIsSaveDialogOpen(true)}>Save</Button>
      </div>
      <div className="flex justify-center">
        <TableParts
          components={componentCategories}
          selectedByCategory={selectedByCategory}
          onComponentSelect={handleComponentSelect}
        />
        <SaveBuildDialog
          open={isSaveDialogOpen}
          onOpenChange={setIsSaveDialogOpen}
          selectedByCategory={selectedByCategory}
          defaultName={buildName}
          redirectPath="/builds"
        />
      </div>
    </>
  );
};
