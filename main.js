import init, { mesh } from "./pkg/rust_greedy_voxel.js";
import {startRendering} from "./render/render.js";

init().then(() => {
    let vertices = mesh();
    startRendering(vertices);
});