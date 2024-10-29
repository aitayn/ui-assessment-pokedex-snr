import { useMemo } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

export type Pokemon = {
  id: string;
  name: string;
  number: number;
  image: string;
  types: string[];
};

export type PokemonOption = {
  value: Pokemon['id'];
  label: Pokemon['name'];
};

export const GET_POKEMONS = gql`
  query pokemons($first: Int!) {
    pokemons(first: $first) {
      id
      name
      number
      image
      types
    }
  }
`;

export const useGetPokemons = () => {
  const { data, ...queryRes } = useQuery(GET_POKEMONS, {
    variables: {
      first: 151, // Keep hard coded
    },
  });

  const pokemons: Pokemon[] = useMemo(() => data?.pokemons || [], [data]);

  const pokemonOptions: PokemonOption[] = useMemo(
    () => pokemons.map((p: Pokemon) => ({ value: p.id, label: p.name })),
    [pokemons]
  );

  return {
    pokemons,
    pokemonOptions,
    ...queryRes,
  };
};

export type PokemonDetails = {
  id: string;
  name: string;
  number: number;
  image: string;
  types: string[];
  classification: string;
  weaknesses: string[];
  resistant:  string[];
  fleeRate: number;
  weight: {
    minimum: number;
    maximum: number;
  };
  height: {
    minimum: number;
    maximum: number;
  }
};

export const GET_POKEMON_DETAILS = gql`
  query pokemon($id: String, $name: String){
  pokemon(id: $id, name: $name){
    id
    number
    name
    weight{
      minimum
      maximum
    }
    height{
      minimum
      maximum
    }
    classification
    types
    resistant
    weaknesses
    fleeRate
    maxCP
    maxHP
    image
  }
}
`;

export const useGetPokemonDetails = (id: string, name: string) => {
  const { data, ...queryRes } = useQuery(GET_POKEMON_DETAILS, {
    variables: {
      id, name
    },
  });

  const pokemonDetails: PokemonDetails = data?.pokemon;

  return {
    pokemonDetails,
    ...queryRes,
  };
};
