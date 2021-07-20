function reverseList(head) {
  let currentNode = null;
  let headNode = head;
  while(head && head.next) {
    currentNode = head.next;
    head.next = currentNode.next;
    currentNode.next = headNode;
    headNode = currentNode;
  }
  return headNode;
}