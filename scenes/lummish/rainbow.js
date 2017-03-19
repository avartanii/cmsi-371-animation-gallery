(() => {
    window.SampleSpriteLibrary = window.SampleSpriteLibrary || {};

    let canvas = $('#canvas')[0];
    const WIDTH = canvas.width,
        HEIGHT = canvas.height,
        COLOR_HEIGHT = HEIGHT / 7;

    let drawRainbow = (renderingContext) => {
        let xStart = -WIDTH / 2,
            yStart = -HEIGHT / 2;

        renderingContext.save();


        renderingContext.save();
        renderingContext.fillStyle = 'red';
        renderingContext.beginPath();
        renderingContext.rect(xStart, yStart, WIDTH, COLOR_HEIGHT);
        renderingContext.fill();
        renderingContext.restore();

        renderingContext.save();
        renderingContext.fillStyle = 'orange';
        renderingContext.beginPath();
        renderingContext.rect(xStart, yStart + COLOR_HEIGHT, WIDTH, COLOR_HEIGHT);
        renderingContext.fill();
        renderingContext.restore();

        renderingContext.save();
        renderingContext.fillStyle = 'yellow';
        renderingContext.beginPath();
        renderingContext.rect(xStart, yStart + COLOR_HEIGHT * 2, WIDTH, COLOR_HEIGHT);
        renderingContext.fill();
        renderingContext.restore();

        renderingContext.save();
        renderingContext.fillStyle = 'green';
        renderingContext.beginPath();
        renderingContext.rect(xStart, yStart + COLOR_HEIGHT * 3, WIDTH, COLOR_HEIGHT);
        renderingContext.fill();
        renderingContext.restore();

        renderingContext.save();
        renderingContext.fillStyle = 'blue';
        renderingContext.beginPath();
        renderingContext.rect(xStart, yStart + COLOR_HEIGHT * 4, WIDTH, COLOR_HEIGHT);
        renderingContext.fill();
        renderingContext.restore();

        renderingContext.save();
        renderingContext.fillStyle = '#4b0082';
        renderingContext.beginPath();
        renderingContext.rect(xStart, yStart + COLOR_HEIGHT * 5, WIDTH, COLOR_HEIGHT);
        renderingContext.fill();
        renderingContext.restore();

        renderingContext.save();
        renderingContext.fillStyle = '#ee82ee';
        renderingContext.beginPath();
        renderingContext.rect(xStart, yStart + COLOR_HEIGHT * 6, WIDTH, COLOR_HEIGHT);
        renderingContext.fill();
        renderingContext.restore();

        renderingContext.restore();
    };

    SampleSpriteLibrary.rainbow = (rainbowSpec) => {
        let renderingContext = rainbowSpec.renderingContext;

        renderingContext.save();
        drawRainbow(renderingContext);
        renderingContext.restore();
    };
})();
