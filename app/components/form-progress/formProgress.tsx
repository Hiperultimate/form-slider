"use client";
import { Children, cloneElement, isValidElement, useState } from "react";

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
  const [childrenArrDisplayIndex, setChildrenArrDisplayIndex] = useState(0);
  const childrenArr = forms;
  const numberOfForms = childrenArr.length;

  const ChildToRender = childrenArr[childrenArrDisplayIndex];

  const [totalFormData, setTotalFormData] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    getValues,
  } = useForm({
    resolver: zodResolver(formSchemaArray[childrenArrDisplayIndex]),
  });

  return (
    <form
      className="w-full border border-red-500"
      onSubmit={async (e) => {
        e.preventDefault();
        const isFormValid = await trigger();
        console.log("Partial form data :", getValues());
        if (isFormValid) {
          if (childrenArrDisplayIndex < numberOfForms - 1) {
            setChildrenArrDisplayIndex((prev) => prev + 1);
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
          width: `${((childrenArrDisplayIndex + 1) / numberOfForms) * 100}%`,
        }}
        className={` h-2 transition-all bg-amber-500`}
      />

      <div>Total number of forms being passed : {numberOfForms}</div>

      <ChildToRender register={register} errors={errors} />
      {childrenArrDisplayIndex < numberOfForms - 1 ? (
        <button>Next</button>
      ) : (
        <button>Submit</button>
      )}
    </form>
  );
};

export default FormProgress;
