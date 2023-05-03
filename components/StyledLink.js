import styled, { css } from "styled-components";
import Link from "next/link";

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: #E29B17;
  
  &:hover {
    color: #D19015;
  }
  
  ${({ variant }) =>
      variant === "btn-primary" &&
      css `
        background-color: #A7C0C6;
        color: #3A4A57;
        border-radius: 6px;
        padding: 0.8rem 1.2rem;
        margin: 1.2rem 0 0;
        text-align: center;

        &:hover {
          background-color: #91AAB1;
          color: #3A4A57;
        }
      `
  }

  ${({ variant }) =>
      variant === "btn-secondary" &&
      css `
        background-color: #E29B17;
        color: #EBEBEB;
        border-radius: 6px;
        padding: 0.8rem 1.2rem;
        margin: 1.2rem 0 0;
        text-align: center;
        
        &:hover {
          background-color: #D19015;
          color: #EBEBEB;
        }
      `
  }

  ${({ variant }) =>
          variant === "primary" &&
          css `
        color: #A7C0C6;

        &:hover {
          color: #91AAB1;
        }
      `
  }

  ${({ variant }) =>
          variant === "secondary" &&
          css `
        color: #E29B17;
        
        &:hover {
          color: #D19015;
        }
      `
  }

  ${({ variant }) =>
          variant === "text-dark" &&
          css `
            color: #1F1F1F;

            &:hover {
              color: #262626;
            }
          `
  }

  ${({ variant }) =>
          variant === "text-light" &&
          css `
            color: #C6C3C3;

            &:hover {
              color: #949393;
            }
          `
  }
`;
