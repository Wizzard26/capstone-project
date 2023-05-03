import Image from "next/image";
import styled from "styled-components";
import Link from "next/link";
import { StyledLink } from "@/components/StyledLink";
import FavoriteButton from "@/components/FavoriteButton";
export default function PlayerCard({ player, onToggleFavorite, favorites }) {
  return (
    <StyledCard>
      <FavoriteButton id={player.id} onToggleFavorite={onToggleFavorite} isFavorite={favorites.includes(player.id)} />
      <Image src={player.image ? player.image : "/img/players/darts-player.jpg"} alt={player.name} width={150} height={150} />
      <StyledTextLink href={`/players/${player.id}`}>
        <h2>{player.firstname} {player.lastname}</h2>
        <h3>&quot;{player.nickname}&quot;</h3>
      </StyledTextLink>
      <div>
        <StyledPlayerLabel>HT:</StyledPlayerLabel>
        <span>{player.hometown}</span>
      </div>
      <div>
        <StyledPlayerLabel>WR:</StyledPlayerLabel>
        <span>{player.worldRanking}</span>
      </div>
      <StyledLink variant="btn-primary" href={`/players/${player.id}`}>Show Details</StyledLink>
    </StyledCard>
  )
}

const StyledCard = styled.div`
  width: 100%;
  height: 100%;
  background: #3A4A57;
  border-radius: 10px;
  color: #C6C3C3;
  display: flex;
  flex-direction: column;
  padding: 10px;
  position: relative;
  
  img {
    width: 100%;
    height: auto;
    max-width: 180px;
    border-radius: 50%;
    align-self: center;
  }

  h2 {
    font-weight: 600;
    font-size: 18px;
    line-height: 19px;
    margin: 15px 0 0;
  }
`;

const StyledPlayerLabel = styled.span`
  color: #EBEBEB;
  padding-right: 10px;
`;

const StyledTextLink = styled(Link)`
  color: #C6C3C3;
  text-decoration: none;

  h2 {
    color: #EBEBEB;

    &:hover {
      color: #C6C3C3;
    }
  }
  
  h3 {
    font-weight: 400;
    font-size: 14px;
    line-height: 15px;
    margin: 0 0 15px;
  }
`;
