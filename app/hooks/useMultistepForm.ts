"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  FieldErrors,
  FieldValues,
  useForm,
  UseFormRegister,
} from "react-hook-form";
import { z, ZodObject, ZodRawShape } from "zod";

export const useMultistepForm = ({
  forms,
  formsSchema,
}: {
  forms: (({
    register,
    errors,
  }: {
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors<FieldValues>;
  }) => JSX.Element)[];
  formsSchema: ZodObject<ZodRawShape>[];
}) => {
  const totalFormCount = forms.length;
  const [currentFormIndex, setCurrentFormIndex] = useState(0);
  const [totalFormData, setTotalFormData] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors, ...restFormState },
    trigger,
    getValues,
    ...rest
  } = useForm({
    resolver: zodResolver(formsSchema[currentFormIndex]),
  });

  async function next() {
    const isFormValid = await trigger();
    if (!isFormValid) {
      console.log("Error occured. Form is not valid.");
      return;
    } 
    setTotalFormData((prev) => ({ ...prev, ...getValues() }));
    if (currentFormIndex < totalFormCount - 1) {
      setCurrentFormIndex((prev) => prev + 1);
    }
  }

  async function back() {
    if (currentFormIndex > 0) {
      setTotalFormData((prev) => ({ ...prev, ...getValues() }));
      setCurrentFormIndex((prev) => prev - 1);
    }
  }

  function verifyFinalForm() {
    const combinedSchema = formsSchema.reduce(
      (acc, schema) => acc.merge(schema),
      z.object({})
    );
    const isValid = combinedSchema.safeParse(totalFormData);
    if (isValid.success) {
      return true;
    }
    return false;
  }

  return {
    next,
    back,
    currentFormIndex,
    currentStep: currentFormIndex + 1,
    totalStep: totalFormCount,
    formData: totalFormData,
    verifyFinalForm,
    CurrentFormComponent : forms[currentFormIndex],

    register,
    // handleSubmit, // This Fn does not work with the current implementation
    trigger,
    getValues,
    errors,
    formState: restFormState,
    rest,
  };
};
