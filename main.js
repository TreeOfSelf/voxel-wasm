import init, { initialize_world, mesh, starter_block, consume_chunk_buffers } from "./pkg/rust_greedy_voxel.js";
import { World } from "./voxel/world.js";
import { startRendering} from "./render/render.js";

var world = new World();

init().then(() => {

    initialize_world();

    for (let chunkID in world.chunks) {
        consume_chunk_buffers(chunkID, world.chunks[chunkID].vertices);
    }

    starter_block();

    startRendering(new Int32Array(world.chunks[0].vertices));

    console.log(world);
});