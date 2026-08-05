"use client";

import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { Component } from "@/lib/types";
import { useCallback, useState } from "react";
import { TableParts } from "./table-parts";
import { componentCategories } from "@/lib/constants";

export const CurrentBuild = () => {
  const [selectedByCategory, setSelectedByCategory] = useState<
    Record<string, Component | null>
  >({});
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);

  const onSelectedComponent = useCallback(
    (categoryId: string, component: Component | null) => {
      setSelectedByCategory((prev) => ({ ...prev, [categoryId]: component }));
    },
    []
  );

  return (
    <>
      <div className="flex justify-between mb-8">
        <Typography tag="h1" variant="heading-md">
          Create your own build
        </Typography>
        <Button onClick={() => setSaveDialogOpen(true)}>Build</Button>
      </div>
      <div>
        <TableParts
          components={componentCategories}
          onSelectedComponent={onSelectedComponent}
          selectedByCategory={selectedByCategory}
        />
      </div>
    </>
  );
};
