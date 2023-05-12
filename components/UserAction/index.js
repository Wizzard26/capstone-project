import styled from "styled-components";
import {useSession, signIn, signOut} from "next-auth/react";
import { useRouter } from "next/router";

export default function UserAction() {
  const { data: session } = useSession()
  const router = useRouter();

  return (
    <>
      {session
        ?
        <StyledUserActions>
              Hello {session.user.name}
          <StyledButton onClick={()=> signOut()}>Sign Out</StyledButton>
        </StyledUserActions>
        :
        <StyledUserActions>
              <StyledButton onClick={()=>(router.push('/auth'))}>Sign In</StyledButton>
        </StyledUserActions>
      }
    </>
  )
}

const StyledUserActions = styled.span`
  display: inline-block;
  position: absolute;
  right: 80px;
`;

const StyledButton = styled.button`
  background: transparent;
  color: #C6C3C3;
  border: 1px solid #C6C3C3;
  border-radius: 0;
  padding: 8px 12px;
  margin-left: 15px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all .5s ease-in-out;
  
  &:hover {
    background: #C6C3C3;
    color: #3A4A57;
  }
`;