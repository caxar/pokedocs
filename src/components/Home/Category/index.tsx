import React from "react";

import { useDispatch } from "react-redux";
import { setTypes } from "../../../redux/products/productsSlice";

import { nanoid } from "nanoid";

import "./Category.scss";

const Category: React.FC = () => {
  // const [selectedType, setSelectedType] = React.useState("normal");
  const [activeIndex, setActiveIndex] = React.useState(0);

  const dispatch = useDispatch();

  const onClickType = (indexType, nameType) => {
    setActiveIndex(indexType);
    // setSelectedType(nameType);
    dispatch(setTypes(nameType));
  };

  const pokemonTypes = [
    {
      name: "normal",
      urlImg: `./assets/normal.svg`,
    },
    {
      name: "fighting",
      urlImg: `./assets/fighting.svg`,
    },
    {
      name: "flying",
      urlImg: `./assets/flying.svg`,
    },
    {
      name: "poison",
      urlImg: `./assets/poison.svg`,
    },
    {
      name: "ground",
      urlImg: `./assets/ground.svg`,
    },
    {
      name: "rock",
      urlImg: `./assets/rock.svg`,
    },
    {
      name: "bug",
      urlImg: `./assets/bug.svg`,
    },
    {
      name: "ghost",
      urlImg: `./assets/ghost.svg`,
    },
    {
      name: "steel",
      urlImg: `./assets/steel.svg`,
    },
    { name: "fire", urlImg: `./assets/fire.svg` },
    { name: "water", urlImg: `./assets/water.svg` },
    { name: "grass", urlImg: `./assets/grass.svg` },
    { name: "electric", urlImg: `./assets/poison.svg` },
    { name: "psychic", urlImg: `./assets/psychic.svg` },
    { name: "ice", urlImg: `./assets/ice.svg` },
    { name: "dragon", urlImg: `./assets/dragon.svg` },
    { name: "dark", urlImg: `./assets/dark.svg` },
    { name: "fairy", urlImg: `./assets/fairy.svg` },
  ];

  return (
    <div className="category">
      <div className="container">
        <div className="category-title">Pokémon types:</div>
        <div className="category-block">
          <ul className="menu-item">
            {pokemonTypes.map((item, index) => (
              <li
                key={nanoid()}
                onClick={() => onClickType(index, item.name)}
                className={`menu-item_link ${item.name} ${
                  activeIndex == index ? "active" : ""
                }`}
              >
                <img src={item?.urlImg} alt="category-types" />
                <span>{item?.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Category;
