/**
 * Created by UngDynasty on 5/20/16.
 */
function Boss(game, x, y, platform) {
    this.platform = platform;
    //this.utini = new Audio("./sound/utini.mp3");
    this.scaleBy = 2;
    this.health = 15;
    // this.walking = true;
    this.falling = true;
    this.started = false;
    this.shooting = false;
    this.proneShot = false;
    this.hasShot = false;
    this.invisible = false;
    var that = this;
    //this.walkAnimation = new Animation(ASSET_MANAGER.getAsset("./img/fBirdLeft.gif"), 0, 0, 75, 93, 0.1, 4, true, false);

    this.shootAnimation = new Animation(ASSET_MANAGER.getAsset("./img/fBirdShootLeft.gif"), 0, 0, 80, 67, .16, 7, false, false);
    this.stillAnimation = new Animation(ASSET_MANAGER.getAsset("./img/fBirdStill.gif"), 0, 0, 80, 78, 0.15, 4, true, false);

    this.proneShotAnimation = new Animation(ASSET_MANAGER.getAsset("./img/fBirdShot2Left.gif"), 0, 0, 90, 102, 0.16, 8, false, false);
    this.currentAnimation = this.stillAnimation;
    setInterval(function () {
        //that.proneShot = Math.random() < .5;
        that.shooting = true;
        //that.walking = false;
    }, 1000);
    this.width = this.currentAnimation.frameWidth * this.scaleBy;
    this.height = this.currentAnimation.frameHeight * this.scaleBy;
    Entity.call(this, game, x * 3, y * 3);
}

Boss.prototype = new Entity();
Boss.prototype.constructor = Boss;

Boss.prototype.update = function() {
    if (this.x < this.game.surfaceWidth && this.x + this.width > 0) this.started = true;
    if (this.started) {
        for (var i = 0; i < this.game.entities.length; i++) {
            var ent = this.game.entities[i];
            if (this != ent && this.collision(ent)
                && ((ent instanceof Shovel || ent instanceof Projectile) && ent.orig != this)) {
                ent.removeFromWorld = true;
                this.health--;
                //this.utini.play();   PLAY SOUNDS
                // ADD ANIMATION AND INVINCIBILTY WHEN HIT
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
                //this.utini.play();
            }
        }

        if (this.health < 1) this.removeFromWorld = true;

        if (this.falling) this.y += 5;
        //if (this.walking) this.x -= 1;
        if (this.platform && this.x < this.platform.x) this.falling = true;

        if (this.shooting) {
            if (this.currentAnimation.isDone()) {
                this.currentAnimation.elapsedTime = 0;
                this.shooting = false;
                this.hasShot = false;
                //this.walking = true;
            }
            if (!this.hasShot) {
                if (this.proneShot) {
                    var p = new FireBall(this.game, this, this.y - 10);
                } else {
                    var p = new FireBall(this.game, this);
                }
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
    // } else if (this.walking) {
    //     this.currentAnimation = this.walkAnimation;
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
