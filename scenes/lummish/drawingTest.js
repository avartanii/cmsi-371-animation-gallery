(() => {
    let canvas = $('#canvas')[0],
        renderingContext = canvas.getContext('2d');

    renderingContext.save();
    renderingContext.translate(canvas.width / 2, canvas.height / 2);
    SampleSpriteLibrary.lander({
        renderingContext
    });
    renderingContext.restore();
    renderingContext.save();

    setTimeout(() => {
        renderingContext.translate(canvas.width / 2, canvas.height / 2 + 44);
        renderingContext.scale(0.44, 0.44);
        SampleSpriteLibrary.astronaut({
            renderingContext,
            decimalVisible: 1
        });
    }, 200);
    renderingContext.restore();
})();
