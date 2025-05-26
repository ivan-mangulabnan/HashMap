class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

export class HashMap {

  #list = [];
  #capacity = 16;
  #loadFactor = 0.75;

  hash (key) {
    let hashCode = 0;
      
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.#capacity;
    }

    return hashCode;
  }

  set (key, value) {
    const node = new Node(key, value);
    const index = this.hash(key);
    this.#list[index] = node;
    return this.#list;
  }

  get list () {
    return this.#list;
  }
}