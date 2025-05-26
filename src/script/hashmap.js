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
    const index = this.hash(key);

    if (this.#list[index]) {
      const target = this.#list[index];

      let temp = target;

      while(temp) {
        if (temp.key === key || !temp.next) {
          break;
        }
        temp = temp.next;
      }

      if (temp.key === key) {
        temp.value = value;
        return;
      }

      temp.next = new Node(key, value);
      return;
    }

    const node = new Node(key, value);
    this.#list[index] = node;
  }

  get (key) {
    const index = this.hash(key);

    if (!this.#list[index]) return null;

    const target = this.#list[index];
    let temp = target;

    while(temp) {
      if (temp.key === key) {
        break;
      }
      temp = temp.next;
    }

    return temp ? temp.value : null;
  }

  has (key) {
    const index = this.hash(key);

    if (!this.#list[index]) return false;

    let temp = this.#list[index];

    while(temp) {
      if (temp.key === key) return true;
      temp = temp.next;
    }

    return false;
  }

  get list () {
    return this.#list;
  }
}