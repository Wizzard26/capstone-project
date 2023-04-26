import Image from "next/image";
import styled from "styled-components";
export default function PlayerCard({ player }) {
  return (
    <StyledCard>
      <Image src="/img/players/darts-player.jpg" alt={player.name} width="150" height="150" />
      <h2>{player.name}</h2>
      <h3>&quot;{player.nickname}&quot;</h3>
      <div className="player-info">
        <span className="player-info-label">HT:</span>
        <span className="player-info-text">{player.hometown}</span>
      </div>
      <div className="player-info">
        <span className="player-info-label">WR:</span>
        <span className="player-info-text">{player.worldRanking}</span>
      </div>
    </StyledCard>
  )
}

const StyledCard = styled.div`
  width: 48%;
  max-width: 250px;
  background: #3A4A57;
  border-radius: 10px;
  color: #C6C3C3;
  display: flex;
  flex-direction: column;
  padding: 10px;
  
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

  h3 {
    font-weight: 400;
    font-size: 14px;
    line-height: 15px;
    margin: 0 0 15px;
  }
  
  h2, .player-info-label {
    color: #EBEBEB;
  }

  .player-info-label {
    padding-right: 10px;
  }
`;