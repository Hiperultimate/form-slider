import FormProgress from "./components/form-progress/formProgress";
import Form1, { form1Schema } from "./components/forms/form1";
import Form2, { form2Schema } from "./components/forms/form2";
import { ZodObject, ZodRawShape } from "zod";
import { HookFormImplementation } from "./components/hook-form/HookForm";

export default function Home() {
  // const formList = [Form1, Form2];
  // const schemaList: ZodObject<ZodRawShape>[] = [form1Schema, form2Schema];


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* <FormProgress forms={formList} formSchemaArray={schemaList}/> */}

      <HookFormImplementation />

    </main>
  );
}
