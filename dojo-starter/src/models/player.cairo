use starknet::ContractAddress;
use dojo_starter::models::blobert::{blobert_1::Blobert_1,blobert_2::Blobert_2,blobert_3::Blobert_3,blobert_4::Blobert_4,blobert_5::Blobert_5,blobert_6::Blobert_6};


#[derive(Model, Drop, Serde)]
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

