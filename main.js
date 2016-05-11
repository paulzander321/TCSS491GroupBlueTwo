//"Main" Code Here

var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./img/MegaSheet.gif");
ASSET_MANAGER.queueDownload("./img/explosion.png");
ASSET_MANAGER.queueDownload("./img/jawas.png");
ASSET_MANAGER.queueDownload("./img/megaman-background.png");

ASSET_MANAGER.downloadAll(function () {
    console.log("Beginning 'Main' Code");

    var canvas = document.getElementById('gameWorld');
    var ctx = canvas.getContext('2d');

    var gameEngine = new GameEngine();
    var bg = new Background(gameEngine, 16, 464, gameEngine.surfaceWidth, gameEngine.surfaceHeight);
    var megaman = new MegaMan(gameEngine, 400, 500, 1.5, true);

    //Platform parameters are (gameEngine, x, y, width, and height from spritesheet)
    var p = new Platform(gameEngine, 16, 656 + 33, 768, 33);
    var p2 = new Platform(gameEngine, 336, 624 + 64, 224, 64);
    var p3 = new Platform(gameEngine, 432, 592 + 97, 96, 97);
    var p4 = new Platform(gameEngine, 704, 608 + 80, 80, 80);
    var p5 = new Platform(gameEngine, 608, 592 + 16, 64, 16);
    var p6 = new Platform(gameEngine, 608, 560 + 48, 32, 48);
    var p7 = new Platform(gameEngine, 688, 528 + 48, 32, 48);
    var ld = new Ladder(gameEngine, 736, 336 + 192, 16, 192);

    var jawa = new Jawa(gameEngine, 500, 574);

    gameEngine.addEntity(bg);
    gameEngine.addEntity(p);
    gameEngine.addEntity(p2);
    gameEngine.addEntity(p3);
    gameEngine.addEntity(p4);
    gameEngine.addEntity(p5);
    gameEngine.addEntity(p6);
    gameEngine.addEntity(ld); //737, 337, 16, 192
    gameEngine.addEntity(megaman);
    gameEngine.addEntity(jawa);
 
    gameEngine.init(ctx);
    gameEngine.start();
});
