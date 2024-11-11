import HeaNode from "./heap-node";

export default class Heap {
  public root: HeaNode | null;

  constructor() {
    this.root = null;
  }

  public depth(value: number, subtree: HeaNode | null = this.root): number {
    if (subtree === null) {
      return -1;
    } else if (subtree.data === value) {
      return 0;
    }

    const leftDepth = this.depth(value, subtree.left);
    const rightDepth = this.depth(value, subtree.right);

    if (leftDepth === -1 && rightDepth === -1) {
      return -1;
    }

    return Math.max(leftDepth, rightDepth) + 1;
  }

  public height(ref: HeaNode | null = this.root): number {
    if (ref === null) {
      return 0;
    }

    const leftheinght = this.height(ref.left)
    const rightheigth = this.height(ref.right)

    return Math.max(leftheinght, rightheigth) + 1;
  }

  private insertLeft(value: number, ref: number) {
    const refNode = this.search(ref);

    if (refNode !== null) {
      const newNode = new HeaNode(value);
      if (refNode.left === null) {
        refNode.left = newNode;
      } else {
        this.insertLeft(value, Number(refNode.left.data));
        return 0
      }
    } else {
      throw new Error("The reference doesn't exist");
    }
  }

  private insertRight(value: number, ref: number) {
    const refNode = this.search(ref);

    if (refNode !== null) {
      const newNode = new HeaNode(value);
      if (refNode.right === null) {
        refNode.right = newNode;
      } else {
        throw new Error("The right side is not empty");
      }
    } else {
      throw new Error("The reference doesn't exist");
    }
  }

  public insert_(value: number, subtree: HeaNode | null = this.root): number{
    if (this.root === null){
    this.root = new HeaNode(value)
    }
    if (subtree === null){
      return -1
    }else if (this.root?.left === null && this.root.right === null){
      this.insertLeft(value, Number(this.root.data))
      this.swap(this.root)
    }else if (subtree.left !== null && subtree.right !== null){
      const left = this.insert_(value, subtree.left)
      const right = this.insert_(value, subtree.right)
      const nodes_total = 2 ** (this.height(this.root) - 1)
      if((left + right) === nodes_total){
        this.insertLeft(value, Number(this.root?.data))
        this.swap(this.root)
      }else if (left === right){
        this.swap(this.root)
        return left + right;
      }else{
        if(left === 0 || right === 0){
          this.swap(this.root)
        } else if (left < right){
          this.insertLeft(value, Number(subtree.left.data))
          this.swap(this.root)
        }else if (left > right){
          this.insertLeft(value, Number(subtree.right.data))
          this.swap(this.root)
        }
      }
    }else if(subtree.left === null && subtree.right !== null){
      this.insertLeft(value, Number(subtree.data))
      this.swap(this.root)
      return 0;
    }else if(subtree.left !== null && subtree.right === null){
      this.insertRight(value, Number(subtree.data))
      this.swap(this.root)
      return 0;
    }else if(subtree.left === null && subtree.right === null){
      this.swap(this.root)
      return 1;
    }
    
    return 0;
  }

  private swap(subtree: HeaNode | null = this.root): number{
    if (subtree === null){
      return -1
    }if (subtree?.left !== null && subtree?.right !== null){
      const left = this.swap(subtree!.left)
      const right = this.swap(subtree!.right)
      
      if (left! > right!){
        if (left! > subtree!.data){
          const vault_subtree = subtree!.data
          subtree!.left!.data = vault_subtree
          subtree!.data = Number(left)
          return left
      }
      }else if (left < right){
        if (right! > subtree!.data){
          const vault_subtree = subtree!.data
          subtree!.right!.data = vault_subtree
          subtree!.data = Number(right)
          return right
        } 
      }else{
      } 

    }else if (subtree?.left === null && subtree.right === null){
      return subtree.data
    }
    return subtree!.data
  }

  private mostrigth(subroot: HeaNode | null = this.root): number{
    const heigh_left = this.height(subroot?.left)
    const heigh_right = this.height(subroot?.right)
    if (this.root === null){
      return -1

    } else if(subroot?.left === null && subroot?.right === null){
      return subroot.data

    }if (heigh_left > heigh_right){
        const newroot = this.mostrigth(subroot?.left)
        return newroot

    }else{
        const newroot = this.mostrigth(subroot?.right)
        return newroot
        }
      return 0 
    }
  
  private delet_sawp(count: number = 0): number{
    if (count === this.height(this.root)){
      return 0
    }else{
      this.swap(this.root)
      return this.delet_sawp(count + 1)
      
    }
  }
  
  private deletthemostright(subtree: null | HeaNode = this.root, vault: number): number{
    if (this.root === null){
      return -1

    }else if(subtree?.left?.data == vault){
      subtree.left = null
      return 0

    }else if (subtree?.right?.data == vault){
        subtree.right = null
        return 0
    }else if(subtree?.left === null && subtree.right === null){
      return -1
    }else{
      const left = this.deletthemostright(subtree?.left, vault)
      if (left === 0){
      }else{
        this.deletthemostright(subtree?.right, vault)
        return 1
      }
    }
      return 1 
  }

  public deteth(){
    const delet_root = this.root?.data
    const new_root = this.mostrigth()
    this.deletthemostright(this.root, new_root)
    this.root!.data = new_root
    let count = 0
    this.delet_sawp()
    return delet_root
    
  }
  public preorder(ref: HeaNode | null = this.root): string {
    if (ref === null) {
      return "";
    }

    if (ref.left === null && ref.right === null) {
      return ref.data.toString();
    }

    let result = `${ref.data} (`;
    result += `${this.preorder(ref.left)},`;
    result += `${this.preorder(ref.right)})`;

    return result;
  }

  public search(
    value: number,
    ref: HeaNode | null = this.root): HeaNode | null {
    if (ref !== null && ref.data === value) {
      return ref;
    } else if (ref !== null) {
      const leftResult = this.search(value, ref.left);

      if (leftResult === null) {
        const rightResult = this.search(value, ref.right);

        return rightResult;
      }

      return leftResult;
    }

    return null;
  }
}
