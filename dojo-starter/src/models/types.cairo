use starknet::ContractAddress;

//this will be the pokemon types
#[derive(Model, Drop, Serde)]
struct BlobertTypes {
    #[key]
    blobert_id: u8,
    blobert_type: Type
}

#[derive(Serde, Copy, Drop, Introspect)]
enum Type {
    Fire,
    Water,
    Grass,
    Wind,
    Dark,
    Light
}

impl TypeIntoFelt252 of Into<Type, felt252> {
    fn into(self: Type) -> felt252 {
        match self {
            Type::Fire => 0,
            Type::Water => 1,
            Type::Grass => 2,
            Type::Wind => 3,
            Type::Dark => 4,
            Type::Light => 5
        }
    }
}
