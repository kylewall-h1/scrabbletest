
class Node {
  constructor() {
    // use a hash for referencing children of this node for faster lookup
    this._children = {};
    this._isTail = false;
  }

  /**
   * get the char child node, if any
   * @param {String} char - character to look for
   * @return {Node|undefined} child node or undefined
   */
  getChild(char) {
    return this._children[char];
  }

  /**
   * add child node
   * @param {String} char - character to add as a child for this node
   * @return {undefined}
   */
  addChild(char) {
    const child = new Node(char);
    this._children[char] = child;
  }

  /**
   * check if this node is considered a full word
   * @return {Boolean}
   */
  isFullWord() {
    return this._isTail;
  }

  /**
   * set this node to be considered as a full word
   * @return {undefined}
   */
  setFullWord() {
    this._isTail = true;
  }
}

class Trie {
  constructor() {
    this._root = new Node();
  }

  getRoot() {
    return this._root;
  }

  /**
   * add a word to the trie
   * @param {String} word - word to add to trie
   * @return {undefined}
   */
  add(word) {
    const characters = word.split('');
    let currentNode = this._root;

    characters.forEach(char => {
      const child = currentNode.getChild(char);
      if (child) {
        currentNode = child;
      } else {
        currentNode.addChild(char);
        currentNode = currentNode.getChild(char);
      }
    });

    // we reached the end of this path, so set `isFullWord` to true
    currentNode.setFullWord();
  }
}

export default Trie;