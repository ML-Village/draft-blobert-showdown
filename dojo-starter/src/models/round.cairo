#[derive(Model, Copy, Drop, Serde)]
struct Round {
    #[key]
    duel_id: u128,
    #[key]
    round_number: u8,
    //---------------
    state: u8,      // actually a RoundState
    // move_a: Move,   // duelist_a shot
    // move_b: Move,   // duelist_b shot
}
