'use client'

import { ImageType } from "@/app/types/ProductFormType"
import { useCallback } from "react"
import { useDropzone } from "react-dropzone"

interface SelectImageProps {
    item?: ImageType
    handleFileChange: (value: File) => void
}

export const SelectImage: React.FC<SelectImageProps> = ({
    handleFileChange,
    item
}) => {

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            handleFileChange(acceptedFiles[0])
        }
    }, [handleFileChange])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpg', '.png']
        }
    })

    return (
        <div
            {...getRootProps()}
            className="border-2 border-slate-400 border-dashed cursor-pointer text-sm font-normal text-slate-400 flex items-center p-2 justify-center rounded"
        >
            <input {...getInputProps()} />
            {isDragActive ? (
                <p>Drop the image here..</p>
            ) : (
                <p>+ {item?.color ?? ''} Image</p>
            )}
        </div>
    )
}
