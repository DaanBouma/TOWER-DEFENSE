//////////////////////////////////////////////////////////////////////
//////                 information                              ////// 
//////////////////////////////////////////////////////////////////////

let selectedMap = 0; // dit is de value die bepaald welke map het wordt

let x = 0; // dit is de X coordinaten die worden gebruikt bij het plaatsen van items
let y = 0; // dit is de Y coordinaten die worden gebruikt bij het plaatsen van items

const path = []; // dit is de array waar alle sand paden in zitten. Hiermee kan je de path van de enemy berekenen.
const enemies = []; // dit is de array waar alle enemies in worden gedaan. zo kan je ze allemaal bewerken wanneer je het wil
//////////////////////////////////////////////////////////////////////
//////                 Global                                   ////// 
//////////////////////////////////////////////////////////////////////

function setPosition(pos, x, y) { // dit is de functie die de dingen positioned. de pos betekend wat er moet worden gepositions de x en y spreken voor zich.
    pos.style.transform = 'translate(' + x + 'px , ' + y + 'px)';
}
let oldTile = []; // dit is een array waar de laaste geklickte tile in wordt gedaan. zo kan die terug worden gedaan naar de orginele texture

function addClickEvent(tile) { // click event voor de tiles
    if (tile.Type == "grass") { // als de tile grass is
        tile.element.onclick = function () { 
            if (oldTile.length > 0) { // deze maakt alle in oldTile array naar de orginele grass.
                oldTile[0].element.src = "/scr/assets/tiles/grass_tile_1.png";
            }
            oldTile = [tile]; // plaatst de oude tile in de oldtile
            console.log('Tile clicked! ID:', tile.ID); // console log voor controleren.
            tile.element.src = "/scr/assets/tiles/grass2.png"; // veranderd de texture
        };
    }
}
//////////////////////////////////////////////////////////////////////
//////                 Enemy Creating                           ////// 
//////////////////////////////////////////////////////////////////////
let EnemyID = 0; // id van enemies
function createEnemy1(amount){ // functie om een enemy te maken
    function enemy(){ // de echte functie
        const container = document.querySelector(".game"); // wijst waar de enemy in moet
        const element = document.createElement("img"); // zegt wat element is dat is in dit geval een image
        element.src = "/scr/assets/enemy/bee.png"; // de source van de image
        element.className = "enemy bee"; // de classes van de image
        element.draggable = false; // of je het kan slepen 
        container.appendChild(element); // stopt de image in de container of te wel de class .game
        let enemy = { // de informatie van de enemy
            movingspeed: 10, // hoe snel die loopt
            element, // de image
            enemyX: 0, // de coordinaten van de enemy
            enemyY: 0,
            ID: 0, // de id van de enemy
            Type: "Bee" // de soort enemy (dit veranderd het niet naar een bei. zo kan je het lezen in console.)
        };
        EnemyID++ // doet de enemy Id met 1 omhoog
        enemy.ID = EnemyID; // veranderd de id van enemy naar de enemy id boven de functie
        enemy.enemyX = path[0].tilex + 35; // veranderd de coordianten van de enemy naar de coordianten van het eerste path. en de tile is 70px dus +35 px om het te centeren
        enemy.enemyY = path[0].tiley + -35; // het zelfde maar dan met de y coordinaten. het is nu -35 zodat hij buiten het scherm spawned
        setPosition(enemy.element, enemy.enemyX, enemy.enemyY - 17.5) // de position function. de -17.5px is zodat hij gecenterd wordt.
        return enemy; // returned de enemy. Heeft eigenlijk geen waarde. (doet niks)
    }
    for (let i = 0; i < amount; i++) { // voert de enemy() functie zovaak uit zoals amount. dus als de amount 4 is doet hij de functie 4 keer
        enemy(); // enemy create functie
    }
}

//////////////////////////////////////////////////////////////////////
//////                 Game Loop                                ////// 
//////////////////////////////////////////////////////////////////////
let LT = Date.now(); // De tijdstip nu (zins dat javascript bestaad)
function update() { // functie update dit is de gameloop
        const container = document.querySelector(".game"); // zegt wat de container is
        const CT = Date.now(); // de tijdstip vanaf wanneer de loop start
        const DT = (CT - LT) / 1000; // Currenttime - lasttime / 1000 de 1000 veranderd het naar secondes.
        updateEnemy(DT, container) // de updateEnemy hierbij kunnen we de enemies laten bewegen
        lastTime = CT; // dit is de tijd totdat het stopt
        window.requestAnimationFrame(update); // vraagt aan om het nog een keer te doen
}
window.requestAnimationFrame(update); // om de loop op het begin te starten


//////////////////////////////////////////////////////////////////////
//////                 Enemy Updating                           ////// 
//////////////////////////////////////////////////////////////////////

function updateEnemy(DT, container){ // update enemies doet verder nog niks
    for (let i = 0; i < enemies.length; i++){ // select het 
        const enemy = enemies[i]; // nu staat enemy gelijk aan ale enemies in  de array enemies
    }
}

//////////////////////////////////////////////////////////////////////
//////                 Grass Generation                         ////// 
//////////////////////////////////////////////////////////////////////

let tileID = 0; // id van de eerste tile // deze wordt aangepast bij elke keer geplaats
function grassTile(amount) { // grass functie create
    function createTile() { 
        const container = document.querySelector(".game");
        const element = document.createElement("img");
        element.src = "/scr/assets/tiles/grass_tile_1.png";
        element.className = "tile";
        element.draggable = false;
        container.appendChild(element); // stopt de grass tile in de .game
        let tile = {
            element,
            tilex: 0, // de x coordinaten van de tile
            tiley: 0, // de y coordinaten van de tile
            ID: 0,
            Type: "grass" // om te kijken wat voor soort tile in console // of om te selecten bijvoorbeeld if (tile.Type == "grass") do ..... Daarmee beinvloed je alleen de grass tiles
        };
        tile.tilex = x; // steld in dat de tilex gelijk is aan de x coordinaten boven in het script
        tile.tiley = y; // zelfde maar dan met y
        tile.ID = tileID; // zet de id van de tile naar de id van tileId boven de functie
        tileID += 1; // zet de id boven 1 omhoog zodat elke id uniek is.
        setPosition(tile.element, tile.tilex, tile.tiley) // position functie voor de tile // deze plaats het daadwerkelijk op het bord
        x += 70; // doet de coordinaten omhoog. hierbij bij 70 omdat 1 tile 70px is.
        addClickEvent(tile); // voegt een click event zodat je kan klikken
        return tile; // doet niks/
    }
    for (let i = 0; i < amount; i++) { // doet het net zo vaak als amount dus als amount 3 is doet hij de functie 3 keer
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
            centerX: 0, // dit is de center x van de sandtile // deze zijn nog leeg maar die worden zo meteen ingevuld
            centerY: 0, // dit is de center y van de sandtile
            Type: "sand"
        };
        tile.tilex = x;
        tile.tiley = y;
        tile.centerX = tile.tilex - 35; // hier word het ingevuld //hierbij bekijken we wat de center is van de tile zodat je de enemy hierheen kan sturen
        tile.centerY = tile.tiley - 35; // zelfde met y
        tile.ID = tileID;
        tileID += 1;
        console.log("trying to push in path....")
        path.push(tile) // doet de tile in de path array zodat je kan zien waar die langs moet
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

function editmap0(){ // dit is een functie die een array aan maakt waarin die row arrays in doet // 0 is grass / 1 is path/ en 3 is naar volgende row
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
    const map = [row1, row2, row3, row4, row5, row6, row7, row8, row9, row10]; // deze zegt dat de array map wordt gevult met de andere arrays
    return map; // hij stuurd de map terug/ dus waar die aangeroepen heeft krijgt hij de informatie terug
}
function editmap1(){ // dit is het zelfde maar dan voor een andere map
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

function generateTile(mapping) { // deze maakt de tile aan
    for (let i = 0; i < mapping.length; i++) { // deze kijkt in de mapping naar  welke arrays er zitten in map. dus dat zijn de rows
        for (let j = 0; j < mapping[i].length; j++) { // deze kijkt naar elke array in de row arrays
            const mappingID = mapping[i][j]; // hierbij staat mappingID dus gelijk aan elke 0 1 en 3
            if (mappingID == 3) { // als de id 3 is dan doet hij de x coordinaten naar het begin en doet hij de y met 70 omhoog zodat ze 1 rij naar beneden gaan
                x = 0;
                y += 70;
            } else if (mappingID == 0) { // als de id 0 is dan plaats hij 1 grasstile
                grassTile(1);
            } else if (mappingID == 1) { // als de id 1 is dan plaats hij 1 sandtile
                sandTile(1);
            }
        }
    }
}

function generatePlayfield(mapID) { // dit is de map selector aan de hand van mapID (mapId staat gelijk aan selectedMap)
    const maps = ["default", "SandBox"]; // dit is de array waar alle mappen in staan. zo krijgt de default de nummer 0 en de sandbox de nummer 1
    if (mapID >= 0 && mapID < maps.length) { // checked of de mapid groter is of gelijk aan 0 is. 
        const selectedMap = maps[mapID]; // zegt dat selectedmap gelijk is aan de array maps en dan in de haakjes de nummer van de mapid. 
        console.log("Selected map is: " + selectedMap); // console log om te checken
        if (selectedMap == "default") { // als de selected map gelijk is aan default 
            const mapping = editmap0(); // nu steld hij mapping gelijk aan de informatie die je terug krijgt bij de functie editmap0()
            generateTile(mapping); // nu dat hij de informatie van mapping heeft. doet hij de functie waarbij tiles worden gegenereerd. Hierbij geeft hij de informatie van de mapping mee.
        } else if (selectedMap == "SandBox"){ // het zelfde maar dan bij de andere map
            const mapping = editmap1();
            generateTile(mapping);
        }
    }
}

generatePlayfield(selectedMap); // om de generation te beginnnen
createEnemy1(1) // om de eerste enemy in te spawnen / dit is puur om te testen