let x = 0;
let y = 0;

function setPosition(pos, x, y) {
    pos.style.transform = 'translate(' + x + 'px , ' + y + 'px)';
}

function addClickEvent(tile) {
    tile.element.onclick = function () {
        console.log('Tile clicked! ID:', tile.ID);
    };
}

function nextRow(){
    x = 0;
    y += 70;
}


let tileID = 0;
function GRASS_TILE(amount) {
function createTile(){
    const container = document.querySelector(".game");
    const element = document.createElement("img");
    element.src = "/scr/assets/tiles/grass_tile_1.png";
    element.className = "tile";
    container.appendChild(element);
    let tile = {
        element,
        tilex: 0,
        tiley: 0,
        ID: 0,
    };
    tile.tilex = x;
    tile.tiley = y;
    tile.ID = tileID;
    tileID += 1;
    setPosition(tile.element, tile.tilex, tile.tiley)
    x += 70;

    addClickEvent(tile);
    return tile;
}
for (let i = 0; i < amount; i++) {
    createTile();
}

}
function SAND_TILE(amount) {
    function createTile(){
        const container = document.querySelector(".game");
        const element = document.createElement("img");
        element.src = "/scr/assets/tiles/sand_tile.png";
        element.className = "tile";
        container.appendChild(element);
        let tile = {
            element,
            tilex: 0,
            tiley: 0,
            ID: 0,
        };
        tile.tilex = x;
        tile.tiley = y;
        tile.ID = tileID;
        tileID += 1;
        setPosition(tile.element, tile.tilex, tile.tiley)
        x += 70;
        addClickEvent(tile);
        return tile;
    }
    for (let i = 0; i < amount; i++) {
        createTile();
    }

}


function generateMap(){

    GRASS_TILE(1)
    SAND_TILE(1)
    GRASS_TILE(11)
    
    nextRow()
    
    //Row 2
    GRASS_TILE(1)
    SAND_TILE(11)
    GRASS_TILE(1)
    
    nextRow()
    
    //Row 3
    GRASS_TILE(11)
    SAND_TILE(1)
    GRASS_TILE(1)
    
    nextRow()
    
    //Row 4
    GRASS_TILE(1)
    SAND_TILE(5)
    GRASS_TILE(5)
    SAND_TILE(1)
    GRASS_TILE(1)
    
    nextRow()
    
    //Row 5
    GRASS_TILE(1)
    SAND_TILE(1)
    GRASS_TILE(3)
    SAND_TILE(1)
    GRASS_TILE(5)
    SAND_TILE(1)
    GRASS_TILE(1)
    
    nextRow()
    
    //Row 6
    GRASS_TILE(1)
    SAND_TILE(1)
    GRASS_TILE(3)
    SAND_TILE(7)
    GRASS_TILE(1)
    
    nextRow()
    
    //Row 7
    GRASS_TILE(1)
    SAND_TILE(1)
    GRASS_TILE(11)
    
    nextRow()
    
    //Row 8
    GRASS_TILE(1)
    SAND_TILE(1)
    GRASS_TILE(11)
    
    nextRow()
    
    //Row 9
    GRASS_TILE(1)
    SAND_TILE(10)
    GRASS_TILE(2)
    
    nextRow()
    
    //Row 10
    GRASS_TILE(10)
    SAND_TILE(1)
    GRASS_TILE(2)
}
generateMap()