import React, { useEffect, useState } from 'react';
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import { createUseStyles } from 'react-jss';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import { useGetPokemons } from '../../hooks/useGetPokemons';
import { debounce } from '../../utils';

export const PokemonList = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [urlSearchParams, setURLSearchParams] = useSearchParams();
  const { pokemons, loading } = useGetPokemons();

  const [searchText, setSearchText] = useState("");
  const [filteredPokemons, setFilteredPokemons] = useState(pokemons);

  useEffect(() => {
    setSearchText(urlSearchParams.get("search") || "");
  }, [urlSearchParams]);

  useEffect(() => {
    debounce(() => {
      setFilteredPokemons(pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(searchText.toLowerCase())))
    }, 1000)();
  }, [pokemons, searchText])

  const onSearch = (e: any) => {
    const value = e.target.value;
    setURLSearchParams(createSearchParams({ search: value }).toString())
  }

  const openDetails = (id: string, name: string) => {
    navigate({ pathname: `/pokemon/${id}/${name}`, search: createSearchParams({ search: searchText }).toString() });
  }

  return (
    <div className={classes.root}>
      {loading ? <div>Loading...</div>
        : <>
          <Form className={classes.searchForm}>
            <Form.Control type="text" value={searchText} placeholder="Search pokemon" data-bs-theme="dark" onChange={onSearch} />
          </Form>

          <ListGroup className={classes.list} as="ul" data-bs-theme="dark">
            {filteredPokemons.map((pkmn) => (
              <ListGroup.Item
                as="li"
                className={classes.listItem}
                onClick={() => openDetails(pkmn.id, pkmn.name)}
              >
                <div className={classes.listItemImageDiv}>
                  <Image className={classes.listItemImage} src={pkmn.image} rounded />
                </div>
                <div className="d-flex flex-column align-items-start ms-2">
                  <div className="fw-bold">{pkmn.number} {pkmn.name}</div>
                  <div>
                    {pkmn.types.map(type => <Badge className="me-1" bg="secondary">
                      {type}
                    </Badge>)}
                  </div>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </>}
    </div>
  );
};

const useStyles = createUseStyles(
  {
    root: {
      width: '100%',
      padding: '32px',
      textAlign: "center",
      boxSizing: 'border-box',
    },
    searchForm: {
      width: "50%",
      margin: "0 auto",
      marginBottom: "1rem"
    },
    list: {
      height: "100%",
      width: "50%",
      margin: "0 auto",
    },
    listItem: {
      display: "flex",
      flexDirection: "row",
      alignItems: "start",
      marginBottom: "1rem",
      cursor: "pointer",
      transition: ".5s ease all",
      '&:hover': {
        transform: "scale(1.1)"
      }
    },
    listItemImageDiv: {
      width: "100px",
      height: "100px",
    },
    listItemImage: {
      width: "100%",
      height: "100%"
    }
  },
  { name: 'PokemonList' }
);
