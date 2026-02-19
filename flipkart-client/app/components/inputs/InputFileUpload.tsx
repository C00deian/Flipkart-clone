"use client";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";

interface InputFileUploadProps<T extends FieldValues> {
  id: Path<T>;
  label: string;
  disabled?: boolean;
  register: UseFormRegister<T>;
  watch: UseFormWatch<T>;
  errors: FieldErrors<T>;
}

const InputFileUpload = <T extends FieldValues>({
  id,
  label,
  register,
  watch,
  errors,
  disabled,
}: InputFileUploadProps<T>) => {
  const files = watch(id) as FileList | undefined;

  return (
    <div className="flex flex-col gap-2">
      <label className="font-medium">{label}</label>

      {/* Hidden file input */}
      <input
        id={`file-${String(id)}`}
        type="file"
        accept="image/*"
        disabled={disabled}
        className="hidden"
        {...register(id)}
      />

      {/* Custom upload UI */}
      <label
        htmlFor={`file-${String(id)}`}
        className={`
          flex items-center gap-3 px-4 py-3
          border-2 border-dashed rounded-lg
          cursor-pointer transition
          hover:border-blue-500
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        `}
      >
        <CloudUploadIcon className="text-blue-600" />
        <span className="text-sm text-gray-700">
          Click to upload file
        </span>
      </label>

      {/* Selected file */}
     {files?.[0] && (
  <p className="text-xs text-gray-600">
    Selected: {files[0].name}
  </p>
)}

      {/* Validation error */}
      {errors[id] && (
        <p className="text-sm text-red-500">
          {(errors[id]?.message as string) || "Invalid file"}
        </p>
      )}
    </div>
  );
};

export default InputFileUpload;
