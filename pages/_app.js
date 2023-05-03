import GlobalStyle from "../styles";
import { useState, useEffect } from "react";

export default function App({ Component, pageProps }) {
  const [favorites, setFavorites] = useState([]);

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

  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} favorites={favorites} handleToggleFavorite={handleToggleFavorite} />
    </>
  );
}
