import { Chunk, get_index, VIEW_DISTANCE } from "./chunk.js";


export class World {
    constructor() {
        
        this.chunks = new Map();

        for(let x = -VIEW_DISTANCE; x<=VIEW_DISTANCE ; x++) {
            for(let y = -VIEW_DISTANCE; y<=VIEW_DISTANCE ; y++) {
                for(let z = -VIEW_DISTANCE; z<=VIEW_DISTANCE ; z++) {
                    this.chunks[get_index(x,y,z)] = new Chunk;
                }
            }
        }

    }
}