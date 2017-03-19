(() => {
    window.SampleSpriteLibrary = window.SampleSpriteLibrary || {};
    let canvas = $('#canvas')[0];
    const WIDTH = canvas.width,
        HEIGHT = canvas.height,
        STAR_RADIUS = 2;

    let starPositions,
        starX,
        starY;

    let drawSpace = (renderingContext) => {
        renderingContext.save();
        renderingContext.fillStyle = 'black';
        renderingContext.rect(-WIDTH / 2, -HEIGHT / 2, WIDTH, HEIGHT);
        renderingContext.fill();
        renderingContext.restore();
    };

    let drawStars = (renderingContext) => {
        if (!starPositions) {
            starX = -WIDTH / 2;
            starPositions = [];
            for (let i = 0; i < 500; i++) {
                starX += Math.floor(Math.random() * 5);
                starY = Math.floor(Math.random() * canvas.height) + -HEIGHT / 2;
                starPositions.push({x: starX, y: starY});
            }
        }

        renderingContext.save();
        renderingContext.fillStyle = 'white';
        for (let star of starPositions) {
            renderingContext.beginPath();
            renderingContext.ellipse(star.x, star.y, STAR_RADIUS, STAR_RADIUS, 0, 0, 2 * Math.PI);
            renderingContext.fill();
        }
        renderingContext.restore();
    };

    SampleSpriteLibrary.backDrop = (backdropSpec) => {
        let renderingContext = backdropSpec.renderingContext;

        renderingContext.save();
        drawSpace(renderingContext);
        drawStars(renderingContext);
        renderingContext.restore();
    };
})();
