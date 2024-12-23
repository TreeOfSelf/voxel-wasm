export const VIEW_DISTANCE = 8;

export class Chunk {
    constructor() {
        this.vertices = new SharedArrayBuffer(12000);
        this.volume = new SharedArrayBuffer(12000);
        this.blockType = new SharedArrayBuffer(12000);
        this.textureCoordinates = new SharedArrayBuffer(12000);
    }
}

export function get_index(x, y, z) {
    return x+y*VIEW_DISTANCE+z*VIEW_DISTANCE*VIEW_DISTANCE;
}