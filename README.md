Interview question!
The scrabble problem
========
The point of this is to be a test of a candidate's ability to solve difficult problems, code, and use git properly.

To run the application
========
Make sure have yarn installed (or npm)

    yarn install
    yarn build
    yarn run


Expectations of the Developer
========
You need to solve the following problem.

Given a hand, consisting of 1 to 7 (inclusive) characters: [a-z] and *, produce all the vaild words that you could create.  In order to be considered a word, the word needs to be in the supplied dictionary (dictionary.json).

The * character is a wild card character and can be any character from [a-z].

Make sure you create your own branch and make a pull request for this test.



    class ScrabbleHand {
      constructor(dict) {
        this._dict = dict.dictionary;
        //If you want to make modifications to the dictionary or convert it to something else
        //do so here
      }

      solveHand(tiles) {
          //TODO: Code goes here
          return [];
        }
      }
    }


Test Values
------

I have included a couple of tests at the bottom of index.js in order to help you understand what the expected output should be.  Passing those does not mean you have discovered all of the edge cases.

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

