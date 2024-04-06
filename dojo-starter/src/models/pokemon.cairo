use starknet::ContractAddress;
use dojo_starter::models::{types::PokemonTypes, side_effect::SideEffectType};

//this will be the pokemon
#[derive(Model, Drop, Serde)]
struct Pokemon {
    #[key]
    pokemon_id: u8,
    health: u8,
    pokemon_type: PokemonTypes,
    pokemon_side_effect: SideEffectType,
}

#[derive(Serde, Copy, Drop, Introspect)]
enum PokemonGen1 {
    Charmander,
    Bulbasaur,
    Squirtle
}

