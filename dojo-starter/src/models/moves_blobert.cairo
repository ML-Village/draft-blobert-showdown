use starknet::ContractAddress;

#[derive(Model, Drop, Serde)]
struct Moves {
    #[key]
    blobert_id: u8,
    move_1: MovesAttack,
    move_2: MovesAttack,
    move_3: MovesAttack,
    move_4: MovesAttack,
}

#[derive(Serde, Copy, Drop, Introspect)]
enum MoveType {
    Normie,
    Tradoor,
    Influenza,
    VC,
    Dev,
    Gaming
}

impl MoveTypeIntoFelt252 of Into<MoveType, felt252> {
    fn into(self: MoveType) -> felt252{
        match self {
            MoveType::Normie => 'Normie',
            MoveType::Tradoor => 'Tradoor',
            MoveType::Influenza => 'Influenza',
            MoveType::VC => 'VC',
            MoveType::Dev => 'Dev',
            MoveType::Gaming => 'Gaming'
        }
    }
}

#[derive(Model, Drop, Serde)]
struct MovesAttack {
    #[key]
    move_id: u8,
    move_type: MoveType
    damage: u16
}





