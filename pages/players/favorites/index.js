import { players } from "@/lib/data";
import PlayerCard from "@/components/PlayerCard";
import styled from "styled-components";
import { StyledLink } from "@/components/StyledLink";

export default function PlayersList({handleToggleFavorite, favorites}) {
  const filteredPlayers = players.filter((player) => favorites.includes(player.id));

  return (
    <>
      <h1>Favorite Players</h1>
      <StyledPlayersList>
        {filteredPlayers.map((player) => (
          <StyledListItems key={player.slug}>
            <PlayerCard player={player} handleToggleFavorite={handleToggleFavorite} favorites={favorites} />
          </StyledListItems>
        ))}
      </StyledPlayersList>
      <StyledLink variant="btn-secondary" href="/">Back to Home</StyledLink>
      <StyledLink variant="btn-primary" href="/players">Show all Players</StyledLink>
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