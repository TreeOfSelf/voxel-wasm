import { mat4 } from '../lib/gl-matrix.js';
import { Entity } from './entity.js';

export class Camera extends Entity {
    constructor(position = vec3.fromValues(0,0,0), rotation = vec3.fromValues(0,0,0), fov = 45, aspect = 1, near = 0.1, far = 100.0) {
        super(position, rotation);
        
        this.position = position;
        this.rotation = rotation;
        this.fov = fov;
        this.aspect = aspect;
        this.near = near;
        this.far = far;
        
        this.projectionMatrix = mat4.create();
        this.viewMatrix = mat4.create();
        
        this.updateProjectionMatrix();
        this.updateViewMatrix();
    }

    updateProjectionMatrix() {
        mat4.perspective(this.projectionMatrix, this.fov * Math.PI / 180, this.aspect, this.near, this.far);
    }

    updateViewMatrix() {
        const { position, rotation } = this;
        const translationMatrix = mat4.create();
        mat4.translate(translationMatrix, translationMatrix, [position[0], position[1], position[2]]);

        const rotationMatrix = mat4.create();
        mat4.rotateX(rotationMatrix, rotationMatrix, rotation[1]);
        mat4.rotateY(rotationMatrix, rotationMatrix, rotation[0]);
        mat4.rotateZ(rotationMatrix, rotationMatrix, rotation[2]);

        mat4.multiply(this.viewMatrix, rotationMatrix, translationMatrix);
    }

    setAspect(aspect) {
        this.aspect = aspect;
        this.updateProjectionMatrix();
    }

}