export default class AVLNode {
    public data: number;
    public left: AVLNode| null;
    public right: AVLNode| null;
  
    constructor(data: number) {
      this.data = data;
      this.left = null;
      this.right = null;
    }
  
    public isleaf(){
      return this.left === null && this.right === null;
    }

    public rotateRight(){
      if (this.left === null){
        return this
      }
      const child = this.left
      const subtree = this
  
      subtree.left = child.right
      child.right = subtree
      return child
  
    }
  
    public rotateLeft(){
      if (this.right === null){
        return this
      }
      const child = this.right
      const subtree = this

      subtree.right = child.left
      child.left = subtree
      return child
    }

    public doblerotationRight(){
      this.left = this.rotateLeft()
      return this.rotateRight()

    }
  
    public doblerotationLeft(){
      this.right = this.rotateRight()
      return this.rotateLeft()
    }
  }