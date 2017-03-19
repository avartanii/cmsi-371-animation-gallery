(() => {
    let renderingContext = canvas.getContext("2d");
    let x = 300;
    let y = 300;
    let potato = new Image();
    let halfPotato = new Image();
    let halfPotato2 = new Image();
    let LeftPotato = new Image();
    let MiddlePotato = new Image();
    let MiddlePotato2 = new Image();
    let RightPotato = new Image();
    potato.onload = function() {
        renderingContext.drawImage(potato, x, y, potato.width / 2, potato.height / 2);
    };
    potato.src = '/image/Potato.png';
    halfPotato.onload = function() {
        renderingContext.drawImage(halfPotato, x, y, halfPotato.width / 2, halfPotato.height / 2);
    };
    halfPotato2.onload = function() {
        renderingContext.drawImage(halfPotato2, x + 80, y, halfPotato2.width / 2, halfPotato.height / 2);
    };
    halfPotato.src = '/image/halfpotato.png';
    halfPotato2.src = '/image/halfpotato2.png';
    LeftPotato.onload = function() {
        renderingContext.drawImage(LeftPotato, x, y, LeftPotato.width / 2, LeftPotato.height / 2);
    };
    MiddlePotato.onload = function() {
        renderingContext.drawImage(MiddlePotato, x + 50, y, MiddlePotato.width / 2, MiddlePotato.height / 2);
    };
    MiddlePotato2.onload = function() {
        renderingContext.drawImage(MiddlePotato2, x + 100, y, MiddlePotato2.width / 2, MiddlePotato2.height / 2);
    };
    RightPotato.onload = function() {
        renderingContext.drawImage(RightPotato, x + 150, y, RightPotato.width / 2, RightPotato.height / 2);
    };
    LeftPotato.src = '/image/leftpotato.png';
    MiddlePotato.src = '/image/middlepotato.png';
    MiddlePotato2.src = '/image/middlepotato2.png';
    RightPotato.src = '/image/rightpotato.png';
    window.SampleSpriteLibrary = window.SampleSpriteLibrary || {};
    SampleSpriteLibrary.potato = (specs) => {
        let renderingContext = specs.renderingContext;
        let x = 0;
        let y = 0;
        let amount = specs.easeValues.amount || 0;
        let splitBy = (amount) => {
            if (amount >= 0 && amount < 1) {
                renderingContext.drawImage(potato, x, y, potato.width / 2, potato.height / 2);
            } else if (amount >= 1 && amount < 2) {
                renderingContext.drawImage(halfPotato, x - 50, y, halfPotato.width / 2, potato.height / 2);
                renderingContext.drawImage(halfPotato2, x + 50, y, halfPotato.width / 2, potato.height / 2);
            } else {
                renderingContext.drawImage(LeftPotato, x, y, LeftPotato.width / 2, potato.height / 2);
                renderingContext.drawImage(MiddlePotato, x + 50, y, MiddlePotato.width / 2, potato.height / 2);
                renderingContext.drawImage(MiddlePotato2, x + 100, y, MiddlePotato2.width / 2, potato.height / 2);
                renderingContext.drawImage(RightPotato, x + 150, y, RightPotato.width / 2, potato.height / 2);
            }
        };
        splitBy(amount);
    };
})();