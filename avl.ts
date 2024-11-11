import AVLNode from "./avl-node";

export default class Avltree {
  public root: AVLNode | null;

  constructor() {
    this.root = null;
  }

  public depth(value: number, ref: AVLNode | null = this.root): number {
    if (ref === null) {
      return -1;
    } else if (ref.data === value) {
      return 0;
    }

    const leftDepth = this.depth(value, ref.left);
    const rightDepth = this.depth(value, ref.right);

    if (leftDepth === -1 && rightDepth === -1) {
      return -1;
    }

    return Math.max(leftDepth, rightDepth) + 1;
  }

  public height(ref: AVLNode | null = null): number {
    if (ref === null) {
      return 0;
    }
    return Math.max(this.height(ref.left), this.height(ref.right)) + 1;
  }

  public insert_(value: number){
    if (this.root === null){
      this.root = new AVLNode(value)
      return 0
    }
    this.root = this.insert(value)
  }

  private insert(value: number, subtree: null | AVLNode = this.root): AVLNode{
    if (subtree === null){
      const node = new AVLNode(value);
      return node
    }
    if (subtree.data > value){
      subtree.left = this.insert(value, subtree.left)
      } 
    else{
      subtree.right = this.insert(value, subtree.right)
      }

    return this.Checkbalancefactor(value, subtree)
    }

  private Checkbalancefactor(value: number, subtree: AVLNode | null): AVLNode{
    if (subtree === null){
      return subtree!
    }
    const balance = this.balanceFactor(subtree)
    if (balance >= 2){
        const child = subtree.left;
        if (child && value < child.data){
          subtree = subtree.rotateRight()     

        }else if (child && value > child.data){
          subtree = subtree.doblerotationRight()     
        }

      }
      if (balance <= -2){
        const child = subtree.right;
        if (child && value > child.data){
          subtree = subtree.rotateLeft()

        }else if (child && value < child.data){
          subtree = subtree.doblerotationLeft()     
        }
      }
      return subtree
  }

  private themostleft(subtree: AVLNode | null = this.root): AVLNode{
    if (subtree === null){
      throw new Error();
    }if (subtree.isleaf()){
      return subtree;
    }else if (subtree.left === null && subtree.right !== null){
      return subtree
    }return this.themostleft(subtree.left)
  }

  private themostrigth(subtree: AVLNode | null = this.root): AVLNode{
    if (subtree === null){
      throw new Error();
    }if (subtree.right === null){
      return subtree;
    }return this.themostrigth(subtree.right)
  }

  public deleth_(vault: number, subtree: AVLNode | null = this.root): AVLNode | null{
    if (vault === this.root?.data){
      const old_subtree = this.root
      this.root = null
      return old_subtree
    }
    const delete_node = this.search(vault)
    this.root = this.deleth(vault, subtree)
    return delete_node
  }

  private deleth(ref: number, subtree: AVLNode | null = this.root): AVLNode | null{
    let old_subtree: AVLNode
    if (subtree === null){
        return null
    }
    if (ref < subtree.data){
      subtree.left = this.deleth(ref, subtree.left)

    }else if (ref > subtree.data){
      subtree.right = this.deleth(ref, subtree.right)

    }else{
      if (subtree.isleaf()){
        old_subtree = subtree
        subtree = null

      }else if (subtree.left === null && subtree.right !== null){
        old_subtree = subtree
        subtree = subtree.right

      }else if (subtree?.right === null && subtree?.left !== null){
        old_subtree = subtree
        subtree = subtree.left

      }else{
        const new_ = this.themostleft(subtree.right)
        old_subtree = subtree
        subtree.data = new_.data
        subtree.right = this.deleth(new_.data, subtree.right)

      }
    } 
    if (subtree === null){
      return subtree
    }

    return this.deletcheckbalance(subtree)
}

  private deletcheckbalance(subtree: AVLNode | null): AVLNode{
      if (subtree === null){
        throw new Error("No exsiste ese valor")
      }
      const balance = this.balanceFactor(subtree)
      if (balance >= 2){
        const child = subtree.left;
        if (child && this.balanceFactor(child) >= 0){
         subtree = subtree.rotateRight()

        }else if (child){
          subtree = subtree.doblerotationRight()
        }
      }if (balance <= -2){
        const child = subtree.right;
        if (child && this.balanceFactor(child) <= 0){
          subtree = subtree.rotateLeft()

        }else if (child){
          subtree = subtree.doblerotationLeft()     
        }
      }
      return subtree    
  }

  private balanceFactor(ref: AVLNode): number{
    const leftheight = this.height(ref.left)
    const rightheight = this.height(ref.right)

    return leftheight - rightheight
  }

  public preorder(ref: AVLNode | null = this.root): string {
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

  public search(value: number, ref: AVLNode | null = this.root): AVLNode | null {
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
