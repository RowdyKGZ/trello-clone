"use client";

import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";

export const FormDelete = () => {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} type="submit" variant="destructive" size="sm">
      Delete
    </Button>
  );
};
