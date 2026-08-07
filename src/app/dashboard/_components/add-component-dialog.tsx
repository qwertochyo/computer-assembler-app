"use client";

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Component } from "@/lib/types";
import { useEffect, useState } from "react";
import { ComponentCard } from "./component-card";
import { getComponentsByCategory } from "../actions";
import { Typography } from "@/components/ui/typography";

interface AddComponentDialogProps {
  categoryId: string;
  categoryName: string;
  onSelect: (component: Component) => void;
}

export const AddComponentDialog = ({
  categoryId,
  categoryName,
  onSelect,
}: AddComponentDialogProps) => {
  const [components, setComponents] = useState<Component[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getComponentsByCategory(categoryId).then((data) => {
      setComponents(data);
      setLoading(false);
    });
  }, [categoryId]);

  return (
    <DialogContent className="max-w-4xl w-[90vw] max-h-[85vh] overflow-hidden flex flex-col">
      <DialogHeader>
        <DialogTitle>Add component - {categoryName}</DialogTitle>
      </DialogHeader>
      <div className="overflow-y-auto flex-1 mx-1 px-1">
        {components.length > 0 ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {components.map((component) => (
              <ComponentCard
                key={component.id}
                name={component.name}
                price={component.price}
                onClick={() => onSelect(component)}
              />
            ))}
          </div>
        ) : (
          <Typography tag="p" className="text-muted-foreground text-sm py-4">
            {loading ? "Загрузка" : "Нет доступных компонентов"}
          </Typography>
        )}
      </div>
    </DialogContent>
  );
};
