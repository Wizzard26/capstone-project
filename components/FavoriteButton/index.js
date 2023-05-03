import styled from "styled-components";

export default function FavoriteButton ({ id, onToggleFavorite, isFavorite }) {
  return (
    <StyledFavorite
      id={id}
      onClick={() => onToggleFavorite(id)}
    >
      {isFavorite ?
        <svg id="Bookmarked" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25">
          <path id="Icon_metro-heart" data-name="Icon metro-heart" d="M21.008,3.856c-2.628,0-4.889,2.308-5.937,4.719-1.048-2.411-3.31-4.719-5.938-4.719a6.843,6.843,0,0,0-6.563,7.088c0,7.958,7.434,10.045,12.5,17.912,4.789-7.819,12.5-10.208,12.5-17.912A6.843,6.843,0,0,0,21.008,3.856Z" transform="translate(-2.571 -3.856)" fill="#dd9e29"/>
        </svg>
        :
        <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27.398" viewBox="0 0 27 27.398">
          <g id="bookmark" transform="translate(1 1)">
            <path id="Icon_ionic-md-heart" data-name="Icon ionic-md-heart" d="M15.875,29.5l-1.813-1.772C7.625,21.326,3.375,17.17,3.375,11.993c0-4.224,3-7.493,6.875-7.493a7.183,7.183,0,0,1,5.625,2.861A7.183,7.183,0,0,1,21.5,4.5c3.875,0,6.875,3.27,6.875,7.493,0,5.177-4.25,9.333-10.687,15.735Z" transform="translate(-3.375 -4.5)" fill="none" stroke="#dd9e29" strokeWidth="2"/>
          </g>
        </svg>
      }
    </StyledFavorite>
  )
}

const StyledFavorite = styled.div`
  cursor: pointer;
  position: absolute;
  right: 10px;
  z-index: 10;
`;