import styled from "styled-components";

export default function StyledWrapper({ children }) {
  return (
    <Wrapper>
      { children }
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin: 0 auto;
  padding: 0 10px 20px;
`;