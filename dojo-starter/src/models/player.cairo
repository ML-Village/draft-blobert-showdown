use starknet::ContractAddress;
use dojo_starter::models::blobert::{Blobert};


#[derive(Model, Copy, Drop, Serde)]
struct Player {
    #[key]
    address: ContractAddress,
    blobert_1: u8,
    blobert_2: u8,
    blobert_3: u8,
    blobert_4: u8,
    blobert_5: u8,
    blobert_6: u8,
    name: felt252,
    profile_pic: u8,
    total_duels: u16,
    total_wins: u16,
    total_losses: u16,
    timestamp: u64, // Unix time, 1st registered
}

