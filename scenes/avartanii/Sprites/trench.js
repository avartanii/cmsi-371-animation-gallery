(() => {
    window.SampleSpriteLibrary = window.SampleSpriteLibrary || {};

    const TRENCH_HEIGHT = 768;
    const TRENCH_WIDTH = 1024;
    const TRENCH_ZOOM_MAX = .25;

    let trenchZoom = 0.0;
    let switchImages = false;

    // Hold off on drawing
    let readyTrenchStars = false;
    let readyTrenchLines1 = false;
    let readyTrenchLines2 = false;

    // Import and prime images for drawing
    var trenchStars = new Image();
    trenchStars.onload = () => {
        readyTrenchStars = true;
    };
    trenchStars.src = "Images/backgrounds/trench-stars.svg";

    var trenchLines1 = new Image();
    trenchLines1.onload = () => {
        readyTrenchLines1 = true;
    };
    trenchLines1.src = "Images/backgrounds/trench-lines-1.svg";

    var trenchLines2 = new Image();
    trenchLines2.onload = () => {
        readyTrenchLines2 = true;
    };
    trenchLines2.src = "Images/backgrounds/trench-lines-2.svg";

    let drawTrenchStars = (renderingContext) => {
        renderingContext.save();
        if (readyTrenchStars) {
            renderingContext.drawImage(trenchStars,
                -TRENCH_WIDTH / 2, -TRENCH_HEIGHT / 2, TRENCH_WIDTH, TRENCH_HEIGHT);
        }
        renderingContext.restore();
    };

    let drawTrenchLines = (renderingContext, direction) => {
        renderingContext.save();
        if (readyTrenchLines1 && readyTrenchLines2) {
            if (trenchZoom >= TRENCH_ZOOM_MAX) {
                trenchZoom = 0.0;
                switchImages = !switchImages;
            }
            if (switchImages) {
                if (direction === 1.0) {
                    renderingContext.save();
                    renderingContext.scale(trenchZoom, trenchZoom);
                    renderingContext.drawImage(trenchLines2,
                        -TRENCH_WIDTH / 2, -TRENCH_HEIGHT / 2, TRENCH_WIDTH, TRENCH_HEIGHT);
                    renderingContext.restore();
                }
                renderingContext.save();
                renderingContext.scale(.25 + (direction * trenchZoom), .25 + (direction * trenchZoom));
                renderingContext.drawImage(trenchLines2, -TRENCH_WIDTH / 2, -TRENCH_HEIGHT / 2, TRENCH_WIDTH, TRENCH_HEIGHT);
                renderingContext.restore();
                renderingContext.save();
                renderingContext.scale(.5 + (direction * trenchZoom), .5 + (direction * trenchZoom));
                renderingContext.drawImage(trenchLines1, -TRENCH_WIDTH / 2, -TRENCH_HEIGHT / 2, TRENCH_WIDTH, TRENCH_HEIGHT);
                renderingContext.restore();
                renderingContext.save();
                renderingContext.scale(.75 + (direction * trenchZoom), .75 + (direction * trenchZoom));
                renderingContext.drawImage(trenchLines2, -TRENCH_WIDTH / 2, -TRENCH_HEIGHT / 2, TRENCH_WIDTH, TRENCH_HEIGHT);
                renderingContext.restore();
                renderingContext.save();
                renderingContext.scale(1.0 + (direction * trenchZoom), 1.0 + (direction * trenchZoom));
                renderingContext.drawImage(trenchLines1, -TRENCH_WIDTH / 2, -TRENCH_HEIGHT / 2, TRENCH_WIDTH, TRENCH_HEIGHT);
                renderingContext.restore();
                trenchZoom += .05;
            } else {
                if (direction === 1.0) {
                    renderingContext.save();
                    renderingContext.scale(trenchZoom, trenchZoom);
                    renderingContext.drawImage(trenchLines2,
                        -TRENCH_WIDTH / 2, -TRENCH_HEIGHT / 2, TRENCH_WIDTH, TRENCH_HEIGHT);
                    renderingContext.restore();
                }
                renderingContext.save();
                renderingContext.scale(.25 + (direction * trenchZoom), .25 + (direction * trenchZoom));
                renderingContext.drawImage(trenchLines1, -TRENCH_WIDTH / 2, -TRENCH_HEIGHT / 2, TRENCH_WIDTH, TRENCH_HEIGHT);
                renderingContext.restore();
                renderingContext.save();
                renderingContext.scale(.5 + (direction * trenchZoom), .5 + (direction * trenchZoom));
                renderingContext.drawImage(trenchLines2, -TRENCH_WIDTH / 2, -TRENCH_HEIGHT / 2, TRENCH_WIDTH, TRENCH_HEIGHT);
                renderingContext.restore();
                renderingContext.save();
                renderingContext.scale(.75 + (direction * trenchZoom), .75 + (direction * trenchZoom));
                renderingContext.drawImage(trenchLines1, -TRENCH_WIDTH / 2, -TRENCH_HEIGHT / 2, TRENCH_WIDTH, TRENCH_HEIGHT);
                renderingContext.restore();
                renderingContext.save();
                renderingContext.scale(1.0 + (direction * trenchZoom), 1.0 + (direction * trenchZoom));
                renderingContext.drawImage(trenchLines2, -TRENCH_WIDTH / 2, -TRENCH_HEIGHT / 2, TRENCH_WIDTH, TRENCH_HEIGHT);
                renderingContext.restore();
                trenchZoom += .05;
            }
        }
        renderingContext.restore();
    };

    SampleSpriteLibrary.trench = (dangerZone) => {
        let renderingContext = dangerZone.renderingContext;
        let direction = dangerZone.direction;

        renderingContext.save();
        drawTrenchStars(renderingContext);
        drawTrenchLines(renderingContext, direction);
        renderingContext.restore();
    };
})();
