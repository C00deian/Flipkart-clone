"use client"

import React from 'react'
import { FieldValues, Path, UseFormRegister } from 'react-hook-form'

interface CustomCheckBoxProps<T extends FieldValues> {
    id: Path<T>;
    label: string
    disabled?: boolean
    register: UseFormRegister<T>
    
}

const CustomCheckBox =  <T extends FieldValues>({
  id,
  label,
  register,
  disabled,

}: CustomCheckBoxProps<T>) => {
    return (
        <div className='w-full flex flex-row gap-2 items-center'>
            <input
                type='checkbox'
                id={id}
                disabled={disabled}
                {...register(id)}
                placeholder=""
                className='cursor-pointer'
            />
            <label htmlFor={id} className='font-medium cursor-pointer'>{label}</label>
        </div>
    )
}

export default CustomCheckBox