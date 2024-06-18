import { motion, useAnimation } from "framer-motion";
import { useState, useEffect } from "react";
import SpriteAnimation from "../components/SpriteAnimation";
import ProjectileAnimation from "../components/ProjectileAnimation";

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
      "nftinfluenza.png",
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
      "gameinfluenza.png",
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
      "airdropinfluenza.png",
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
const TwoPlayer = () => {
  const [gameOver, setGameOver] = useState(false);
  const [battleLog, setBattleLog] = useState<string[]>([]);
  const [commentText, setCommentText] = useState("");

  // Player1
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [showFightButtons, setShowFightButtons] = useState(true);
  const [showMoveButtons, setShowMoveButtons] = useState(false);
  const [showPokemonButtons, setShowPokemonButtons] = useState(false);

  // Player 2
  const [player2PokemonList, setPlayer2PokemonList] = useState<Pokemon[]>([]);
  const [player2Pokemon, setPlayer2Pokemon] = useState<Pokemon | null>(null);
  const [player2ShowFightButtons, setPlayer2ShowFightButtons] = useState(true);
  const [player2ShowMoveButtons, setPlayer2ShowMoveButtons] = useState(false);
  const [player2ShowPokemonButtons, setPlayer2ShowPokemonButtons] =
    useState(false);

  // Framer motion animation
  const charizardControls = useAnimation();
  const blastoiseControls = useAnimation();
  const [isProjectileVisible, setIsProjectileVisible] = useState(false);
  const [projectilePosition, setProjectilePosition] = useState({ x: 0, y: 0 });
  const [projectileRotation, setProjectileRotation] = useState(0);
  const [projectileSrc, setProjectileSrc] = useState("");
  const [isProjectileFlipped, setIsProjectileFlipped] = useState(false);
  const projectileControls = useAnimation();
  const charizardPosition = { x: 240, y: 320 };
  const blastoisePosition = { x: 600, y: 200 };

  useEffect(() => {
    initializeBattle();
  }, []);

  const initializeBattle = () => {
    const player1 = pkmList.map((pkm) => new Pokemon(...pkm));
    const player2 = pkmList.map((pkm) => new Pokemon(...pkm));

    // Modify sprites for player 1 (rear) and player 2 (front)
    player1.forEach((pokemon) => {
      pokemon.sprite = pokemon.sprite.replace(".png", "-REAR.png");
    });

    player2.forEach((pokemon) => {
      pokemon.sprite = pokemon.sprite.replace(".png", "-FRONT.png");
    });

    setPokemonList(player1);
    setPlayer2PokemonList(player2);

    setSelectedPokemon(player1[2]); // Initialize player 1's selected Pokemon
    setPlayer2Pokemon(player2[0]); // Initialize player 2's selected Pokemon
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

  const handlePlayer2FightClick = () => {
    setPlayer2ShowFightButtons(false);
    setPlayer2ShowMoveButtons(true);
  };

  const handlePlayer2PokemonClick = () => {
    setPlayer2ShowFightButtons(false);
    setPlayer2ShowMoveButtons(false);
    setPlayer2ShowPokemonButtons(true);
  };

  const handlePlayer2PokemonSelect = (pokemonName: string) => {
    const selectedPokemon = player2PokemonList.find(
      (pokemon) => pokemon.name === pokemonName
    );
    if (selectedPokemon) {
      setPlayer2Pokemon(selectedPokemon);
      setPlayer2ShowPokemonButtons(false);
      setPlayer2ShowFightButtons(true);
    }
  };

  const handlePlayer2AfterMove = () => {
    setPlayer2ShowMoveButtons(false);
    setPlayer2ShowFightButtons(true);
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

    // Clear the comment after the attack has been displayed and logged
    setTimeout(() => {
      setCommentText("");
      if (receiverId === "selectedPokemon") {
        handlePlayer2AfterMove();
      } else {
        handleAfterMove();
      }
    }, 2000);

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
    // } else {
    //   setPk2((prevPk2) => prevPk2 && { ...prevPk2, hp });
    }
  };

  const checkWinner = () => {
    const loser =
      selectedPokemon && selectedPokemon.hp <= 0
        ? selectedPokemon
        : player2Pokemon && player2Pokemon.hp <= 0
        ? player2Pokemon
        : false;
    if (loser) {
      setGameOver(true);
      updatePokemonHp(
        loser === selectedPokemon ? "selectedPokemon" : "player2Pokemon",
        0
      );
      setTimeout(() => {
        alert(`GAME OVER: ${loser.name} fainted!`);
        addToBattleLog(`GAME OVER: ${loser.name} fainted!`);
      }, 1500);
    }
  };

  const handleTackle = async (
    attacker: any,
    defender: any,
    attackerControls: any,
    defenderControls: any
  ) => {
    const movementDistance = 20;
    await attackerControls.start({
      x: attacker === "charizard" ? -movementDistance : movementDistance,
      transition: { duration: 0.2 },
    });
    await attackerControls.start({
      x:
        attacker === "charizard" ? movementDistance * 2 : -movementDistance * 2,
      transition: { duration: 0.2 },
    });
    await defenderControls.start({
      x: 10,
      opacity: 0,
      transition: {
        duration: 0.08,
        yoyo: Infinity,
        repeat: 5,
        repeatType: "mirror",
      },
    });
    await attackerControls.start({ x: 0, transition: { duration: 0.1 } });
  };

  const handleProjectile = async (
    attacker: any,
    defender: any,
    attackerPosition: any,
    defenderPosition: any,
    projectileName: string
  ) => {
    setIsProjectileVisible(true);
    setProjectilePosition(attackerPosition);
    setProjectileRotation(attacker === "charizard" ? 60 : 40);
    setProjectileSrc(
      projectileName === "fireball" ? "fireball.png" : "wave-Sheet.png"
    );
    setIsProjectileFlipped(attacker === "blastoise");

    await projectileControls.start({
      x: attackerPosition.x,
      y: attackerPosition.y,
      opacity: 1,
      transition: { duration: 0 },
    });
    await projectileControls.start({
      x: defenderPosition.x - attackerPosition.x,
      y: defenderPosition.y - attackerPosition.y,
      transition: {
        duration: projectileName === "surf" ? 1 : 0.5, // Adjust the duration for surf projectile
      },
    });
    await (attacker === "charizard"
      ? blastoiseControls
      : charizardControls
    ).start({
      x: 10,
      opacity: 0,
      transition: {
        duration: 0.08,
        yoyo: Infinity,
        repeat: 5,
        repeatType: "mirror",
      },
    });
    await (attacker === "charizard"
      ? blastoiseControls
      : charizardControls
    ).start({
      x: 0,
      opacity: 1,
      transition: { duration: 0.2 },
    });
    setIsProjectileVisible(false);
  };

  return (
    <>
      <div className="h-screen bg">
        <div className="flex justify-around">
          <div className="flex flex-col">
            <div className="relative">
              <img src="forest.png " alt="" />
              <div className="absolute inset-0 flex items-center justify-around">
                <div className=" mt-44 ml-24">
                  {selectedPokemon && (
                    <>
                      <p className="text-xl font-bold mb-2">
                        HP: {selectedPokemon.hp}/{selectedPokemon.fullhp}
                      </p>
                      <motion.div animate={charizardControls}>
                        <SpriteAnimation
                          animationDuration={0.4}
                          frameCount={4}
                          spriteSheetUrl={selectedPokemon.sprite}
                        />
                      </motion.div>
                    </>
                  )}
                </div>
                <div className=" mb-24 mr-40">
                  {player2Pokemon && (
                    <>
                      <p className="text-xl font-bold mb-2">
                        HP: {player2Pokemon.hp}/{player2Pokemon.fullhp}
                      </p>
                      <motion.div animate={blastoiseControls}>
                        <SpriteAnimation
                          animationDuration={0.4}
                          frameCount={4}
                          spriteSheetUrl={player2Pokemon.sprite}
                        />
                      </motion.div>
                    </>
                  )}
                </div>
              </div>
              <div className="absolute left-0 bottom-0 bg-white p-4 rounded-lg shadow-md w-96 h-14">
                <p className="text-lg font-semibold mb-2">{commentText}</p>
              </div>
              {isProjectileVisible && (
                <motion.div
                  className="absolute"
                  animate={projectileControls}
                  style={{
                    top: projectilePosition.y,
                    left: projectilePosition.x,
                    transform: `rotate(${projectileRotation}deg)`,
                  }}
                >
                  <ProjectileAnimation
                    animationDuration={0.4}
                    frameCount={4}
                    spriteSheetUrl={projectileSrc}
                    rotation={projectileRotation}
                    isFlipped={isProjectileFlipped}
                  />
                </motion.div>
              )}
            </div>

            <div className="flex justify-between mt-1">
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
                        onClick={() => {
                          attack(
                            move,
                            selectedPokemon,
                            player2Pokemon!,
                            "pk2",
                            "Player 1 "
                          );

                          if (index % 2 === 1) {
                            // Check if index is odd
                            handleTackle(
                              "charizard",
                              "blastoise",
                              charizardControls,
                              blastoiseControls
                            );
                          } else {
                            // Index is even
                            handleProjectile(
                              "charizard",
                              "blastoise",
                              charizardPosition,
                              blastoisePosition,
                              "fireball"
                            );
                          }
                        }}
                      >
                        {move[0]}
                      </button>
                    ))}
                    <button
                      className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
                      onClick={() => {
                        setShowFightButtons(true);
                        setShowMoveButtons(false);
                      }}
                    >
                      Back
                    </button>
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
                    <button
                      className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
                      onClick={() => {
                        setShowFightButtons(true);
                        setShowPokemonButtons(false);
                      }}
                    >
                      Back
                    </button>
                  </div>
                )}
              </div>
              <div className="flex flex-col items-center">
                {player2ShowFightButtons && (
                  <div className="flex gap-4 mb-4">
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                      onClick={handlePlayer2FightClick}
                    >
                      Fight
                    </button>
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                      onClick={handlePlayer2PokemonClick}
                    >
                      Pokemon
                    </button>
                  </div>
                )}
                {player2ShowMoveButtons && (
                  <div className="grid grid-cols-2 gap-4">
                    {player2Pokemon?.moves.map((move, index) => (
                      <button
                        key={index}
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                        onClick={() => {
                          attack(
                            move,
                            player2Pokemon,
                            selectedPokemon!,
                            "selectedPokemon",
                            "Player 2 "
                          );

                          if (index % 2 === 1) {
                            // Check if index is odd
                            handleTackle(
                              "blastoise",
                              "charizard",
                              blastoiseControls,
                              charizardControls
                            );
                          } else {
                            // Index is even
                            handleProjectile(
                              "blastoise",
                              "charizard",
                              blastoisePosition,
                              charizardPosition,
                              "surf"
                            );
                          }
                        }}
                      >
                        {move[0]}
                      </button>
                    ))}
                    <button
                      className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
                      onClick={() => {
                        setPlayer2ShowFightButtons(true);
                        setPlayer2ShowMoveButtons(false);
                      }}
                    >
                      Back
                    </button>
                  </div>
                )}
                {player2ShowPokemonButtons && (
                  <div className="grid grid-cols-3 gap-4">
                    {pokemonList.map((pokemon, index) => (
                      <button
                        key={index}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handlePlayer2PokemonSelect(pokemon.name)}
                      >
                        {pokemon.name}
                      </button>
                    ))}
                    <button
                      className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
                      onClick={() => {
                        setPlayer2ShowFightButtons(true);
                        setPlayer2ShowPokemonButtons(false);
                      }}
                    >
                      Back
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="w-[25rem] h-[31.25rem] bg-white p-4 rounded-lg shadow-md mt-8 overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Battle Log</h2>
            {battleLog.map((message, index) => (
              <p key={index} className="mb-2">
                {message}
              </p>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TwoPlayer;
