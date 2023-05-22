import PlayerCard from "@/components/PlayerCard";
import { StyledWrapper } from "@/components/StyledWrapper";
import styled from "styled-components";
import useSWR from "swr";

export default function PlayersList({onToggleFavorite, favorites}) {
  const { data } = useSWR('/api/players', { fallbackData: [] });
  const filteredPlayers = data.filter((player) => favorites.includes(player._id));

  return (
    <StyledWrapper>
      <h1>Favorite Players</h1>
      <StyledPlayersList>
        {filteredPlayers.map((player) => (
          <StyledListItems key={player._id}>
            <PlayerCard player={player} onToggleFavorite={onToggleFavorite} favorites={favorites} />
          </StyledListItems>
        ))}
      </StyledPlayersList>
    </StyledWrapper>
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