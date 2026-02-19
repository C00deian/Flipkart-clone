'use client'

import { Heading } from "@/app/components/Heading";
import Inputs from "@/app/components/inputs/Inputs";
import TextArea from "@/app/components/inputs/TextArea";
import CustomCheckBox from "@/app/components/inputs/CustomCheckBox";
import CategoryInputs from "@/app/components/inputs/CategoryInputs";
import { SelectColor } from "@/app/components/inputs/SelectColor";

import { ProductFormType, productFormSchema } from "./schema"; 
import { Category, ImageType } from "@/app/types/ProductFormType";
import { colors } from "@/app/utils/colors";

import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { uploadToCloudinary } from "@/app/components/helper/uploadToCloudinary";
import Button from "@/app/components/Button";
import { addProduct } from "@/app/services/admin.service";
import { useCategories } from "@/hooks/useCategories";

export const AddProductForm = () => {
  const [images, setImages] = useState<ImageType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { categories, loading } = useCategories();
  // ⭐ State type update kiya


  const form = useForm<ProductFormType>({
    resolver: zodResolver(productFormSchema) as any,
    defaultValues: {
      name: "",
      description: "",
      category: 1, // Ye ab ID hold karega (as string or number depending on schema)
      brand: "",
      images: [],
      reviews: [],
      quantity: 1,
      price: 0,
      inStock: true,
    },
    mode: "all"
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    
    formState: { errors },
  } = form;

  // Watch category to highlight selected box
  const category = watch("category");

  console.log("error " , errors)

  const setCustomValue = useCallback(
    (id: keyof ProductFormType, value: any) => {
      setValue(id, value, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
    },
    [setValue]
  );

  const addImageToState = useCallback((value: ImageType) => {
    setImages((prev) => {
      const exists = prev.find((img) => img.color === value.color);
      if (exists) return prev;
      return [...prev, value];
    });
  }, []);

  const removeImageFormState = useCallback((value: ImageType) => {
    setImages((prev) => prev.filter((item) => item.color !== value.color));
  }, []);

  useEffect(() => {
    setCustomValue("images", images)
  }, [images, setCustomValue]); // Added setCustomValue dependency

  
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    if (!data.category) {
      toast.error("Category not selected");
      setIsLoading(false);
      return;
    }
    if (images.length === 0) {
      toast.error("Please upload at least one imageUrl");
      setIsLoading(false);
      return;
    }

    try {
      const uploadPromises = images.map(async (item) => {
        if (!item.imageUrl) return null;
        const uploaded = await uploadToCloudinary(item.imageUrl);
        return {
          color: item.color,
          colorCode: item.colorCode,
          imageUrl: uploaded.secure_url,
        };
      });

      const uploadedImages = (await Promise.all(uploadPromises)).filter(Boolean);

      // ⭐ Payload Construction
      const payload = {
        name: data.name,
        description: data.description,
        price: Number(data.price),
        brand: data.brand,
        quantity: Number(data.quantity),
        inStock: data.inStock,
        categoryId: Number(data.category),
        images: uploadedImages,
      };

      console.log("FINAL PAYLOAD 👉", payload);

      await addProduct(payload as any); 

      toast.success("Product created!");
      reset();
      setImages([]);
      
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Heading title="Add New Product" />
 
      <Inputs<ProductFormType>
        id="name"
        label="Name"
        register={register}
        errors={errors}
        disabled={isLoading}
        required
      />

      <Inputs<ProductFormType>
        id="price"
        label="Price"
        type="number" 
        register={register}
        errors={errors}
        disabled={isLoading}
        required
      />

      <Inputs<ProductFormType>
        id="quantity"
        label="Quantity"
        type="number"
        register={register}
        errors={errors}
        disabled={isLoading}
        required
      />

      <Inputs<ProductFormType>
        id="brand"
        label="Brand"
        register={register}
        errors={errors}
        disabled={isLoading}
        required
      />

      <TextArea<ProductFormType>
        id="description"
        label="Description"
        register={register}
        errors={errors}
        disabled={isLoading}
        required
      />

      <CustomCheckBox<ProductFormType>
        id="inStock"
        label="This product is in stock"
        register={register}
        disabled={isLoading}
      />

    <div className="w-full font-medium">
  <div className="mb-2 font-semibold">Select a Category</div>
        {
          loading ? (<div>Loading categories...</div>) : (
             <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-[50vh] overflow-y-auto">
    {categories.map((item) => (
      <CategoryInputs
        key={item.id}
        label={item.name}
        imageUrl={item.imageUrl}
        selected={Number(category) === item.id}
        onClick={() => setCustomValue("category", item.id)}
      />
    ))}
  </div>
          )
}
     
 
</div>

      <div className="w-full flex flex-col flex-wrap">
        <div className="font-bold">Select the available product colors and upload their images.</div>
        <p>You must upload an image for each of the color selected otherwise your color selection will be ignored.</p>
        <div className="grid grid-cols-2 gap-3">
          {colors.map((item, index) => (
            <SelectColor
              key={index}
              item={item}
              addImageToState={addImageToState}
              removeImageFormState={removeImageFormState}
              isProductCreated={false}
            />
          ))}
        </div>
      </div>
    
      <Button
        label={isLoading ? "Loading..." : "Add Product"}
        onClick={handleSubmit(onSubmit)}
        disabled={isLoading}
      />
    </>
  );
};
