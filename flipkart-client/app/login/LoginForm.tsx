"use client";

import { useEffect, useState } from "react";
import { Heading } from "../components/Heading";
import Inputs from "../components/inputs/Inputs";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/Button";
import Link from "next/link";
import { login } from "../services/auth.service";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { LoginRequest, UserResponse } from "../types/User";
import { loginSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FcGoogle } from "react-icons/fc";
import Redirecting from "../components/Redirecting";

interface LoginFormProps {
    currentUser: UserResponse | null;
    refresh: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ currentUser, refresh }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isEmail, setIsEmail] = useState(true);

    const form = useForm<LoginRequest>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            phoneNumber: "",
        },
        mode: "onChange"
    });

    const { register, handleSubmit, resetField, formState: { errors, isValid } } = form;

    const handleInputs = () => {
        setIsEmail(!isEmail);
        if (isEmail) {
            resetField("email");
        } else {
            resetField("phoneNumber");
        }
    }

    const handleGoogleLogin = () => {
        window.location.href = "http://localhost:8081/oauth2/authorization/google";
    };

    useEffect(() => {
        if (currentUser) {
            router.push("/cart");
            router.refresh();
        }
    }, [currentUser, router]);

    const onSubmit: SubmitHandler<LoginRequest> = async (data) => {
        setIsLoading(true);

        try {
            const response = await login(data);

            toast.success(response?.message);

            refresh();

            router.push("/cart");
            router.refresh();

        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Login Failed");
        } finally {
            setIsLoading(false);
        }
    };

    if (currentUser) {
        return <Redirecting />
    }

    return (
        <>
            <Heading title="Sign in to E-Shop" />

            <Button
                outline
                label="Continue with Google"
                icon={FcGoogle}
                onClick={handleGoogleLogin}
            />

            {isEmail ? (
                <Inputs<LoginRequest>
                    id="email"
                    label="Email"
                    register={register}
                    errors={errors}
                    disabled={isLoading}
                />
            ) : (
                <Inputs<LoginRequest>
                    id="phoneNumber"
                    label="Phone Number"
                    register={register}
                    errors={errors}
                    disabled={isLoading}
                />
            )}

            <div
                onClick={handleInputs}
                className="text-blue-700 cursor-pointer w-fit mt-2 hover:underline text-sm"
            >
                {`Use ${isEmail ? "Phone Number" : "Email-ID"} instead`}
            </div>

            <Button
                label={isLoading ? "Loading..." : "Login"}
                onClick={handleSubmit(onSubmit)}
                disabled={isLoading || !isValid}
            />

            <p className="text-sm mt-2">
                Don't have an account?{" "}
                <Link href="/register" className="text-slate-700 font-semibold underline">
                    Register
                </Link>
            </p>
        </>
    );
};

export default LoginForm;