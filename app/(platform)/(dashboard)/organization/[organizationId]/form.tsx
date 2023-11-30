"use client";

import { useFormState } from "react-dom";

import { create } from "@/actions/create-borad";
import { Button } from "@/components/ui/button";
import { FormInput } from "./form-input";
import { FormButton } from "./form-button";

export const Form = () => {
  const initialState = { errors: {}, message: null };
  const [state, dispatch] = useFormState(create, initialState);

  return (
    <form action={dispatch}>
      <FormInput errors={state?.errors} />

      <FormButton />
    </form>
  );
};
