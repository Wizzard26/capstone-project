import GlobalStyle from "../styles";
import Header from "@/components/Header"
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import styled from "styled-components";
export default function App({ Component, pageProps }) {
  const [favorites, setFavorites] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favplayers")) || [];
    setFavorites(storedFavorites);
  }, []);

  function handleToggleFavorite(id) {
    const updatedFavorites = favorites.includes(id)
      ? favorites.filter((favId) => favId !== id)
      : [...favorites, id];
    setFavorites(updatedFavorites);
    localStorage.setItem("favplayers", JSON.stringify(updatedFavorites));
  }

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <>
      <GlobalStyle />
      <Header open={open} onToggle={handleToggle} />
      <Component {...pageProps} favorites={favorites} onToggleFavorite={handleToggleFavorite} />
      <Footer />
      {open && <StyledOverlay onClick={handleToggle}></StyledOverlay>}
    </>
  );
}

const StyledOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 10;
  background-color: rgba(32,32,32, 0.6);
`;
