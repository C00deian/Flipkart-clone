"use client";

import { FieldErrors, UseFormRegister, Path, FieldValues } from "react-hook-form";

interface InputProps<T extends FieldValues> {
  id: Path<T>;
  label: string;
  type?: string; 
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
}

const Inputs = <T extends FieldValues>({
  id,
  label,
  register,
  errors,
  disabled,
  required,
  type = "text",
}: InputProps<T>) => {

  const error = errors[id]; 

  return (
    <div className="w-full relative">
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        
        // ✅ CRITICAL FIXES:
        type={type} 
        placeholder=" "
        
        className={`
          peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed
          ${error ? "border-rose-500" : "border-slate-300"}
          ${error ? "focus:border-rose-500" : "focus:border-slate-300"}
        `}
      />

      <label
        htmlFor={id}
        className={`
          absolute text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0] left-4 
          peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
          peer-focus:scale-75 peer-focus:-translate-y-4
          ${error ? "text-rose-500" : "text-slate-400"}
        `}
      >
        {label}
      </label>
      
       {/* Error Message Display */}
       {error && (
        <span className="text-rose-500 text-sm mt-1">
             {error.message as string}
        </span>
       )}
    </div>
  );
};

export default Inputs;