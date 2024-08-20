"use client";

import type {
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";
import { z } from "zod";

export const form2Schema = z.object({
  age: z.string().min(5),
  address: z.string().min(10),
});

const Form2 = ({
  register,
  errors,
}: {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
}) => {
  return (
    <div className="flex flex-col gap-2 mx-1">
      
        <div>Enter your age :</div>
        <input className="text-black" type="number" {...register("age")} />
        {errors.age?.message && <p className="text-red-400">{errors.age?.message.toString()}</p>}
      
      
        <div>Enter your address :</div>
        <input className="text-black" {...register("address")} />
        {errors.address?.message && <p className="text-red-400">{errors.address?.message.toString()}</p>}
      
    </div>
  );
};

export default Form2;
