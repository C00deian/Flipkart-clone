"use client";

import { FieldErrors, UseFormRegister, Path, FieldValues } from "react-hook-form";

interface TextArea<T extends FieldValues> {
  id: Path<T>;
  label: string;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  disabled?: boolean;
  required?: boolean
}

const TextArea = <T extends FieldValues>({
  id,
  label,
  register,
  errors,
  disabled,
  required
}: TextArea<T>) => {


  const error = errors[id as keyof FieldErrors<T>];

  return (
    <div className="w-full relative">
      <textarea
        required={required}
        id={String(id)}
        disabled={disabled}
        {...register(id)} 
        className={`
          peer w-full rounded-md p-4 pt-6 outline-none 
          max-h-[150px]
          min-h-[150px]
          bg-white border-2 transition 
          ${error ? "border-red-500" : "border-slate-300"}
          ${error ? "focus:border-red-500" : "focus:border-slate-300"}
        `}
      />

      <label
        htmlFor={String(id)}
        className={`
          absolute left-4 top-5 z-10 text-md duration-150 transform
          -translate-y-3 origin-left cursor-text 
          peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
          peer-focus:scale-75 peer-focus:-translate-y-4
          ${error ? "text-red-500" : "text-slate-400"}
        `}
      >
        {label}
      </label>

      {error && (
        <p className="text-red-500 text-sm mt-1">
          {(error.message as string) || "Invalid field"}
        </p>
      )}
    </div>
  );
};

export default TextArea;
