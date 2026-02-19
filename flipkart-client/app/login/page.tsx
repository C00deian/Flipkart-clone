"use client"

import { useContext, useEffect } from 'react'
import { useRouter } from 'next/navigation' // Redirect ke liye
import Container from '../components/Container'
import { FormWrap } from '../components/FormWrap'
import LoginForm from './LoginForm'
import { AuthContext } from '../context/AuthContext'
import Redirecting from '../components/Redirecting' // Optional loading state

const Login = () => {
  const router = useRouter();
  const auth = useContext(AuthContext);

  // 1. Redirect if already logged in
  useEffect(() => {
    if (auth?.currentUser) {
      router.push('/'); // Ya '/cart' jahan bhejna ho
      router.refresh();
    }
  }, [auth?.currentUser, router]);

  // 2. Safety Check (Agar context load nahi hua ya user logged in hai)
  if (!auth) return null; // Ya <Loading />

  // Agar user logged in hai, to Form mat dikhao (Flicker se bacho)
  if (auth.currentUser) {
    return <Redirecting />; // Ya <p>Redirecting...</p>
  }

  return (
    <Container>
      <FormWrap>
        {/* LoginForm ko props pass kiye */}
        <LoginForm currentUser={auth.currentUser} refresh={auth.refreshUser} />
      </FormWrap>
    </Container>
  )
}

export default Login;