class TrieNode {
    constructor() {
      this.children = {};
      this.isEndOfWord = false;
    }
  }
  
export class Trie{
  constructor() {
    this.root = new TrieNode();
    this.count = 0;
  }

  insert(word) {
    let node = this.root;
    for (let char of word) {
      if (!(char in node.children)) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }
    if (!node.isEndOfWord) {
      node.isEndOfWord = true;
      this.count += 1;
    }
  }

  search(word) {
    let node = this.root;
    for (let char of word) {
      if (!(char in node.children)) {
        return false;
      }
      node = node.children[char];
    }
    return node.isEndOfWord;
  }

  startsWithPrefix(prefix) {
    let node = this.root;
    for (let char of prefix) {
      if (!(char in node.children)) {
        return false;
      }
      node = node.children[char];
    }
    return Object.keys(node.children).length > 0;
  }

  _traverseRecursively(node, currentWord, wordsList) {
    if (node.isEndOfWord) {
      wordsList.push(currentWord);
    }
    for (let [char, childNode] of Object.entries(node.children)) {
      this._traverseRecursively(childNode, currentWord + char, wordsList);
    }
  }

  traverse() {
    const wordsList = [];
    this._traverseRecursively(this.root, '', wordsList);
    return wordsList;
  }
}
