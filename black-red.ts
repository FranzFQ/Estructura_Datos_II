import TreeNode from "./black-red-node";

export default class RBTree<T> {
  public root: TreeNode<T> | null = null;

  private _insert({
    key,
    parent = null,
    ref = this.root,
    value,
  }: {
    key: number;
    parent?: TreeNode<T> | null;
    ref?: TreeNode<T> | null;
    value?: T;
  }): TreeNode<T> {
    if (ref === null) {
      return new TreeNode({ key, value, parent });
    }

    if (key < ref.key) {
      ref.left = this._insert({
        key,
        value,
        ref: ref.left,
        parent: ref,
      });
    } else {
      ref.right = this._insert({
        key,
        value,
        ref: ref.right,
        parent: ref,
      });
    }

    return ref;
  }

  private _checkColor(key:number) {
    let ref = this.search(key);
    let parent = ref.parent;
    while(parent && parent.color === "red"){
      let grandParent = parent.parent;
      if (grandParent) {
        let uncle: TreeNode<T> | null;
        let side: "left" | "right" = "left";
        if (grandParent.key> ref.key) {
          // Ref is in the left side
          uncle = grandParent.right;
          side = "left"
        }else{
          // Ref is in the right side
          uncle = grandParent.left
          side = "right"
        }
        if (uncle === null || uncle.color === "black") {
          let direction : 'triangle' | 'line' = 'triangle';
          if (side === "left" && parent.left === ref) {
            direction = "line";
          }else if(side === "right" && parent.right === ref){
            direction = "line"
          }else {
            direction = 'triangle'
          }
          // Escenario 3 = triangulo
          if (direction === "triangle") {
            if (ref.key < parent.key) {
              // Rotacion de padre a la derecha
              parent = parent.rotaterigth();
            }else{
              // Rotacion de padre a la izquierda 
              parent = parent.rotateLeft();
            }
          }else{
            // escenario 4 = linea
            if (ref.key < grandParent.key){
              // Rotar el abuelo a la derecha
              grandParent = grandParent.rotaterigth();
            }else{
              // Rotar el abuelo a la izquierda
              grandParent = grandParent.rotateLeft();
            }
            parent.swapColor();
            grandParent?.swapColor();
          }
          
        }else if(uncle.color === "red"){
          // Escenario 02
          grandParent.swapColor();
          parent.swapColor();
          uncle.swapColor();
        }
      }
      if(ref.parent){
        ref = ref.parent;
        parent = ref.parent;
      }
    }
    if (ref === this.root && ref.color === "red") {
      ref.swapColor();
    }
  }
  
  public insert(key: number, value?: T) {
    this.root = this._insert({
      key,
      value,
      ref: this.root,
    });
    this._checkColor(key)
  }

  public preorder(ref: TreeNode<T> | null = this.root): string {
    if (ref === null) {
      return "NULL";
    }

    const root = `${ref.key.toString(10)} ** ${ref.color}`;
    const left = this.preorder(ref.left);
    const right = this.preorder(ref.right);

    return `${root} (${left}, ${right})`;
  }

  public search(key: number, ref: TreeNode<T> | null = this.root): TreeNode<T> {
    if (ref === null) {
      throw new Error("Node not found");
    }
    if (ref.key === key) {
      return ref;
    } else if (key < ref.key) {
      return this.search(key, ref.left);
    } else {
      return this.search(key, ref.right);
    }
  }

  private Transplant(u: TreeNode<T> | null, v: TreeNode<T> | null, new_color: "red" | "black"){
    const delete_vault = u
    if (v){
      v.color = new_color
    }
    if ( u === this.root){
      this.root = v;
      return delete_vault;
    }else if(u?.parent){
      if(u.parent.left === u){
        u.parent.left = v;
        return delete_vault;
      }else if (u.parent.right === u){
        u.parent.right = v;
        return delete_vault;
      }
    }  
  }

  private most_left(subtree: TreeNode<T> | null): TreeNode<T> | null{
    if (subtree!.isleaf()){
      return subtree
    }else{
      if (subtree?.left === null){
        return this.most_left(subtree.right)
      }else{
        return this.most_left(subtree!.left)
      }
    }
  }

  public delete(node: number, subtree: TreeNode<T> | null = this.root){
    this.search(node)
    if (subtree === null){
      return null
    }
    if (subtree.key === node){
      if (subtree.isleaf()){
        const delete_value = this.Transplant(subtree, subtree.right, "black")
        return delete_value
      }else if(subtree.left === null && subtree.right !== null){
        const color = subtree.color
        const delete_value = this.Transplant(subtree, subtree.right, color)
        return delete_value
      }else if(subtree.left !== null && subtree.right === null){
        const color = subtree.color
        const delete_value = this.Transplant(subtree, subtree.left, color)
        return delete_value
      }else{
        const color = subtree.color
        const value = this.Transplant(this.most_left(subtree.right), this.most_left(subtree.right)!.right, color)
        const delete_value = subtree.key = value!.key
        return delete_value

      }
    }else{
      this.delete(node, subtree.left);
      this.delete(node, subtree.right)
      }
  }
}
  