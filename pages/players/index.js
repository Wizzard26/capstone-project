import styled from "styled-components";
import PlayersList from "@/components/PlayersList";
import { StyledLink } from "@/components/StyledLink";

export default function Players({onToggleFavorite, favorites}) {
  return (
    <StyledWrapper>
      <PlayersList onToggleFavorite={onToggleFavorite} favorites={favorites} />
      <StyledActions>
        <StyledLink variant="btn-secondary" href="/">Back to Home</StyledLink>
        <StyledLink variant="btn-primary" href="/players/favorites">Show Favorites</StyledLink>
      </StyledActions>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  margin: 0 auto;
  padding: 0 10px 20px;
`;

const StyledActions = styled.div`
  display: flex;
  gap: 1.25rem;
`;
