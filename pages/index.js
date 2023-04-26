import styled from "styled-components";
import PlayersList from "@/components/PlayersList";
export default function HomePage() {
  return (
    <StyledWrapper>
      <PlayersList />
    </StyledWrapper>
  );
}


const StyledWrapper = styled.div`
  margin: 0 auto;
  padding: 0 10px;
`;

