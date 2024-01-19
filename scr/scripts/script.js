let x = 0;
let y = 0;

function setPosition(pos, x, y) {
    pos.style.transform = 'translate(' + x + 'px , ' + y + 'px)';
}
function nextRow(){
    x = 0;
    y += 70;
}

function GRASS_TILE() {
    const container = document.querySelector(".game");
    const element = document.createElement("img");
    element.src = "/scr/assets/tiles/grass_tile_1.png";
    element.className = "tile";
    container.appendChild(element);
    let tile = {
        element,
        tilex: 0,
        tiley: 0,
    };
    tile.tilex = x;
    tile.tiley = y;
    setPosition(tile.element, tile.tilex, tile.tiley)
    x += 70;
}
function SAND_TILE() {
    const container = document.querySelector(".game");
    const element = document.createElement("img");
    element.src = "/scr/assets/tiles/sand_tile.png";
    element.className = "tile";
    container.appendChild(element);
    let tile = {
        element,
        tilex: 0,
        tiley: 0,
    };
    tile.tilex = x;
    tile.tiley = y;
    setPosition(tile.element, tile.tilex, tile.tiley)
    x += 70;
}


function generateMap(){





}