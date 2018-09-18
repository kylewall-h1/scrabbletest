
import * as fs from 'fs';

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
    this._dictTree = this._generateTree(this._dict);
  }


  /**
   * Create combination of characters to match subsets.
   */
  _recursiveCombos(string) {
    var results = [];
  
    // If Char length is only one just return
    if (string.length === 1) {
      results.push(string);
      return results;
    }
  
    for (var i = 0; i < string.length; i++) {
      var firstChar = string[i];
      var charsLeft = string.substring(0, i) + string.substring(i + 1);
      var innerPermutations = this._recursiveCombos(charsLeft);
      for (var j = 0; j < innerPermutations.length; j++) {
        results.push(firstChar + innerPermutations[j]);
      }
    }
    return results;
  }


  /**
   * 
   * @param {Array} chars 
   * @returns {Array} Results of words with possible output.
   */
  _search(chars) {

    let results = [];

    // Find all possible combinations of the given tiles.
    const combinations = this._recursiveCombos(chars.join(""));

    combinations.forEach((charset) => {
      let currentNode = this._dictTree;
      charset.split("").forEach((char,index) => {
        
        if(currentNode.children[char]) {
          currentNode = currentNode.children[char]
          if(currentNode.results) {
            results = [...results, ...currentNode.results]  
          }
        }
      });
    })  
    return results;
  }


  /**
   * 
   */
  _generateTree(dictionary) {
    let tree = {
      children: {}
    };
    
    dictionary.forEach(word => {
      // Break each word by character sort them alphabetically.
      var charArraySorted = word.split("").sort();

      // Set starting point.
      let currentNode = tree;
    
      // Loop through each character and build an ordered node structure.
      charArraySorted.forEach((char,index) => {

        // Create a node to inject in the main tree.
        let nextNode = currentNode.children[char] ? currentNode.children[char] : {
          children: {}
        }

        // Switch the current working node.
        currentNode.children[char] = nextNode
        currentNode = nextNode;
      });

      // Create a results array for each word that uses the following characters.
      if(currentNode.results === undefined) {
        currentNode.results = [];
      }
      currentNode.results.push(word);

    })
    return tree;
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
    let searchResults = [];

    // Are there any wild cards in the tiles?
    if(tiles.indexOf("*") > - 1) {
      
      // Set possible count of wild cards
      const wildCardPossibilities = 26;
      
      // Count wildcard and return a single value if no wildcards exist.
      let wildTileCount = tiles.split("*").length - 1;

      // Remove wild tiles from array.
      let wildTilesRemoved = tiles.split("*").join("").split("")
      let wildTiles = [];
      for(let i = 0; wildTileCount > i; i++) {
        wildTiles.unshift("a")
        for(let atCharCode = 1; wildCardPossibilities >= atCharCode; atCharCode++) {
          wildTiles[0] = String.fromCharCode(atCharCode + 96);
          searchResults.push(this._search([...wildTiles, ...wildTilesRemoved].sort()));
        }
      }
      
    } else {
      searchResults = this._search(tiles.split("").sort());
    }

    if(searchResults.length > 1) { 
      searchResults = [].concat(...searchResults); 
    } 
    return [...new Set(searchResults)].sort(); // set a list of unique answers }
  }
}

let sh = new ScrabbleHand(dictionary);
const output = sh.solveHand('*bt');

if(output.indexOf('bat') === -1 
|| output.indexOf('bet') === -1 
|| output.indexOf('bit') === -1 
|| output.indexOf('but') === -1
|| output.indexOf('tab') === -1
|| output.indexOf('tub') === -1)
{
  console.log( "FAIL" );
} else {
  console.log( "PASS" );
}

const output2 = sh.solveHand('abcd');

if(output2.indexOf('a') === -1
|| output2.indexOf('bad') === -1 
|| output2.indexOf('cab') === -1 
|| output2.indexOf('cad') === -1
|| output2.indexOf('dab') === -1)
{
  console.log( "FAIL" );
} else {
  console.log( "PASS" );
}

const output3 = sh.solveHand('adicel*');

if(output3.indexOf('adze') === -1
|| output3.indexOf('daze') === -1 
|| output3.indexOf('laze') === -1 
|| output3.indexOf('lazed') === -1
|| output3.indexOf('zeal') === -1)
{
  console.log( "FAIL" );
} else {
  console.log( "PASS" );
}