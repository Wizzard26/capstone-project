import styled from "styled-components";
import Link from "next/link";

export default function Footer() {
  return (
    <StyledFooter>
      <StyledFooterLink href={'/players'}>
        <svg xmlns="http://www.w3.org/2000/svg" width="42.857" height="30" viewBox="0 0 42.857 30">
          <path id="Icon_awesome-users" data-name="Icon awesome-users" d="M6.429,15.107a4.286,4.286,0,1,0-4.286-4.286A4.29,4.29,0,0,0,6.429,15.107Zm30,0a4.286,4.286,0,1,0-4.286-4.286A4.29,4.29,0,0,0,36.429,15.107Zm2.143,2.143H34.286a4.273,4.273,0,0,0-3.02,1.246,9.8,9.8,0,0,1,5.029,7.326h4.42a2.141,2.141,0,0,0,2.143-2.143V21.536A4.29,4.29,0,0,0,38.571,17.25Zm-17.143,0a7.5,7.5,0,1,0-7.5-7.5A7.5,7.5,0,0,0,21.429,17.25Zm5.143,2.143h-.556a10.355,10.355,0,0,1-9.174,0h-.556a7.716,7.716,0,0,0-7.714,7.714v1.929a3.215,3.215,0,0,0,3.214,3.214H31.071a3.215,3.215,0,0,0,3.214-3.214V27.107A7.716,7.716,0,0,0,26.571,19.393Zm-14.98-.9a4.273,4.273,0,0,0-3.02-1.246H4.286A4.29,4.29,0,0,0,0,21.536v2.143a2.141,2.141,0,0,0,2.143,2.143H6.556A9.82,9.82,0,0,1,11.592,18.5Z" transform="translate(0 -2.25)" fill="#3a4a57"/>
        </svg>
      </StyledFooterLink>
      <StyledFooterLink href={'/players/favorites'}>
        <svg xmlns="http://www.w3.org/2000/svg" width="22.5" height="30" viewBox="0 0 22.5 30">
          <path id="Icon_awesome-bookmark" data-name="Icon awesome-bookmark" d="M0,30V2.813A2.812,2.812,0,0,1,2.813,0H19.688A2.812,2.812,0,0,1,22.5,2.813V30L11.25,23.438Z" fill="#3a4a57"/>
        </svg>
      </StyledFooterLink>
    </StyledFooter>
  );
}

const StyledFooter = styled.footer`
  height: 60px;
  width: 100%;
  background-color: #3A4A57;
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  gap: 2px;
`;

const StyledFooterLink = styled(Link)`
  width: 50%;
  height: 100%;
  background-color: #AFBECB;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`