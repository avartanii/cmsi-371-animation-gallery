(() => {
    let renderingContext = canvas.getContext("2d");
    let knife = new Image();
    knife.onload = function() {
        renderingContext.drawImage(knife, 0, 0);
    };
    knife.src = 'Images/knife.png';
    window.SampleSpriteLibrary = window.SampleSpriteLibrary || {};
    SampleSpriteLibrary.person = (specs) => {
        let renderingContext = specs.renderingContext || 0;
        let rotateLeft = specs.easeValues.rotateLeft || 0;
        let rotateRight = specs.easeValues.rotateRight || 0;

        let drawcircle = (xcord, ycord, size, startA, endA, whichWay) => {
            renderingContext.save();
            renderingContext.beginPath();
            renderingContext.arc(xcord, ycord, size, startA, endA, whichWay);
            renderingContext.stroke();
            renderingContext.restore();
        };
        let drawlines = (movex, movey, lineTox, lineToy) => {
            renderingContext.save();
            renderingContext.beginPath();
            renderingContext.moveTo(movex, movey);
            renderingContext.lineTo(lineTox, lineToy);
            renderingContext.strokeStyle = "black";
            renderingContext.stroke();
            renderingContext.restore();
        };
        //  head
        let drawhead = () => {
            drawcircle(200, 50, 30, 0, Math.PI * 2, true);
            renderingContext.beginPath();
            renderingContext.strokeStyle = "black";
            renderingContext.lineWidth = 3;
            //  mouth
            drawcircle(200, 50, 20, 0, Math.PI, false);
        };
        // eyes
        let draweyes = () => {
            renderingContext.beginPath();
            renderingContext.fillStyle = "black";
            // draw left eye
            drawcircle(190, 45, 3, 0, Math.PI * 2, true);
            renderingContext.fill();
            // draw right eye
            renderingContext.arc(210, 45, 3, 0, Math.PI * 2, true);
            renderingContext.fill();
        };
        //  body
        let drawbody = () => {
            drawlines(200, 80, 200, 180);
        };
        // Left arm
        let drawLeftArm = (rotateLeft) => {
            renderingContext.save();
            renderingContext.translate(200, 80);
            renderingContext.drawImage(knife, 50, 0, knife.height / 9, knife.width / 9);
            renderingContext.rotate(rotateLeft * Math.PI / 180);
            drawlines(0, 0, -50, 50);
            renderingContext.restore();

        };
        // Right arm
        let drawRightArm = (rotateRight) => {
            renderingContext.save();
            renderingContext.translate(200, 80);
            renderingContext.rotate(rotateRight * Math.PI / 180);
            drawlines(0, 0, 50, 50);
            renderingContext.restore();
        };
        // legs
        let drawLegs = () => {
            drawlines(200, 180, 150, 280);
            drawlines(200, 180, 250, 280);
        };
        drawhead();
        draweyes();
        drawbody();
        drawLeftArm(rotateLeft);
        drawRightArm(rotateRight);
        drawLegs();
    };
})();
