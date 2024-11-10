export default class HeapNode {
    public data: number;
    public left: HeapNode | null;
    public right: HeapNode | null;
  
    constructor(data: number) {
      this.data = data;
      this.left = null;
      this.right = null;
    }
  }
  