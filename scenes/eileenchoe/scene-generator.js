"use strict";

// rgb(255,179,71)
// rgb(174,198,207)
// rgb(253,253,150)
// rgb(255,209,220)
// rgb(160,150,207)
// rgb(230,165,197)
// rgb(142,211,112)
// 128210215
// 141216161
// 189025149

let tetherPointGenerator = (houseX, houseY) => {
    let houseRadius = 200;
    const UNIT = houseRadius / 12;
    let tetherX = houseX - UNIT;
    let tetherY = houseY - (UNIT * 6);
    return {
        tetherX,
        tetherY
    };
    // console.log(tetherX);
    // console.log(tetherY);
};

tetherPointGenerator(512, 550);
