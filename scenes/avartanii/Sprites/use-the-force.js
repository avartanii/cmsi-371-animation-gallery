(() => {
    window.SampleSpriteLibrary = window.SampleSpriteLibrary || {};

    const TEXT_HEIGHT = 200;
    const TEXT_WIDTH = TEXT_HEIGHT;


    // Hold off on drawing
    let readyText = false;

    // Import and prime images for drawing
    var text = new Image();
    text.onload = () => {
        readyText = true;
    };
    text.src = "Images/text/use-the-force.svg";

    let drawText = (renderingContext) => {
        renderingContext.save();
        if (readyText) {
            renderingContext.drawImage(text, -TEXT_WIDTH / 2, -TEXT_HEIGHT / 2, TEXT_WIDTH, TEXT_HEIGHT);
        }
        renderingContext.restore();
    };

    SampleSpriteLibrary.useTheForce = (master) => {
        let renderingContext = master.renderingContext;

        renderingContext.save();
        drawText(renderingContext);
        renderingContext.restore();
    };
})();
