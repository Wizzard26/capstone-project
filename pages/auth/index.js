import AuthForm from "@/components/Auth/AuthForm";
import styled from "styled-components";
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

const StyledWrapper = styled.div`
  margin: 0 auto;
  padding: 0 10px 20px;
`;