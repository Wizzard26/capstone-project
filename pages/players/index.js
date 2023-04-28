import styled from "styled-components";
import PlayersList from "@/components/PlayersList";
import { StyledLink } from "@/components/StyledLink";

export default function Players() {
  return (
    <StyledWrapper>
      <PlayersList />
      <StyledLink variant={'btn-secondary'} href="/">Back to Home</StyledLink>
    </StyledWrapper>

  );
}

const StyledWrapper = styled.div`
  margin: 0 auto;
  padding: 0 10px 20px;
`;
