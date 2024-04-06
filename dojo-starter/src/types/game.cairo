use traits::Into;
use debug::PrintTrait;

#[derive(Copy, Drop, Serde, PartialEq, Introspect)]
enum GameState {
    Null,
    Awaiting,
    Withdrawn,
    Refused,
    Expired,
    InProgress,
    Resolved,
}

mod GAME_STATE {
    const NULL: u8 = 0;
    const AWAITING: u8 = 1;
    const WITHDRAWN: u8 = 2;
    const REFUSED: u8 = 3;
    const EXPIRED: u8 = 4;
    const IN_PROGRESS: u8 = 5;
    const RESOLVED: u8 = 6;
}

trait GameStateTrait {
    fn exists(self: GameState) -> bool;
    fn canceled(self: GameState) -> bool;
    fn ongoing(self: GameState) -> bool;
    fn finished(self: GameState) -> bool;
}

impl GameStateTraitImpl of GameStateTrait {
    fn exists(self: GameState) -> bool {
        match self {
            GameState::Null => false,
            GameState::Awaiting => true,
            GameState::Withdrawn => true,
            GameState::Refused => true,
            GameState::Expired => true,
            GameState::InProgress => true,
            GameState::Resolved => true,
        }
    }
    fn canceled(self: GameState) -> bool {
        match self {
            GameState::Null => false,
            GameState::Awaiting => false,
            GameState::Withdrawn => true,
            GameState::Refused => true,
            GameState::Expired => true,
            GameState::InProgress => false,
            GameState::Resolved => false,
        }
    }
    fn ongoing(self: GameState) -> bool {
        match self {
            GameState::Null => false,
            GameState::Awaiting => true,
            GameState::Withdrawn => false,
            GameState::Refused => false,
            GameState::Expired => false,
            GameState::InProgress => true,
            GameState::Resolved => false,
        }
    }
    fn finished(self: GameState) -> bool {
        match self {
            GameState::Null => false,
            GameState::Awaiting => false,
            GameState::Withdrawn => false,
            GameState::Refused => false,
            GameState::Expired => false,
            GameState::InProgress => false,
            GameState::Resolved => true,
        }
    }
}

impl GameStateIntoU8 of Into<GameState, u8> {
    fn into(self: GameState) -> u8 {
        match self {
            GameState::Null => GAME_STATE::NULL,
            GameState::Awaiting => GAME_STATE::AWAITING,
            GameState::Withdrawn => GAME_STATE::WITHDRAWN,
            GameState::Refused => GAME_STATE::REFUSED,
            GameState::Expired => GAME_STATE::EXPIRED,
            GameState::InProgress => GAME_STATE::IN_PROGRESS,
            GameState::Resolved => GAME_STATE::RESOLVED,
        }
    }
}

impl TryU8IntoGameState of TryInto<u8, GameState> {
    fn try_into(self: u8) -> Option<GameState> {
        if self == GameState::NULL {
            Option::Some(GameState::Null)
        } else if self == GAME_STATE::AWAITING {
            Option::Some(GameState::Awaiting)
        } else if self == GAME_STATE::WITHDRAWN {
            Option::Some(GameState::Withdrawn)
        } else if self == GAME_STATE::REFUSED {
            Option::Some(GameState::Refused)
        } else if self == GAME_STATE::EXPIRED {
            Option::Some(GameState::Expired)
        } else if self == GAME_STATE::IN_PROGRESS {
            Option::Some(GameState::InProgress)
        } else if self == GAME_STATE::RESOLVED {
            Option::Some(GameState::Resolved)
        } else {
            Option::None
        }
    }
}

impl GameStateIntoFelt252 of Into<GameState, felt252> {
    fn into(self: GameState) -> felt252 {
        match self {
            GameState::Null => 0,
            GameState::Awaiting => 'Awaiting',
            GameState::Withdrawn => 'Withdrawn',
            GameState::Refused => 'Refused',
            GameState::Expired => 'Expired',
            GameState::InProgress => 'InProgress',
            GameState::Resolved => 'Resolved',
        }
    }
}

impl TryFelt252IntoGameState of TryInto<felt252, GameState> {
    fn try_into(self: felt252) -> Option<GameState> {
        if self == 0 {
            Option::Some(GameState::Null)
        } else if self == 'Awaiting' {
            Option::Some(GameState::Awaiting)
        } else if self == 'Withdrawn' {
            Option::Some(GameState::Withdrawn)
        } else if self == 'Refused' {
            Option::Some(GameState::Refused)
        } else if self == 'Expired' {
            Option::Some(GameState::Expired)
        } else if self == 'InProgress' {
            Option::Some(GameState::InProgress)
        } else if self == 'Resolved' {
            Option::Some(GameState::Resolved)
        } else {
            Option::None
        }
    }
}

impl PrintGameState of PrintTrait<GameState> {
    fn print(self: GameState) {
        let num: felt252 = self.into();
        num.print();
    // let num: u8 = self.into();
    // num.print();
    }
}
