// #[dojo::interface]
// trait IBattleSystem {
//     fn start();
//     fn battle();
// }

// #[dojo::contract]
// mod battleSystem {
//     use super::{IBattleSystem};

//     use starknet::{ContractAddress, get_caller_address};

//     #[abi(embed_v0)]
//     impl BattleSystemImpl of IBattleSystem<ContractState> {
//         fn start(world: IWorldDispatcher) {
//             //Get the address of the current caller, possibly the player's address.
//             let player = get_caller_address();
//         }
//     }
// }

