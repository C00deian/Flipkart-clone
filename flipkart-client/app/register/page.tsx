"use client"

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FormWrap } from "../components/FormWrap"
import Container from "../components/Container"
import RegisterForm from "./RegisterForm"
import { AuthContext } from "../context/AuthContext";
import Redirecting from "../components/Redirecting";

const Register = () => {
    const router = useRouter();
    const auth = useContext(AuthContext);

    // 1. Redirect if already logged in
    useEffect(() => {
        if (auth?.currentUser) {
            router.push('/cart'); // Ya dashboard link
            router.refresh();
        }
    }, [auth?.currentUser, router]);

    // 2. Safety Check
    if (!auth) return null;

    // 3. Prevent Flash of Content
    if (auth.currentUser) {
        return <Redirecting />;
    }

    return (
        <Container>
            <FormWrap>
                {/* Props pass karte waqt safely handle karein */}
                <RegisterForm currentUser={auth.currentUser} refresh={auth.refreshUser} />
            </FormWrap>
        </Container>
    )

}

export default Register;