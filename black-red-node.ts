export default class TreeNode<T> {
    public color: "red" | "black" = "red";
    public key: number;
    public left: TreeNode<T> | null = null;
    public parent: TreeNode<T> | null = null;
    public right: TreeNode<T> | null = null;
    public value?: T;
  
    constructor({
      key,
      value,
      parent = null,
    }: {
      key: number;
      value?: T;
      parent?: TreeNode<T> | null;
    }) {
      this.key = key;
      this.value = value;
      this.parent = parent;
    }
  
    public isleaf(){
      return this.left === null && this.right === null
    }
  
    public rotateLeft(){
      const pivot = this;
      const right = this.right;
      // const c = right ? right.left : null; operador ternario 
      if (right){
        const c = right.left;
        right.left = pivot;
        pivot.right = c
      }
  
      return right
    }
  
    public rotaterigth(){
      const pivot = this;
      const left = this.left;
  
      if (left){
        const d = left.right;
        left.right = pivot;
        pivot.left = d;
      }
  
      return left
  
    }
  
    public swapColor() {
      if (this.color === "red") {
        this.color = "black";
      } else if (this.color === "black") {
        this.color = "red";
      }
    }
  }