function Projectile(game, orig, dx, dy, x, y) {
    this.game = game;
    this.orig = orig;
    this.scaleBy = this.orig.scaleBy;
    this.dx = dx;
    this.dy = dy;
    this.animation = new Animation(ASSET_MANAGER.getAsset("./img/jawas.png"), 177, 76, 17, 13, .1, 2, true, false);
    this.x = this.orig.x - 50;
    this.y = (this.orig.y + this.orig.y - this.orig.height) / 2;
    this.width = this.animation.frameWidth * this.scaleBy;
    this.height = this.animation.frameHeight * this.scaleBy;
}

Projectile.prototype = new Entity();
Projectile.prototype.constructor = Projectile;

Projectile.prototype.update = function() {
    this.x += this.dx;
    this.y += this.dy;
    if (this.game.left && this.game.scrolling) this.x+=3 * 1;
    if (this.game.right && this.game.scrolling) this.x-=3 * 1;
    Entity.call(this, this.game, this.x, this.y);
}

Projectile.prototype.draw = function(ctx) {
    this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, this.scaleBy);
    Entity.prototype.draw.call(this);
}

function Shovel(game, MegaMan, dx, dy) {
    this.game = game;
    this.orig = MegaMan;
    this.scaleBy = this.orig.scaleBy;
    this.x = this.orig.x + this.orig.width + 10;
    this.dx = dx;
    this.dy = dy;
    if (this.dx >= 0) {
        this.x = this.orig.x + this.orig.shootAnimation.frameWidth * this.scaleBy + 10;
    } else {
        this.x = this.orig.x - this.width - 10;
    }
    this.y = this.orig.y - this.orig.shootAnimation.frameHeight * this.orig.scaleBy / 2;
    this.animation = new Animation(ASSET_MANAGER.getAsset("./img/MegaSheet.gif"), 838, 635, 45, 13, 1.0, 1, true, true);
    this.width = this.animation.frameWidth * this.scaleBy;
    this.height = this.animation.frameHeight * this.scaleBy;
}

Shovel.prototype = new Entity();
Shovel.prototype.constructor = Shovel;

Shovel.prototype.update = function() {
    this.x += this.dx;
    this.y += this.dy;
    if (this.x > 800) this.removeFromWorld = true;
    Entity.call(this, this.game, this.x, this.y);
}

Shovel.prototype.draw = function(ctx) {
    this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, this.scaleBy);
    Entity.prototype.draw.call(this);
}