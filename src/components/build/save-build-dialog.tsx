"use client";

import { Component } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useRef } from "react";
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
import { SaveBuildFormState, saveBuildAction } from "@/app/dashboard/actions";

interface SaveBuildDialog {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedByCategory: Record<string, Component | null>;
  defaultName?: string;
  redirectPath?: string;
}

const initialState: SaveBuildFormState = {
  status: "idle",
};

const SubmitButton = ({ disabled }: { disabled: boolean }) => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending || disabled}>
      {" "}
      {pending ? "Saving" : "Save"}{" "}
    </Button>
  );
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

  const [state, formAction] = useActionState(saveBuildAction, initialState);

  const componentIds = Object.values(selectedByCategory)
    .filter((component): component is Component => component !== null)
    .map((component) => component.id);

  useEffect(() => {
    if (state.status === "success") {
      toast.success(state.message ?? "Build has been saved");

      formRef.current?.reset();
      onOpenChange(false);

      if (redirectPath) {
        router.push(redirectPath);
      } else {
        router.refresh();
      }
    }

    if (state.status === "error") {
      toast.error(state.message ?? "Failed to save build");
    }
  }, [onOpenChange, redirectPath, router, state]);

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
            name="componentIds"
            value={componentIds.join(",")}
          />
          <DialogFooter>
            <SubmitButton disabled={componentIds.length === 0} />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
