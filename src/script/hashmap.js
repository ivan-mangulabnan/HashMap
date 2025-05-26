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

    if (hashCode < 0 || hashCode >= this.#capacity) {
      throw new Error("Trying to access index out of bounds");
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

  remove (key) {
    const index = this.hash(key);

    if (!this.#list[index]) return false;

    let curr = this.#list[index];
    let prev;

    while(curr) {
      if (curr.key === key) {
        break;
      }
      prev = curr;
      curr = curr.next;
    }
    
    if (curr.key !== key) return false;

    if (prev) {
      prev.next = curr.next;
      return true;
    } else {
      this.#list[index] = curr.next;
    }

    return true;
  }

  length () {
    let count = 0;

    for (let i = 0; i < this.#list.length; i++) {
      if (this.#list[i]) {
        let temp = this.#list[i];
        while(temp) {
          count++;
          temp = temp.next;
        }
      }
    }

    return count;
  }

  clear () {
    this.#list = [];
  }

  keys () {
    const keys = [];

    this.#list.forEach(node => {
      if (node.key) {
        let temp = node;

        while (temp) {
          keys.push(temp.key);
          temp = temp.next;
        }
      }
    })

    return keys;
  }

  values () {
    const keys = [];

    this.#list.forEach(node => {
      if (node.key) {
        let temp = node;

        while (temp) {
          keys.push(temp.value);
          temp = temp.next;
        }
      }
    })

    return keys;
  }

  get list () {
    return this.#list;
  }
}