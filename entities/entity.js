import { vec3 } from "../lib/gl-matrix.js";

export class Entity {
    constructor(position = vec3.fromValues(0,0,0), rotation = vec3.fromValues(0,0,0)) {
        this.position = position;
        this.rotation = rotation;
    }
}