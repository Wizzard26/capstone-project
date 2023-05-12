import { useRouter } from "next/router";
import useSWR from 'swr';
import Image from "next/image";
import styled from "styled-components";
import { StyledLink } from "@/components/StyledLink";
import { StyledButton } from "@/components/StyledButton";
import { useSession } from "next-auth/react";

export default function Player() {
  const { data: session } = useSession();
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;

  const { data: player, isLoading, error } = useSWR(`/api/players/${id}`);

  if (!isReady || isLoading || error) return <h2>Loading...</h2>;

  async function deletePlayer() {
    try {
      const response = await fetch(`/api/players/${id}`, {
        method: "DELETE",
      });
      !response.ok ? console.error(response.error) : router.push("/")
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <StyledWrapper>
      <StyledHeadline>
        <h1>{player.firstname} {player.lastname}</h1>
        {session &&
          <StyledActions>
            <StyledLink variant="btn-secondary" href={`/players/${player._id}/edit`}>Edit</StyledLink>
            <StyledButton onClick={deletePlayer} type="button" variant="delete">
              Delete
            </StyledButton>
        </StyledActions>
        }
      </StyledHeadline>
      <StyledImage src={player.image ? player.image : "/img/players/darts-player.jpg"} alt={player.nickname} width={200} height={200}/>
      <h2>Details about {player.firstname}</h2>
      <p>{player.description}</p>
      <StyledTable>
        <span>Nickname:</span><span>{player.nickname}</span>
        <span>Birthday:</span><span>{player.birthday}</span>
        <span>Nationality:</span><span>{player.nationality}</span>
        <span>Hometown:</span><span>{player.city}</span>
        <span>Handiness:</span><span>{player.handiness}</span>
        <span>Darts:</span><span>{player.darts}</span>
      </StyledTable>
      <h2>Titles and Achievements</h2>
      <StyledLink variant="btn-secondary" href="/players">Back to Players</StyledLink>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  margin: 0 auto;
  padding: 0 10px 20px;
  display: flex;
  flex-direction: column;
`;

const StyledTable = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 150px 1fr;
  border: 1px solid #3A4A57;
  border-bottom: 0;
  
  span {
    border-bottom: 1px solid #3A4A57;
    padding: 4px 10px;
    
    &:nth-child(odd) {
      color: #f1f1f1;
      background-color: #3A4A57;
    }
  }
`;

const StyledImage = styled(Image)`
  display: flex;
  align-self: center;
  border-radius: 50%;
`;

const StyledHeadline = styled.div`
  display: flex;

  h1 {
    width: 70%;
  }
`;

const StyledActions = styled.div`
  width: 30%;
  display: flex;
  align-items: flex-start;
  justify-content: end;
  gap: 10px;
`;
