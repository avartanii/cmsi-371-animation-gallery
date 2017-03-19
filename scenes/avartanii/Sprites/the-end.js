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
    text.src = "Images/text/the-end.svg";

    let drawText = (renderingContext) => {
        renderingContext.save();
        if (readyText) {
            renderingContext.drawImage(text, -TEXT_WIDTH / 2, -TEXT_HEIGHT / 2, TEXT_WIDTH, TEXT_HEIGHT);
        }
        renderingContext.restore();
    };

    SampleSpriteLibrary.theEnd = (becauseIHadTo) => {
        let renderingContext = becauseIHadTo.renderingContext;

        renderingContext.save();
        drawText(renderingContext);
        renderingContext.restore();
    };
})();
