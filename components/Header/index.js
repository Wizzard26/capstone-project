import styled, { css } from "styled-components";
import Link from "next/link";
import { StyledLink } from "@/components/StyledLink";
export default function Header({ open, onToggle }) {

  return (
    <StyledHeader>
      <StyledWrapper>
        <StyledLogo href={"/"}>
          <svg id="DemoLogo" xmlns="http://www.w3.org/2000/svg" width="78" height="31" viewBox="0 0 78 31">
            <text id="DARTS_CONNECT" data-name="DARTS
  CONNECT" transform="translate(0 16)" fill="#c6c3c3" fontSize="16" fontFamily="HelveticaNeue-Medium, Helvetica Neue" fontWeight="500"><tspan x="0" y="0">DARTS</tspan><tspan x="0" y="12">CONNECT</tspan></text>
          </svg>
        </StyledLogo>
        <StyledNavigation isOpen={open}>
          <StyledList>
            <StyledLink variant={'text-dark'} href={'/players'} onClick={onToggle}>Show Players</StyledLink>
            <StyledLink variant={'text-dark'} href={'/players/favorites'} onClick={onToggle}>Show Favorites</StyledLink>
          </StyledList>
        </StyledNavigation>
        <StyledBurger isOpen={open} onClick={onToggle}>
          <StyledBurgerBars className={'top'}/>
          <StyledBurgerBars className={'middle'}/>
          <StyledBurgerBars className={'bottom'}/>
        </StyledBurger>
      </StyledWrapper>
    </StyledHeader>
  )
}

const StyledHeader = styled.header`
  background-color: #3A4A57;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 55px;
  z-index: 100;
`;

const StyledWrapper = styled.div`
  margin: 0 auto;
  padding: 10px 10px;
`;

const StyledLogo = styled(Link)`
  text-decoration: none;
`;

const StyledBurger = styled.button`
  position: absolute;
  top: .725rem;
  right: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;

  &:focus {
    outline: none;
  }
  
  .middle {
    width: 1.75rem;
    margin-left: .25rem;
  }

  ${({ isOpen }) =>
          isOpen === true &&
          css `
    .top {
     transform: rotate(45deg);
    }
    .bottom {
      transform: rotate(-45deg);
    }
    .middle {
      opacity: 0;
      width: 0;
      margin-left: -.75rem;
    }
    `
  }
`;

const StyledBurgerBars = styled.div`
  width: 2rem;
  height: 0.25rem;
  background: #C6C3C3;
  border-radius: 10px;
  transition: all 0.3s linear;
  position: relative;
  transform-origin: 1px;
`;

const StyledNavigation = styled.nav`
  position: absolute;
  width: 60vw;
  max-width: 15rem;
  min-height: 100vh;
  background-color: #C6C3C3;
  right: 0;
  top: 55px;
  z-index: -1;
  transform: translateX(60vw);
  transition: transform .5s ease-in-out;
  
  ${({ isOpen }) =>
  isOpen === true &&
  css `
    transform: translateX(0);
  `}
`;

const StyledList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;