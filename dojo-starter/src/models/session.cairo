use starknet::ContractAddress;
use dojo_starter::models::player::Player;
use dojo_starter::models::blobert::{blobert_1::Blobert_1,blobert_2::Blobert_2,blobert_3::Blobert_3,blobert_4::Blobert_4,blobert_5::Blobert_5,blobert_6::Blobert_6};


#[derive(Model, Drop, Serde)]
struct Player_Session {
    #[key]
    game_id: u128,
    #[key]
    player_address: ContractAddress,
    player: Player,
    current_blobert: u8,
    blobert_1: Blobert_1,
    blobert_2: Blobert_2,
    blobert_3: Blobert_3,
    blobert_4: Blobert_4,
    blobert_5: Blobert_5,
    blobert_6: Blobert_6,
}