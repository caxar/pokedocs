import React from "react";

const LoadImg = ({ id }) => {
  const [imageUrl, setImageUrl] = React.useState(
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`
  );

  const handleImageError = () => {
    setImageUrl(
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
    );
    setImageUrl(
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`
    );
  };

  return <img src={imageUrl} onError={handleImageError} alt="No image" />;
};

export default LoadImg;
