import Data from "./2-3-data";
import Node2_3 from "./2-3-node";
import AVLNode from "./avl-node";

export default class Tree2_3{
    public root: Node2_3 | undefined;

    constructor(){
        this.root = undefined;
    }

    public insert_(data: Data, ref: Node2_3 | undefined = this.root): [Node2_3, Data, Node2_3] | null{
        if (this.search(data.key)){
            throw new Error("Ese valor ya existe");
        }
        if (!this.root){
            this.root = new Node2_3 (data)
            return null
        }
        if (ref && ref.isLeaf()){
            if (ref.isFull() && ref.data2){
                let leftkey: Node2_3;
                let promotedkey: Data;
                let middlekey: Node2_3;
                if (data.key < ref.data1.key){
                    leftkey = new Node2_3(data)
                    promotedkey = ref.data1
                    middlekey = new Node2_3(ref.data2)
                }else if(ref.data2 && data.key > ref.data1.key && data.key < ref.data2.key){
                    leftkey = new Node2_3(ref.data1);
                    promotedkey = data
                    middlekey = new Node2_3(ref.data2)
                }else{
                    leftkey = new Node2_3(ref.data1)
                    promotedkey = ref.data2
                    middlekey = new Node2_3(data)
                }
                
                if (ref === this.root){
                    const newRoot = new Node2_3(promotedkey)
                    newRoot.left = leftkey
                    newRoot.middle = middlekey
                    this.root = newRoot
                    return null
                }else{
                    return [leftkey, promotedkey, middlekey]
                }

            }else{
                ref.insert(data);
                return null
            }
        }else if (ref){
            const branch = ref.getBranch(data.key)
            const result = this.insert_(data, branch)

            if (result){
                if (ref.isFull()){
                    let p1: Data;
                    let p2: Data;
                    let km: Node2_3;
                    let kr: Node2_3;
                    let kl: Node2_3;
                    if(ref.left!.data1.key === result[0].data1.key || ref.left!.data1.key === result[1].key || ref.left!.data1.key === result[2].data1.key){
                        if (ref.data2 && ref !== this.root){
                            let leftkey: Node2_3;
                            let promotedkey: Data;
                            let middlekey: Node2_3;
                            if (result[1].key < ref.data1.key){
                                leftkey = new Node2_3(result[1])
                                promotedkey = ref.data1
                                middlekey = new Node2_3(ref.data2)
                            }else if(ref.data2 && result[1].key > ref.data1.key && result[1].key < ref.data2.key){
                                leftkey = new Node2_3(ref.data1);
                                promotedkey = result[1]
                                middlekey = new Node2_3(ref.data2)
                            }else{
                                leftkey = new Node2_3(ref.data1)
                                promotedkey = ref.data2
                                middlekey = new Node2_3(result[1])
                            }
                            km = leftkey
                            kr = middlekey
                            kr.left = ref.middle
                            kr.middle = ref.rigth
                            km.left = result[0]
                            km.middle = result[2]
                            ref.rigth = undefined
                            return [km, promotedkey, kr]

                        }else{
                            p1 = ref.data1
                            p2 = ref.data2!
                            km = ref.middle!
                            kr = ref.rigth!
                            const newnode = new Node2_3(p1)
                            newnode.left = new Node2_3(result[1])
                            newnode.middle = new Node2_3(p2)
                            newnode.left.left = result[0]
                            newnode.left.middle = result[2]
                            newnode.middle.left = km
                            newnode.middle.middle = kr
                            this.root = newnode
                            return null
                        }

                    }else if(ref.middle!.data1.key === result[0].data1.key || ref.middle!.data1.key === result[1].key || ref.middle!.data1.key === result[2].data1.key){
                        if (ref.data2 && ref !== this.root){
                            let leftkey: Node2_3;
                            let promotedkey: Data;
                            let middlekey: Node2_3;
                            if (result[1].key < ref.data1.key){
                                leftkey = new Node2_3(result[1])
                                promotedkey = ref.data1
                                middlekey = new Node2_3(ref.data2)
                            }else if(ref.data2 && result[1].key > ref.data1.key && result[1].key < ref.data2.key){
                                leftkey = new Node2_3(ref.data1);
                                promotedkey = result[1]
                                middlekey = new Node2_3(ref.data2)
                            }else{
                                leftkey = new Node2_3(ref.data1)
                                promotedkey = ref.data2
                                middlekey = new Node2_3(result[1])
                            }
                            kl = leftkey
                            kr = middlekey
                            kl.left = ref.left
                            kl.middle = result[0]
                            kr.left = result[2]
                            kr.middle = ref.rigth
                            ref.rigth = undefined
                            return [kl, promotedkey, kr]

                        }else{
                            p1 = ref.data1
                            p2 = ref.data2!
                            kl = ref.left!
                            kr = ref.rigth!
                            const newnode = new Node2_3(result[1])
                            newnode.left = new Node2_3(p1)
                            newnode.middle = new Node2_3(p2)
                            newnode.left.left = kl
                            newnode.left.middle = result[0]
                            newnode.middle.left = result[2]
                            newnode.middle.middle = kr
                            this.root = newnode
                            return null

                        }                         
                    }else if (ref.rigth!.data1.key === result[0].data1.key || ref.rigth!.data1.key === result[1].key || ref.rigth!.data1.key === result[2].data1.key){
                        if (ref.data2 && ref !== this.root){
                            let leftkey: Node2_3;
                            let promotedkey: Data;
                            let middlekey: Node2_3;
                            if (result[1].key < ref.data1.key){
                                leftkey = new Node2_3(result[1])
                                promotedkey = ref.data1
                                middlekey = new Node2_3(ref.data2)
                            }else if(ref.data2 && result[1].key > ref.data1.key && result[1].key < ref.data2.key){
                                leftkey = new Node2_3(ref.data1);
                                promotedkey = result[1]
                                middlekey = new Node2_3(ref.data2)
                            }else{
                                leftkey = new Node2_3(ref.data1)
                                promotedkey = ref.data2
                                middlekey = new Node2_3(result[1])
                            }
                            kl = leftkey
                            km = middlekey
                            kl.left = ref.left
                            kl.middle = ref.middle
                            km.left = result[0]
                            km.middle = result[2]
                            ref.rigth = undefined
                            return [kl, promotedkey, km]

                        }else{
                            p1 = ref.data1
                            p2 = ref.data2!
                            kl = ref.left!
                            km = ref.middle!
                            const newnode = new Node2_3(p2)
                            newnode.left = new Node2_3(p1)
                            newnode.middle = new Node2_3(result[1])
                            newnode.left.left = kl
                            newnode.left.middle = km
                            newnode.middle.left = result[0]
                            newnode.middle.middle = result[2]
                            this.root = newnode                                
                            return null
                        }
                    }

                }else{
                    const promotedKey = result[1];
                    if (promotedKey.key < ref.data1.key){
                    ref.insert(result[1]);
                    const lefNode = result[0];
                    const middleNode = result[2];
                    const rigthNode = ref.middle;
                    ref.left = lefNode;
                    ref.middle = middleNode;
                    ref.rigth = rigthNode;
                    }else{
                        ref.insert(promotedKey);
                        ref.middle = result[0];
                        ref.rigth = result[2];
                    }
                }
            }
        }
        return null
    }

    public deleth(vault: number, subtree: Node2_3 | undefined = this.root){
        if (this.search(vault) === undefined){
            throw new Error("El valor no existe");
        }
        if (subtree && subtree.isLeaf()){
            if (subtree.data2 && subtree.data2.key === vault){
                subtree.data2 = undefined
                return null

            }else if (subtree.data1.key === vault && subtree !== this.root && !subtree.data2){
                return subtree

            }else if (subtree.data1.key === vault && subtree.data2){
                subtree.data1 = subtree.data2
                subtree.data2 = undefined
                return null   

            }else if (subtree === this.root && !subtree.isFull() && vault === subtree.data1.key){
                    this.root = undefined
                    return null
            }else{
                return null
            }
            
        }else if (subtree){
            const branch = subtree.getBranch(vault)
            const vault_null = this.deleth(vault, branch)
            if (vault_null && subtree.isFull()){
                if (branch === subtree.left && subtree.data2){
                    if (subtree.middle?.isFull() && subtree.middle.data2){
                        subtree.left!.data1 = subtree.data1
                        subtree.data1 = subtree.data2
                        subtree.data2 = undefined
                        subtree.insert(subtree.middle.data1)
                        subtree.middle.data1 = subtree.middle.data2
                        subtree.middle.data2 = undefined
                        return null
                    }else{
                        subtree.left!.data1 = subtree.data1
                        subtree.data1 = subtree.data2
                        subtree.data2 = undefined
                        subtree.left!.insert(subtree.middle!.data1)
                        subtree.middle = subtree.rigth
                        subtree.rigth = undefined
                        return null
                    }
                }else if (branch === subtree.middle && subtree.data2){
                    if (subtree.rigth?.isFull() && subtree.rigth.data2){
                        subtree.middle!.data1 = subtree.data2
                        subtree.data2 = undefined
                        subtree.insert(subtree.rigth.data1)
                        subtree.rigth.data1 = subtree.rigth.data2
                        subtree.rigth.data2 = undefined
                        return null

                    }else{
                        subtree.left?.insert(subtree.data1)
                        subtree.data1 = subtree.data2
                        subtree.data2 = undefined
                        subtree.middle = subtree.rigth
                        subtree.rigth = undefined
                        return null
                    }
    
                }else if(branch === subtree.rigth && subtree.data2){
                    if (subtree.middle?.isFull() && subtree.middle.data2){
                        subtree.rigth!.data1 = subtree.data2
                        subtree.data2 = undefined
                        subtree.insert(subtree.middle.data2)
                        subtree.middle.data2 = undefined
                        return null

                    }else{
                        subtree.middle?.insert(subtree.data2)
                        subtree.data2 = undefined
                        subtree.rigth = undefined
                        return null
                    }   
                }
            }else if (vault_null){
                if (vault_null.isFull() && !subtree.data2){
                    if (branch === subtree.middle){
                        const left = subtree.left?.left
                        const middle = subtree.left?.middle
                        subtree.insert(subtree.left!.data1)
                        subtree.left = left
                        subtree.rigth = subtree.middle
                        subtree.middle = middle
                        return null

                    }else{
                        const middle = subtree.middle?.left
                        const right = subtree.middle?.middle
                        subtree.insert(subtree.middle!.data1)
                        subtree.middle = middle
                        subtree.rigth = right
                        return null
                    }


                }else if(branch === subtree.middle && !vault_null.isFull() && !subtree.rigth && subtree.left?.data2){
                    subtree.middle!.data1 = subtree.data1
                    subtree.data1 = subtree.left.data2
                    subtree.left.data2 = undefined
                    return null

                }else if (branch === subtree.left && !vault_null.isFull() && !subtree.rigth && subtree.middle?.data2){
                    subtree.left!.data1 = subtree.data1
                    subtree.data1 = subtree.middle.data1
                    subtree.middle.data1 = subtree.middle.data2
                    subtree.middle.data2 = undefined
                    return null

                }else if (branch === subtree.left && !subtree.middle){
                    subtree.left = undefined
                    subtree.insert(subtree.middle!.data1)
                    subtree.middle = undefined
                    return subtree

                }else if (branch === subtree.middle && !subtree.rigth){
                    subtree.middle = undefined
                    subtree.insert(subtree.left!.data1)
                    subtree.left = undefined
                    return subtree

                }else{
                    return null
                }
            }else{
                if (subtree.data1.key === vault && !subtree.data2 && !subtree.rigth && subtree.left!.isLeaf() && subtree.middle!.isLeaf()){
                    if ((subtree.left?.isFull() && subtree.middle?.isFull()) || (subtree.left?.isFull() && !subtree.middle?.isFull())){
                        subtree.insert(subtree.left.data2!)
                        subtree.left.data2 = undefined
                        return null

                    }else if (!subtree.left?.isFull() && subtree.middle?.isFull()){
                        subtree.insert(subtree.middle.data1)
                        subtree.middle.data1 = subtree.middle.data2!
                        subtree.middle.data2 = undefined
                        return null

                    }else{
                        subtree.data1 = subtree.middle!.data1
                        subtree.insert(subtree.left!.data1)
                        subtree.left = undefined
                        subtree.middle = undefined
                        subtree.rigth = undefined                    
                        return subtree
                    }

                }else if (subtree.data1.key === vault && subtree.data2){
                    if ((subtree.left?.isFull() && subtree.middle?.isFull()) || (subtree.left?.isFull() && !subtree.middle?.isFull())){
                        subtree.insert(subtree.left.data2!)
                        subtree.left.data2 = undefined
                        return null

                    }else if (!subtree.left?.isFull() && subtree.middle?.isFull()){
                        subtree.insert(subtree.middle.data1)
                        subtree.middle.data1 = subtree.middle.data2!
                        subtree.middle.data2 = undefined
                        return null

                    }else{
                        subtree.data1 = subtree.data2
                        subtree.left?.insert(subtree.middle!.data1)
                        subtree.middle = subtree.rigth
                        subtree.rigth = undefined
                        return null
                    }
                }else if (subtree.data2 && subtree.data2.key === vault){
                    if ((subtree.middle?.isFull() && subtree.rigth?.isFull()) || (subtree.middle?.isFull() && !subtree.rigth?.isFull())){
                        subtree.insert(subtree.middle.data2!)
                        subtree.middle.data2 = undefined
                        return null

                    }else if (!subtree.middle?.isFull() && subtree.rigth?.isFull()){
                        subtree.insert(subtree.rigth.data1)
                        subtree.rigth.data1 = subtree.rigth.data2!
                        subtree.rigth.data2 = undefined
                        return null

                    }else{
                        subtree.left?.insert(subtree.data1)
                        subtree.data1 = subtree.middle!.data1
                        subtree.data2 = undefined
                        subtree.middle = subtree.rigth
                        subtree.rigth = undefined
                        return null
                    }
            }else if (subtree.data1.key === vault && !subtree.data2){
                const mostmiddle = this.the_mostmiddle(subtree.left)
                const mostleft = this.the_mostleft(subtree.left)
                if (mostmiddle.data2){
                    subtree.data1 = mostmiddle.data2
                    mostmiddle.data2 = undefined
                    return null

                }else if (!mostmiddle.data2 && mostleft.isFull()){
                    subtree.data1 = mostmiddle.data1
                    subtree.left!.middle!.data1 = subtree.left!.data1
                    subtree.left!.data1 = subtree.left?.left?.data2!
                    subtree.left!.left!.data2 = undefined
                    return null   

                }else{
                    const middle = subtree.middle?.left
                    const rigth = subtree.middle?.middle
                    subtree.data1 = mostmiddle.data1
                    subtree.insert(mostleft.data1)
                    subtree.left!.insert(subtree.middle!.data1)
                    subtree.left!.left = undefined
                    subtree.left!.middle = undefined
                    subtree.middle = middle
                    subtree.rigth = rigth
                    return null
                }

            }
        }
        }else{
            return null
        }
    }

    private the_mostmiddle(subtree: Node2_3 | undefined): Node2_3{
        if (subtree?.isLeaf()){
            return subtree
        }else{
            return this.the_mostmiddle(subtree?.middle)
        }
    }
    private the_mostleft(subtree: Node2_3 | undefined): Node2_3{
        if (subtree?.isLeaf()){
            return subtree
        }else{
            return this.the_mostleft(subtree?.left)
        }
    }

    public search(vault: number, subtree: undefined | Node2_3 = this.root): Data | null{
        if (subtree){
            if (vault === subtree.data1.key){
                return subtree.data1
            }            
            else if (subtree.data2 && vault === subtree.data2.key){
                return subtree.data2
            }
            else{
                if (subtree.isLeaf()){
                    return null
                }else{
                    const branch = subtree.getBranch(vault)
                    return this.search(vault, branch)                
                }
            }
        }
        return null
    }

    
    public preorder(ref: Node2_3 | undefined = this.root): string {
        let result = ""
        if (ref && ref.isLeaf()){
            if (ref.data2){
                return `${ref.data1.key} ${ref.data2.key}`
            }else{
                return `${ref.data1.key}`
            }
        }else if (ref){
            result = ` ${ref.data1.key} `;
            if (ref.data2){
                result += ` ${ref.data2.key} (`
            }else{
                result += "("
            }
            if (ref.left){
                result += `${this.preorder(ref.left)} , `;
            }
            if (ref.middle){
                result += `${this.preorder(ref.middle)} , `;
    
            }
            if (ref.rigth){
                result += `${this.preorder(ref.rigth)} )`;            
            }
            if (!ref.rigth){
                result += ")"
            }
            return result
        }
        return result;
      }
}