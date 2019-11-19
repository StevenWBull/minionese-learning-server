class _Node {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  insertFirst(item) {
    this.head = new _Node(item, this.head);
  }

  insertLast(item) {
    if (this.head === null) {
      this.insertFirst(item);
    } else {
      let tempNode = this.head;
      while (tempNode.next !== null) {
        tempNode = tempNode.next;
      }
      tempNode.next = new _Node(item, null);
    }
  }

  insertAt(item, index) {
    if (index < 0)
      return 'Please choose a positive index';

    if (!this.head)
      return this.insertFirst(item);

    if (this.head.value === index -1)
      return this.insertFirst(item);

    let counter = 0;
    let currentNode = this.head;
    let previousNode = this.head;

    while ((counter !== index -1) && (currentNode !== null)) {
      previousNode = currentNode;
      currentNode = currentNode.next;
      counter++;
    }
    if (currentNode === null) {
      return 'Index does not exist';
    } else {
      let newNode = new _Node(item, previousNode.next);
      previousNode.next = newNode;
    }
  }

  find(item) {
    let currNode = this.head;
    if (!this.head) {
      return null;
    }
    while (currNode.value !== item) {
      if (currNode.next === null) {
        return null;
      } else {
        currNode = currNode.next;
      }
    }
    return currNode;
  }

  remove(item) {
    if (!this.head) {
      return null;
    }
    if (this.head.value === item) {
      this.head = this.head.next;
      return;
    }
    let currNode = this.head;
    let previousNode = this.head;
    while ((currNode !== null) && (currNode.value !== item)) {
      previousNode = currNode;
      currNode = currNode.next;
    }
    if (currNode === null) {
      return;
    }
    previousNode.next = currNode.next;
  }
}

module.exports = LinkedList;