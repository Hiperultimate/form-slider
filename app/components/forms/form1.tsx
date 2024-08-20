"use client";

import { z } from "zod";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

export const form1Schema = z.object({
  username: z.string().min(1, { message: "Username field is required" }),
});

const Form1 = ({
  register,
  errors,
}: {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
}) => {
  return (
    <div className="flex flex-col gap-2 mx-1">
      <div>Enter your name :</div>
      <input className="text-black" type="text" {...register("username")} />
      {errors.username?.message && <p className="text-red-400">{errors.username?.message.toString()}</p>}
    </div>
  );
};

export default Form1;
