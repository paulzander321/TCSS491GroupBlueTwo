/**
 * Created by UngDynasty on 5/20/16.
 */
function Boss(game, x, y, platform) {
    this.platform = platform;
    this.scaleBy = 2;
    this.health = 15;
    this.started = false;
    this.shooting = false;
    this.hasShot = false;
    this.invisible = false;
    this.shootAnimation = new Animation(ASSET_MANAGER.getAsset("./img/fBirdShootLeft.gif"), 0, 0, 80, 67, .16, 7, false, false);
    this.stillAnimation = new Animation(ASSET_MANAGER.getAsset("./img/fBirdStill.gif"), 0, 0, 80, 78, 0.15, 4, true, false);
    this.proneShotAnimation = new Animation(ASSET_MANAGER.getAsset("./img/fBirdShot2Left.gif"), 0, 0, 90, 102, 0.16, 8, false, false);
    this.currentAnimation = this.stillAnimation;
    this.startedShooting = false;
    this.width = this.currentAnimation.frameWidth * this.scaleBy;
    this.height = this.currentAnimation.frameHeight * this.scaleBy;
    Entity.call(this, game, x * 3, y * 3);
}

Boss.prototype = new Entity();
Boss.prototype.constructor = Boss;

Boss.prototype.update = function() {
    if (this.x < this.game.surfaceWidth && this.x + this.width > 0) this.started = true;
    if (this.started) {
        if (!this.startedShooting) {
            var that = this;
            setInterval(function () {
                that.shooting = true;
            }, 1000);
            this.startedShooting = true;
        }
        for (var i = 0; i < this.game.entities.length; i++) {
            var ent = this.game.entities[i];
            if (this != ent && this.collision(ent)
                && ((ent instanceof Shovel || ent instanceof Projectile) && ent.orig != this)) {
                ent.removeFromWorld = true;
                this.health--;
                console.log("BOSS was hit!");
                var that = this;
                var invisibleInterval = setInterval(function() {
                    that.invisible = !that.invisible;
                }, 50);
                setTimeout(function() {
                    clearInterval(invisibleInterval);
                    that.invisible = false;
                }, 500);
            } else if (ent instanceof Platform && this.collision(ent)) {
                this.falling = false;
                this.platform = ent;
            }
            if (ent instanceof Spikes && this.collision(ent)) {
                this.removeFromWorld = true;
            }
        }

        if (this.health < 1) {
            this.removeFromWorld = true;
            var that = this;
            that.game.sounds.gameOverSound.play();
            setTimeout(function() {
                that.game.gameWon = true;
                that.game.sounds.yeehaw.play();
                that.game.gameOver = true;
            }, 2000);
        }

        if (this.falling) this.y += 5;
        if (this.platform && this.x < this.platform.x) this.falling = true;

        if (this.shooting) {
            if (this.currentAnimation.isDone()) {
                this.currentAnimation.elapsedTime = 0;
                this.shooting = false;
                this.hasShot = false;
            }
            if (!this.hasShot) {
                var p = new FireBall(this.game, this, this.game.player.y 
                                        - this.game.player.stillAnimation.frameHeight 
                                        * this.game.player.scaleBy + 5);
                p.setDX(-1);
                this.game.addEntity(p);
                this.hasShot = true;
            }
        }
        Entity.prototype.update.call(this);
    }
    if (this.game.left && this.game.scrolling) this.x+=3 * this.game.scrollSpeed;
    if (this.game.right && this.game.scrolling) this.x-=3 * this.game.scrollSpeed;
}

Boss.prototype.draw = function (ctx) {
    if (this.shooting) {
        if (this.proneShot) {
            this.currentAnimation = this.proneShotAnimation;
        } else {
            this.currentAnimation = this.shootAnimation;
        }
    } else {
        this.currentAnimation = this.stillAnimation;
    }
    if (!this.invisible) this.currentAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y, this.scaleBy);
    this.width = this.currentAnimation.frameWidth * this.scaleBy;
    this.height = this.currentAnimation.frameHeight * this.scaleBy;
    Entity.prototype.draw.call(this);
}

Boss.prototype.collision = function(other) {
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
