const {
    random,
} = require('../source/utils')

function _optimist() {
    this.guess = (3 + random(2));
}

function _delusional() {
    this.guess = 4;
}

function _pessimist() {
    this.guess = (1 + random(2));
}

function _aleatory() {
    this.guess = (1 + random(4));
}

function _test() {
    if (opponent.name == "Crosstable" && opponent.pool <= 4) {
        this.guess = 1;
    } else if (opponent.name == "Crosstable" && opponent.pool > 4) {
        this.guess = (1 + random(4));
    } else if (opponent.name == "Prey" && opponent.pool > 4){
        this.guess = 4;
    } else if (opponent.name == "Prey" && (opponent.pool >= 2 && opponent.pool <= 4) && NonActivePlayer.nonActiveRegistry.length == 3 && crosstable.pool <= 7) {
        this.guess = (1 + random(3));
    } else if (opponent.name == "Prey" && (opponent.pool >= 2 && opponent.pool <= 4) && NonActivePlayer.nonActiveRegistry.length == 2 && opponent.pool <= 7){
        this.guess = (1 + random(3));
    } else if (opponent.name == "Grandprey" && opponent.pool <= 4) {
        this.guess = 1;
    } else if (opponent.name == "Grandprey" && opponent.pool > 4) {
        this.guess = (1 + random(4));
    } else if (opponent.name == "Predator" && opponent.pool <= 4) {
        this.guess = 1;
    } else if (opponent.name == "Predator" && opponent.pool > 4) {
        this.guess = (1 + random(4));
    } else {
        this.guess = (3 + random(2));
    }
}

module.exports = {
    _optimist,
    _delusional,
    _pessimist,
    _aleatory,
    _test
}