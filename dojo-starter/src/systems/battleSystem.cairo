

#[dojo::contract]
mod battleSystem {

    use starknet::{ContractAddress, get_caller_address};
    use dojo_starter::models::game::Game;
    use dojo_starter::models::round::Round;
    use dojo_starter::types::game::GameState;
    use dojo_starter::types::round::RoundState;
    use dojo_starter::models::session::Player_Session;
    use dojo_starter::models::moves::Moves;

    const DAMAGE: u8 = 10;

    fn _assert_challenge(world: IWorldDispatcher, caller: ContractAddress, game_id: u128, round_number: u8) -> (Game, u8) {
        let game: Game = get!(world, game_id, Game);

        let player_number: u8 = if (game.player_a == caller) { 1 } else if (game.player_b == caller) { 2 } else { 0 };
        assert(player_number == 1 || player_number == 2, 'Not your Challenge!');

        assert(game.state == GameState::InProgress.into(), 'Challenge is not in Progress');
        assert(game.round_number == round_number, 'Bad Round Number');

        (game, player_number)
    }

    fn commit_move(world: IWorldDispatcher, game_id: u128, round_number: u8, hash: u64){
        let caller: ContractAddress = starknet::get_caller_address();

        let(_game, _player_number) = _assert_challenge(world, caller, game_id, round_number);

        let mut round: Round = get!(world, (game_id, round_number), Round);
        assert(round.state == RoundState::Commit.into(), 'Round not in Commit');

        //Validate action hash WORK IN PROGRESS
        if (_player_number == 1) {
            assert(round.move_a.hash == 0, 'Already committed');
            round.move_a.hash = hash;
        } else if (_player_number == 2) {
            assert(round.move_b.hash == 0, 'Already committed');
            round.move_b.hash = hash;
        }

        //Finished commit
        if(round.move_a.hash != 0 && round.move_b.hash != 0){
            round.state = RoundState::Reveal.into();
        }

        set!(world, (round));
    }

    //Decide who wins a round, or go to next
    fn process_round(world: IWorldDispatcher, ref game: Game, ref round: Round, is_last_round: bool){
        let mut executed: bool = false;
        // executed = attack_sync(world, game.player_a, game.player_b, round, ref round.move_a, ref round.move_b, false, game.game_id, );

    }

    fn attack_sync(world: IWorldDispatcher, attacker: ContractAddress, enemy: ContractAddress, round: Round, ref attack: Moves, ref enemy_attack: Moves,sync: bool, game_id: u128, attacker_blobert_id: u8, enemy_blobert_id: u8) -> bool {
        let mut executed: bool = attack(world, game_id, attacker, attacker_blobert_id,round, ref attack);
        if(sync || !executed){
            executed = attack(world, game_id, enemy, enemy_blobert_id,round, ref enemy_attack) || executed;
        }
        (executed)
    }


    fn attack(world: IWorldDispatcher, game_id: u128, attacker: ContractAddress, blobert_id: u8 ,round: Round, ref attack: Moves) -> bool {
        //commit the move on chain 
        let game: Game = get!(world, game_id, Game);
        let mut player_a: Player_Session = get!(world, (game_id, game.player_a), Player_Session);
        let mut player_b: Player_Session = get!(world, (game_id, game.player_b), Player_Session);
        if(attacker == player_a.player_address){
            if(player_b.current_blobert == 1){
                player_b.blobert_1.health -= DAMAGE;
            }else if(player_b.current_blobert == 2){
                player_b.blobert_2.health -= DAMAGE;
            }else if(player_b.current_blobert == 3) {
                player_b.blobert_3.health -= DAMAGE;
            }else if(player_b.current_blobert == 4){
                player_b.blobert_4.health -= DAMAGE;
            }else if(player_b.current_blobert == 5){
                player_b.blobert_5.health -= DAMAGE;
            }else{
                player_b.blobert_6.health -= DAMAGE;
            }

            //set the state to waiting for player b

            set!(world, (player_a, player_b));

            return true;
        }else if(attacker == player_b.player_address){
            if(player_a.current_blobert == 1){
                player_a.blobert_1.health -= DAMAGE;
            }else if(player_a.current_blobert == 2){
                player_a.blobert_2.health -= DAMAGE;
            }else if(player_a.current_blobert == 3) {
                player_a.blobert_3.health -= DAMAGE;
            }else if(player_a.current_blobert == 4){
                player_a.blobert_4.health -= DAMAGE;
            }else if(player_a.current_blobert == 5){
                player_a.blobert_5.health -= DAMAGE;
            }else{
                player_a.blobert_6.health -= DAMAGE;
            }

            //set the state to waiting fdor player a

            set!(world, (player_a, player_b));

            return true;
        }else{
            return false;
        }
    }
}

