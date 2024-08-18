import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FieldErrors, FieldValues, useForm, UseFormRegister } from "react-hook-form";
import { ZodSchema } from "zod";

const useFormSlider = ({forms, formsSchama} : {
    forms: (({
      register,
      errors,
    }: {
      register: UseFormRegister<FieldValues>;
      errors: FieldErrors<FieldValues>;
    }) => JSX.Element)[];
    formsSchama: ZodSchema<any>[];
  }) => {
    const totalFormCount = forms.length;
    const [currentFormIndex, setCurrentFormIndex] = useState(0);

    const {
      register,
      handleSubmit,
      formState: { errors , ...restFormState},
      trigger,
      getValues,
      ...rest
    } = useForm({
      resolver: zodResolver(formsSchama[currentFormIndex]),
    });
    
    function next(){
      if(currentFormIndex < totalFormCount -1){
        setCurrentFormIndex(prev => prev + 1)
      }
    }

    function back(){
      if(currentFormIndex > 0){
        setCurrentFormIndex(prev => prev - 1)
      }
    }


    return {
        totalFormCount,
        next,
        back,
        register,
        handleSubmit,
        errors,
        formState: restFormState,
        rest
    }

}

