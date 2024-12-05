import { gl } from './boilerplate.js';

export function createTextures() {
    var texture = gl.createTexture();
    loadImage('./textures/greedy.png', function(image){
        var NUM_IMAGES = 5;
        var IMAGE_SIZE = {
            width: 32,
            height: 32
        };

        var canvas = document.createElement('canvas');
        canvas.width = IMAGE_SIZE.width;
        canvas.height = IMAGE_SIZE.height * NUM_IMAGES;
        var ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0);
        var imageData = ctx.getImageData(0, 0, IMAGE_SIZE.width, IMAGE_SIZE.height * NUM_IMAGES);
        var pixels = new Uint8Array(imageData.data.buffer);
        
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D_ARRAY, texture);
        gl.texParameteri(gl.TEXTURE_2D_ARRAY, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D_ARRAY, gl.TEXTURE_MIN_FILTER, gl.NEAREST_MIPMAP_NEAREST);
        gl.texParameteri(gl.TEXTURE_2D_ARRAY,gl.TEXTURE_WRAP_S,gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D_ARRAY,gl.TEXTURE_WRAP_T,gl.REPEAT);
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
        gl.generateMipmap(gl.TEXTURE_2D_ARRAY)
        gl.texParameteri(gl.TEXTURE_2D_ARRAY, gl.TEXTURE_MIN_FILTER, gl.NEAREST_MIPMAP_LINEAR)
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