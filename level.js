var SCALE = 3; // The size of canvas divided by sprite_frame_width 

var OFFSET_X = 0; // X offset from sprite background
var OFFSET_Y = 0; // Y offset from sprite background

var SPRITE_FRAME_WIDTH = 258; //Width of sprite background frame
var SPRITE_FRAME_HEIGHT = 230; //Height of sprite background frame

var SCROLL_SPEED = 1; // Scroll speed of background (uses sprite dimensions) in pixels per update

function Background(game, x, y, width, height) {
    this.startX = x;
    this.startY = y;
    this.width = width;
    this.height = height;
    this.xOffset = 0; 
    this.yOffset = 0;
    window.bgXOffset = this.xOffset;
    Entity.call(this, game, 0, 0);
}

Background.prototype = new Entity();
Background.prototype.constructor = Background;

Background.prototype.update = function () {
    if (this.game.player && this.game.player.health > 0) {
        if (this.game.right && !this.game.left && (this.xOffset < 3088) && this.game.playerCanMove && !this.game.playerMoving && !window.bossLock) {
            this.xOffset += SCROLL_SPEED;
            this.game.scrolling = true;
        } else if (this.game.left && !this.game.right && this.xOffset > 0 && this.game.playerCanMove && !this.game.playerMoving && !window.bossLock) {
            this.xOffset -= SCROLL_SPEED;
            this.game.scrolling = true;
        } else {
            this.game.scrolling = false;
        }
    } else {
        this.game.scrolling = false;
    }
    window.bgXOffset = this.xOffset;
    if (this.xOffset >= 3088) {
        var wally = new Platform(this.game, 3092, 188, 3107 - 3092, 188 - 140);
        this.game.addEntity(wally);
    }
}

Background.prototype.draw = function (ctx) {
    
    ctx.drawImage(ASSET_MANAGER.getAsset("./img/stage.png"),
                  this.startX + this.xOffset, this.startY + this.yOffset,  // source from sheet
                  SPRITE_FRAME_WIDTH, SPRITE_FRAME_HEIGHT,
                  0, 0,
                  this.game.ctx.canvas.width,
                  this.game.ctx.canvas.height);
    Entity.prototype.draw.call(this);

}

function Platform(game, x, y, width, height) {
    this.game = game;
    this.x = (x - OFFSET_X) * SCALE; // Calculations to match up sprite dimensions with canvas dimensions
    this.y = (y - OFFSET_Y) * SCALE;
    this.width = width * SCALE;
    this.height = height * SCALE;
}

Platform.prototype = new Entity();
Platform.prototype.constructor = Platform;

//Platforms need to scroll opposite direction of background at same speed in order to appear "still"
Platform.prototype.update = function() {
    if (this.game.left && !this.game.right && this.game.scrolling) this.x+=SCALE * SCROLL_SPEED;
    if (this.game.right && !this.game.left && this.game.scrolling) this.x-=SCALE * SCROLL_SPEED;
    if (this.game.up && !this.game.right && !this.game.left && this.game.scrolling) this.y+=SCALE * SCROLL_SPEED;
    if (this.game.down && !this.game.right && !this.game.left && this.game.scrolling) this.y-=SCALE * SCROLL_SPEED;
}

//Draw red box around the platform for debugging
Platform.prototype.draw = function(ctx) {
    Entity.prototype.draw.call(this);
}

//Essentially just a Platform but player will handle collision differently.
//May just add an "isLadder" property to platform to replace this. 
function Ladder(game, x, y, width, height) {
    Platform.call(this, game, x, y, width, height);
}

Ladder.prototype = new Platform();
Ladder.prototype.constructor = Ladder;

Ladder.prototype.update = function () {
    Platform.prototype.update.call(this);
}

Ladder.prototype.draw = function (ctx) {
    Platform.prototype.draw.call(this);
}

function Spikes(game, x, y, width, height) {
    Platform.call(this, game, x, y, width, height);
}

Spikes.prototype = new Platform();
Spikes.prototype.constructor = Spikes;

Spikes.prototype.update = function () {
    Platform.prototype.update.call(this);
}

Spikes.prototype.draw = function (ctx) {
    Platform.prototype.draw.call(this);
}

//function SlideWall(game, x, y, width, height) {
//    this.game = game;
//    this.x = (x - OFFSET_X); // Calculations to match up sprite dimensions with canvas dimensions
//    this.y = (y - OFFSET_Y);
//    this.width = width * SCALE;
//    this.height = height * SCALE;
//}

//SlideWall.prototype = new Entity();
//SlideWall.prototype.constructor = SlideWall;

//SlideWall.prototype.update = function () {
//    Entity.prototype.update.call(this);
//}

//SlideWall.prototype.draw = function (ctx) {
//    Entity.prototype.draw.call(this, ctx);
//}