
window.SampleSpriteLibrary = window.SampleSpriteLibrary || {};

SampleSpriteLibrary.face = ((specs) => {

    /*
        color, jaw, chin, eyeSize, eyecolor

    */
    let clamp = (val, min, max) => {
        return Math.min(max, Math.max(min, val));
    };

    let makeColor = (r, g, b) => {
        r = Math.floor(r);
        g = Math.floor(g);
        b = Math.floor(b);
        return ["rgb(", r, ",", g, ",", b, ")"].join("");
    };

    let ctx = specs.renderingContext;
    let color = makeColor(specs.faceR || 200, specs.faceG || 140, specs.faceB || 40); "#CD853F";
    let width = 50;

    let bot = width * (specs.height || 1);
    let left = -width;
    let right = width;
    let jawDown = width * 1.5 * (specs.jawWidth || 1);
    let jawSide = width * .4 * (specs.chinWidth || 1);

    let eyeSize = 10 * (specs.eyeSize || 1);
    let pupilSize = 5 * (specs.pupilSize || 1);
    let eyeColor = makeColor(specs.eyeR || 0, specs.eyeG || 20, specs.eyeB || 180);
    let eyeOffset = {x: width / 2, y: width / 2};

    let pupilOffset = specs.pupilOffset || {x: .2, y: .2};
    pupilOffset.x = clamp(pupilOffset.x, -.5, .5);
    pupilOffset.y = clamp(pupilOffset.x, -.5, .5);

    let mouthY = width * 1.5;
    let mouthX = -width / 2;
    let mouthWidth = width;
    let mouthHeight = 1 + width * (specs.mouthHeight || 0);
    mouthHeight = clamp(mouthHeight, 0, width * .9);

    let render = () => {
        drawFace();
        drawEye(eyeOffset.x, eyeOffset.y, pupilOffset);
        drawEye(-eyeOffset.x, eyeOffset.y, pupilOffset);
        drawMouth();
    };

    let drawFace = () => {
        ctx.save();
        ctx.fillStyle = color;
        ctx.lineWidth = 2;

        ctx.beginPath();
        ctx.arc(0, 0, width, 0, -Math.PI, Math.PI);
        ctx.moveTo(left, 0);
        ctx.lineTo(left, bot);
        ctx.lineTo(left + jawSide, bot + jawDown);
        ctx.lineTo(right - jawSide, bot + jawDown);
        ctx.lineTo(right, bot);
        ctx.lineTo(right, 0);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    };

    let drawEye = (x, y, po) => {
        ctx.beginPath();

        ctx.fillStyle = "white";
        ctx.arc(x, y, eyeSize, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = eyeColor;
        ctx.beginPath();
        ctx.arc(x + (po.x * eyeSize), y + (po.y * eyeSize), pupilSize, 0, Math.PI * 2);
        ctx.fill();
    };

    let drawMouth = () => {
        ctx.strokeStyle = "red";
        ctx.fillStyle = "black";

        ctx.beginPath();
        ctx.moveTo(mouthX, mouthY);
        ctx.lineTo(mouthX, mouthY + mouthHeight);
        ctx.lineTo(mouthX + mouthWidth, mouthY + mouthHeight);
        ctx.lineTo(mouthX + mouthWidth, mouthY);
        ctx.lineTo(mouthX, mouthY);
        ctx.fill();
        ctx.stroke();



    };
    render();


});
