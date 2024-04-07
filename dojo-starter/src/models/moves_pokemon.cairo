use starknet::ContractAddress;

#[derive(Model, Drop, Serde)]
struct Moves {
    #[key]
    pokemon_id: u8,
    moves: MovesAttack
    type: TypeAttack
    damage: u8
}

#[derive(Serde, Copy, Drop, Introspect)]
enum MovesAttack {
    Ember,
    LeafCut,
    WaterGun,
}

#[derive(Serde, Copy, Drop, Introspect)]
enum TypeAttack {
    Special,
    Physical
}

trait MovesTrait{
    fn get_attack(self MovesAttack) -> felt252
}



impl MovesAttackIntoFelt252 of Into<MovesAttack, felt252> {
    fn into(self: MovesAttack) -> felt252 {
        match self {
            MovesAttack::Ember => 0,
            MovesAttack::LeafCut => 1,
            MovesAttack::WaterGun => 2
        }
    }
}

