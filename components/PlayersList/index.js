import { players } from "@/lib/data";
import PlayerCard from "@/components/PlayerCard";
import styled from "styled-components";

export default function PlayersList() {
  return (
    <>
      <h1>Players overview</h1>
      <StyledPlayersList>
        {players.map((player)=>(
          <StyledListItems key={player.slug}>
            <PlayerCard player={player} />
          </StyledListItems>
        ))}
      </StyledPlayersList>
    </>
  )
}

const StyledPlayersList = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px 4%;
  justify-content: center;
  padding: 0 0 20px;
  list-style: none;
`;

const StyledListItems = styled.li`
  width: 48%;
  max-width: 250px;
`;