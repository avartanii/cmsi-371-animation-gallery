(() => {
    window.SampleSpriteLibrary = window.SampleSpriteLibrary || {};

    const SPACE_HEIGHT = 768;
    const SPACE_WIDTH = 1024;


    // Hold off on drawing
    let readySpaceBlank = false;

    // Import and prime images for drawing
    var spaceBlank = new Image();
    spaceBlank.onload = () => {
        readySpaceBlank = true;
    };
    spaceBlank.src = "Images/backgrounds/space-blank.svg";

    let drawSpaceBlank = (renderingContext) => {
        renderingContext.save();
        if (readySpaceBlank) {
            renderingContext.drawImage(spaceBlank, -SPACE_WIDTH / 2, -SPACE_HEIGHT / 2, SPACE_WIDTH, SPACE_HEIGHT);
        }
        renderingContext.restore();
    };

    SampleSpriteLibrary.spaceBlank = (frontier) => {
        let renderingContext = frontier.renderingContext;

        renderingContext.save();
        drawSpaceBlank(renderingContext);
        renderingContext.restore();
    };
})();
