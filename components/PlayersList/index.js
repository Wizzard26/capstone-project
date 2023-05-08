import PlayerCard from "@/components/PlayerCard";
import styled from "styled-components";
import useSWR from "swr";

export default function PlayersList({onToggleFavorite, favorites}) {
  const { data } = useSWR('/api/players', { fallbackData: [] });
  return (
    <>
      <h1>Players overview</h1>
      <StyledPlayersList>
        {data.map((player)=>(
          <StyledListItems key={player._id}>
            <PlayerCard player={player} onToggleFavorite={onToggleFavorite} favorites={favorites}/>
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