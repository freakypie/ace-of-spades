state = {};

function game_start() {
    // get list of players

    turns_loop();
}

function turns_loop() {
    while(!game_over){
        for(player in players){
            state.set_player(player);
            take_turn();
        }
    }
}

function take_turn() {
    upkeep();
    main();
    turn_end();
}

function upkeep() {
    for(var player in state.current_player_order()) {
        for(var permanent in state.get_permanents()) {
            permanent.upkeep();
        }
    }
}

function main() {
    //allow actions
}

function turn_end() {
    for(var player in state.current_player_order()) {
        for(var permanent in state.get_permanents()) {
            permanent.turn_end();
        }
    }
}