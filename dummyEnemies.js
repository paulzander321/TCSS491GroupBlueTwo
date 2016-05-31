/**
 * Created by bunkak on 5/20/16.
 */
function DeadRobot(game, x, y, platform) {
    this.platform = platform;
    this.health = 3;
    this.movingRight = false;
    this.walking = true;
    this.falling = true;
    this.started = false;
    this.shooting = false;
    this.proneShot = false;
    this.hasShot = false;
    this.invisible = false;
    this.scaleBy = 2;
    this.speed = 100;
    this.game = game;
    this.animation = new Animation(ASSET_MANAGER.getAsset("./img/dead_robot.png"),
        0, 8, 50, 31, 0.15, 6, true, false);
    this.rightAnimation = new Animation(ASSET_MANAGER.getAsset("./img/dead_robot_flip.png"),
        0, 8, 50, 31, 0.15, 6, true, false);
    this.currentAnimation = this.animation;
    this.width = this.currentAnimation.frameWidth * this.scaleBy;
    this.height = this.currentAnimation.frameHeight * this.scaleBy;
    Entity.call(this, game, x * 3, y * 3);
}

DeadRobot.prototype = new Entity();
DeadRobot.prototype.constructor = DeadRobot;

DeadRobot.prototype.update = function() {
    if (this.health < 1) this.removeFromWorld = true;
    if (this.x < this.game.surfaceWidth && this.x + this.width > 0) this.started = true;
    if (this.started) {
        if (this.animation.elapsedTime < this.animation.totalTime * 8 / 14)
        this.movingRight ? this.x += this.game.clockTick * this.speed : this.x -= this.game.clockTick * this.speed;
        for (var i = 0; i < this.game.entities.length; i++) {
            var ent = this.game.entities[i];
            if (ent instanceof Platform && this.collision(ent)) {
                this.falling = false;
                if (this.platform && ent != this.platform) {
                    this.movingRight = !this.movingRight;
                }
                this.platform = ent;
            } else if (ent instanceof Projectile && this.collision(ent)) {
                ent.removeFromWorld = true;
                this.health--;
                var that = this;
                var invisibleInterval = setInterval(function() {
                    that.invisible = !that.invisible;
                }, 50);
                setTimeout(function() {
                    clearInterval(invisibleInterval);
                    that.invisible = false;
                }, 500);
            }
        }
        if (this.falling) this.y += 5;
        if (this.platform && this.x + this.width / 2 < this.platform.x) {
            this.movingRight = true;
            this.rightAnimation.elapsedTime = 0;
        } else if (this.platform && this.x + this.width / 2 > this.platform.x + this.platform.width) {
            this.movingRight = false;
            this.animation.elapsedTime = 0;
        }
        Entity.prototype.update.call(this);
    }

    //this two line needed when mega move backward and DeadRobot don't move backward do
    // (DeadRobot move the direction it should be)
    if (this.game.left && this.game.scrolling) this.x+=3 * this.game.scrollSpeed;
    if (this.game.right && this.game.scrolling) this.x-=3 * this.game.scrollSpeed;
}

DeadRobot.prototype.draw = function (ctx) {
    this.movingRight ? this.currentAnimation = this.rightAnimation : this.currentAnimation = this.animation;
    if (!this.invisible) this.currentAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y, this.scaleBy);
    this.width = this.currentAnimation.frameWidth * this.scaleBy;
    this.height = this.currentAnimation.frameHeight * this.scaleBy;
    Entity.prototype.draw.call(this);
}

DeadRobot.prototype.collision = function(other) {
    var collisionX = (this.x >= other.x && this.x <= other.x + other.width)
        || (this.x + this.width >= other.x && this.x + this.width <= other.x + other.width)
        || (this.x >= other.x && this.x + this.width <= other.x + other.width)
        || (other.x >= this.x && other.x + other.width <= this.x + this.width);
    var collisionY = (this.y <= other.y && this.y >= other.y - other.height)
        || (this.y - this.height <= other.y && this.y - this.height >= other.y - other.height)
        || (this.y - this.height >= other.y - other.height && this.y <= other.y)
        || (other.y <= this.y && other.y - other.height >= this.y - this.height);
    return collisionX && collisionY;
}




//=======================================================================
function Gundam(game, x, y, platform) {
    this.platform = platform;
    this.health = 4;
    this.walking = true;
    this.falling = true;
    this.started = false;
    this.invisible = false;
    var that = this;
    this.scaleBy = 1.25;
    this.speed = 100;
    this.game = game;
    this.animation = new Animation(ASSET_MANAGER.getAsset("./img/gundamReverse.png"),
        0, 0, 100, 43, 0.05, 9, true, false);
    this.currentAnimation = this.animation;
    this.width = this.currentAnimation.frameWidth * this.scaleBy;
    this.height = this.currentAnimation.frameHeight * this.scaleBy;
    Entity.call(this, game, x * 3, y * 3);
}

Gundam.prototype = new Entity();
Gundam.prototype.constructor = Gundam;

Gundam.prototype.update = function() {
    if (this.health < 1) this.removeFromWorld = true;
    if (this.x < this.game.surfaceWidth && this.x + this.width > 0) this.started = true;
    if (this.started) {
        if (this.animation.elapsedTime < this.animation.totalTime * 8 / 14)
        this.x -= this.game.clockTick * this.speed;
        for (var i = 0; i < this.game.entities.length; i++) {
            var ent = this.game.entities[i];
            if (ent instanceof Platform && this.collision(ent)) {
                this.falling = false;
                this.platform = ent;
            } else if (ent instanceof Projectile && this.collision(ent)) {
                ent.removeFromWorld = true;
                this.health--;
                var that = this;
                var invisibleInterval = setInterval(function() {
                    that.invisible = !that.invisible;
                }, 50);
                setTimeout(function() {
                    clearInterval(invisibleInterval);
                    that.invisible = false;
                }, 500);
            }
        }
        if (this.falling) this.y += 5;
        if (this.platform && this.x < this.platform.x) this.falling = true;
        Entity.prototype.update.call(this);
    }

    //this two line needed when mega move backward and Gundam don't move backward do
    // (Gundam move the direction it should be)
    if (this.game.left && this.game.scrolling) this.x+=3 * this.game.scrollSpeed;
    if (this.game.right && this.game.scrolling) this.x-=3 * this.game.scrollSpeed;
}

Gundam.prototype.draw = function (ctx) {
    if (!this.invisible) this.currentAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y, this.scaleBy);
    this.width = this.currentAnimation.frameWidth * this.scaleBy;
    this.height = this.currentAnimation.frameHeight * this.scaleBy;
    Entity.prototype.draw.call(this);
}

Gundam.prototype.collision = function(other) {
    var collisionX = (this.x >= other.x && this.x <= other.x + other.width)
        || (this.x + this.width >= other.x && this.x + this.width <= other.x + other.width)
        || (this.x >= other.x && this.x + this.width <= other.x + other.width)
        || (other.x >= this.x && other.x + other.width <= this.x + this.width);
    var collisionY = (this.y <= other.y && this.y >= other.y - other.height)
        || (this.y - this.height <= other.y && this.y - this.height >= other.y - other.height)
        || (this.y - this.height >= other.y - other.height && this.y <= other.y)
        || (other.y <= this.y && other.y - other.height >= this.y - this.height);
    return collisionX && collisionY;
}



//=================================================================================================






































