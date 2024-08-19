"use client";

import { useMultistepForm } from "@/app/hooks/useMultistepForm";
import { ZodObject, ZodRawShape } from "zod";
import Form1, { form1Schema } from "../forms/form1";
import Form2, { form2Schema } from "../forms/form2";

export const HookFormImplementation = () => {
  const formList = [Form1, Form2];
  const schemaList: ZodObject<ZodRawShape>[] = [form1Schema, form2Schema];

  const {
    currentFormIndex,
    next,
    back,
    currentStep,
    totalStep,
    formData,
    verifyFinalForm,
    register,
    errors,
  } = useMultistepForm({ forms: formList, formsSchema: schemaList });

  const DisplayForm = formList[currentFormIndex];

  const submitHandler = () => {
    console.log("Total form data: ", formData);
  };

  return (
    <form
      className="w-full bg-orange-200"
      onSubmit={async (e) => {
        e.preventDefault();
        next();

        if (currentStep === totalStep) {
          if (verifyFinalForm()) {
            console.log("Final form is valid, run submit logic now");
            submitHandler();
          }
        }
      }}
    >
      <div className=" text-black text-right mr-2">
        {currentStep} / {totalStep}
      </div>

      <div>
        <DisplayForm register={register} errors={errors} />
      </div>

      {currentFormIndex < totalStep - 1 ? (
        <button className="px-2 py-1 rounded-md m-1 bg-slate-500 border-spacing-1 hover:bg-slate-600" type="submit">Next</button>
      ) : (
        <button className="px-2 py-1 rounded-md m-1 bg-slate-500 border-spacing-1 hover:bg-slate-600" type="submit">Submit</button>
      )}
      {currentFormIndex !== 0 && <button className="px-2 py-1 rounded-md m-1 bg-slate-500 border-spacing-1 hover:bg-slate-600" onClick={() => back()}>Back</button>}
    </form>
  );
};
