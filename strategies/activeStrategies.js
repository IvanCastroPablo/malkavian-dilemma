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
    if (global.opponent.pool < 15) {
        this.guess = 6
    } else {
        this.guess = 10
    }
}

module.exports = {
    _optimist,
    _delusional,
    _pessimist,
    _aleatory,
    _test
}