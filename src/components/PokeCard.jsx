export const PokeCard = ({ handleCardClick, hidden, pokemon }) => {

  const onCardClick = () => {
    handleCardClick(pokemon.name);
  }

  return (
    <div className="card" onClick={onCardClick}>
      <img src={pokemon.sprites.front_default} style={{ visibility: hidden ? 'hidden' : 'visible' }} />
      <div className="card-title" style={{ visibility: hidden ? 'hidden' : 'visible' }}>
        <h3>{pokemon.name}</h3>
      </div>
    </div>
  );
};
