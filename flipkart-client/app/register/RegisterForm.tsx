"use client";

import { useEffect, useState } from "react"
import { Heading } from "../components/Heading"
import Inputs from "../components/inputs/Inputs"
import { SubmitHandler, useForm } from "react-hook-form"
import Button from "../components/Button"
import Link from "next/link"
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { signUp } from "../services/auth.service"
import { RegisterRequest, UserResponse } from "../types/User"
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "./schema"
import Redirecting from "../components/Redirecting";

interface RegisterProps {
    currentUser: UserResponse | null;
    refresh: () => void;
}

const RegisterForm: React.FC<RegisterProps> = ({ currentUser, refresh }) => {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<RegisterRequest>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            phoneNumber: ""
        },
        mode: "onChange"
    });

    const { register, handleSubmit, reset, formState: { errors, isValid } } = form;

    const handleGoogleLogin = () => {
        window.location.href = "http://localhost:8081/oauth2/authorization/google"
    };

    useEffect(() => {
        if (currentUser) {
            router.push("/cart");
            router.refresh();
        }
    }, [currentUser, router]);

    const onSubmit: SubmitHandler<RegisterRequest> = async (data) => {
        setIsLoading(true);

        try {
            const res = await signUp(data);

            toast.success(res.message || "Registration Successful");

            refresh();

            router.push("/cart");

            reset();

        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Registration Failed");
        } finally {
            setIsLoading(false);
        }
    };

    if (currentUser) {
        return <Redirecting />
    }

    return (
        <>
            <Heading title="Register now to E-Shop" />

            <Button
                outline
                label="Sign up with Google"
                icon={FcGoogle}
                onClick={handleGoogleLogin}
            />


            <Inputs<RegisterRequest>
                id="phoneNumber"
                label="Phone Number"
                register={register}
                errors={errors}
                disabled={isLoading}
            />

            <Button
                label={isLoading ? "Loading..." : "Register"}
                onClick={handleSubmit(onSubmit)}
                disabled={isLoading || !isValid}
            />

            <p className="text-sm mt-2">
                Already have an account?{" "}
                <Link href={'/login'} className="text-slate-700 font-semibold underline">
                    Login
                </Link>
            </p>
        </>
    )
}

export default RegisterForm;