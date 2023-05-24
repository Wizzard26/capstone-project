import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import Link from "next/link";
import { StyledLink } from "@/components/StyledLink";
import FavoriteButton from "@/components/FavoriteButton";
export default function PlayerCard({ player, onToggleFavorite, favorites }) {
  const { data: session } = useSession();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentProfile = async (id) => {
      try {
        const response = await fetch(`/api/users/${id}`);
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    if (player.user) {
      const id = player.user;
      currentProfile(id)
    }
  }, [player.user]);

  return (
    <StyledCard>
      <FavoriteButton id={player._id} onToggleFavorite={onToggleFavorite} isFavorite={favorites.includes(player._id)} />
      <Image src={player.playerImage ? player.playerImage : "/img/players/darts-player.jpg"} alt={player.lastname} width={150} height={150} />
      <StyledTextLink href={`/players/${player._id}`}>
        <h2>{player.firstname} {player.lastname}</h2>
        <h3>&quot;{player.nickname}&quot;</h3>
      </StyledTextLink>
      <div>
        <StyledPlayerLabel>HT:</StyledPlayerLabel>
        <span>{player.city}</span>
      </div>
      <div>
        <StyledPlayerLabel>WR:</StyledPlayerLabel>
        <span>{player.worldRanking}</span>
      </div>
      <StyledLink variant="btn-primary" href={`/players/${player._id}`}>Show Details</StyledLink>
      {session && player.user && session.user.name !== user?.name && (
        <StyledLink variant="btn-secondary" href={`/chat/${session.user.name}/${user?.name}`}>Invite Chat</StyledLink>
      )}
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
    height: inherit;
    max-width: 150px;
    max-height: 150px;
    border-radius: 50%;
    align-self: center;
    object-fit: cover;
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
