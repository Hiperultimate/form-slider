"use client";

import type {
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";
import { z } from "zod";

export const form2Schema = z.object({
  age: z.string().min(5),
});

const Form2 = ({
  register,
  errors,
}: {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
}) => {
  return (
    <>
      Enter your age :
      <input className="text-black" type="number" {...register("age")} />
      {errors.age?.message && <p>{errors.age?.message.toString()}</p>}
    </>
  );
};

export default Form2;
