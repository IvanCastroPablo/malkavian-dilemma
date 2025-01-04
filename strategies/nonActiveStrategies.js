const {
    random,
} = require('../source/utils')

function _conservative() {
    if (this.pool <= 15) {
        this.choice = 1;
    } else {
        this.choice = 2;
    }
}

function _aggressive() {
    if (this.pool <= 15) {
        this.choice = 3;
    } else {
        this.choice = 4;
    }
}

function _clever() {
    if (this.pool == 1) {
        this.choice = (3 + random(2));
    } else if (1 < this.pool && this.pool < 5) {
        this.choice = (1 + random(3));
    } else {
        this.choice = (1 + random(4));
    }
}

function _randomChoice() {
    this.choice = (1 + random(4));
}

function _nonactivetest() {
    this.choice = 777;
}

module.exports = {
    _conservative,
    _aggressive,
    _clever,
    _randomChoice,
    _nonactivetest 
}