use starknet::ContractAddress;

#[derive(Model, Drop, Serde)]
struct SideEffects {
    #[key]
    player_address: ContractAddress,
    pokemon_id: u8
}

#[derive(Serde, Copy, Drop, Introspect)]
enum SideEffectType {
    Burn,
    Paralyzed,
    Frozen,
    Sleep,
    Poison,
    Confusion,
    Flinch
}

impl SideEffectTypeIntoFelt252 of Into<SideEffectType, felt252> {
    fn into(self: SideEffectType) -> felt252 {
        match self {
            SideEffectType::Burn => 0,
            SideEffectType::Paralyzed => 1,
            SideEffectType::Frozen => 2,
            SideEffectType::Sleep => 3,
            SideEffectType::Poison => 4,
            SideEffectType::Confusion => 5,
            SideEffectType::Flinch => 6
        }
    }
}
