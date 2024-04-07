mod systems {
    mod game_id_generate;
    mod utils;
    mod lobby;
    mod battleSystem;
}

mod types {
    mod game;
    mod blobert;
    mod round;
}

mod models {
    mod moves;
    mod position;
    mod blobert{
        mod blobert_1;
        mod blobert_2;
        mod blobert_3;
        mod blobert_4;
        mod blobert_5;
        mod blobert_6;
    }
    mod side_effect;
    mod types;
    mod game;
    mod player;
    mod round;
}

mod tests {
    mod test_world;
}

mod utils {
    mod timestamp;
    mod hash;
}
