import styled from "styled-components";
import PlayersList from "@/components/PlayersList";
import { StyledLink } from "@/components/StyledLink";

export default function Players({handleToggleFavorite, favorites}) {
  return (
    <StyledWrapper>
      <PlayersList handleToggleFavorite={handleToggleFavorite} favorites={favorites} />
      <StyledLink variant="btn-secondary" href="/">Back to Home</StyledLink>
      <StyledLink variant="btn-primary" href="/players/favorites">Show Favorites</StyledLink>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  margin: 0 auto;
  padding: 0 10px 20px;
`;
