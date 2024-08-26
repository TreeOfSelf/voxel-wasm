import init, { initialize_world, mesh, consume_chunk_buffers } from "./pkg/rust_greedy_voxel.js";
import { World } from "./voxel/world.js";
import {startRendering} from "./render/render.js";

var world = new World();

init().then(() => {

    initialize_world();
    
    for (let chunkID in world.chunks) {
        console.log(chunkID);
        console.log(world.chunks[chunkID]);
        consume_chunk_buffers(chunkID, world.chunks[chunkID].vertices);
    }

    let vertices = mesh();

    console.log(new Int32Array(world.chunks[0].vertices))

    startRendering(vertices);
});