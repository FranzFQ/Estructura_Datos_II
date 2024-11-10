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
  
  }