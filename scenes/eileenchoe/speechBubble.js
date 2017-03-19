(() => {
    window.SampleSpriteLibrary = window.SampleSpriteLibrary || {};
    SampleSpriteLibrary.speechBubble = (specs) => {

        let renderingContext = specs.renderingContext;
        let phraseNum = Math.ceil(specs.phraseNum) || 0;
        let percentComplete = specs.percentComplete || 1;

        const PHRASES = [
            "            ",
            "Good afternoon, my name is Russell!", // 35 => 150
            "I am a Wilderness Explorer in Tribe 54, Sweat Lodge 12!",
            "Whoa!! Balloons! The wilderness must be explored!",
            "Haha, so long! I'll send you a post card from Paradise Falls",
            "Adventure is out there!"
        ];

        const CHARACTER_TO_WIDTH_SCALE = 150 / 35;

        // code adapted from: http://jsfiddle.net/V92Gn/682/
        // http://stackoverflow.com/questions/21597644/speech-buble-html5-canvas-js

        let drawBubble = (renderingContext) => {
            renderingContext.save();

            let phrase = PHRASES[phraseNum];
            let phraseSection = phrase.substring(0, Math.floor(phrase.length * percentComplete));


            let w = phraseSection.length * CHARACTER_TO_WIDTH_SCALE;
            // SpeechBubble can't be too small
            if (w < 50) { w = 50; }

            const h = 30;
            const radius = 10;
            const x = -(w / 4);
            const y = -(h / 2);

            const BOTTOM_LEFT_X = -(0.10 * w);
            const BOTTOM_LEFT_Y = 0.75 * h;

            // const LEFT_X = -80;
            // const LEFT_Y = 30;

            let px = BOTTOM_LEFT_X;
            let py = BOTTOM_LEFT_Y;

            renderingContext.fillText(phraseSection, x - (x * 0.25), y - (y * 1.25), w - (.1 * w));

            var r = x + w;
            var b = y + h;
            var con1, con2;
            if (py < y || py > y + h) {
                con1 = Math.min(Math.max(x + radius, px - 10), r - radius - 20);
                con2 = Math.min(Math.max(x + radius + 20, px + 10), r - radius);
            } else {
                con1 = Math.min(Math.max(y + radius, py - 10), b - radius - 20);
                con2 = Math.min(Math.max(y + radius + 20, py + 10), b - radius);
            }
            var dir;
            if (py < y) { dir = 2; }
            if (py > y) { dir = 3; }
            if (px < x && py >= y && py <= b) { dir = 0; }
            if (px > x && py >= y && py <= b) { dir = 1; }
            if (px >= x && px <= r && py >= y && py <= b) { dir = -1; }
            renderingContext.beginPath();
            renderingContext.strokeStyle = "black";
            renderingContext.lineWidth = "2";
            renderingContext.moveTo(x + radius, y);
            if (dir === 2){
                renderingContext.lineTo(con1, y);
                renderingContext.lineTo(px, py);
                renderingContext.lineTo(con2, y);
                renderingContext.lineTo(r - radius, y);
            } else { renderingContext.lineTo(r - radius, y); }
            renderingContext.quadraticCurveTo(r, y, r, y + radius);

            if (dir === 1){
                renderingContext.lineTo(r, con1);
                renderingContext.lineTo(px, py);
                renderingContext.lineTo(r, con2);
                renderingContext.lineTo(r, b - radius);
            } else { renderingContext.lineTo(r, b - radius); }
            renderingContext.quadraticCurveTo(r, b, r - radius, b);

            if (dir === 3){
                renderingContext.lineTo(con2, b);
                renderingContext.lineTo(px, py);
                renderingContext.lineTo(con1, b);
                renderingContext.lineTo(x + radius, b);
            } else { renderingContext.lineTo(x + radius, b); }
            renderingContext.quadraticCurveTo(x, b, x, b - radius);

            if (dir === 0){
                renderingContext.lineTo(x, con2);
                renderingContext.lineTo(px, py);
                renderingContext.lineTo(x, con1);
                renderingContext.lineTo(x, y + radius);
            } else {renderingContext.lineTo(x, y + radius); }
            renderingContext.quadraticCurveTo(x, y, x + radius, y);
            renderingContext.stroke();
            renderingContext.restore();
        };

        drawBubble(renderingContext);
    };
})();
