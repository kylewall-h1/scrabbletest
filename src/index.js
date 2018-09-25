
import * as fs from 'fs';
import Trie from './trie';

// pull in the data dictionary
let rawdata = fs.readFileSync('./dictionary.json');
let dictionary = JSON.parse(rawdata);

class ScrabbleHand {

  /*
    the constructor takes a dictionary (array of strings)
    with all the valid words.
  */
  constructor(dict) {
    this._dict = dict.dictionary;
    this._tree = new Trie();

    this._buildTree();
  }

  /**
   * build initial Trie tree
   * @return {undefined}
   */
  _buildTree() {
    this._dict.forEach(word => {
      this._tree.add(word);
    });
  }

  /**
   * helper method to remove a tile from list of tiles
   * @param {String} tiles - all available tiles
   * @param {Number} index - index of tile to remove
   * @return {String}
   */
  _removeTile(tiles, index) {
    return tiles.slice(0, index) + tiles.slice(index + 1, tiles.length);
  }

  /**
   * recursive search through the tree for each tile available
   * @param {String} tiles - all available tiles
   * @param {Node} node - current node of tree
   * @param {String} prefix - current prefix
   * @return {Array}
   */
  _search(tiles, node, prefix) {
    const storage = [];

    // if current prefix is a valid word, add to our list
    if (node.isFullWord()) {
      storage.push(prefix);
    }

    // base case
    if (tiles.length === 0) {
      return storage;
    }

    for (let index = 0; index < tiles.length; index++) {
      // handle wildcard
      if (tiles[index] === '*') {

        for (let j = 97; j < 123; j++) {
          const char = String.fromCharCode(j);
          const child = node.getChild(char);
          if (child) {
            // remove current tile for next search
            const newTiles = this._removeTile(tiles, index);
            // recurse down tree for this new prefix
            const results = this._search(newTiles, child, prefix + char);
            storage.push(...results);
          }
        }

      } else {

        const child = node.getChild(tiles[index]);
        if (child) {
          // remove current tile for next search
          const newTiles = this._removeTile(tiles, index);
          // recurse down tree for this new prefix
          const results = this._search(newTiles, child, prefix + tiles[index]);
          storage.push(...results);
        }

      }
    }
    // remove duplicates and return results
    return [...new Set(storage)];
  }

  /*
  Solve hand takes a string parameter "tiles" consisting of 1 to 7 (inclusive) characters: [a-z] and *
  The * character you can consider a wild card tile.  It can be used as any
  character.

  Solve hand should return an array of strings of ALL possible legitimate words

  If the wild card was used, the output should replace the wild character with the actual character required for the
  word.

  Example
  instead of "b*t"
  the output would be "bat"

  */
  solveHand(tiles) {
    const solutions = this._search(tiles, this._tree.getRoot(), '');
    return solutions;
  }
}

const sh = new ScrabbleHand(dictionary);
const output = sh.solveHand('abcd');

if(output.indexOf('a') === -1
|| output.indexOf('bad') === -1
|| output.indexOf('cab') === -1
|| output.indexOf('cad') === -1
|| output.indexOf('dab') === -1)
{
  console.log( "FAIL" );
} else {
  console.log( "PASS" );
}

const output2 = sh.solveHand('*bt');

if(output2.indexOf('bat') === -1
|| output2.indexOf('bet') === -1
|| output2.indexOf('bit') === -1
|| output2.indexOf('but') === -1
|| output2.indexOf('tab') === -1
|| output2.indexOf('tub') === -1)
{
  console.log( "FAIL" );
} else {
  console.log( "PASS" );
}