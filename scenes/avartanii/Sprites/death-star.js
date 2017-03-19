(() => {
    window.SampleSpriteLibrary = window.SampleSpriteLibrary || {};

    let drawDeathStar = (renderingContext) => {
        renderingContext.save();

        let radialGradient = renderingContext.createRadialGradient(-206, -206, 1, 0, 0, 700);

        // Put your canvas drawing code (and any other code) here.
        radialGradient.addColorStop(0, "#BBB");
        radialGradient.addColorStop(.3, "#555");

        renderingContext.fillStyle = radialGradient;
        renderingContext.beginPath();
        renderingContext.arc(0, 0, 200, 0, Math.PI * 2, true);
        renderingContext.fill();

        renderingContext.clip();
        renderingContext.filter = "blur(5px)";
        renderingContext.strokeStyle = "black";
        renderingContext.lineWidth = 5;
        renderingContext.beginPath();
        renderingContext.arc(4, -756, 810, 0, Math.PI * 2, true);
        renderingContext.stroke();

        radialGradient = renderingContext.createRadialGradient(-16, -56, 1, 30, -41, 250);
        renderingContext.filter = "none";

        radialGradient.addColorStop(0, "#666");
        radialGradient.addColorStop(.2, "#666");
        radialGradient.addColorStop(.8, "#AAA");

        renderingContext.fillStyle = radialGradient;
        renderingContext.beginPath();
        renderingContext.arc(30, -41, 60, 0, Math.PI * 2, true);
        renderingContext.fill();

        renderingContext.restore();
    };

    let drawLaser = (renderingContext, howReady) => {
        renderingContext.save();
        let centerX = 30;
        let centerY = -41;
        let trig = 0;
        renderingContext.strokeStyle = "#0F0";
        renderingContext.lineWidth = 3;
        renderingContext.setLineDash([20, 5]);
        renderingContext.beginPath();
        for (var i = 0; i <= howReady * 8; i++) {
            trig = (i * 360 / 8) * Math.PI / 180;
            renderingContext.moveTo(centerX, centerY);
            renderingContext.moveTo(centerX + (60 * Math.cos(trig)), centerY + (60 * Math.sin(trig)));
            renderingContext.lineTo(75, -21);
            renderingContext.stroke();
        }
        renderingContext.restore();
    };

    SampleSpriteLibrary.deathStar = (fireWhenReady) => {
        let renderingContext = fireWhenReady.renderingContext;
        let howReady = fireWhenReady.howReady;

        renderingContext.save();
        drawDeathStar(renderingContext);
        drawLaser(renderingContext, howReady);
        renderingContext.restore();
    };

})();
