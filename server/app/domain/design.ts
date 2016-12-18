export class Design {
    private name: String;
    private owner: String;
    private subscribers: [any];
    private color: string;
    private dimension: Number;

    constructor(owner: String, name: String) {
        this.owner = owner;
        this.subscribers = [];
        this.name = name;
    }

    public getName() {
        return this.name;
    }

    public setColor(color:string) {
        this.color = color;
    }

    public setDimension(dimension:Number) {
        this.dimension = dimension;
    }

    public toString() {
        return `color: ${this.color}; dimension: ${this.dimension}`
    }
}