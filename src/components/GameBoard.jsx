import { useEffect, useState } from "react";
import { pokeUrls } from "../constants";
import { PokeCard } from './PokeCard'

const GameBoard = () => {
    const [pokemon, setPokemon] = useState([]);
    const [score, setScore] = useState(0);
    const [selectedCards, setSelectedCards] = useState([]);
    const [foundCards, setFoundCards] = useState([]);
  
    useEffect(() => {
      const fetchPokemon = async() => {
        try {
          const pokeList = [];
          const arrayOfPromises = pokeUrls.map(url => fetch(url));
  
          for await (const request of arrayOfPromises) {
            const data = await request.json();
            // Add duplicate to the pokeList so there are 2 cards on the board
            pokeList.push(data);
            pokeList.push(data);
  
            // Shuffle the pokeList before setting to state
            // Fisher-Yates shuffle algorithm
            for (let i = pokeList.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [pokeList[i], pokeList[j]] = [pokeList[j], pokeList[i]];
            }
          }
  
          setPokemon(pokeList);
        }
        catch (error) {
          console.error(error);
        }
      }
  
      fetchPokemon();
    }, [])

    const checkIfMatch = (pokemonName) => {
      if(selectedCards.length > 1) {
        const pair = selectedCards.filter((cardName) => cardName === pokemonName);
        if(pair.length > 1) {
          setScore(prevScore => prevScore + 1);
          setFoundCards(selectedCards);
          setSelectedCards([]);
        }
        else {
          setSelectedCards([]);
        }
      }
    }

    const handleCardClick = (_event, pokemonName) => {
      console.log(pokemonName);
      console.log(selectedCards);

      if(selectedCards.length === 0) {
        setSelectedCards([pokemonName]);
      }
      else {
        const newCards = [...selectedCards].concat(pokemonName);
        setSelectedCards(newCards);
        checkIfMatch(pokemonName);
      }
    }

    const shouldHide = (pokemonName) => {
      if(foundCards.includes(pokemonName) || selectedCards.includes(pokemonName)) {
        return false;
      }
      else {
        return true;
      }
    }
  
    return (
      <>
       <div id="score-board">
          <h3>Score: {score}</h3>
        </div>
      <div id="game-board">
        {pokemon?.map((p, i) => <PokeCard key={`p.name${i}`} pokemon={p} hidden={shouldHide(p.name)} handleCardClick={(_event) => handleCardClick(_event, p.name)}></PokeCard>)}
      </div>
      </>
    )
  }

  export default GameBoard;