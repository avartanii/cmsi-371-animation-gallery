// standing russell: http://vignette3.wikia.nocookie.net/disney/images/2/27/Russell-up.jpg/revision/latest?cb=20100707183306
// jumping russell: http://4.bp.blogspot.com/-EE3wT5fSFvM/UI7JTn7kXuI/AAAAAAAAB0A/NBuKSPuyDEE/s1600/up_russell1.jpg

(() => {

    let imgRussellStanding = new Image();
    imgRussellStanding.src = "russell-standing.png";
    let imgRussellJumping = new Image();
    imgRussellJumping.src = "russell-jumping.png";
    let imgRussellLeaping = new Image();
    imgRussellLeaping.src = "russell-leaping.png";

    window.SampleSpriteLibrary = window.SampleSpriteLibrary || {};

    SampleSpriteLibrary.russell = (specs) => {
        const RUSSELL_HEIGHT = 60;
        let renderingContext = specs.renderingContext;
        let russellState = Math.floor(specs.russellState || 0) % 3;
        let draw = () => {
            if (russellState === 0) {
                renderingContext.drawImage(imgRussellJumping, 0, 0, RUSSELL_HEIGHT, RUSSELL_HEIGHT);
            } else if (russellState === 1) {
                renderingContext.drawImage(imgRussellStanding, 0, 0, RUSSELL_HEIGHT, RUSSELL_HEIGHT);
            } else {
                renderingContext.drawImage(imgRussellLeaping, 0, 0, RUSSELL_HEIGHT, RUSSELL_HEIGHT);
            }
        };
        draw();
    };

})();
