import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchDopeInfoAction = createAsyncThunk(
  "dopeInfo/fetchDopeInfo",
  async (id: any) => {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);

    const data = response.data;

    const speciesResponse = await axios.get(data.species.url);
    const speciesData = speciesResponse.data;
    const evolutionChainResponse = await axios.get(
      speciesData.evolution_chain.url
    );
    const evolutionChainData = evolutionChainResponse.data;

    const getEvolutionData = async (evolutionChain) => {
      let evolutionData = [];
      let currentPokemon = evolutionChain.species.name;
      let evolvesTo = evolutionChain.evolves_to;
      while (evolvesTo.length > 0) {
        let nextPokemon = evolvesTo[0].species.name;
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${nextPokemon}`
        );
        const data = response.data;
        evolutionData.push({
          name: data.name,
          id: data.id,
        });
        evolvesTo = evolvesTo[0].evolves_to;
      }
      return evolutionData;
    };

    const evolutionData = await getEvolutionData(evolutionChainData.chain);

    return [
      {
        name: data.name,
        id: data.id,
        evolution: evolutionData,
        dopeInfo: { ...data },
      },
    ];
  }
);
