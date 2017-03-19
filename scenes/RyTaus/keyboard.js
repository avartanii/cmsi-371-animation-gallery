window.SampleSpriteLibrary = window.SampleSpriteLibrary || {};

SampleSpriteLibrary.keyboard = ((specs) => {
    let clamp = (val, min, max) => {
        return Math.min(Math.max(val, min), max);
    };

    const rc = specs.renderingContext;

    let keySize = 20;
    let height = 4;

    let stepSize = 25;

    let keyIn = [[specs.tl * height, specs.tm * height, specs.tr * height],
                 [specs.ml * height, specs.mm * height, specs.mr * height],
                 [specs.bl * height, specs.bm * height, specs.br * height]];

    // console.log(keyIn);



    let keyArray = [[false || specs.tl, false || specs.tm, false || specs.tr],
                    [false || specs.ml, false || specs.mm, false || specs.mr],
                    [false || specs.bl, false || specs.bm, false || specs.br]];

    let offset = 20;

    let render = () => {
        drawBack();

        rc.fillStyle = "gray";

        for (var i = 0; i < keyArray.length; i++) {
            for (var j = 0; j < keyArray.length; j++) {
                drawKeyUp(offset + stepSize * j, offset + stepSize * i, clamp(keyIn[i][j], 0, height));

            }
        }

    };

    let drawBack = () => {
        rc.fillStyle = "#333333";
        rc.beginPath();
        rc.rect(offset / 2, offset / 2, 4 * stepSize - offset / 2, 4 * stepSize - offset / 2);
        rc.fill();
    };

    let drawKeyUp = (x, y, h) => {
        rc.lineWidth = 1;
        rc.beginPath();
        rc.rect(x, y, keySize, keySize);
        rc.fill();
        rc.stroke();
        rc.beginPath();
        rc.rect(x, y - h, keySize, keySize);
        rc.fill();
        rc.stroke();

    };




    render();

});
