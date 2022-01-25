class Node<F, Move> {
  field: F
  move: Move
}

export class History<F, M> {
  private stack: Array<Node<F, M>>
}