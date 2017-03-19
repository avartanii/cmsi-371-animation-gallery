(() => {
    window.SampleSpriteLibrary = window.SampleSpriteLibrary || {};

    const dondiWidth = 840;
    const dondiHeight = 192;
    const frameTotal = 4;
    let dondiReady = false;

    let dondiImage = new Image();
    dondiImage.addEventListener('load', () => {
        dondiReady = true;
    });
    dondiImage.src = "dondi.png";

    SampleSpriteLibrary.dondiSprite = (dondiDetails) => {
        let renderingContext = dondiDetails.renderingContext;
        let throwStage = dondiDetails.throwStage || 0;
        renderingContext.save();
        if (dondiReady) {
            renderingContext.drawImage(
                dondiImage,
                throwStage * dondiWidth / frameTotal,
                0,
                dondiWidth / frameTotal,
                dondiHeight,
                0,
                0,
                dondiWidth / frameTotal,
                dondiHeight
            );
        }
        renderingContext.restore();
    };
})();
