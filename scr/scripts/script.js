//////////////////////////////////////////////////////////////////////
//////                 information                              ////// 
//////////////////////////////////////////////////////////////////////

let selectedMap = 0;

let x = 0;
let y = 0;

const path = [];
const enemies = [];
//////////////////////////////////////////////////////////////////////
//////                 Global                                   ////// 
//////////////////////////////////////////////////////////////////////

function setPosition(pos, x, y) {
    pos.style.transform = 'translate(' + x + 'px , ' + y + 'px)';
}
let oldTile = [];

function addClickEvent(tile) {
    if (tile.Type == "grass") {
        tile.element.onclick = function () {
            if (oldTile.length > 0) {
                oldTile[0].element.src = "/scr/assets/tiles/grass_tile_1.png";
            }
            oldTile = [tile];
            console.log('Tile clicked! ID:', tile.ID);
            tile.element.src = "/scr/assets/tiles/grass2.png";
        };
    }
}
//////////////////////////////////////////////////////////////////////
//////                 Enemy Creating                           ////// 
//////////////////////////////////////////////////////////////////////
let EnemyID = 0;
function createEnemy1(amount){
    function enemy(){
        const container = document.querySelector(".game");
        const element = document.createElement("img");
        element.src = "/scr/assets/enemy/bee.png";
        element.className = "enemy bee";
        element.draggable = false;
        container.appendChild(element);
        let enemy = {
            movingspeed: 10,
            element,
            enemyX: 0,
            enemyY: 0,
            ID: 0,
            Type: "Bee"
        };
        EnemyID++
        enemy.ID = EnemyID;
        enemy.enemyX = path[0].tilex + 35;
        enemy.enemyY = path[0].tiley + 105;
        setPosition(enemy.element, enemy.enemyX, enemy.enemyY - 17.5)
        return enemy;
    }
    for (let i = 0; i < amount; i++) {
        enemy();
    }
}

//////////////////////////////////////////////////////////////////////
//////                 Tree Generation                          ////// 
//////////////////////////////////////////////////////////////////////




//////////////////////////////////////////////////////////////////////
//////                 Grass Generation                         ////// 
//////////////////////////////////////////////////////////////////////

let tileID = 0;
function grassTile(amount) {
    function createTile() {
        const container = document.querySelector(".game");
        const element = document.createElement("img");
        element.src = "/scr/assets/tiles/grass_tile_1.png";
        element.className = "tile";
        element.draggable = false;
        container.appendChild(element);
        let tile = {
            element,
            tilex: 0,
            tiley: 0,
            ID: 0,
            Type: "grass"
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
//////////////////////////////////////////////////////////////////////
//////                 Path Generation                          ////// 
//////////////////////////////////////////////////////////////////////

function sandTile(amount) {
    function createTile() {
        const container = document.querySelector(".game");
        const element = document.createElement("img");
        element.src = "/scr/assets/tiles/sand_tile.png";
        element.className = "tile";
        element.draggable = false;
        container.appendChild(element);
        let tile = {
            element,
            tilex: 0,
            tiley: 0,
            ID: 0,
            centerX: 0,
            centerY: 0,
            Type: "sand"
        };
        tile.tilex = x;
        tile.tiley = y;
        tile.centerX = tile.tilex - 35;
        tile.centerY = tile.tiley - 35;
        tile.ID = tileID;
        tileID += 1;
        console.log("trying to push in path....")
        path.push(tile)
        console.log("succesfull...")
        setPosition(tile.element, tile.tilex, tile.tiley)
        x += 70;
        addClickEvent(tile);
        return tile;
    }
    for (let i = 0; i < amount; i++) {
        createTile();
    }

}

//////////////////////////////////////////////////////////////////////
//////                 Edit map                                 ////// 
//////////////////////////////////////////////////////////////////////

function editmap0(){
    const row1 =  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3];
    const row2 =  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 3];
    const row3 =  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 3];
    const row4 =  [0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 3];
    const row5 =  [0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 3];
    const row6 =  [0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 3];
    const row7 =  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3];
    const row8 =  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3];
    const row9 =  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 3];
    const row10 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 3];
    const map = [row1, row2, row3, row4, row5, row6, row7, row8, row9, row10];
    return map;
}
function editmap1(){
    const row1 =  [0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 3];
    const row2 =  [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 3];
    const row3 =  [0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 3];
    const row4 =  [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 3];
    const row5 =  [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 3];
    const row6 =  [1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 3];
    const row7 =  [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 3];
    const row8 =  [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 3];
    const row9 =  [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 3];
    const row10 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3];
    const map = [row1, row2, row3, row4, row5, row6, row7, row8, row9, row10];
    return map;
}
//////////////////////////////////////////////////////////////////////
//////                 Map Generation                           ////// 
//////////////////////////////////////////////////////////////////////

function generateTile(mapping) {
    for (let i = 0; i < mapping.length; i++) {
        for (let j = 0; j < mapping[i].length; j++) {
            const mappingID = mapping[i][j];
            if (mappingID == 3) {
                x = 0;
                y += 70;
            } else if (mappingID == 0) {
                grassTile(1);
            } else if (mappingID == 1) {
                sandTile(1);
            }
        }
    }
}

function generatePlayfield(mapID) {
    const maps = ["default", "SandBox"];
    if (mapID >= 0 && mapID < maps.length) {
        const selectedMap = maps[mapID];
        console.log("Selected map is: " + selectedMap);
        if (selectedMap == "default") {
            const mapping = editmap0();
            generateTile(mapping);
        } else if (selectedMap == "SandBox"){
            const mapping = editmap1();
            generateTile(mapping);
        }
    }
}

generatePlayfield(selectedMap);
createEnemy1(1)