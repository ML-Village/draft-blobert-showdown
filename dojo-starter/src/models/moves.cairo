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
    // damage results
    damage: u16,         // amount of health taken
    win: u8,            // wins the round
}