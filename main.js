//"Main" Code Here

var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./img/MegaSheet.gif");
ASSET_MANAGER.queueDownload("./img/explosion.png");
ASSET_MANAGER.queueDownload("./img/jawas.png");
ASSET_MANAGER.queueDownload("./img/stage.png");
ASSET_MANAGER.queueDownload("./img/fBirdStill.gif");
ASSET_MANAGER.queueDownload("./img/fBirdShootLeft.gif");
ASSET_MANAGER.queueDownload("./img/fBirdLeft.gif");
ASSET_MANAGER.queueDownload("./img/fireball.gif");
ASSET_MANAGER.queueDownload("./img/fBirdShot2Left.gif");
ASSET_MANAGER.queueDownload("./img/gundam.png");
ASSET_MANAGER.queueDownload("./img/gundamReverse.png");
ASSET_MANAGER.queueDownload("./img/dead_robot_flip.png");
ASSET_MANAGER.queueDownload("./img/dead_robot.png");
ASSET_MANAGER.queueDownload("./img/health.png");
ASSET_MANAGER.queueDownload("./img/pterofractal.png");
ASSET_MANAGER.queueDownload("./img/gunter-penguin.png");
ASSET_MANAGER.queueDownload("./img/stage2.png");

ASSET_MANAGER.downloadAll(function () {
    console.log("Beginning 'Main' Code");
    var canvas = document.getElementById('gameWorld');
    var ctx = canvas.getContext('2d');
    var gameEngine = new GameEngine();
    // gameEngine.makeLevelOne();
    gameEngine.makeLevelTwo();
    gameEngine.init(ctx);
    gameEngine.start();
});

GameEngine.prototype.makeLevelOne = function() {
    this.level = 1;
    this.background = new Background(this, 3346, 230, ASSET_MANAGER.getAsset("./img/stage.png"));
    this.player = new MegaMan(this, 387, 500, 1.5, true);
    this.cameraStart = 387;
    this.camera = new Camera(this, this.player);
    this.addEntity(this.camera);

    var r = new Platform(this, 631, 16, 722 - 631, 16);
    var r1 = new Platform(this, 726, 30, 759 - 726, 30);
    var r2 = new Platform(this, 759, 46, 822 - 759, 46);
    var r3 = new Platform(this, 823, 64, 887 - 823, 64);
    var r4 = new Platform(this, 887, 47, 1015 - 887, 47);
    var r5 = new Platform(this, 1015, 95, 1079 - 1015, 95);
    var r6 = new Platform(this, 1079, 79, 1142 - 1079, 79);
    var r7 = new Platform(this, 1143, 95, 1207 - 1143, 95);
    var r8 = new Platform(this, 1208, 64, 1239 - 1208, 64);
    var r9 = new Platform(this, 1239, 31, 1527 - 1239, 31);
    var r10 = new Platform(this, 1527, 46, 1623 - 1527, 46);
    var r11 = new Platform(this, 1623, 31, 1688 - 1623, 31);
    var r12 = new Platform(this, 1688, 44, 1750 - 1688, 44);
    var r13 = new Platform(this, 1750, 28, 1816 - 1750, 28);
    var r14 = new Platform(this, 1815, 45, 1977 - 1815, 45);
    var r15 = new Platform(this, 1977, 61, 2008 - 1977, 61);
    var r16 = new Platform(this, 2007, 93, 2039 - 2007, 93);
    var r17 = new Platform(this, 2039, 76, 2070 - 2039, 76);
    var r18 = new Platform(this, 2071, 93, 2102 - 2071, 93);
    var r19 = new Platform(this, 2103, 61, 2199 - 2103, 61);
    var r20 = new Platform(this, 2199, 45, 2199 - 2231, 45);
    var r21 = new Platform(this, 2231, 62, 2263 - 2231, 62);
    var r22 = new Platform(this, 2263, 29, 2488 - 2263, 29);
    var r23 = new Platform(this, 2488, 92, 2550 - 2488, 92);
    var r24 = new Platform(this, 2550, 77, 2597 - 2550, 77);
    var r25 = new Platform(this, 2611, 29, 2643 - 2611, 29);
    var r26 = new Platform(this, 2643, 45, 2674 - 2643, 45);
    var r27 = new Platform(this, 2675, 77, 2739 - 2675, 77);
    var r28 = new Platform(this, 2739, 109, 2803 - 2739, 109);
    var r29 = new Platform(this, 2803, 140, 3107 - 2803, 140);
    var r30 = new Platform(this, 3107, 28, 3331 - 3107, 28);

    //Platform parameters are (this, x, y, width, and height from spritesheet)
    var p = new Platform(this, 0, 230, 215, 40);
    var p2 = new Platform(this, 214, 230, 130, 72);
    var p3 = new Platform(this, 344, 230, 127, 87);
    var p4 = new Platform(this, 471, 230, 191, 117);
    var p5 = new Platform(this, 662, 230, 63, 103);
    var p6 = new Platform(this, 726, 230, 32, 88);
    var p7 = new Platform(this, 758, 230, 775 - 758, 55);
    var p8 = new Platform(this, 775, 230, 145, 24);
    var p10 = new Platform(this, 807, 156, 144, 15);
    var p11 = new Platform(this, 855, 141, 64, 15);
    var p12 = new Platform(this, 920, 230, 1046 - 920, 230 - 158);
    var p13 = new Platform(this, 1046, 230, 1111 - 1046, 230 - 190);
    var p14 = new Platform(this, 1111, 230, 1206 - 1111, 230 - 206);
    var p15 = new Platform(this, 1206, 230, 1302 - 1206, 230 - 174);
    var p16 = new Platform(this, 1302, 230, 1335 - 1302, 40);
    var p17 = new Platform(this, 1302, 190, 65, 32); //Can't move onto this one
    var p18 = new Platform(this, 1335, 230, 1398 - 1335, 230 - 221);
    var p19 = new Platform(this, 1399, 230, 1430 - 1399, 230 - 190);
    var p20 = new Platform(this, 1431, 230, 1462 - 1431, 230 - 158);
    var p21 = new Platform(this, 1463, 230, 1559 - 1463, 230 - 174);
    var p22 = new Platform(this, 1560, 230, 1685 - 1560, 230 - 158);
    var p23 = new Platform(this, 1686, 230, 1717 - 1686, 230 - 171);
    var p24 = new Platform(this, 1717, 230, 130, 26);
    var p26 = new Platform(this, 1752, 156, 1784 - 1752, 156 - 140);
    var p27 = new Platform(this, 1783, 156, 1816 - 1783, 156 - 124);
    var p28 = new Platform(this, 1815, 154, 1878 - 1815, 156 - 110);
    var p29 = new Platform(this, 1847, 230, 1975 - 1847, 230 - 156);
    var pBugFix = new Platform(this, 1847, 230, 31, 110);
    var p30 = new Platform(this, 1975, 230, 2006 - 1975, 230 - 173);
    var p31 = new Platform(this, 2007, 230, 2038 - 2007, 230 - 189);
    var p32 = new Platform(this, 2038, 230, 2104 - 2038, 230 - 204);
    var p33 = new Platform(this, 2104, 230, 2200 - 2104, 230 - 188);
    var p34 = new Platform(this, 2200, 230, 2232 - 2200, 230 - 172);
    var p35 = new Platform(this, 2232, 230, 2264 - 2232, 230 - 157);
    var p36 = new Platform(this, 2265, 230, 2328 - 2265, 230 - 125);
    var p37 = new Platform(this, 2327, 230, 2359 - 2327, 230 - 93);
    var p38 = new Platform(this, 2359, 230, 2390 - 2359, 230 - 125);
    var p39 = new Platform(this, 2390, 230, 2454 - 2390, 230 - 140);
    var p40 = new Platform(this, 2454, 230, 2487 - 2454, 230 - 188);
    var p41 = new Platform(this, 2519, 230, 2599 - 2519, 230 - 204);
    var p42 = new Platform(this, 2599, 230, 2675 - 2599, 230 - 189);
    var p43 = new Platform(this, 2675, 230, 2723 - 2675, 230 - 155);
    var p44 = new Platform(this, 2724, 230, 2739 - 2724, 230 - 170);
    var p45 = new Platform(this, 2739, 230, 3331 - 2739, 230 - 188); 
    var p46 = new Platform(this, 3331, 230, 3346 - 3331, 230 - 0);
    var p47 = new Platform(this, 854, 230, 918 - 854, 230 - 156);
    var p48 = new Platform(this, 1799, 230, 1846 - 1799, 230 - 156);

    var hBar = new HealthBar(this, 10, 10, 200, 30);
    var deadRobot = new DeadRobot(this, 375, 142);
    var gundam = new Gundam(this, 2952, 187);
    var spikesTest = new Spikes(this, 695, 140, 31, 17);
    var spikes2 = new Spikes(this, 1141, 224, 33, 21);
    var spikes3 = new Spikes(this, 1238, 189, 33, 18);
    var spikes4 = new Spikes(this, 1463, 191, 65, 23);
    // var ladder = new Ladder(this, 856, 205, 16, 46);
    // var sp = new SandPerson(this, 215 * 3, 158 * 3);
    var jawa = new Jawa(this, 1625, 158, true);
    var jawa2 = new Jawa(this, 632, 110, true);
    var jawa3 = new Jawa(this, 3056, 187, false);
    // var jawa4 = new Jawa(this, 3246, 187);
    var healthHeart = new HealthHeart(this, 1772, 200, 15);
    var healthHeart2 = new HealthHeart(this, 2490, 225, 15);
    var powerup = new Powerup(this, 450, 126, 15, "rapidfire");
    // var powerup2 = new Powerup(this, 3220, 175, 15, "rapidfire");
    // var boss = new Boss(this, 250 * 3, 150 * 3);

    this.addEntity(this.background);
    this.addEntity(new Gundam(this, 2900, 187));
    this.addEntity(new Gundam(this, 1834, 109));
    this.addEntity(new Gundam(this, 495, 110));
    this.addEntity(new DeadRobot(this, 890, 126));
    this.addEntity(new DeadRobot(this, 800, 200));
    this.addEntity(new DeadRobot(this, 1742, 200));
    this.addEntity(new HealthHeart(this, 825, 204));
    this.addEntity(spikes2);
    this.addEntity(spikes3);
    this.addEntity(spikes4);
    this.addEntity(jawa3);
    this.addEntity(healthHeart);
    this.addEntity(healthHeart2);
    this.addEntity(powerup);
    // this.addEntity(powerup2);
    // this.addEntity(ladder);
    // this.addEntity(boss);
    this.addEntity(deadRobot);
    this.addEntity(gundam);
    // this.addEntity(new Pterofractal(this, 560, 110, .5));

    //Add floor platforms
    this.addEntity(pBugFix);
    this.addEntity(p);
    this.addEntity(p2);
    this.addEntity(p3);
    this.addEntity(p4);
    this.addEntity(p5);
    this.addEntity(p6);
    this.addEntity(p7);
    this.addEntity(p8);
    this.addEntity(p10);
    this.addEntity(p11);
    this.addEntity(p12);
    this.addEntity(p13);
    this.addEntity(p14);
    this.addEntity(p15);
    this.addEntity(p16);
    this.addEntity(p17);
    this.addEntity(p18);
    this.addEntity(p19);
    this.addEntity(p20); 
    this.addEntity(p21);
    this.addEntity(p22);
    this.addEntity(p23);
    this.addEntity(p24);
    this.addEntity(p26);
    this.addEntity(p27);
    this.addEntity(p28);
    this.addEntity(p29);
    this.addEntity(p30);
    this.addEntity(p31);
    this.addEntity(p32);
    this.addEntity(p33);
    this.addEntity(p34);
    this.addEntity(p35);
    this.addEntity(p36);
    this.addEntity(p37);
    this.addEntity(p38);
    this.addEntity(p39);
    this.addEntity(p40);
    this.addEntity(p41);
    this.addEntity(p42);
    this.addEntity(p43);
    this.addEntity(p44);
    this.addEntity(p45);
    this.addEntity(p46);
    this.addEntity(p47);
    this.addEntity(p48);

    this.addEntity(hBar);

    // this.addEntity(sp);
    this.addEntity(spikesTest);
    this.addEntity(this.player);
    this.addEntity(jawa);
    this.addEntity(jawa2);

    //Add ceiling platforms
    this.addEntity(r);
    this.addEntity(r1);
    this.addEntity(r2);
    this.addEntity(r3);
    this.addEntity(r4);
    this.addEntity(r5);
    this.addEntity(r6);
    this.addEntity(r7);
    this.addEntity(r8);
    this.addEntity(r9);
    this.addEntity(r10);
    this.addEntity(r11);
    this.addEntity(r12);
    this.addEntity(r13);
    this.addEntity(r14);
    this.addEntity(r15);
    this.addEntity(r16);
    this.addEntity(r17);
    this.addEntity(r18);
    this.addEntity(r19);
    this.addEntity(r20);
    this.addEntity(r21);
    this.addEntity(r22);
    this.addEntity(r23);
    this.addEntity(r24);
    this.addEntity(r25);
    this.addEntity(r26);
    this.addEntity(r27);
    this.addEntity(r28);
    this.addEntity(r29);
    this.addEntity(r30);
}

GameEngine.prototype.makeLevelTwo = function() {
    ////////////////////////////////////////
    /////////////////MAP 2 PLATFORM DRAWINGS
    ////////////////////////////////////////
    this.level = 2;
    this.background = new Background(this, 4441, 230, ASSET_MANAGER.getAsset("./img/stage2.png"));
    this.player = new MegaMan(this, 387, 400, 1.5, true);
    this.cameraStart = 387;
    this.camera = new Camera(this, this.player);
    this.addEntity(this.camera);

    var map2_1 = new Platform(this, 0, 230, 256 - 0, 230 - 160);
    var map2_2 = new Platform(this, 256, 230, 320 - 256, 230 - 176);
    var map2_3 = new Platform(this, 320, 230, 416 - 320, 230 - 192);
    var map2_4 = new Platform(this, 416, 230, 512 - 416, 230 - 176);
    var map2_5 = new Platform(this, 512, 230, 608 - 512, 230 - 144);
    var map2_6 = new Platform(this, 608, 230, 704 - 608, 230 - 112);
    var map2_7 = new Platform(this, 704, 230, 936 - 704, 230 - 176);
    var map2_8 = new Platform(this, 936, 230, 1015 - 936, 230 - 160);
    var map2_9 = new Platform(this, 1015, 230, 1172 - 1015, 230 - 130);
    var map2_10 = new Platform(this, 1172, 230, 1192 - 1172, 230 - 160);
    var map2_11 = new Platform(this, 1192, 230, 1256 - 1192, 230 - 176);
    var map2_12 = new Platform(this, 1256, 230, 1352 - 1256, 230 - 192);
    var map2_13 = new Platform(this, 1352, 230, 1448 - 1352, 230 - 176);
    var map2_14 = new Platform(this, 1448, 230, 1544 - 1448, 230 - 144);
    var map2_15 = new Platform(this, 1544, 230, 1640 - 1544, 230 - 112);
    var map2_16 = new Platform(this, 1640, 230, 1960 - 1640, 230 - 176);
    var map2_17 = new Platform(this, 1960, 230, 2152 - 1960, 230 - 191);
    var map2_18 = new Platform(this, 2152, 230, 2472 - 2152, 230 - 175);
    var map2_19 = new Platform(this, 2472, 230, 2536 - 2472, 230 - 143);
    var map2_20 = new Platform(this, 2536, 230, 2600 - 2536, 230 - 159);
    var map2_21 = new Platform(this, 2600, 230, 2664 - 2600, 230 - 127);
    var map2_22 = new Platform(this, 2664, 230, 2760 - 2664, 230 - 95);
    var map2_23 = new Platform(this, 2760, 230, 2888 - 2760, 230 - 175);
    var map2_24 = new Platform(this, 2920, 230, 2973 - 2920, 230 - 175);
    var map2_25 = new Platform(this, 3016, 230, 3079 - 3016, 230 - 175);
    var map2_26 = new Platform(this, 3119, 230, 3271 - 3119, 230 - 175);
    var map2_27 = new Platform(this, 3271, 230, 3335 - 3271, 230 - 159);
    var map2_28 = new Platform(this, 3335, 230, 3398 - 3335, 230 - 127);
    var map2_29 = new Platform(this, 3398, 230, 3462 - 3398, 230 - 159);
    var map2_30 = new Platform(this, 3462, 230, 3525 - 3462, 230 - 127);
    var map2_31 = new Platform(this, 3525, 230, 3685 - 3525, 230 - 175);
    var map2_32 = new Platform(this, 3685, 230, 3749 - 3685, 230 - 159);
    var map2_33 = new Platform(this, 3749, 230, 3813 - 3749, 230 - 127);
    var map2_34 = new Platform(this, 3813, 230, 3909 - 3813, 230 - 95);
    var map2_35 = new Platform(this, 3909, 230, 3973 - 3909, 118);
    var map2_36 = new Platform(this, 3973, 230, 4105 - 3973, 230 - 175);
    var map2_37 = new Platform(this, 4105, 230, 4424 - 4105, 230 - 191);
    var map2_38 = new Platform(this, 4424, 230, 4441 - 4424, 230 - 127);
    
    var gundam = new Gundam(this, 657, 112);
    var gundam2 = new Gundam(this, 1415, 175);
    var gundam3 = new Gundam(this, 1528, 143);
    var gundam4 = new Gundam(this, 1628, 111);
    var gundam5 = new Gundam(this, 2185, 174);
    var gundam6 = new Gundam(this, 3378, 126);

    var jawa = new Jawa(this, 570, 143, true);
    var jawa2 = new Jawa(this, 1146, 130, true);
    var jawa3 = new Jawa(this, 1930, 175, false);
    var jawa4 = new Jawa(this, 2288, 174, true);
    var jawa5 = new Jawa(this, 2442, 174, true);
    var jawa6 = new Jawa(this, 3239, 174);
    var jawa7 = new Jawa(this, 3726, 158);

    var deadRobot = new DeadRobot(this, 461, 175);
    var deadRobot2 = new DeadRobot(this, 772, 175);
    var deadRobot3 = new DeadRobot(this, 891, 175);
    var deadRobot4 = new DeadRobot(this, 1826, 175);
    var deadRobot5 = new DeadRobot(this, 2550, 158);
    var deadRobot6 = new DeadRobot(this, 2607, 126);
    var deadRobot7 = new DeadRobot(this, 2739, 94);
    var deadRobot8 = new DeadRobot(this, 3494, 126);

    var healthHeart = new HealthHeart(this, 1620, 111, 15);
    var healthHeart2 = new HealthHeart(this, 3042, 174, 15);
    var healthHeart3 = new HealthHeart(this, 3852, 94, 15);
    var hBar = new HealthBar(this, 10, 10, 200, 30);

    var map2_R1 = new Platform(this, 1992, 31, 4441 - 1992, 31 - 0);
    var map2_R2 = new Platform(this, 2216, 70, 2280 - 2216, 70 - 0);
    var map2_R3 = new Platform(this, 2344, 70, 2408 - 2344, 70 - 0);
    var map2_R4 = new Platform(this, 2472, 70, 2536 - 2472, 70 - 0);

    this.addEntity(this.background);

    this.addEntity(map2_1);
    this.addEntity(map2_2);
    this.addEntity(map2_3);
    this.addEntity(map2_4);
    this.addEntity(map2_5);
    this.addEntity(map2_6);
    this.addEntity(map2_7);
    this.addEntity(map2_8);
    this.addEntity(map2_9);
    this.addEntity(map2_10);
    this.addEntity(map2_11);
    this.addEntity(map2_12);
    this.addEntity(map2_13);
    this.addEntity(map2_14);
    this.addEntity(map2_15);
    this.addEntity(map2_16);
    this.addEntity(map2_17);
    this.addEntity(map2_18);
    this.addEntity(map2_19);
    this.addEntity(map2_20);
    this.addEntity(map2_21);
    this.addEntity(map2_22);
    this.addEntity(map2_23);
    this.addEntity(map2_24);
    this.addEntity(map2_25);
    this.addEntity(map2_26);
    this.addEntity(map2_27);
    this.addEntity(map2_28);
    this.addEntity(map2_29);
    this.addEntity(map2_30);
    this.addEntity(map2_31);
    this.addEntity(map2_32);
    this.addEntity(map2_33);
    this.addEntity(map2_34);
    this.addEntity(map2_35);
    this.addEntity(map2_36);
    this.addEntity(map2_37);
    this.addEntity(map2_38);

    this.addEntity(map2_R1);
    this.addEntity(map2_R2);
    this.addEntity(map2_R3);
    this.addEntity(map2_R4);

    this.addEntity(gundam);
    this.addEntity(gundam2);
    this.addEntity(gundam3);
    this.addEntity(gundam4);
    this.addEntity(gundam5);
    this.addEntity(gundam6);
    this.addEntity(jawa);
    this.addEntity(jawa2);
    this.addEntity(jawa3);
    this.addEntity(jawa4);
    this.addEntity(jawa5);
    this.addEntity(jawa6);
    this.addEntity(jawa7);
    this.addEntity(deadRobot);
    this.addEntity(deadRobot2);
    this.addEntity(deadRobot3);
    this.addEntity(deadRobot4);
    this.addEntity(deadRobot5);
    this.addEntity(deadRobot6);
    this.addEntity(deadRobot7);
    this.addEntity(deadRobot8);
    this.addEntity(healthHeart);
    this.addEntity(healthHeart2);
    this.addEntity(healthHeart3);
    this.addEntity(new Pterofractal(this, 4283, 60, .2, 3986, 4380));

    this.addEntity(hBar);

    this.addEntity(this.player);
}