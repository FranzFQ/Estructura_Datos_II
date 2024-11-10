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

  public insert(value: number, root: null | AVLNode = this.root){
    if (root === null){
      const node = new AVLNode(value);
      this.root = node;
      return node
    }else{
      if (root.data > value){
        if (root.left === null){
          root.left = new AVLNode(value);
          this.checkbalanceFactor(value)
          return root.left
        }else{
          this.insert(value, root.left)
        } 
      }else{
        if (root.right === null){
          root.right = new AVLNode(value)
          this.checkbalanceFactor(value)
          return root.right
        }else{
          this.insert(value, root.right)
        }
      }
    }
  }

  private themostleft(subtree: AVLNode | null = this.root): AVLNode{
    if (subtree === null){
      throw new Error();
    }if (subtree.left === null){
      return subtree;
    }return this.themostleft(subtree.left)
  }

  private deleththemostleft(vault: number, subtree: AVLNode | null = this.root): AVLNode{
    if (subtree === null){
      throw new Error();
    }if (subtree.data === vault){
      subtree = null
      return subtree!
    }else if(subtree.left!.data === vault){
      subtree.left = null
      return subtree
    }return this.deleththemostleft(vault, subtree.left)
  }


  private themostrigth(subtree: AVLNode | null = this.root): AVLNode{
    if (subtree === null){
      throw new Error();
    }if (subtree.right === null){
      return subtree;
    }return this.themostrigth(subtree.right)
  }

  public deleth(ref: number, subtree: AVLNode | null = this.root){
    if (subtree === null){
      return null
    }
    if (subtree.isleaf() && subtree === this.root){
      const old_subtree = this.root
      this.root = null
      return old_subtree
    }
    if (subtree.isleaf()){
      return subtree
    }
    if (ref === subtree.data){
      if (subtree === this.root && subtree.right !== null){
        const old_subtree = this.root;
        const new_subtree = this.themostleft(subtree.right);
        this.deleththemostleft(new_subtree.data, subtree.right);
        this.root.data = new_subtree.data;
        if (new_subtree.right !== null){
          subtree.right = new_subtree.right;
        }
        return old_subtree

      }else if (subtree === this.root && subtree.right === null){
        const old_subtree = this.root;
        const new_subtree = subtree.left
        subtree.left = null
        this.root.data = new_subtree!.data;
        return old_subtree
        
      }else{
        return subtree;
      }

    }else{
      const left = this.deleth(ref, subtree.left)
      const rigth = this.deleth(ref, subtree.right)
      if (left !== null){
            if (left!.isleaf() && left!.data === ref){
              console.log("2")
              const old_subtree = subtree.left
              subtree.left = null
              this.deletcheckbalance(subtree)
              return old_subtree
            }
            if (left!.data === ref){
              const old_subtree = subtree.left
              let new_subtree = this.themostleft(left!.right)
              this.deleththemostleft(new_subtree.data, left?.right)
              subtree.left!.data = new_subtree.data
              if (new_subtree.right !== null){
                subtree.left!.right = new_subtree.right
              }
              this.deletcheckbalance(subtree.left)
              return old_subtree
            }
        if (rigth !== null){
          if (rigth!.isleaf() && rigth?.data === ref){
            const old_subtree = subtree.right
            subtree.right = null
            this.deletcheckbalance(subtree)
            return old_subtree
          }
          else if(rigth!.data === ref){
            const old_subtree = subtree.right
            let new_subtree = this.themostleft(rigth!.right)
            this.deleththemostleft(new_subtree.data, rigth!.right)
            subtree.right!.data = new_subtree.data
            if (new_subtree.right !== null){
              subtree.right!.right = new_subtree.right  
            }
            this.deletcheckbalance(subtree.right)
            return old_subtree
          }
        }
      }if (rigth !== null){
        if (rigth!.isleaf() && rigth?.data === ref){
          const old_subtree = subtree.right
          subtree.right = null
          this.deletcheckbalance(subtree)
          return old_subtree
        }
        else if(rigth!.data === ref){
          const old_subtree = subtree.right
          let new_subtree = this.themostleft(rigth!.right)
          this.deleththemostleft(new_subtree.data, rigth!.right)
          subtree.right!.data = new_subtree.data
          if (new_subtree.right !== null){
            subtree.right!.right = new_subtree.right  
          }
          this.deletcheckbalance(subtree.right)
          return old_subtree
        }
      }
        return subtree
    }
  }

  private deletcheckbalance(subtree: AVLNode | null){
      if (subtree === null){
        return null
      }
      const balance = this.balanceFactor(subtree)
      if (balance === 0 || balance === -1 || balance === 1){
        return this.height(subtree) 

      }if (balance === 2){
        const child = subtree.left;
        if (child?.left !== null && child?.right === null){
          this.rotateRight(subtree)
          return 0     

        }else{
          this.doblerotationRight(subtree)
          this.rotateRight(subtree)
          return 0
        }
      }if (balance === -2){
        const child = subtree.right;
        if (child?.right !== null && child?.left === null){
          this.rotateLeft(subtree)
          return 0     
        }else{
          this.doblerotationLeft(subtree)
          this.rotateLeft(subtree)
          return 0     
        }
      }
  }

  private rotateRight(subtree: AVLNode){
    const parentData = subtree.data;
    const child = subtree.left
    if (child === null){
      throw new Error
    }

    const grandchild = child.left;
    if (grandchild === null){
      throw new Error();
    }

    subtree.data = child.data
    subtree.right = new AVLNode (parentData)
    subtree.left = grandchild
    subtree.right.right = child.right
    child.left = null
    return 0

  }

  private rotateLeft(subtree: AVLNode){
    const parentData = subtree.data;
    const child = subtree.right
    if (child === null){
      throw new Error
    }

    const grandchild = child.right;
    if (grandchild === null){
      throw new Error();
    }

    subtree.data = child.data
    subtree.left = new AVLNode (parentData)
    subtree.right = grandchild
    subtree.left.left = child.left
    child.right = null
    return 0
  }

  private doblerotationRight(subtree: AVLNode){
    const child = subtree!.left
    if (child === null){
      throw new Error();
    }

    const grandchild = child?.right
    if (grandchild === null){
      throw new Error();
    }
    grandchild.left = new AVLNode (child.data);
    subtree.left = grandchild
  }

  private doblerotationLeft(subtree: AVLNode){
    const child = subtree!.right
    if (child === null){
      throw new Error();
    }

    const grandchild = child?.left
    if (grandchild === null){
      throw new Error();
    }
    grandchild.right = new AVLNode (child.data);
    subtree.right = grandchild
  }

  private checkbalanceFactor(value: number, subtree: AVLNode | null = this.root){
      if (subtree === null){
        throw new Error();
      }if (subtree?.isleaf()){
        if (subtree.data === value){
          return this.height(subtree)
        }else{
          throw new Error();
        }
      }if (value < subtree.data){
        this.checkbalanceFactor(value, subtree.left)
        const balance = this.balanceFactor(subtree)
        if (balance === 0 || balance === -1 || balance === 1){
          return this.height(subtree) 

        }if (balance === 2){
          const child = subtree.left;
          if (child?.left !== null && child?.right === null){
            this.rotateRight(subtree)
            return 0     

          }else{
            this.doblerotationRight(subtree)
            this.rotateRight(subtree)
            return 0     

          }
        }
        if (balance === -2){
          const child = subtree.right;
          if (child?.right !== null && child?.left === null){
            this.rotateLeft(subtree)
            return 0     

          }else{
            this.doblerotationLeft(subtree)
            this.rotateLeft(subtree)
            return 0     


          }
        }
      }else{
        this.checkbalanceFactor(value, subtree.right)
        const balance = this.balanceFactor(subtree)
        if (balance === 0 || balance === -1 || balance === 1){
          return this.height(subtree)   

        }if (balance === 2){
          const child = subtree.left;
          if (child?.left !== null && child?.right === null){
            this.rotateRight(subtree)
            return 0     

          }else{
            this.doblerotationRight(subtree)
            this.rotateRight(subtree)
            return 0     
          }
        }
        if (balance === -2){
          const child = subtree.right;
          if (child?.right !== null && child?.left === null){
            this.rotateLeft(subtree)
            return 0     
          }else{
            this.doblerotationLeft(subtree)
            this.rotateLeft(subtree)
            return 0     
          }
        }
      }
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
