// Image inspiraton: https://s-media-cache-ak0.pinimgCarl.com/736x/77/99/05/7799058cb70189ee12f6ae810599f6a7.jpg
(() => {

    let imgCarl = new Image();
    imgCarl.src = "carl.png";

    window.SampleSpriteLibrary = window.SampleSpriteLibrary || {};
    SampleSpriteLibrary.house = (specs) => {

        let renderingContext = specs.renderingContext;
        let houseRadius = specs.houseRadius || 200;
        let windowPercentOpen = specs.windowPercentOpen || 0;

        if (windowPercentOpen > 1) {
            windowPercentOpen = 1;
        }

        const HOUSE_SCALE = houseRadius / 12;

        let drawHouse = () => {

            // base
            renderingContext.fillStyle = "#EE99C3";
            renderingContext.fillRect(-5 * HOUSE_SCALE, 0, 10 * HOUSE_SCALE, 6 * HOUSE_SCALE);

            // roof
            renderingContext.fillStyle = "#878789";
            renderingContext.beginPath();
            renderingContext.moveTo(-6 * HOUSE_SCALE, 0);
            renderingContext.lineTo(-4 * HOUSE_SCALE, -4 * HOUSE_SCALE);
            renderingContext.lineTo(4 * HOUSE_SCALE, -4 * HOUSE_SCALE);
            renderingContext.lineTo(6 * HOUSE_SCALE, 0);
            renderingContext.closePath();
            renderingContext.fill();

            // chimmeney
            renderingContext.fillStyle = "#724A30";
            renderingContext.fillRect(-2 * HOUSE_SCALE, -6 * HOUSE_SCALE, 2 * HOUSE_SCALE, 2 * HOUSE_SCALE);
            renderingContext.fillRect(-2.25 * HOUSE_SCALE, -6 * HOUSE_SCALE, 2.5 * HOUSE_SCALE, .5 * HOUSE_SCALE);

            // big - triangle border
            renderingContext.fillStyle = "#7AA7BC";
            renderingContext.beginPath();
            renderingContext.moveTo(-0.5 * HOUSE_SCALE, 0);
            renderingContext.lineTo(2.5 * HOUSE_SCALE, -8 * HOUSE_SCALE);
            renderingContext.lineTo(5.5 * HOUSE_SCALE, 0);
            renderingContext.closePath();
            renderingContext.fill();

            // big - triangle
            renderingContext.fillStyle = "#F9F39B";
            renderingContext.beginPath();
            renderingContext.moveTo(0, 0);
            renderingContext.lineTo(2.5 * HOUSE_SCALE, -7 * HOUSE_SCALE);
            renderingContext.lineTo(5 * HOUSE_SCALE, 0);
            renderingContext.closePath();
            renderingContext.fill();

            // small - triangle border
            renderingContext.fillStyle = "#7AA7BC";
            renderingContext.beginPath();
            renderingContext.moveTo(-4.5 * HOUSE_SCALE, -3 * HOUSE_SCALE);
            renderingContext.lineTo(-3 * HOUSE_SCALE, -6 * HOUSE_SCALE);
            renderingContext.lineTo(-1.5 * HOUSE_SCALE, -3 * HOUSE_SCALE);
            renderingContext.closePath();
            renderingContext.fill();

            // small - triangle
            renderingContext.fillStyle = "#F9F39B";
            renderingContext.beginPath();
            renderingContext.moveTo(-4 * HOUSE_SCALE, -3 * HOUSE_SCALE);
            renderingContext.lineTo(-3 * HOUSE_SCALE, -5 * HOUSE_SCALE);
            renderingContext.lineTo(-2 * HOUSE_SCALE, -3 * HOUSE_SCALE);
            renderingContext.lineTo(-2 * HOUSE_SCALE, -HOUSE_SCALE);
            renderingContext.lineTo(-4 * HOUSE_SCALE, -HOUSE_SCALE);
            renderingContext.closePath();
            renderingContext.fill();

            // fence - lines
            renderingContext.strokeStyle = "#ffffff";
            renderingContext.moveTo(-5 * HOUSE_SCALE, HOUSE_SCALE);
            renderingContext.lineTo(0, HOUSE_SCALE);
            renderingContext.moveTo(-5 * HOUSE_SCALE, 1.5 * HOUSE_SCALE);
            renderingContext.lineTo(0, 1.5 * HOUSE_SCALE);
            renderingContext.moveTo(-5 * HOUSE_SCALE, 3 * HOUSE_SCALE);
            renderingContext.lineTo(-3 * HOUSE_SCALE, 3 * HOUSE_SCALE);
            for (let i = 0; i < 9; i++) {
                renderingContext.moveTo(-4.5 * HOUSE_SCALE + 0.5 * HOUSE_SCALE * i, HOUSE_SCALE);
                renderingContext.lineTo(-4.5 * HOUSE_SCALE + 0.5 * HOUSE_SCALE * i, 1.5 * HOUSE_SCALE);
            }
            for (let i = 0; i < 3; i++) {
                renderingContext.moveTo(-4.5 * HOUSE_SCALE + 0.5 * HOUSE_SCALE * i, 3 * HOUSE_SCALE);
                renderingContext.lineTo(-4.5 * HOUSE_SCALE + 0.5 * HOUSE_SCALE * i, 5 * HOUSE_SCALE);
            }
            renderingContext.stroke();


            // porch
            renderingContext.fillStyle = "#B5B9BB";
            renderingContext.fillRect(-5 * HOUSE_SCALE, 5 * HOUSE_SCALE, 5 * HOUSE_SCALE, 1 * HOUSE_SCALE);

            // grey background
            renderingContext.fillStyle = "#B5B9BB";
            renderingContext.fillRect(0, HOUSE_SCALE, 5 * HOUSE_SCALE, 5 * HOUSE_SCALE);

            // orange above window part
            renderingContext.fillStyle = "#FCB468";
            renderingContext.fillRect(0, 0, 5 * HOUSE_SCALE, HOUSE_SCALE);

            // part middle
            renderingContext.fillStyle = "#B4D77B";
            renderingContext.fillRect(1.5 * HOUSE_SCALE, HOUSE_SCALE, 2 * HOUSE_SCALE, 5 * HOUSE_SCALE);

            // part right and left dark green
            renderingContext.fillStyle = "#9ACC6C";
            renderingContext.beginPath();
            renderingContext.moveTo(0, 6 * HOUSE_SCALE);
            renderingContext.lineTo(0, 2 * HOUSE_SCALE);
            renderingContext.lineTo(1.5 * HOUSE_SCALE, HOUSE_SCALE);
            renderingContext.lineTo(1.5 * HOUSE_SCALE, 6 * HOUSE_SCALE);
            renderingContext.closePath();
            renderingContext.fill();

            renderingContext.beginPath();
            renderingContext.moveTo(3.5 * HOUSE_SCALE, HOUSE_SCALE);
            renderingContext.lineTo(5 * HOUSE_SCALE, 2 * HOUSE_SCALE);
            renderingContext.lineTo(5 * HOUSE_SCALE, 6 * HOUSE_SCALE);
            renderingContext.lineTo(3.5 * HOUSE_SCALE, 6 * HOUSE_SCALE);
            renderingContext.closePath();
            renderingContext.fill();

            // small window
            renderingContext.fillStyle = "#DFBCE3";
            renderingContext.fillRect(-3.5 * HOUSE_SCALE, -3.5 * HOUSE_SCALE, HOUSE_SCALE, 2 * HOUSE_SCALE);
            renderingContext.fillStyle = "#000000";
            renderingContext.fillRect(-3.4 * HOUSE_SCALE, -3.4 * HOUSE_SCALE, 0.75 * HOUSE_SCALE, 1.75 * HOUSE_SCALE);
            renderingContext.fillStyle = "#DFBCE3";
            renderingContext.fillRect(-3.5 * HOUSE_SCALE, -2.7 * HOUSE_SCALE, HOUSE_SCALE, 0.25 * HOUSE_SCALE);

            // big window
            renderingContext.fillStyle = "#DFBCE3";
            renderingContext.fillRect(1.5 * HOUSE_SCALE, -3.5 * HOUSE_SCALE, 2 * HOUSE_SCALE, 3 * HOUSE_SCALE);
            renderingContext.fillStyle = "#000000";
            renderingContext.fillRect(1.6 * HOUSE_SCALE, -3.4 * HOUSE_SCALE, 1.75 * HOUSE_SCALE, 2.75 * HOUSE_SCALE);
            renderingContext.fillStyle = "#DFBCE3";
            renderingContext.fillRect(1.5 * HOUSE_SCALE, -2.25 * HOUSE_SCALE, 2 * HOUSE_SCALE, 0.3 * HOUSE_SCALE);

            // door
            renderingContext.fillStyle = "#967147";
            renderingContext.fillRect(-3 * HOUSE_SCALE, 2 * HOUSE_SCALE, 2 * HOUSE_SCALE, 3 * HOUSE_SCALE);

            // handle
            renderingContext.fillStyle = "#000000";
            renderingContext.beginPath();
            renderingContext.arc(-1.25 * HOUSE_SCALE, 3.5 * HOUSE_SCALE, 0.2 * HOUSE_SCALE, 0, 2 * Math.PI, false);
            renderingContext.fill();

        };

        let drawWindow = (windowPercentOpen, imgCarl) => {

            renderingContext.fillStyle = "#DFBCE3";
            renderingContext.fillRect(1.5 * HOUSE_SCALE, -3.5 * HOUSE_SCALE, 2 * HOUSE_SCALE, 3 * HOUSE_SCALE);
            renderingContext.fillStyle = "#000000";
            renderingContext.fillRect(1.6 * HOUSE_SCALE, -3.4 * HOUSE_SCALE, 1.75 * HOUSE_SCALE, 2.75 * HOUSE_SCALE);
            renderingContext.drawImage(imgCarl, 1.75 * HOUSE_SCALE, -2.35 * HOUSE_SCALE, 1.7 * HOUSE_SCALE, 1.7 * HOUSE_SCALE);
            renderingContext.fillStyle = "#E3C55C";
            renderingContext.fillRect(
                1.6 * HOUSE_SCALE,
                -3.4 * HOUSE_SCALE,
                1.75 * HOUSE_SCALE,
                2.75 * HOUSE_SCALE * (1 - windowPercentOpen)
            );
            renderingContext.fillStyle = "#DFBCE3";
            renderingContext.fillRect(1.5 * HOUSE_SCALE, -2.25 * HOUSE_SCALE, 2 * HOUSE_SCALE, 0.3 * HOUSE_SCALE);
        };

        let render = () => {
            drawHouse();
            drawWindow(windowPercentOpen, imgCarl);
        };

        render();

    };

})();
