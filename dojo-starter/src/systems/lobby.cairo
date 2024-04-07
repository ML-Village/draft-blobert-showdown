use starknet::{ContractAddress};

#[dojo::interface]
trait ILobby<TContractState> {
    fn register_player(self: @TContractState, name: felt252);
    fn choose_blobert(self: @TContractState,blobert_1: u8, blobert_2: u8, blobert_3:u8, blobert_4:u8, blobert_5: u8, blobert_6:u8);
    fn find_battle(
        self: @TContractState,
        challenger: ContractAddress,
        message: felt252,
        wager_coin: u8,
        wager_value: u256,
        expire_seconds: u64
    ) -> u128;
}

#[dojo::contract]
mod lobby {
    use super::{ILobby};

    use starknet::{ContractAddress, get_caller_address, get_block_timestamp};
    use dojo_starter::models::{blobert::Blobert, player::Player, game::Game};
    use dojo_starter::types::game::{GameState};
    use dojo_starter::utils::timestamp::{timestamp};
    use dojo_starter::systems::game_id_generate::{make_seed};
    use dojo_starter::systems::utils::{zero_address};

    #[abi(embed_v0)]
    impl LobbyImpl of ILobby<ContractState> {
        fn register_player(self: @ContractState, name: felt252) {
            let caller: ContractAddress = starknet::get_caller_address();

            let mut player: Player = get!(self.world(), caller, Player);

            if (player.timestamp == 0) {
                player.timestamp = get_block_timestamp();
            }

            player.name = name;
            set!(self.world(), (player));
            return ();
        }

        fn choose_blobert(self: @ContractState, blobert_1: u8, blobert_2: u8, blobert_3:u8, blobert_4:u8, blobert_5: u8, blobert_6:u8){
            let caller: ContractAddress = starknet::get_caller_address();
            let mut player: Player = get!(self.world(), caller, Player);
            player.blobert_1 = blobert_1;
            player.blobert_2 = blobert_2;
            player.blobert_3 = blobert_3;
            player.blobert_4 = blobert_4;
            player.blobert_5 = blobert_5;
            player.blobert_6 = blobert_6;
            set!(self.world(), (player));
            return ();
        }

        fn find_battle(
            self: @ContractState,
            challenger: ContractAddress,
            message: felt252,
            wager_coin: u8,
            wager_value: u256,
            expire_seconds: u64
        ) -> u128 {
            //check if the challenger address is empty
            assert(challenger != zero_address(), 'Missing challenged address');
            assert(
                expire_seconds == 0 || expire_seconds >= timestamp::from_hours(1),
                'Invalid expire_seconds'
            );

            let caller: ContractAddress = starknet::get_caller_address();

            let player: Player = get!(self.world(), caller, Player);
            assert(player.name != 0, 'Challenger not registered');
            assert(caller != challenger, 'Challenging thyself, you fool!');

            //create the battle
            let game_id: u128 = make_seed(caller);

            // calc expiration
            let timestamp_start: u64 = get_block_timestamp();
            let timestamp_end: u64 = if (expire_seconds == 0) {
                0
            } else {
                timestamp_start + expire_seconds
            };

            let challenge = Game {
                game_id,
                player_a: caller,
                player_b: challenger,
                message,
                // progress
                state: GameState::Awaiting.into(),
                round_number: 0,
                winner: 0,
                // times
                timestamp_start, // chalenge issued
                timestamp_end, // expire
            };

            (game_id)
        }
    }
}
