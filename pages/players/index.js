import styled from "styled-components";
import PlayersList from "@/components/PlayersList";

export default function Players({onToggleFavorite, favorites}) {
  return (
    <StyledWrapper>
      <PlayersList onToggleFavorite={onToggleFavorite} favorites={favorites} />
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  margin: 0 auto;
  padding: 0 10px 20px;
`;