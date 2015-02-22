var tiles = require('../proto/tiles');
var sets = require('../proto/sets');
var _ = require('lodash');

function ParsedHand() {
    this.sets = [];
    this.pairs = [];
    this.isFinishedHand = false;
    // special hands
    this.isKokushi = false;
    this.isChiitoitsu = false;
}

function countTiles(hand) {
    var map = {};
    _.each(hand, function(tile) {
        map[tile] = map[tile] === undefined ? 1 : map[tile] + 1;
    });

    return map;
}

/**
 *
 * @param hand Состав руки
 * @param explicitSets Открытые и объявленные сеты
 */
function splitToSets(hand, explicitSets) {
    var result = new ParsedHand();
    result.sets = result.sets.concat(explicitSets || []);
    var counts = countTiles(hand);

    // 0) check for chiitoitsu
    result.isChiitoitsu = true;
    _.each(counts, function(value) {
        if (value != 2) {
            result.isChiitoitsu = false;
        }
    });
    if (result.isChiitoitsu) {
        _.each(counts, function(value, key) {
            result.pairs.push(sets.pair(tiles[key]));
        });
        return result;
    }

    // 1) find all honor pairs and sets
    _.each(counts, function(value, key) {
        if (_.contains(['chun', 'haku', 'hatsu', 'ton', 'nan', 'sha', 'pei'], key)) {
            switch (value) {
                case 2:
                    result.sets.push(sets.pair(tiles[key]));
                    break;
                case 3:
                    result.sets.push(sets.pon(tiles[key]));
                    break;
            }
        }
    });

    // 2) find all sequences

    console.log(foundSets);
}

module.exports = splitToSets;