const poke_container = document.getElementById("poke-container");
const pokemon_count = 150;
const colors = {
  fire: "#fdd",
  grass: "#dfe",
  electric: "#ffd",
  water: "#dff",
  ground: "#fed",
  rock: "#ddd",
  fairy: "#fef",
  poison: "#9da",
  bug: "#fda",
  dragon: "#9be",
  psychic: "#eea",
  flying: "#fff",
  fighting: "#eed",
  normal: "#fff",
};

const main_types = Object.keys(colors);
console.log(main_types);

const fetchPokemons = async () => {
  for (let i = 1; i <= pokemon_count; i++) {
    await getPokemon(i);
  }
};

const getPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  createPokemonCard(data);
};

const createPokemonCard = (pokemon) => {
  const pokemonEl = document.createElement("div");
  pokemonEl.classList.add("pokemon");

  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);

  const poke_types = pokemon.types.map((type) => type.type.name);
  const type = main_types.find((type) => poke_types.indexOf(type) > -1);
  const color = colors[type];

  pokemonEl.style.backgroundColor = color;

  const pokemonInnerHTML = `
        <div class="img-container">
          <img
            src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png"
            alt=""
          />
        </div>
        <div class="info">
          <div class="number">#${pokemon.id}</div>
          <h3 class="name">${name}</h3>
          <small class="type">Type: <span>${type}</span></small>
        </div>
    `;

  pokemonEl.innerHTML = pokemonInnerHTML;
  poke_container.appendChild(pokemonEl);
};

fetchPokemons();
