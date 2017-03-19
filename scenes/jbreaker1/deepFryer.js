(() => {
    let renderingContext = canvas.getContext("2d");
    let deepFryer = new Image();
    let frenchFry = new Image();
    let loaded = false;
    let MiddlePotato = new Image();
    deepFryer.onload = function() {
        renderingContext.save();
        renderingContext.drawImage(deepFryer, 0, 100);
        renderingContext.restore();
    };
    MiddlePotato.onload = function() {
        renderingContext.drawImage(MiddlePotato, 30, 70, MiddlePotato.width / 2, MiddlePotato.height / 2);
    };
    frenchFry.onload = function() {
        renderingContext.save();
        renderingContext.rotate(-30 * Math.PI / 180);
        renderingContext.drawImage(frenchFry, 30, 70, frenchFry.width / 4, frenchFry.height / 4);
        loaded = true;
        renderingContext.restore();
    };
    deepFryer.src = '/image/deepFryer2.png';
    frenchFry.src = '/image/Frenchfry.png';
    MiddlePotato.src = '/image/middlepotato.png';
    window.SampleSpriteLibrary = window.SampleSpriteLibrary || {};
    SampleSpriteLibrary.deepFryer = (specs) => {
        let renderingContext = specs.renderingContext || 0;
        let down = specs.easeValues.down || 0;
        let change = specs.easeValues.change || 0;
        let drawFry = (down, change) => {
            renderingContext.save();
            renderingContext.beginPath();
            renderingContext.moveTo(-deepFryer.width / 2, -deepFryer.height / 2);
            renderingContext.lineTo(deepFryer.width / 2, deepFryer.height / 2);
            renderingContext.lineTo(-deepFryer.width / 2, deepFryer.height / 2);
            renderingContext.lineTo(deepFryer.width / 2, -deepFryer.height / 2);
            renderingContext.lineTo(deepFryer.width / 2, deepFryer.height / 2);
            renderingContext.closePath();
            renderingContext.clip();
            if (change > 0) {
                renderingContext.translate(30, down);
                renderingContext.drawImage(frenchFry, 40, 100, frenchFry.width / 4, frenchFry.height / 4);
            }
            renderingContext.rotate(-40 * Math.PI / 180);
            renderingContext.translate(30, down);
            renderingContext.restore();
        };
        let render = () => {
            if (loaded) {
                drawFry(down, change);
                renderingContext.drawImage(deepFryer, 0, 70);
            }
        };
        render();
    };
})();