

#[dojo::contract]
mod battleSystem {

    use starknet::{ContractAddress, get_caller_address};
    use dojo_starter::models::game::Game;
    use dojo_starter::models::round::Round;
    use dojo_starter::types::game::GameState;
    use dojo_starter::types::round::RoundState;

    fn _assert_challenge(world: IWorldDispatcher, caller: ContractAddress, game_id: u128, round_number: u8) -> (Game, u8) {
        let game: Game = get!(world, game_id, Game);

        let player_number: u8 = if (game.player_a == caller) { 1 } else if (game.player_b == caller) { 2 } else { 0 };
        assert(player_number == 1 || player_number == 2, 'Not your Challenge!');

        assert(game.state == GameState::InProgress.into(), 'Challenge is not in Progress');
        assert(game.round_number == round_number, 'Bad Round Number');

        (game, player_number)
    }

    // fn commit_move(world: IWorldDispatcher, game_id: u128, round_number: u8, hash: u64){
    //     let caller: ContractAddress = starknet::get_caller_address();

    //     let(_game, _player_number) = _assert_challenge(world, caller, game_id, round_number);

    //     let round: Round = get!(world, (game_id, round_number), Round);
    //     assert(round.state == RoundState::Commit.into(), 'Round not in Commit');

    //     //Validate action hash WORK IN PROGRESS
    //     if (_player_number == 1) {
    //         assert(round.shot_a.hash == 0, 'Already committed');
    //         round.shot_a.hash = hash;
    //     } else if (_player_number == 2) {
    //         assert(round.shot_b.hash == 0, 'Already committed');
    //         round.shot_b.hash = hash;
    //     }
    // }
}

