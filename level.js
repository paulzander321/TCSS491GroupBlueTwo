var SCALE = 3; // The size of canvas divided by sprite_frame_width 

var OFFSET_X = 0; // X offset from sprite background
var OFFSET_Y = 0; // Y offset from sprite background

var SPRITE_FRAME_WIDTH = 258; //Width of sprite background frame
var SPRITE_FRAME_HEIGHT = 230; //Height of sprite background frame

function Background(game, x, y, width, height) {
    this.startX = x;
    this.startY = y;
    this.lockScroll = false;
    this.width = width;
    this.height = height;
    this.xOffset = 0; 
    this.yOffset = 0;
    Entity.call(this, game, 0, 0);
}

Background.prototype = new Entity();
Background.prototype.constructor = Background;

Background.prototype.update = function () {
    if (this.xOffset > 3088) this.lockScroll = true;
    if (this.game.player && this.game.player.currentHealth > 0) {
        if (this.game.right && !this.game.left && !this.lockScroll && this.game.playerCanMove && !this.game.playerMoving) {
            this.xOffset+= this.game.scrollSpeed;
            this.game.scrolling = true;
        } else if (this.game.left && !this.game.right && !this.lockScroll && this.xOffset > 0 && this.game.playerCanMove && !this.game.playerMoving) {
            this.xOffset-= this.game.scrollSpeed;
            this.game.scrolling = true;
        } else {
            this.game.scrolling = false;
        }
    } else {
        this.game.scrolling = false;
    }
}

Background.prototype.draw = function (ctx) {
    //debugger;
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
    if (this.game.left && !this.game.right && this.game.scrolling) this.x+=SCALE * this.game.scrollSpeed;
    if (this.game.right && !this.game.left && this.game.scrolling) this.x-=SCALE * this.game.scrollSpeed;
    if (this.game.up && !this.game.right && !this.game.left && this.game.scrolling) this.y+=SCALE * this.game.scrollSpeed;
    if (this.game.down && !this.game.right && !this.game.left && this.game.scrolling) this.y-=SCALE * this.game.scrollSpeed;
}

//Draw red box around the platform for debugging
Platform.prototype.draw = function(ctx) {
    Entity.prototype.draw.call(this);
}

function HealthBar(game, x, y, width, height) {
    this.width = width;
    this.height = height;
    this.lineWidth = 3;
    Entity.call(this, game, x, y);
}

HealthBar.prototype = new Entity();
HealthBar.prototype.constructor = HealthBar;

HealthBar.prototype.update = function() {
}

HealthBar.prototype.draw = function(ctx){
    this.game.ctx.fillStyle = "gray";
    this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
    if (this.game.player.currentHealth > 0) {
        this.game.player.currentHealth < this.game.player.maxHealth / 3 ? this.game.ctx.fillStyle = "red"
            : this.game.ctx.fillStyle = "green";
        this.game.ctx.fillRect(this.x, this.y, this.width / this.game.player.maxHealth * this.game.player.currentHealth, this.height);
    }
    this.game.ctx.strokeStyle = "black";
    this.game.ctx.lineWidth = this.lineWidth;
    this.game.ctx.strokeRect(this.x, this.y, this.width, this.height);
    for (var i = 0; i < this.game.player.maxHealth; i++) {
        this.game.ctx.beginPath();
        this.game.ctx.moveTo(this.x + i * (this.width / this.game.player.maxHealth), this.y);
        this.game.ctx.lineTo(this.x + i * (this.width / this.game.player.maxHealth), this.y + this.height);
        this.game.ctx.stroke();
    }
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

function Powerup(game, x, y, radius, type) {
    this.x = (x - OFFSET_X) * SCALE; // Calculations to match up sprite dimensions with canvas dimensions
    this.y = (y - OFFSET_Y) * SCALE;
    this.radius = radius
    this.type = type;
    this.width = this.radius * 2;
    this.height = this.radius * 2;
    this.started = false;
    Entity.call(this, game, this.x, this.y);
}

Powerup.prototype = new Entity();
Powerup.prototype.constructor = Powerup;

Powerup.prototype.update = function() {
    if (this.x > 0 && this.x < this.game.surfaceWidth) this.started = true;
    if (this.started) {
        this.x -= 3;
        this.y += Math.floor(Math.random() * 7) - 3;
        if (this.x < 0) this.removeFromWorld = true;
        Entity.prototype.update.call(this);
    }
    if (this.game.left && !this.game.right && this.game.scrolling) this.x+=SCALE * this.game.scrollSpeed;
    if (this.game.right && !this.game.left && this.game.scrolling) this.x-=SCALE * this.game.scrollSpeed;
    if (this.game.up && !this.game.right && !this.game.left && this.game.scrolling) this.y+=SCALE * this.game.scrollSpeed;
    if (this.game.down && !this.game.right && !this.game.left && this.game.scrolling) this.y-=SCALE * this.game.scrollSpeed;
}

Powerup.prototype.draw = function(ctx) {
    ctx.beginPath();
    ctx.fillStyle = "purple";
    ctx.arc(this.x + this.radius, this.y - this.radius, this.radius, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.closePath();
    Entity.prototype.draw.call(this);
}