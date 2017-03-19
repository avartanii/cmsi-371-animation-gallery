(() => {
    window.SampleSpriteLibrary = window.SampleSpriteLibrary || {};

    let drawTextbox = (renderingContext, tx, ty, color, width, height) => {
        renderingContext.save();
        renderingContext.translate(tx, ty);
        renderingContext.fillStyle = color;
        renderingContext.fillRect(0, 0, width, height);
        renderingContext.restore();
    };

    SampleSpriteLibrary.textboxSprite = (textboxDetails) => {
        let renderingContext = textboxDetails.renderingContext;
        renderingContext.save();
        drawTextbox(renderingContext);
        renderingContext.restore();
    };
})();
