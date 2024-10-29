import React, { useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import { createSearchParams, useNavigate, useParams, useSearchParams } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image';
import Badge from 'react-bootstrap/Badge';
import { useGetPokemonDetails } from "../../hooks/useGetPokemons";

export const PokemonDetails = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const { id, name }: any = useParams();
    const [urlSearchParams] = useSearchParams();
    const [searchText, setSearchText] = useState("");
    useEffect(() => {
        setSearchText(urlSearchParams.get("search") || "");
    }, [urlSearchParams]);

    const { pokemonDetails, loading } = useGetPokemonDetails(id, name);

    if (loading) {
        return <div className={classes.loader}>Loading...</div>
    }

    return (
        <Modal data-bs-theme="dark" show={true} fullscreen={true} onHide={() => navigate({ pathname: "/pokemon", search: createSearchParams({ search: searchText }).toString() })}>
            <Modal.Header closeButton>
                <Modal.Title>{pokemonDetails.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body className={classes.body}>
                <Image src={pokemonDetails.image} fluid />
                <div className={classes.detailsDiv}>
                    <div>Classification: {pokemonDetails.classification}</div>
                    <div>Flee Rate: {pokemonDetails.fleeRate}</div>
                    <div>Weaknesses: {pokemonDetails.weaknesses.join(", ")}</div>
                    <div>Height Range in between {pokemonDetails.height.minimum} to {pokemonDetails.height.maximum}</div>
                    <div>Weight Range in between {pokemonDetails.weight.minimum} to {pokemonDetails.weight.maximum}</div>
                    <div>Resistant to {pokemonDetails.resistant.join(", ")}</div>
                    <div>
                        {pokemonDetails.types.map(type => <Badge className="me-1" bg="secondary">
                            {type}
                        </Badge>)}
                    </div>
                </div>
            </Modal.Body>
        </Modal>

    )
}

const useStyles = createUseStyles(
    {
        loader: {
            width: '100%',
            padding: '32px',
            textAlign: "center",
            boxSizing: 'border-box',
        },
        body: {
            display: "flex",
            flexDirection: "row"
        },
        detailsDiv: {
            marginLeft: "1rem",
            "div": {
                marginBottom: "1rem"
            }
        }
    },
    { name: 'PokemonDetails' }
);