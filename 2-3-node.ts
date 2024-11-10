import Data  from "./2-3-data";

export default class Node2_3{
    public data1: Data;
    public data2: Data | undefined;
    public left: Node2_3 | undefined;
    public middle: Node2_3 | undefined;
    public rigth: Node2_3 | undefined;

    constructor(data: Data){
        this.data1 = data
    }

    public insert(data: Data){
        if (this.data1.key < data.key){
            this.data2 = {
                key: data.key,
                payload: data.payload,
            };
        }else{
            this.data2 = {
                key: this.data1.key,
                payload: this.data1.payload,
            }

            this.data1 = {
                key: data.key,
                payload: data.payload,
            }
        }
    }
    public isLeaf(){
        return this.left === undefined && this.middle === undefined && this.rigth === undefined
    }

    public isFull(){
        return this.data2 !== undefined
    }

    public getBranch(target: number){
        if (target < this.data1.key){
            return this.left
        }else if (this.data2 === undefined){
            return this.middle
        }else if( this.data1.key < target && this.data2.key > target){
            return this.middle
        }else{
            return this.rigth
        }
    }

}