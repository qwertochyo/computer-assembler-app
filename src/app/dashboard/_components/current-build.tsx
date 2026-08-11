"use client";

import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { Component } from "@/lib/types";
import { useState } from "react";
import { TableParts } from "../../../components/build/table-parts";
import { componentCategories } from "@/lib/constants";
import { SaveBuildDialog } from "../../../components/build/save-build-dialog";

export const CurrentBuild = () => {
  const [selectedByCategory, setSelectedByCategory] = useState<
    Record<string, Component | null>
  >({});
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
        <Typography tag="h1" variant="title-md">
          Create your own build
        </Typography>
        <Button onClick={() => setIsSaveDialogOpen(true)}>Build</Button>
      </div>
      <div>
        <TableParts
          components={componentCategories}
          onComponentSelect={handleComponentSelect}
          selectedByCategory={selectedByCategory}
        />
        <SaveBuildDialog
          open={isSaveDialogOpen}
          onOpenChange={setIsSaveDialogOpen}
          selectedByCategory={selectedByCategory}
        />
      </div>
    </>
  );
};
