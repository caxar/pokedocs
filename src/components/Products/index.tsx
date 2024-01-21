import React from "react";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import { fetchProductsAction } from "../../redux/products/asyncActions";
import { selectProducts } from "../../redux/products/selectors";

import { nanoid } from "nanoid";

import Product from "./Product";
import SkeletonProduct from "./SkeletonProduct";

import "./Products.scss";

// type Props = {
//   openDetails: boolean;
//   setOpenDetails: (i: boolean) => void;
// };

const Products: React.FC = () => {
  const { status, entities, type } = useSelector(selectProducts);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchProductsAction(type) as any);
  }, [type]);

  if (!entities) return <></>;

  const productItem = entities?.map((item) => {
    return <Product key={nanoid()} data={item} />;
  });

  return (
    <div className="products">
      <div className="container">
        <div className="products-block">
          {status === "failed"
            ? "Not found 404"
            : status === "pending"
            ? [...new Array(8)].map(() => <SkeletonProduct key={nanoid()} />)
            : productItem}
        </div>
      </div>
    </div>
  );
};

export default Products;

// const fetchPokemonList = async () => {
//   const response = await axios.get(
//     `https://pokeapi.co/api/v2/type/${"ghost"}`
//   );
//   const results = response.data.pokemon.map(({ pokemon }) => pokemon);
//   const data = await Promise.all(
//     results.map(async (pokemon) => {
//       const res = await axios.get(pokemon.url);
//       const types = res.data.types.map((type) => type.type.name);
//       const id = res.data.id;
//       return {
//         id,
//         name: pokemon.name,
//         types,
//       };
//     })
//   );
//   setPokemons(data);
// };
