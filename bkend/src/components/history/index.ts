import IField from "../../interfaces/IField"

class Node<F extends IField, Move> {
  field: F
  move: Move
}

export class History<F extends IField, M extends object> {
  private stack: Array<Node<F, M>>
}