import styled from "styled-components";
import PlayersList from "@/components/PlayersList";
import { StyledLink } from "@/components/StyledLink";

export default function Players({onToggleFavorite, favorites}) {
  return (
    <StyledWrapper>
      <PlayersList onToggleFavorite={onToggleFavorite} favorites={favorites} />
      <StyledLink variant="btn-secondary" href="/players/create">Add a new player</StyledLink>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  margin: 0 auto;
  padding: 0 10px 20px;
`;