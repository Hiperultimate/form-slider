"use client";

import type {
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";
import { z } from "zod";

export const form2Schema = z.object({
  age: z.string().min(16),
});

const Form2 = ({
  register,
  errors,
}: {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
}) => {
  return (
    // <form
    //   onSubmit={async (e) => {
    //     e.preventDefault();
    //     const isFormValid = await trigger();
    //     console.log(
    //       "Errors in form :",
    //       errors,
    //       Object.keys(errors).length,
    //       isFormValid
    //     );
    //     remoteTriggerFn(getValues(), isFormValid);
    //   }}
    // >
    <>
      Enter your age :
      <input className="text-black" type="number" {...register("age")} />
      {errors.age?.message && <p>{errors.age?.message.toString()}</p>}
    </>
  );
};

export default Form2;
