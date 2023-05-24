import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import useSWR from "swr";
import styled from "styled-components";
import { StyledLink } from "@/components/StyledLink";
import { StyledButton } from "@/components/StyledButton";
import { StyledWrapper } from "@/components/StyledWrapper";
import Image from "next/image";

export default function User() {
  const { data: session } = useSession();
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;
  const { data: user, isLoading, error } = useSWR(id ? `/api/users/${id}`: null);

  let showEditButton = false;

  if (!isReady || isLoading || error ) return <h2>Loading...</h2>;

  if ( session ) {
    const isAdmin = session?.user.role === "admin";
    const isCurrentUser = session?.user.name === user.name;
    showEditButton = isAdmin || isCurrentUser;
  }

  async function deleteUser() {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: "DELETE",
      });
      !response.ok ? console.error(response.error) : router.push("/")
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <StyledWrapper>
      <h1>User Profile</h1>
      <h2>Hello {user.name}</h2>
      <StyledTable>
        <StyledRowHeader>
          <StyledHeadCol>User Information</StyledHeadCol>
        </StyledRowHeader>
        <StyledRow>
          <StyledCol>Avatar:</StyledCol>
          <StyledCol>
            <StyledImage src={user.avatar ? user.avatar : "/img/players/darts-player.jpg"} alt={user.name} width={150} height={150}/>
          </StyledCol>
        </StyledRow>
        <StyledRow>
          <StyledCol>Nickname:</StyledCol>
          <StyledCol>{user.name}</StyledCol>
        </StyledRow>
        <StyledRow>
          <StyledCol>Firstname:</StyledCol>
          <StyledCol>{user.firstname}</StyledCol>
        </StyledRow>
        <StyledRow>
          <StyledCol>Lastname:</StyledCol>
          <StyledCol>{user.lastname}</StyledCol>
        </StyledRow>
        <StyledRow>
          <StyledCol>E-Mail:</StyledCol>
          <StyledCol>{user.email}</StyledCol>
        </StyledRow>
        <StyledRow>
          <StyledCol>Phone:</StyledCol>
          <StyledCol>{user.phone}</StyledCol>
        </StyledRow>
        <StyledRow>
          <StyledCol>Status:</StyledCol>
          <StyledCol>{user.role}</StyledCol>
        </StyledRow>
      </StyledTable>

      {showEditButton && (
        <UserActions>
          <StyledLink variant="btn-secondary" href={`/users/${id}/edit`}>Edit Profile</StyledLink>
          <StyledButton onClick={deleteUser} type="button" variant="delete">
            Delete
          </StyledButton>
        </UserActions>
        )
      }

      {user.player && (
        <StyledTable>
          <StyledRowHeader>
            <StyledHeadCol>Player Information</StyledHeadCol>
          </StyledRowHeader>
          <StyledRow>
            <StyledCol>Player:</StyledCol>
            <StyledCol>{user?.player}</StyledCol>
          </StyledRow>
        </StyledTable>
      )}
    </StyledWrapper>
  )
}

const StyledTable = styled.div`
  border: 1px solid #3A4A57;
  width: 90%;
  max-width: 600px;
  margin: 0 auto 50px;
`;

const StyledRow = styled.div`
  display: grid;
  grid-template-columns: 25% 75%;

  &:nth-child(odd) {
    background-color: rgba(58, 74, 87, 0.5);
  }
`;

const StyledCol = styled.div`
  padding: 4px 10px;
  
  &:nth-child(odd) {
    text-align: right;
  }
`;

const StyledRowHeader = styled.div`
  background-color: #3A4A57;
`;

const StyledHeadCol = styled.div`
  padding: 8px 10px;
`;

const UserActions = styled.div`
  margin: 10px 0;
`;

const StyledImage = styled(Image)`
  display: flex;
  align-self: center;
`;
