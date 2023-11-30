"use client";

import { useFormStatus } from "react-dom";

import { Input } from "@/components/ui/input";

interface FormInputProps {
  errors?: {
    title?: string[];
  };
}

export const FormInput = ({ errors }: FormInputProps) => {
  const { pending } = useFormStatus();

  return (
    <div className="flex flex-col space-y-2">
      <Input
        id="title"
        name="title"
        type="text"
        required
        placeholder="Enter a board title"
        disabled={pending}
      />

      {errors?.title ? (
        <div>
          {errors.title.map((error: string) => (
            <p key={error} className="text-rose-500">
              {error}
            </p>
          ))}
        </div>
      ) : null}
    </div>
  );
};
