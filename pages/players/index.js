import styled from "styled-components";
import PlayersList from "@/components/PlayersList";
import Link from "next/link";

export default function Players() {
  return (
    <StyledWrapper>
      <PlayersList />
      <StyledLink href="/">Back to Home</StyledLink>
    </StyledWrapper>

  );
}

const StyledWrapper = styled.div`
  margin: 0 auto;
  padding: 0 10px;
`;

const StyledLink = styled(Link)`
  color: #f1f1f1;
  text-decoration: none;
  
  &:hover {
    color: orange;
  }
`;