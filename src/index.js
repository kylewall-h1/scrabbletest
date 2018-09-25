
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
    return [];
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
