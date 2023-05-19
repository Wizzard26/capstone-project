import styled, { css } from "styled-components";
export const StyledButton = styled.button`
  background-color: #A7C0C6;
  color: #3A4A57;
  text-align: center;
  text-decoration: none;
  border: none;
  border-radius: 6px;
  padding: 0.8rem 1.2rem;
  margin: 1.25rem 0;
  cursor: pointer;


  &:hover {
    background-color: #91AAB1;
  }

  ${({ variant }) =>
          variant === "secondary" &&
          css`
            background-color: #E29B17;
            color: #EBEBEB;

            &:hover {
              background-color: #D19015;
            }
          `
  }
  &:disabled {
    background-color: #657577;
  }

  max-width: ${({ width }) => width}px

`;