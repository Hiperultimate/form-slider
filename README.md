# Multi Form Slider Hook

## Overview

This project provides a custom hook for creating a multi-form slider in React. It simplifies form handling by utilizing `react-hook-form` for form state management and validation, and `zod` for schema validation. The hook streamlines the process of managing multiple forms, handling form errors, and maintaining state across different steps in the slider.

## How to Use

Follow these steps to implement a multi-form slider using the provided hook. You can find an example implementation in `app/components/hook-form/HookForm.tsx`.

### Step 1: Create Form Components

First, create your form components, each accepting `register` and `errors` as props. These props will be used to register form fields and display validation errors.

```jsx
const Form1 = ({
  register,
  errors,
}: {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
}) => (
  <div>
    <input className="text-black" type="text" {...register("username")} />
    {errors.username?.message && (
      <p className="text-red-400">
        {errors.username?.message.toString()}
      </p>
    )}
  </div>
);
```

### Step 2: Define Forms and Schemas

In the component where your form slider will be implemented, create two arrays:
- `formList`: An array of form components.
- `schemaList`: An array of `zod` schemas corresponding to each form.

```jsx
const formList = [Form1, Form2];
const schemaList: ZodObject<ZodRawShape>[] = [form1Schema, form2Schema];
```

> **Note:** The `formList` array should directly reference your form components.

### Step 3: Use the `useMultistepForm` Hook

Finally, pass the `formList` and `schemaList` arrays to the `useMultistepForm` hook. This will give you access to various utilities for navigating and managing the form slider.

```jsx
const {
  CurrentFormComponent,
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
```

With these utilities, you can easily control the navigation between forms, handle form submission, and validate the forms step by step.

## Full Implementation

For the complete implementation of this custom hook, refer to `app/components/hook-form/HookForm.tsx`.
