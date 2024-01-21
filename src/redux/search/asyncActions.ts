import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSearchActions = createAsyncThunk(
  "search/fetchSearch",
  async (search: any) => {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${search}`
    );
    const results = response.data;

    return [results];
  }
);
