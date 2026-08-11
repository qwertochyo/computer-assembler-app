import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Component, ComponentCategory } from "@/lib/types";
import {
  Box,
  Cpu,
  Fan,
  HardDrive,
  LucideIcon,
  MemoryStick,
  Monitor,
  Plus,
  Server,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { formatPrice } from "@/lib/utils";
import { AddComponentDialog } from "@/components/build/add-component-dialog";

const iconMap: Record<ComponentCategory["icon"], LucideIcon> = {
  Cpu,
  Monitor,
  Server,
  MemoryStick,
  HardDrive,
  Zap,
  Box,
  Fan,
};

interface TablePartsProps {
  components: ComponentCategory[];
  selectedByCategory: Record<string, Component | null>;
  onComponentSelect: (categoryId: string, component: Component | null) => void;
}

export const TableParts = ({
  components,
  selectedByCategory,
  onComponentSelect,
}: TablePartsProps) => {
  const [openCategoryId, setOpenCategoryId] = useState<string | null>(null);

  const totalPrice = Object.values(selectedByCategory).reduce(
    (sum, c) => sum + (c?.price ?? 0),
    0
  );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-25">Component</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Model</TableHead>
          <TableHead>Price</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {components.map((category) => {
          const Icon = iconMap[category.icon];

          const selected = selectedByCategory[category.id];

          return (
            <TableRow key={category.id} className="my-2">
              <TableCell>
                <div className="flex items-center">
                  <Icon className="size-5 mr-1" />
                </div>
              </TableCell>
              <TableCell className="font-bold">{category.name}</TableCell>
              <TableCell>{selected?.name ?? "-"}</TableCell>
              <TableCell>
                {selected ? formatPrice(selected.price) : "-"}
              </TableCell>
              <TableCell className="text-right">
                <Dialog
                  open={openCategoryId === category.id}
                  onOpenChange={(open) =>
                    setOpenCategoryId(open ? category.id : null)
                  }
                >
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Plus className="size-4 mr-1" />
                      {selected ? "Change" : "Add"}
                    </Button>
                  </DialogTrigger>
                  <AddComponentDialog
                    categoryId={category.id}
                    categoryName={category.name}
                    onSelect={(c) => {
                      onComponentSelect(category.id, c);
                      setOpenCategoryId(null);
                    }}
                  />
                </Dialog>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={5}>
            <p className="font-medium">Build price:</p>
            <p className="text-lg text-gray-500">{formatPrice(totalPrice)}</p>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};
