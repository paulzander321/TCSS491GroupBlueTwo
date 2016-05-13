function Jawa(game, x, y) {
    this.x = x;
    this.y = y;
    this.game = game;
    this.scaleBy = 1.5;
    this.walking = true;
    this.shooting = false;
    this.hasShot = false;
    var that = this;
    this.walkAnimation = new Animation(ASSET_MANAGER.getAsset("./img/jawas.png"), 3, 8, 28, 37, .2, 4, true, false);
    this.shootAnimation = new Animation(ASSET_MANAGER.getAsset("./img/jawas.png"), 158, 99, 39, 35, .2, 3, false, false);
    this.stillAnimation = new Animation(ASSET_MANAGER.getAsset("./img/jawas.png"), 3, 8, 28, 37, .2, 1, true, false);
    this.currentAnimation = this.stillAnimation;
    setInterval(function () {
        that.shooting = true;
        that.walking = false;
    }, 2000);
    Entity.call(this, game, x, y);
    this.width = this.currentAnimation.frameWidth * this.scaleBy;
    this.height = this.currentAnimation.frameHeight * this.scaleBy;
}

Jawa.prototype = new Entity();
Jawa.prototype.constructor = Jawa;

Jawa.prototype.update = function() {

    for (var i = 0; i < this.game.entities.length; i++) {
        var ent = this.game.entities[i];
        if (this != ent && this.collision(ent) && (ent instanceof Shovel || ent instanceof Projectile)) {
            this.shooting = true;
            this.removeFromWorld = true;
        }
    }

    if (this.game.left && this.game.scrolling) this.x+=3 * 1;
    if (this.game.right && this.game.scrolling) this.x-=3 * 1;

    if (this.walking) this.x -= 1;
    if (this.x < -30) this.x = 830;

    if (this.shooting) {
        if (this.shootAnimation.isDone()) {
            this.shootAnimation.elapsedTime = 0;
            this.shooting = false;
            this.hasShot = false;
            this.walking = true;
        }
        if (!this.hasShot) {
            var p = new Projectile(this.game, this, -5, 0);
            this.game.addEntity(p);
            this.hasShot = true;
        }
    }
    Entity.call(this, this.game, this.x, this.y);
}

Jawa.prototype.draw = function (ctx) {
    if (this.shooting) {
        this.currentAnimation = this.shootAnimation;
    } else if (this.walking) { 
        this.currentAnimation = this.walkAnimation;
    } else {
        this.currentAnimation = this.stillAnimation;
    }
    this.currentAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y, this.scaleBy);
    this.width = this.currentAnimation.frameWidth * this.scaleBy;
    this.height = this.currentAnimation.frameHeight * this.scaleBy;
    // if (this.game.showOutlines && this.width && this.height) {
    //     this.game.ctx.strokeStyle = "Red";
    //     this.game.ctx.lineWidth = 3;
    //     this.game.ctx.strokeRect(this.x, this.y - this.height, this.width, this.height);
    // }
    Entity.prototype.draw.call(this);
}

Jawa.prototype.collision = function(other) {
    var collisionX = (this.x > other.x && this.x <= other.x + other.width) 
                        || (this.x + this.width >= other.x && this.x + this.width <= other.x + other.width)
                        || (this.x >= other.x && this.x + this.width <= other.x + other.width)
                        || (other.x >= this.x && other.x + other.width <= this.x + this.width);
    var collisionY = (this.y < other.y && this.y >= other.y - other.height)
                        || (this.y > other.y && this.y - this.height > other.y - other.height)
                        || (this.y < other.y && this.y - this.height > other.y - other.height)
                        || (this.y > other.y && this.y - this.height < other.y - other.height);
    return collisionX && collisionY;
}