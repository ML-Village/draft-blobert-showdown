use starknet::ContractAddress;

// The shot of each player on a Round
#[derive(Copy, Drop, Serde, Introspect)]
struct Moves {
    #[key]
    player_id: ContractAddress,
    #[key]
    blobert_id: u8,
    // player input
    hash: u64,          // hashed action (salt + action)
    salt: u64,          // the player's secret salt
    action: u16,        // the player's chosen action(s) (paces, weapon, ...)
    // shot results
    chance_crit: u8,    // computed chances (1..100) - kill / double damage
    damage: u8,         // amount of health taken
    block: u8,          // amount of damage blocked
    win: u8,            // wins the round
    // player state
    health: u8,         // final health
}