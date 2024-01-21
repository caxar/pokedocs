import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProductsType } from "./types";
import axios from "axios";

export const fetchProductsAction = createAsyncThunk(
  "products/fetchProducts",
  async (url: fetchProductsType) => {
    const response = await axios.get(`https://pokeapi.co/api/v2/type/${url}`);

    const results = response.data.pokemon.map(({ pokemon }) => pokemon);

    const data = await Promise.all(
      results.map(async (pokemon) => {
        const res = await axios.get(pokemon.url);
        const types = res.data.types.map((type) => type.type.name);
        const id = res.data.id;

        return {
          id,
          name: pokemon.name,
          types,
        };
      })
    );
    return data;
  }
);
