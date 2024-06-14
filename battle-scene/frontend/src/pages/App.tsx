import { useState, useEffect } from "react";

// Pokemon class
class Pokemon {
  name: string;
  sprite: string;
  hp: number;
  fullhp: number;
  moves: [string, string, number, number?][];

  constructor(
    name: string,
    sprite: string,
    hp: number,
    moves: [string, string, number, number?][]
  ) {
    this.name = name;
    this.sprite = sprite;
    this.hp = hp;
    this.fullhp = hp;
    this.moves = moves;
  }
}

// Pokemon list and type match data
const pkmList: [string, string, number, [string, string, number, number?][]][] =
  [
    [
      "Charizard",
      "https://img.pokemondb.net/sprites/black-white/normal/charizard.png",
      360,
      [
        ["Flamethrower", "fire", 95, 0.95],
        ["Dragon Claw", "dragon", 80, 0.95],
        ["Air slash", "fly", 75, 0.85],
        ["Slash", "normal", 70],
      ],
    ],
    [
      "Blastoise",
      "https://img.pokemondb.net/sprites/black-white/normal/blastoise.png",
      362,
      [
        ["Surf", "water", 90, 0.95],
        ["Crunch", "normal", 80, 0.95],
        ["Ice punch", "ice", 75, 0.95],
        ["Flash cannon", "steel", 80, 0.95],
      ],
    ],
    [
      "Venusaur",
      "https://img.pokemondb.net/sprites/black-white/normal/venusaur-f.png",
      364,
      [
        ["Petal Blizzard", "grass", 90, 0.95],
        ["Sludge bomb", "poison", 90, 0.95],
        ["Earthquake", "ground", 100, 0.95],
        ["Body Slam", "normal", 85, 0.95],
      ],
    ],
  ];

const typeMatch: Record<string, [string[], string[], string[]]> = {
  Charizard: [["ground"], ["water", "rock"], ["fire", "grass", "steel"]],
  Blastoise: [[""], ["grass"], ["fire", "water"]],
  Venusaur: [["poison"], ["fire", "fly", "ice", "steel"], ["grass", "water"]],
};

// Battle component
const OnePlayer = () => {
  const [gameOver, setGameOver] = useState(false);
  const [pk2, setPk2] = useState<Pokemon | null>(null);
  const [battleLog, setBattleLog] = useState<string[]>([]);
  const [commentText, setCommentText] = useState("");
  const [showFightButtons, setShowFightButtons] = useState(true);
  const [showMoveButtons, setShowMoveButtons] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [showPokemonButtons, setShowPokemonButtons] = useState(false);
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);

  useEffect(() => {
    initializeBattle();
  }, []);

  const initializeBattle = () => {
    const pokemonList = pkmList.map((pkm) => new Pokemon(...pkm));
    setPokemonList(pokemonList);
    setSelectedPokemon(pokemonList[0]);
    setPk2(spawnPokemon());
  };

  const spawnPokemon = () => {
    const randomPokemon = pkmList[Math.floor(Math.random() * pkmList.length)];
    return new Pokemon(...randomPokemon);
  };

  const addToBattleLog = (message: string) => {
    setBattleLog((prevLog) => [...prevLog, message]);
  };

  const handleFightClick = () => {
    setShowFightButtons(false);
    setShowMoveButtons(true);
  };

  const handlePokemonClick = () => {
    setShowFightButtons(false);
    setShowMoveButtons(false);
    setShowPokemonButtons(true);
  };

  const handlePokemonSelect = (pokemonName: string) => {
    const selectedPokemon = pokemonList.find(
      (pokemon) => pokemon.name === pokemonName
    );
    if (selectedPokemon) {
      setSelectedPokemon(selectedPokemon);
      setShowPokemonButtons(false);
      setShowFightButtons(true);
    }
  };

  const handleAfterMove = () => {
    setShowMoveButtons(false);
    setShowFightButtons(true);
  };

  const attack = (
    move: [string, string, number, number?],
    attacker: Pokemon,
    receiver: Pokemon,
    receiverId: string,
    owner: string
  ) => {
    if (gameOver || attacker.hp <= 0 || receiver.hp <= 0) {
      return;
    }

    const actionText = `${owner}${attacker.name} used ${move[0]}!`;
    setCommentText(actionText);
    addToBattleLog(actionText);

    if (Math.random() < (move[3] || 1)) {
      const power = move[2] + Math.floor(Math.random() * 10);
      const rtype = typeMatch[receiver.name];
      const mtype = move[1];
      let scale = 1;

      for (let i = 0; i < rtype.length; i++) {
        if (rtype[i].includes(mtype)) {
          scale = getScaleBasedOnType(i);
          break;
        }
      }

      const damage = Math.floor(power * scale);
      receiver.hp = Math.max(0, receiver.hp - damage);
      updatePokemonHp(receiverId, receiver.hp);
    } else {
      setTimeout(() => {
        setCommentText("Attack missed!");
        addToBattleLog("Attack missed!");
      }, 1000);
    }

    // Opponent's attack
    if (receiverId === "pk2" && !gameOver && pk2 && pk2.hp > 0) {
      setTimeout(() => {
        const opponentMove =
          pk2.moves[Math.floor(Math.random() * pk2.moves.length)];
        attack(opponentMove, pk2, selectedPokemon!, "selectedPokemon", "Foe ");
      }, 2000);
    }

    // Clear the comment after both the attack and opponent's move have been displayed and logged
    setTimeout(() => {
      setCommentText("");
      handleAfterMove();
    }, 4000);

    checkWinner();
  };

  const getScaleBasedOnType = (index: number) => {
    switch (index) {
      case 0:
        setTimeout(() => {
          setCommentText("It had no effect!");
          addToBattleLog("It had no effect!");
        }, 1000);
        return 0;
      case 1:
        setTimeout(() => {
          setCommentText("It was super effective!");
          addToBattleLog("It was super effective!");
        }, 1000);
        return 2;
      case 2:
        setTimeout(() => {
          setCommentText("It was not very effective!");
          addToBattleLog("It was not very effective!");
        }, 1000);
        return 0.5;
      default:
        return 1;
    }
  };

  const updatePokemonHp = (pokemonId: string, hp: number) => {
    if (pokemonId === "selectedPokemon") {
      setPokemonList((prevList) =>
        prevList.map((pokemon) =>
          pokemon.name === selectedPokemon?.name ? { ...pokemon, hp } : pokemon
        )
      );
    } else {
      setPk2((prevPk2) => prevPk2 && { ...prevPk2, hp });
    }
  };

  const checkWinner = () => {
    const loser =
      selectedPokemon && selectedPokemon.hp <= 0
        ? selectedPokemon
        : pk2 && pk2.hp <= 0
        ? pk2
        : false;
    if (loser) {
      setGameOver(true);
      updatePokemonHp(loser === selectedPokemon ? "selectedPokemon" : "pk2", 0);
      setTimeout(() => {
        alert(`GAME OVER: ${loser.name} fainted!`);
        addToBattleLog(`GAME OVER: ${loser.name} fainted!`);
      }, 1500);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="flex justify-center gap-8 mb-8">
        <div className="flex flex-col items-center">
          {selectedPokemon && (
            <>
              <p className="text-xl font-bold mb-2">
                HP: {selectedPokemon.hp}/{selectedPokemon.fullhp}
              </p>
              <img
                src={selectedPokemon.sprite}
                alt={selectedPokemon.name}
                className="w-48 h-48"
              />
            </>
          )}
        </div>
        <div className="flex flex-col items-center">
          {pk2 && (
            <>
              <p className="text-xl font-bold mb-2">
                HP: {pk2.hp}/{pk2.fullhp}
              </p>
              <img src={pk2.sprite} alt={pk2.name} className="w-48 h-48" />
            </>
          )}
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md mb-8 w-96">
        <p className="text-lg font-semibold mb-2">{commentText}</p>
      </div>
      <div className="flex flex-col items-center">
        {showFightButtons && (
          <div className="flex gap-4 mb-4">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              onClick={handleFightClick}
            >
              Fight
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              onClick={handlePokemonClick}
            >
              Pokemon
            </button>
          </div>
        )}
        {showMoveButtons && (
          <div className="grid grid-cols-2 gap-4">
            {selectedPokemon?.moves.map((move, index) => (
              <button
                key={index}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                onClick={() => attack(move, selectedPokemon, pk2!, "pk2", "")}
              >
                {move[0]}
              </button>
            ))}
          </div>
        )}
        {showPokemonButtons && (
          <div className="grid grid-cols-3 gap-4">
            {pokemonList.map((pokemon, index) => (
              <button
                key={index}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
                onClick={() => handlePokemonSelect(pokemon.name)}
              >
                {pokemon.name}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md mt-8">
        <h2 className="text-xl font-bold mb-4">Battle Log</h2>
        {battleLog.map((message, index) => (
          <p key={index} className="mb-2">
            {message}
          </p>
        ))}
      </div>
    </div>
  );
};

export default OnePlayer;