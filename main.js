//"Main" Code Here

var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./img/MegaSheet.gif");
ASSET_MANAGER.queueDownload("./img/explosion.png");
ASSET_MANAGER.queueDownload("./img/jawas.png");
ASSET_MANAGER.queueDownload("./img/stage.png");

ASSET_MANAGER.downloadAll(function () {
    console.log("Beginning 'Main' Code");

    var canvas = document.getElementById('gameWorld');
    var ctx = canvas.getContext('2d');

    var gameEngine = new GameEngine();
    var bg = new Background(gameEngine, 0, 0, gameEngine.surfaceWidth, gameEngine.surfaceHeight);
    var megaman = new MegaMan(gameEngine, 400, 500, 1.5, true);

    //Platform parameters are (gameEngine, x, y, width, and height from spritesheet)
    var p = new Platform(gameEngine, 16, 689, 215, 39);
    var p2 = new Platform(gameEngine, 230, 689, 130, 71);
    var p3 = new Platform(gameEngine, 360, 689, 127, 86);
    var p4 = new Platform(gameEngine, 487, 689, 191, 116);
    var p5 = new Platform(gameEngine, 678, 689, 63, 103);
    var p6 = new Platform(gameEngine, 726 + 16, 689, 32, 88);
    var p7 = new Platform(gameEngine, 758 + 16 , 689, 775 - 758, 55);
    var p8 = new Platform(gameEngine, 775 + 16, 689, 80, 39);
    var p9 = new Platform(gameEngine, 854 + 16, 689, 66, 23);
    var p10 = new Platform(gameEngine, 807 + 16, 156 + 462, 144, 15);
    var p11 = new Platform(gameEngine, 855 + 16, 141 + 462, 64, 15);
    var p12 = new Platform(gameEngine, 920 + 16, 229 + 461, 1046 - 920, 229 - 158);
    var p13 = new Platform(gameEngine, 1046 + 16, 229 + 460, 1111 - 1046, 229 - 190);
    var p14 = new Platform(gameEngine, 1111 + 16, 229 + 460, 1206 - 1111, 229 - 206);
    var p15 = new Platform(gameEngine, 1206 + 16, 229 + 460, 1302 - 1206, 229 - 174);
    var p16 = new Platform(gameEngine, 1302 + 16, 229 + 460, 1335 - 1302, 229 - 158);
    var p17 = new Platform(gameEngine, 1334 + 16, 189 + 461, 1366 - 1334, 189 - 157);
    var p18 = new Platform(gameEngine, 1335 + 16, 229 + 460, 1398 - 1335, 229 - 221);
    var p19 = new Platform(gameEngine, 1399 + 16, 229 + 460, 1430 - 1399, 229 - 190);
    var p20 = new Platform(gameEngine, 1431 + 16, 229 + 460, 1462 - 1431, 229 - 158);
    var p21 = new Platform(gameEngine, 1463 + 16, 229 + 460, 1559 - 1463, 229 - 174);
    var p22 = new Platform(gameEngine, 1560 + 16, 229 + 460, 1685 - 1560, 229 - 158);
    var p23 = new Platform(gameEngine, 1686 + 16, 229 + 460, 1717 - 1686, 229 - 171);
    var p24 = new Platform(gameEngine, 1717 + 16, 229 + 460, 1799 - 1717, 229 - 189);
    var p25 = new Platform(gameEngine, 1800 + 16, 229 + 460, 1847 - 1800, 229 - 204);
    var p26 = new Platform(gameEngine, 1752 + 16, 156 + 461, 1784 - 1752, 156 - 140);
    var p27 = new Platform(gameEngine, 1783 + 16, 156 + 461, 1816 - 1783, 156 - 124);
    var p28 = new Platform(gameEngine, 1815 + 16, 156 + 461, 1878 - 1815, 156 - 109);
    var p29 = new Platform(gameEngine, 1847 + 16, 229 + 460, 1975 - 1847, 229 - 156);
    var p30 = new Platform(gameEngine, 1975 + 16, 229 + 460, 2006 - 1975, 229 - 173);
    var p31 = new Platform(gameEngine, 2007 + 16, 229 + 460, 2038 - 2007, 229 - 189);
    var p32 = new Platform(gameEngine, 2038 + 16, 229 + 460, 2104 - 2038, 229 - 204);
    var p33 = new Platform(gameEngine, 2104 + 16, 229 + 460, 2200 - 2104, 229 - 188);
    var p34 = new Platform(gameEngine, 2200 + 16, 229 + 460, 2232 - 2200, 229 - 172);
    var p35 = new Platform(gameEngine, 2232 + 16, 229 + 460, 2264 - 2232, 229 - 157);
    var p36 = new Platform(gameEngine, 2265 + 16, 229 + 460, 2328 - 2265, 229 - 125);
    var p37 = new Platform(gameEngine, 2327 + 16, 229 + 460, 2359 - 2327, 229 - 93);
    var p38 = new Platform(gameEngine, 2359 + 16, 229 + 460, 2390 - 2359, 229 - 125);
    var p39 = new Platform(gameEngine, 2390 + 16, 229 + 460, 2454 - 2390, 229 - 140);
    var p40 = new Platform(gameEngine, 2454 + 16, 229 + 460, 2487 - 2454, 229 - 188);
    var p41 = new Platform(gameEngine, 2519 + 16, 229 + 460, 2599 - 2519, 229 - 204);
    var p42 = new Platform(gameEngine, 2599 + 16, 229 + 460, 2675 - 2599, 229 - 189);
    var p43 = new Platform(gameEngine, 2675 + 16, 229 + 460, 2723 - 2675, 229 - 155);
    var p44 = new Platform(gameEngine, 2724 + 16, 229 + 460, 2739 - 2724, 229 - 170);
    var p45 = new Platform(gameEngine, 2739 + 16, 229 + 460, 3331 - 2739, 229 - 188); 
    var p46 = new Platform(gameEngine, 3331 + 16, 229 + 460, 3346 - 3331, 229 - 0);
    
    
    //var jawa = new Jawa(gameEngine, 500, 574);

    gameEngine.addEntity(bg);
    gameEngine.addEntity(p);
    gameEngine.addEntity(p2);
    gameEngine.addEntity(p3);
    gameEngine.addEntity(p4);
    gameEngine.addEntity(p5);
    gameEngine.addEntity(p6);
    gameEngine.addEntity(p7);
    gameEngine.addEntity(p8);
    gameEngine.addEntity(p9);
    gameEngine.addEntity(p10);
    gameEngine.addEntity(p11);
    gameEngine.addEntity(p12);
    gameEngine.addEntity(p13);
    gameEngine.addEntity(p14);
    gameEngine.addEntity(p15);
    gameEngine.addEntity(p16);
    gameEngine.addEntity(p17);
    gameEngine.addEntity(p18);
    gameEngine.addEntity(p19);
    gameEngine.addEntity(p20); 
    gameEngine.addEntity(p21);
    gameEngine.addEntity(p22);
    gameEngine.addEntity(p23);
    gameEngine.addEntity(p24);
    gameEngine.addEntity(p25);
    gameEngine.addEntity(p26);
    gameEngine.addEntity(p27);
    gameEngine.addEntity(p28);
    gameEngine.addEntity(p29);
    gameEngine.addEntity(p30);
    gameEngine.addEntity(p31);
    gameEngine.addEntity(p32);
    gameEngine.addEntity(p33);
    gameEngine.addEntity(p34);
    gameEngine.addEntity(p35);
    gameEngine.addEntity(p36);
    gameEngine.addEntity(p37);
    gameEngine.addEntity(p38);
    gameEngine.addEntity(p39);
    gameEngine.addEntity(p40);
    gameEngine.addEntity(p41);
    gameEngine.addEntity(p42);
    gameEngine.addEntity(p43);
    gameEngine.addEntity(p44);
    gameEngine.addEntity(p45);
    gameEngine.addEntity(p46);

    gameEngine.addEntity(megaman);
   // gameEngine.addEntity(jawa);
 
    gameEngine.init(ctx);
    gameEngine.start();
});
