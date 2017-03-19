(() => {
    window.SampleSpriteLibrary = window.SampleSpriteLibrary || {};

    const SPACE_HEIGHT = 768;
    const SPACE_WIDTH = 1024;


    // Hold off on drawing
    let readySpace = false;

    // Import and prime images for drawing
    var space = new Image();
    space.onload = () => {
        readySpace = true;
    };
    space.src = "Images/backgrounds/space.svg";

    let drawSpace = (renderingContext) => {
        renderingContext.save();
        if (readySpace) {
            renderingContext.drawImage(space, -SPACE_WIDTH / 2, -SPACE_HEIGHT / 2, SPACE_WIDTH, SPACE_HEIGHT);
        }
        renderingContext.restore();
    };

    SampleSpriteLibrary.space = (flare) => {
        let renderingContext = flare.renderingContext;

        renderingContext.save();
        drawSpace(renderingContext);
        renderingContext.restore();
    };
})();
