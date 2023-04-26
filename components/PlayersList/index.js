import { players } from "@/lib/data";
import PlayerCard from "@/components/PlayerCard";
import styled from "styled-components";

export default function PlayersList() {
  return (
    <>
      <h1>Players overview</h1>
      <StyledPlayersList>
        {players.map((player)=>(
          <PlayerCard
            key={player.slug}
            player={player} />
        ))}
      </StyledPlayersList>
    </>
  )
}

const StyledPlayersList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px 4%;
  justify-content: center;
  padding: 0 0 20px;
`;