import AuthForm from "@/components/Auth/AuthForm";
import StyledWrapper from "@/components/StyledWrapper";
import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";
export default function AuthPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <p>Loading...</p>
  }

  if (status === 'authenticated') {
    router.push('/')
  } else {
    return (
      <StyledWrapper>
        <h1>User Authentication</h1>
        <AuthForm formName={'user-auth'}/>
      </StyledWrapper>
    )
  }
}