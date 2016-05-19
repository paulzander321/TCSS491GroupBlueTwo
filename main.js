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
    var bg = new Background(gameEngine, 0, 0, ctx.width, ctx.height);
    gameEngine.player = new MegaMan(gameEngine, 400, 500, 1.5, true);


    var r = new Platform(gameEngine, 631, 16, 722 - 631, 16);
    var r1 = new Platform(gameEngine, 726, 30, 759 - 726, 30);
    var r2 = new Platform(gameEngine, 759, 46, 822 - 759, 46);
    var r3 = new Platform(gameEngine, 823, 64, 887 - 823, 64);
    var r4 = new Platform(gameEngine, 887, 47, 1015 - 887, 47);
    var r5 = new Platform(gameEngine, 1015, 95, 1079 - 1015, 95);
    var r6 = new Platform(gameEngine, 1079, 79, 1142 - 1079, 79);
    var r7 = new Platform(gameEngine, 1143, 95, 1207 - 1143, 95);
    var r8 = new Platform(gameEngine, 1208, 64, 1239 - 1208, 64);
    var r9 = new Platform(gameEngine, 1239, 31, 1527 - 1239, 31);
    var r10 = new Platform(gameEngine, 1527, 46, 1623 - 1527, 46);
    var r11 = new Platform(gameEngine, 1623, 31, 1688 - 1623, 31);
    var r12 = new Platform(gameEngine, 1688, 44, 1750 - 1688, 44);
    var r13 = new Platform(gameEngine, 1750, 28, 1816 - 1750, 28);
    var r14 = new Platform(gameEngine, 1815, 45, 1977 - 1815, 45);
    var r15 = new Platform(gameEngine, 1977, 61, 2008 - 1977, 61);
    var r16 = new Platform(gameEngine, 2007, 93, 2039 - 2007, 93);
    var r17 = new Platform(gameEngine, 2039, 76, 2070 - 2039, 76);
    var r18 = new Platform(gameEngine, 2071, 93, 2102 - 2071, 93);
    var r19 = new Platform(gameEngine, 2103, 61, 2199 - 2103, 61);
    var r20 = new Platform(gameEngine, 2199, 45, 2199 - 2231, 45);
    var r21 = new Platform(gameEngine, 2231, 62, 2263 - 2231, 62);
    var r22 = new Platform(gameEngine, 2263, 29, 2488 - 2263, 29);
    var r23 = new Platform(gameEngine, 2488, 92, 2550 - 2488, 92);
    var r24 = new Platform(gameEngine, 2550, 77, 2597 - 2550, 77);
    var r25 = new Platform(gameEngine, 2611, 29, 2643 - 2611, 29);
    var r26 = new Platform(gameEngine, 2643, 45, 2674 - 2643, 45);
    var r27 = new Platform(gameEngine, 2675, 77, 2739 - 2675, 77);
    var r28 = new Platform(gameEngine, 2739, 109, 2803 - 2739, 109);
    var r29 = new Platform(gameEngine, 2803, 140, 3107 - 2803, 140);
    var r30 = new Platform(gameEngine, 3107, 28, 3331 - 3107, 28);

    //Platform parameters are (gameEngine, x, y, width, and height from spritesheet)
    var p = new Platform(gameEngine, 0, 230, 215, 40);
    var p2 = new Platform(gameEngine, 214, 230, 130, 72);
    var p3 = new Platform(gameEngine, 344, 230, 127, 87);
    var p4 = new Platform(gameEngine, 471, 230, 191, 117);
    var p5 = new Platform(gameEngine, 662, 230, 63, 103);
    var p6 = new Platform(gameEngine, 726, 230, 32, 88);
    var p7 = new Platform(gameEngine, 758, 230, 775 - 758, 55);
    var p8 = new Platform(gameEngine, 775, 230, 80, 39);
    var p9 = new Platform(gameEngine, 854, 230, 66, 23);
    var p10 = new Platform(gameEngine, 807, 156, 144, 15);
    var p11 = new Platform(gameEngine, 855, 141, 64, 15);
    var p12 = new Platform(gameEngine, 920, 230, 1046 - 920, 230 - 158);
    var p13 = new Platform(gameEngine, 1046, 230, 1111 - 1046, 230 - 190);
    var p14 = new Platform(gameEngine, 1111, 230, 1206 - 1111, 230 - 206);
    var p15 = new Platform(gameEngine, 1206, 230, 1302 - 1206, 230 - 174);
    var p16 = new Platform(gameEngine, 1302, 230, 1335 - 1302, 230 - 158);
    var p17 = new Platform(gameEngine, 1334, 189, 1366 - 1334, 189 - 157);
    var p18 = new Platform(gameEngine, 1335, 230, 1398 - 1335, 230 - 221);
    var p19 = new Platform(gameEngine, 1399, 230, 1430 - 1399, 230 - 190);
    var p20 = new Platform(gameEngine, 1431, 230, 1462 - 1431, 230 - 158);
    var p21 = new Platform(gameEngine, 1463, 230, 1559 - 1463, 230 - 174);
    var p22 = new Platform(gameEngine, 1560, 230, 1685 - 1560, 230 - 158);
    var p23 = new Platform(gameEngine, 1686, 230, 1717 - 1686, 230 - 171);
    var p24 = new Platform(gameEngine, 1717, 230, 1799 - 1717, 230 - 189);
    var p25 = new Platform(gameEngine, 1800, 230, 1847 - 1800, 230 - 204);
    var p26 = new Platform(gameEngine, 1752, 156, 1784 - 1752, 156 - 140);
    var p27 = new Platform(gameEngine, 1783, 156, 1816 - 1783, 156 - 124);
    var p28 = new Platform(gameEngine, 1815, 156, 1878 - 1815, 156 - 109);
    var p29 = new Platform(gameEngine, 1847, 230, 1975 - 1847, 230 - 156);
    var p30 = new Platform(gameEngine, 1975, 230, 2006 - 1975, 230 - 173);
    var p31 = new Platform(gameEngine, 2007, 230, 2038 - 2007, 230 - 189);
    var p32 = new Platform(gameEngine, 2038, 230, 2104 - 2038, 230 - 204);
    var p33 = new Platform(gameEngine, 2104, 230, 2200 - 2104, 230 - 188);
    var p34 = new Platform(gameEngine, 2200, 230, 2232 - 2200, 230 - 172);
    var p35 = new Platform(gameEngine, 2232, 230, 2264 - 2232, 230 - 157);
    var p36 = new Platform(gameEngine, 2265, 230, 2328 - 2265, 230 - 125);
    var p37 = new Platform(gameEngine, 2327, 230, 2359 - 2327, 230 - 93);
    var p38 = new Platform(gameEngine, 2359, 230, 2390 - 2359, 230 - 125);
    var p39 = new Platform(gameEngine, 2390, 230, 2454 - 2390, 230 - 140);
    var p40 = new Platform(gameEngine, 2454, 230, 2487 - 2454, 230 - 188);
    var p41 = new Platform(gameEngine, 2519, 230, 2599 - 2519, 230 - 204);
    var p42 = new Platform(gameEngine, 2599, 230, 2675 - 2599, 230 - 189);
    var p43 = new Platform(gameEngine, 2675, 230, 2723 - 2675, 230 - 155);
    var p44 = new Platform(gameEngine, 2724, 230, 2739 - 2724, 230 - 170);
    var p45 = new Platform(gameEngine, 2739, 230, 3331 - 2739, 230 - 188); 
    var p46 = new Platform(gameEngine, 3331, 230, 3346 - 3331, 230 - 0);
    
    var spikesTest = new Spikes(gameEngine, 695, 140, 31, 17);
    var spikes2 = new Spikes(gameEngine, 1141, 224, 33, 17);
    var spikes3 = new Spikes(gameEngine, 1238, 189, 33, 18);
    // var ladder = new Ladder(gameEngine, 856, 205, 16, 46);
    var sp = new SandPerson(gameEngine, 215 * 3, 158 * 3);
    var jawa = new Jawa(gameEngine, 1625, 158, p2);
    var jawa2 = new Jawa(gameEngine, 632, 110);
    var jawa3 = new Jawa(gameEngine, 3056, 187);
    // var jawa4 = new Jawa(gameEngine, 3246, 187);

    gameEngine.addEntity(bg);
    gameEngine.addEntity(spikes2);
    gameEngine.addEntity(spikes3);
    gameEngine.addEntity(jawa3);
    // gameEngine.addEntity(ladder);

    //Add floor platforms
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

    gameEngine.addEntity(sp);
    gameEngine.addEntity(spikesTest);
    gameEngine.addEntity(gameEngine.player);
    gameEngine.addEntity(jawa);
    gameEngine.addEntity(jawa2);

    //Add ceiling platforms
    gameEngine.addEntity(r);
    gameEngine.addEntity(r1);
    gameEngine.addEntity(r2);
    gameEngine.addEntity(r3);
    gameEngine.addEntity(r4);
    gameEngine.addEntity(r5);
    gameEngine.addEntity(r6);
    gameEngine.addEntity(r7);
    gameEngine.addEntity(r8);
    gameEngine.addEntity(r9);
    gameEngine.addEntity(r10);
    gameEngine.addEntity(r11);
    gameEngine.addEntity(r12);
    gameEngine.addEntity(r13);
    gameEngine.addEntity(r14);
    gameEngine.addEntity(r15);
    gameEngine.addEntity(r16);
    gameEngine.addEntity(r17);
    gameEngine.addEntity(r18);
    gameEngine.addEntity(r19);
    gameEngine.addEntity(r20);
    gameEngine.addEntity(r21);
    gameEngine.addEntity(r22);
    gameEngine.addEntity(r23);
    gameEngine.addEntity(r24);
    gameEngine.addEntity(r25);
    gameEngine.addEntity(r26);
    gameEngine.addEntity(r27);
    gameEngine.addEntity(r28);
    gameEngine.addEntity(r29);
    gameEngine.addEntity(r30);

    gameEngine.init(ctx);
    gameEngine.start();

});
