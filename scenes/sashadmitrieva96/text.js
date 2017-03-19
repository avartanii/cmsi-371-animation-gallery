(() => {
    window.SampleSpriteLibrary = window.SampleSpriteLibrary || {};

    const textWidth = 600;
    const textHeight = 1000;
    const frameTotal = 10;
    let textReady = false;

    let textImage = new Image();
    textImage.addEventListener('load', () => {
        textReady = true;
    });
    textImage.src = "text.png";

    SampleSpriteLibrary.textSprite = (textDetails) => {
        let renderingContext = textDetails.renderingContext;
        let textBlock = textDetails.textBlock || 0;
        renderingContext.save();
        if (textReady) {
            renderingContext.drawImage(
                textImage,
                0,
                textBlock * textHeight / frameTotal,
                textWidth,
                textHeight / frameTotal,
                0,
                0,
                textWidth,
                textHeight / frameTotal
            );
        }
        renderingContext.restore();
    };
})();
