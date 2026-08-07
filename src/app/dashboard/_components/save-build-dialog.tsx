"use client";

import { Component } from "@/lib/types";
import { SaveBuildFormState, saveBuildAction } from "../actions";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useMemo, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";

interface SaveBuildDialog {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedByCategory: Record<string, Component | null>;
  defaultName: string;
  redirectPath: string;
}

const initialState: SaveBuildFormState = {
  status: "idle",
};

export const SaveBuildDialog = ({
  open,
  onOpenChange,
  selectedByCategory,
  defaultName,
  redirectPath,
}: SaveBuildDialog) => {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const { pending } = useFormStatus();
  const [state, formAction] = useActionState(saveBuildAction, initialState);

  const componentsIds = useMemo(
    () =>
      Object.values(selectedByCategory)
        .filter((component): component is Component => component !== null)
        .map((component) => component.id),
    [selectedByCategory]
  );

  useEffect(() => {
    if (state.status === "success") {
      toast.success("Build has been saved");
      formRef.current?.reset();

      onOpenChange(false);
      if (redirectPath) {
        router.push(redirectPath);
      } else {
        router.refresh();
      }
    }
  }, [onOpenChange, redirectPath, router, state.status]);

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      formRef.current?.reset();
    }

    onOpenChange(nextOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Save build</DialogTitle>
          <DialogDescription>Enter a build name</DialogDescription>
        </DialogHeader>
        <form ref={formRef} action={formAction} className="space-y-4">
          <Input
            name="name"
            placeholder="Example: Gaming PC"
            defaultValue={defaultName}
            required
          />
          <input
            type="hidden"
            name="componentsIds"
            value={componentsIds.join(",")}
          />
          <DialogFooter>
            <Button type="submit" disabled={pending || componentsIds.length === 0}>
              {pending ? "Saving" : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
