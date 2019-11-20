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
      let new_item = { ...item, next: currentNode.next.value.id };
      let newNode = new _Node(new_item, previousNode.next);
      previousNode.next = newNode;
      previousNode.next.value.next = newNode.value.id;
    }
  }

  insertAfter(item, key) {
    if (!this.head)
      return this.insertFirst(item);

    let currentNode = this.head;

    while ((currentNode.value.id !== key) && (currentNode !== null)) {
      currentNode = currentNode.next;
    }
    if (currentNode === null) {
      return 'Key not found';
    } else {
      let new_item = { ...item, next: currentNode.next.value.id };
      let newNode = new _Node(new_item, currentNode.next);
      currentNode.next = newNode;
      currentNode.value.next = newNode.value.id;
    }
  }

  findNode(item) {
    let currNode = this.head;
    if (!this.head) {
      return null;
    }
    while (currNode.value.original !== item) {
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

/* const main = () => {
  const sll = new LinkedList();
  sll.insertFirst(
    {
      id: 1,
      language_id: 1,
      original: 'bello',
      translation: 'hello',
      next: 2,
      memory_value: 1,
      correct_count: 0,
      incorrect_count: 0
    });
  console.log(sll.findNode(1));
}

main(); */

module.exports = LinkedList;
