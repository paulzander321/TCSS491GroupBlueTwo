// This game shell was happily copied from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (/* function */ callback, /* DOMElement */ element) {
                window.setTimeout(callback, 1000 / 60);
            };
})();

function Timer() {
    this.gameTime = 0;
    this.maxStep = 0.05;
    this.wallLastTimestamp = 0;
}

Timer.prototype.tick = function () {
    var wallCurrent = Date.now();
    var wallDelta = (wallCurrent - this.wallLastTimestamp) / 1000;
    this.wallLastTimestamp = wallCurrent;

    var gameDelta = Math.min(wallDelta, this.maxStep);
    this.gameTime += gameDelta;
    return gameDelta;
}

function GameEngine() {
    this.playerCount = 1;
    this.entities = [];
    this.showOutlines = true;
    this.background = null;
    this.player = null;
    this.boss = null;
    this.ctx = null;
    this.click = null;
    this.mouse = null;
    this.wheel = null;
    this.surfaceWidth = null;
    this.surfaceHeight = null;
}

GameEngine.prototype.init = function (ctx) {
    //Initialize game sounds
    this.sounds = {
        backgroundMusic: new Audio("./sound/megaman-music.mp3"),
        gameOverSound: new Audio("./sound/gameover.wav"),
        playerDeathSound: new Audio("./sound/megaman-death.mp3"),
        playerHitSound: new Audio("./sound/WoundMedium.wav"),
        deathScream: function() {
            new Audio("./sound/willhelm.mp3").play();
        },
        shootProjectile: function() {
            var a = new Audio("./sound/_Fire.wav");
            a.volume = 0.5;
            a.play();
        },
        rapidFireUnlock: new Audio("./sound/rapidfire.mp3")
    };
    this.sounds.playerDeathSound.volume = 0.5;
    this.sounds.backgroundMusic.volume = 0.3;
    this.sounds.backgroundMusic.loop = true;

    this.gameOver = false;
    this.ctx = ctx;
    this.gameWon = false;
    this.scrolling = false;
    this.playerCanMove = true;
    this.scrollSpeed = 2.0;
    this.screenScrolling = false;
    this.surfaceWidth = this.ctx.canvas.width;
    this.surfaceHeight = this.ctx.canvas.height;
    this.startInput();
    this.timer = new Timer();
    console.log('Game Engine Started');
}

GameEngine.prototype.start = function () {
    console.log("Starting play");
    var that = this;
    (function gameLoop() {
        that.loop();
        requestAnimFrame(gameLoop, that.ctx.canvas);
    })();
}

GameEngine.prototype.startInput = function () {
    console.log('Starting input');
    var that = this;

    this.ctx.canvas.addEventListener("keyup", function (e) {
        if (e.which == 37) {
            that.left = false;
        }
        if (e.which == 39) {
            that.right = false;
        }
        if (e.which == 40) {
            that.down = false;
        }
        if (e.which == 38) {
            that.up = false;
        }
        if (e.which == 83) {
            that.shooting = false;
        }
        if (e.which == 70) {
            that.punching = false;
        }
        e.preventDefault();
    }, false);

    this.ctx.canvas.addEventListener("keypress", function(e) {
        if (String.fromCharCode(e.which) === ' ') that.space = true;

        if (String.fromCharCode(e.which) === 'm') {
            if (that.sounds.backgroundMusic.paused) {
                that.sounds.backgroundMusic.play();
            } else {
                that.sounds.backgroundMusic.pause();
            }
        }

        if (String.fromCharCode(e.which) === 'a' && that.playerCount < 1 
            && !that.gameWon) {
            var tempMega = new MegaMan(that, that.surfaceWidth / 2, 300, 1.5);
            that.addEntity(tempMega);
            that.player = tempMega;
            that.gameOver = false;
            that.playerCount++;
        }

        e.preventDefault();
    }, false);

    this.ctx.canvas.addEventListener("keydown", function (e) {
        if (e.which == 37) {
            e.preventDefault();
            that.left = true;
        }
        if (e.which == 39) {
            e.preventDefault();
            that.right = true;
        }
        if (e.which == 40) {
            e.preventDefault();
            that.down = true;
        }
        if (e.which == 38) {
            e.preventDefault();
            that.up = true;
        }
        if (e.which == 83) {
            that.shooting = true;
        }
        if (e.which == 70) {
            that.punching = true;
        }
    }, false);

    console.log('Input started');
}

GameEngine.prototype.addEntity = function (entity) {
    // console.log('added entity');
    this.entities.push(entity);
}

GameEngine.prototype.draw = function () {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.save();
    for (var i = 0; i < this.entities.length; i++) {
        this.entities[i].draw(this.ctx);
    }

    if (this.player.currentHealth < 1 && !this.gameOver) {
        var that = this;
        var setGameOver = setTimeout(function() {
            that.gameOver = true;
            that.sounds.gameOverSound.play();
        }, 1500);
    }
    if (this.gameOver) {
        this.ctx.fillStyle = "black";
        this.ctx.font="60px Georgia";
        this.ctx.fillRect(0, 0, this.surfaceWidth, this.surfaceHeight);
        this.ctx.fillStyle = "white";
        this.ctx.textAlign = "center";
        var gameOverText = "";
        this.gameWon ? gameOverText = "You won!" : gameOverText = "You lost...";
        this.ctx.fillText(gameOverText, this.surfaceWidth / 2, this.surfaceHeight / 2);
    }
    this.ctx.restore();
}

GameEngine.prototype.update = function () {
    if (!this.gameover) {
        var entitiesCount = this.entities.length;

        for (var i = 0; i < entitiesCount; i++) {
            var entity = this.entities[i];

            if (!entity.removeFromWorld) {
                entity.update();
            }
        }

        for (var i = this.entities.length - 1; i >= 0; --i) {
            if (this.entities[i].removeFromWorld) {
                this.entities.splice(i, 1);
            }
        }
    }
}

GameEngine.prototype.loop = function () {
    this.clockTick = this.timer.tick();
    this.update();
    this.draw();
    this.space = null;
}

function Entity(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.removeFromWorld = false;
}

Entity.prototype.update = function () {
}

Entity.prototype.draw = function (ctx) {
    if (this.game.showOutlines && this.width && this.height) {
        this.game.ctx.strokeStyle = "Red";
        this.game.ctx.lineWidth = 3;
        this.game.ctx.strokeRect(this.x, this.y - this.height, this.width, this.height);
    }
}

Entity.prototype.rotateAndCache = function (image, angle) {
    var offscreenCanvas = document.createElement('canvas');
    var size = Math.max(image.width, image.height);
    offscreenCanvas.width = size;
    offscreenCanvas.height = size;
    var offscreenCtx = offscreenCanvas.getContext('2d');
    offscreenCtx.save();
    offscreenCtx.translate(size / 2, size / 2);
    offscreenCtx.rotate(angle);
    offscreenCtx.translate(0, 0);
    offscreenCtx.drawImage(image, -(image.width / 2), -(image.height / 2));
    offscreenCtx.restore();
    //offscreenCtx.strokeStyle = "red";
    //offscreenCtx.strokeRect(0,0,size,size);
    return offscreenCanvas;
}