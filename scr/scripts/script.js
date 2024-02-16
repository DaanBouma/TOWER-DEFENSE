////////////////////////////////////////////////////////////////////

let selectedMap = 0;
let x = 0;
let y = 0;

const path = [];
const enemies = [];

////////////////////////////////////////////////////////////////////

function setPosition(pos, x, y) {
    pos.style.transform = 'translate(' + x + 'px , ' + y + 'px)';
}

////////////////////////////////////////////////////////////////////

let EnemyID = 0;
function createEnemy1(amount) {
    function enemy() {
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
            Type: "Bee",
            tilePassed: 0
        };
        EnemyID++
        enemy.ID = EnemyID;
        enemy.enemyX = path[0].tilex + 35;
        enemy.enemyY = path[0].tiley + -35;
        setPosition(enemy.element, enemy.enemyX, enemy.enemyY - 17.5)
        return enemy;
    }
    for (let i = 0; i < amount; i++) {
        enemy();
    }
}
// dus als je enemy typed select je de let enemy. als je nu . typed dan ga je erin en dan movingspeed

////////////////////////////////////////////////////////////////////

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
        x += 69;
        return tile;
    }
    for (let i = 0; i < amount; i++) {
        createTile();
    }

}

////////////////////////////////////////////////////////////////////
//// Vertical_Path [1] /////  Left_Corner_Path [2] ///
////////////////////////////////////////////////////////////////////

function sand_path(amount, typePath) {
    let scr = "";
    let classes = "";
    let skip = 0;
    if (typePath == 1) {
        scr = "/scr/assets/tiles/path_1.png";
        classes = "path"
        skip = 138;
    } else if (typePath == 2) {
        scr = "/scr/assets/tiles/path_2.png";
        classes = "path"
        skip = 138
    } else if (typePath == 3) {
        scr = "/scr/assets/tiles/path_3.png";
        classes = "path"
        skip = 138
    } else if (typePath == 4) {
        scr = "/scr/assets/tiles/path_4.png";
        classes = "path"
        skip = 138
    } else if (typePath == 5) {
        scr = "/scr/assets/tiles/Path_5.png";
        classes = "path"
        skip = 138
    } else if (typePath == 6) {
        scr = "/scr/assets/tiles/path_6.png";
        classes = "path"
        skip = 138
    }
    function createTile() {
        const container = document.querySelector(".game");
        const element = document.createElement("img");
        element.src = scr;
        element.className = "path";
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
        path.push(tile)
        setPosition(tile.element, tile.tilex, tile.tiley)
        x += skip;
        return tile;
    }
    for (let i = 0; i < amount; i++) {
        createTile();
    }

}

////////////////////////////////////////////////////////////////////
let currentObjectX = 50;
let currentObjectY = 50;
let currentObjectID = 0;

function createObject(objectType, min, max) {
    let scr = "";
    const random = Math.random();
    const size = min + random * (max - min);
    let rotation = 0;
    if (objectType == "tree") {
        scr = "/scr/assets/objects/tree.png"
    } else if (objectType == "stone") {
        scr = "/scr/assets/objects/stone.png"
    }  else if (objectType == "bush"){
        scr = "/scr/assets/objects/bush.png"
        const random2 = Math.random();
        const rotation2 = min + random2 * (max - min);
        rotation = rotation2;
    } else if (objectType == "tree2"){
        scr = "/scr/assets/objects/tree2.png"
    }

    function create() {
        const container = document.querySelector(".game");
        const element = document.createElement("img");
        element.src = scr;
        element.className = "object";
        element.style.width = size + "px"; 
        element.draggable = false;
        element.style.marginLeft = "-" + (size / 2) + "px";
        element.style.marginTop = "-" + (size / 2) + "px";
        container.appendChild(element);

        let object = {
            element,
            objectX: 0,
            objectY: 0,
            objectID: 0,
            objectWidth: 0,
            objectType: objectType,
        }

        object.objectX = currentObjectX;
        object.objectY = currentObjectY;
        object.objectWidth = size;
        object.objectID = currentObjectID;
        currentObjectID++;

        setPosition(object.element, object.objectX, object.objectY);
        currentObjectX += size;
        createBorder(object);
    }

    function createBorder(object) {
        let borderPercentage = size / 2;
        let borderSize = size + borderPercentage;
        const container = document.querySelector(".game");
        const element = document.createElement("div");
        element.style.borderRadius = "300px";
        element.className = "border blockzones"; 
        element.draggable = false;
        element.style.backgroundColor = "red";
        element.style.width = borderSize + "px";
        element.style.height = borderSize + "px";
        element.style.marginLeft = "-" + (borderSize / 2) + "px";
        element.style.marginTop = "-" + (borderSize / 2) + "px";
        container.appendChild(element);

        let border = {
            element,
            borderX: object.objectX,
            borderY: object.objectY,
            BorderID: object.objectID,
        }

        setPosition(border.element, border.borderX, border.borderY);
    }

    create();
}



////////////////////////////////////////////////////////////////////

function import_defaultmap() {
    return fetch('/scr/maps/map1/defaultmap.json')
        .then(response => response.json())
        .then(data => data)
        .catch(error => console.error('Error:', error));
}
function import_defaultmap_objects() {
    return fetch('/scr/maps/map1/objects.json')
        .then(response => response.json())
        .then(data => data)
        .catch(error => console.error('Error:', error));
}
////////////////////////////////////////////////////////////////////

function generateTile(mapping) {
    for (let i = 0; i < mapping.length; i++) {
        for (let j = 0; j < mapping[i].length; j++) {
            const mappingID = mapping[i][j];
            if (mappingID == 99) {
                x = 0;
                y += 69;
            } else if (mappingID == 0) {
                grassTile(1);
            } else if (mappingID == 1) {
                sand_path(1, 1);
            } else if (mappingID == 30) {
                x += 138;
            } else if (mappingID == 2) {
                sand_path(1, 2);
            } else if (mappingID == 3) {
                sand_path(1, 3);
            } else if (mappingID == 4) {
                sand_path(1, 4);
            } else if (mappingID == 5) {
                sand_path(1, 5);
            } else if (mappingID == 6) {
                sand_path(1, 6);
            }
        }
    }
}

////////////////////////////////////////////////////////////////////

function generateObjects(mapping_objects) {
    for (let i = 0; i < mapping_objects.length; i++) {
        for (let j = 0; j < mapping_objects[i].length; j++) {
            const mappingID = mapping_objects[i][j];
            if (mappingID == -99) {
                currentObjectX = 20;
                currentObjectY += 70;
            } else if (mappingID == -0) {
                createObject("tree", 115, 130);
            } else if (mappingID == -1){
                currentObjectX += 100
            } else if (mappingID == -2){
                currentObjectX += 200
            } else if (mappingID == -3){
                createObject("stone", 50, 80);
            } else if (mappingID == -4){
                createObject("bush", 90, 125);
            } else if (mappingID == -5){
                createObject("tree2", 70, 80);
            }
        }
    }
}

////////////////////////////////////////////////////////////////////

async function generatePlayfield(mapID) {
    const maps = ["default", "SandBox"];
    if (mapID >= 0 && mapID < maps.length) {
        const selectedMap = maps[mapID];
        console.log("Selected map is: " + selectedMap);
        if (selectedMap == "default") {
            try {
                const mapping = await import_defaultmap();
                generateTile(mapping);
                const mapping_objects = await import_defaultmap_objects();
                generateObjects(mapping_objects)
            } catch (error) {
                console.error('Error loading default map:', error);
            }
        } else if (selectedMap == "SandBox") {
            const mapping = editmap1();
            console.log(mapping);
            generateTile(mapping);
        }
    }
}

generatePlayfield(selectedMap);

////////////////////////////////////////////////////////////////////

const fullscreenButton = document.getElementById('makeBiggerButton');

fullscreenButton.addEventListener('click', toggleFullscreen);
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.error('Fullscreen request failed:', err);
        });
    } else {
        document.exitFullscreen();
    }
}
////////////////////////////////////////////////////////////////////
 
let LT = Date.now();
function update(){
    const container = document.querySelector(".game")
    const CT = Date.now();
    const DT = (CT - LT) / 1000
    updateEnemy(DT, container)
    LT = CT
    window.requestAnimationFrame(update);
}
window.requestAnimationFrame(update);

function updateEnemy (DT, container) {
    for (let i = 0; i < enemies; i++) {
        const enemy = enemies[i];
        const direction = calculateDirection(enemy);
    }
}

function calculateDirection(enemy) {
const direction = "";
const lastTile = path [enemy.tilePassed]
const nextTile = path [lastTile + 1]

const lastTileX = lastTile.centerX
const lastTileY = lastTile.centerY

const nextTileX = nextTile.centerX
const nextTileY = nextTile.centerY

if (direction == "up"){
    enemy.enemyY -= movingspeed * DT;
}
if (direction == "down"){
    enemy.enemyY += movingspeed * DT;
}
if (direction == "left"){
    enemy.enemyX -= movingspeed * DT;
}
if (direction == "right"){
    enemy.enemyX += movingspeed * DT;
}


if (lastTileY < nextTileY){
direction = "up"
}
if (lastTileY < nextTileY){
direction = "down"
}

if (lastTileX < nextTileX){
direction = "right"
}
if (lastTileX < nextTileX){
direction ="left"
}
return direction;

setPosition (enemy.element, enemy.enemyX, enemy.enemyY);

}

function updateLasttile(enemy){
    const lastTile = path[enemy.tilePassed];
    const nextTile = path[lastTile + 1];
    const direction = calculateDirection (enemy);

    if (direction == "up"){
        if (enemy.enemyY <= nextTile.centerY){
            enemy.tilePassed += 1;
        }
    }
    if (direction == "down"){
        if (enemy.enemyY >= nextTile.centerY){
            enemy.tilePassed += 1;
        }
    }
    if (direction == "left"){
        if (enemy.enemyX <= nextTile.centerX){
            enemy.tilePassed += 1;
        }
    }
    if (direction == "right"){
        if (enemy.enemyX >= nextTile.centerX){
            enemy.tilePassed += 1;
        }
    }
}