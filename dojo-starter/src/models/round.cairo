use dojo_starter::models::moves::Moves;

#[derive(Model, Copy, Drop, Serde)]
struct Round {
    #[key]
    duel_id: u128,
    #[key]
    round_number: u8,
    //---------------
    state: u8,      // actually a RoundState
    move_a: Moves,   // duelist_a shot
    move_b: Moves,   // duelist_b shot
}
