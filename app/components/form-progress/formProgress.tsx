"use client";
import { useState } from "react";

import {
  FieldErrors,
  FieldValues,
  useForm,
  UseFormRegister,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodSchema } from "zod";

const FormProgress = ({
  forms,
  formSchemaArray,
}: {
  forms: (({
    register,
    errors,
  }: {
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors<FieldValues>;
  }) => JSX.Element)[];
  formSchemaArray: ZodSchema<any>[];
}) => {
  const [formArrayIndex, setFormArrayIndex] = useState(0);
  const numberOfForms = forms.length;
  const FormToRender = forms[formArrayIndex];

  const [totalFormData, setTotalFormData] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    getValues,
  } = useForm({
    resolver: zodResolver(formSchemaArray[formArrayIndex]),
  });

  return (
    <form
      className="w-full border border-red-500"
      onSubmit={async (e) => {
        e.preventDefault();
        const isFormValid = await trigger();
        console.log("Partial form data :", getValues());
        if (isFormValid) {
          if (formArrayIndex < numberOfForms - 1) {
            setFormArrayIndex((prev) => prev + 1);
          }
          setTotalFormData((prev) => ({
            ...prev,
            ...getValues(),
          }));
        } else {
          console.log("Error occured. Form is not valid");
        }
      }}
    >
      <div
        style={{
          width: `${((formArrayIndex + 1) / numberOfForms) * 100}%`,
        }}
        className={` h-2 transition-all bg-amber-500`}
      />

      <div>Total number of forms being passed : {numberOfForms}</div>

      <FormToRender register={register} errors={errors} />
      {formArrayIndex < numberOfForms - 1 ? (
        <button>Next</button>
      ) : (
        <button>Submit</button>
      )}
    </form>
  );
};

export default FormProgress;
