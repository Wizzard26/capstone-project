import styled from "styled-components";
import {useSession, signIn, signOut} from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function UserAction() {
  const router = useRouter();
  const { data: session } = useSession();
  const [userData, setUserData] = useState();

  useEffect(() => {
    const activeUser = async (name) => {
      try {
        const response = await fetch(`/api/user/${name}`);
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (session) {
      const name = session.user.name;
      activeUser(name);
    }
  }, [session]);

  return (
    <>
      {session
        ?
        <StyledUserActions>
          {userData &&
            <StyledProfile href={`/users/${userData[0]._id}`}>
              <StyledImage src={userData[0].avatar} alt="" title={session.user.name} width={34} height={34} />
            </StyledProfile>
          }
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
  display: flex;
  position: absolute;
  right: 80px;
  top: 10px;
  align-items: center;
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

const StyledProfile = styled(Link)`
  text-decoration: none;
  font-weight: bold;
  color: #f2f2f2;
  margin: 0 10px;
`;

const StyledImage = styled(Image)`
  border-radius: 50%;
  object-fit: cover;
  background-color: #2e2e34;
`;