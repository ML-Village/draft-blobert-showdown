use starknet::ContractAddress;

#[derive(Model, Copy, Drop, Serde)]
struct Game {
    #[key]
    game_id: u128,
    player_a: ContractAddress,
    player_b: ContractAddress,
    message: felt252,
    state: u8,
    round_number: u8,
    winner: u8,
    // timestamps in unix epoch
    timestamp_start: u64,
    timestamp_end: u64,
}
