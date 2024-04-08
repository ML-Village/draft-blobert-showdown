mod ATTACK {
    const DAMAGE: u8 = 10;

    #[derive(Copy, Drop, Serde, PartialEq, Introspect)]
    enum Attack {
        Idle, 
        Move_1,
        Move_2,
        Move_3,
        Move_4
    }
    
    trait AttackTrait {
        fn execute_attack(self: Attack, ref self_moves: Moves, ref other_moves: Moves) -> bool;
    }
    
    //TODO: Calculate the damage base on whcih type is super effective
    fn execute_attack(self: Action,ref self_moves: Moves, ref other_moves: Moves){
        
    }
}