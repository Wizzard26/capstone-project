import { players } from "@/lib/data";
import { useRouter } from "next/router";
import Image from "next/image";
import styled from "styled-components";
import { StyledLink } from "@/components/StyledLink";
export default function Player() {

  const router = useRouter();
  const { id } = router.query;

  if (!router.query.id) {
    return <div>Loading...</div>
  }

  const data = players.find((player) => player.id.toString() === id );

  return (
    <StyledWrapper>
      <h1>{data.firstname} {data.lastname}</h1>
      <StyledImage src={data.image ? data.image : "/img/players/darts-player.jpg"} alt={data.name} width={200} height={200}/>
      <h2>Details about {data.firstname}</h2>
      <p>{data.description}</p>
      <StyledTable>
        <span>Nickname:</span><span>{data.nickname}</span>
        <span>Birthday:</span><span>{data.birthday}</span>
        <span>Nationality:</span><span>{data.nationality}</span>
        <span>Hometown:</span><span>{data.hometown}</span>
        <span>Handiness:</span><span>{data.handiness}</span>
        <span>Darts:</span><span>{data.darts}</span>
      </StyledTable>
      <h2>Titles and Achievements</h2>
      <StyledLink variant={'btn-secondary'} href="/players">Back to Players</StyledLink>
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
