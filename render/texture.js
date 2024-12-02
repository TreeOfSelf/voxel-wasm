import { gl } from './boilerplate.js';

export function createTextures() {
    var texture = gl.createTexture();
    loadImage('../textures/greedy.png', function(image){
        var NUM_IMAGES = 5;
        var IMAGE_SIZE = {
            width: 32,
            height: 32
        };
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D_ARRAY, texture);
        gl.texParameteri(gl.TEXTURE_2D_ARRAY, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D_ARRAY, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texImage3D(
            gl.TEXTURE_2D_ARRAY,
            0,
            gl.RGBA,
            IMAGE_SIZE.width,
            IMAGE_SIZE.height,
            NUM_IMAGES,
            0,
            gl.RGBA,
            gl.UNSIGNED_BYTE,
            pixels
        );

        
    });
}

function loadImage(url, onload) {
    var img = new Image();
    img.src = url;
    img.onload = function() {
        onload(img);
    };
    return img;
};