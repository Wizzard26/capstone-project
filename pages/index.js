import styled from "styled-components";
import Image from "next/image";
import { pageContent } from "@/lib/data";
import { StyledLink } from "@/components/StyledLink";
import { StyledWrapper } from "@/components/StyledWrapper";
import { useSession } from "next-auth/react";

export default function HomePage() {
  const { data: session } = useSession();
  const content = pageContent.find((page) => page.name === "Home" );

  return (
    <StyledWrapper>
      <StyledImage src="/img/teasers/teaserimg.png" alt="PDC Pro Players" width={300} height={300} />
      <h1>{content.headline}</h1>
      <h2>{content.subline}</h2>
      <p>{content.teaserText}</p>
      {!session &&
        <StyledLink variant="btn-primary" href="/auth">Sign In</StyledLink>
      }
    </StyledWrapper>
  );
}

const StyledImage = styled(Image)`
  width: 100vw;
  height: auto;
  margin: 0 -10px;
`;
