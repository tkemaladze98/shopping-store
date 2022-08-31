export class Product {
  constructor(
    public name: string,
    public category: string,
    public images: [],
    public price: number,
    public author: string,
    public description:string,
    public key?: string
  ) {}
}
