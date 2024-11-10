export default class HashNode{
    public key: number
    public Complement: any

    constructor(n: number, complement: number){
        this.key = n;
        this.Complement = complement;
    }

}