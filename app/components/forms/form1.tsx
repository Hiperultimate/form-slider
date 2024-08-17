"use client";

import { z } from "zod";
import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";

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
    <>
      Enter your name :
      <input className="text-black" type="text" {...register("username")} />
      {errors.username?.message && <p>{errors.username?.message.toString()}</p>}
    </>
  );
};

export default Form1;
