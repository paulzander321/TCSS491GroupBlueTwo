function Jawa(game, x, y, platform) {
    this.platform = platform;
    this.utini = new Audio("./sound/utini.mp3");
    this.scaleBy = 2;
    this.health = 3;
    this.walking = true;
    this.started = false;
    this.shooting = false;
    this.proneShot = false;
    this.hasShot = false;
    var that = this;
    this.walkAnimation = new Animation(ASSET_MANAGER.getAsset("./img/jawas.png"), 3, 8, 28, 37, .2, 4, true, false);
    this.shootAnimation = new Animation(ASSET_MANAGER.getAsset("./img/jawas.png"), 158, 99, 39, 35, .2, 3, false, false);
    this.stillAnimation = new Animation(ASSET_MANAGER.getAsset("./img/jawas.png"), 3, 8, 28, 37, .2, 1, true, false);
    this.proneShotAnimation = new Animation(ASSET_MANAGER.getAsset("./img/jawas.png"), 132, 11, 48, 28, .2, 3, false, false);
    this.currentAnimation = this.stillAnimation;
    setInterval(function () {
        that.proneShot = Math.random() < .5;
        that.shooting = true;
        that.walking = false;
    }, 2000);
    this.width = this.currentAnimation.frameWidth * this.scaleBy;
    this.height = this.currentAnimation.frameHeight * this.scaleBy;
    Entity.call(this, game, x * 3, y * 3);
}

Jawa.prototype = new Entity();
Jawa.prototype.constructor = Jawa;

Jawa.prototype.update = function() {
    if (this.x < this.game.surfaceWidth && this.x + this.width > 0) this.started = true;
    if (this.started) {
        for (var i = 0; i < this.game.entities.length; i++) {
            var ent = this.game.entities[i];
            if (this != ent && this.collision(ent) 
                && ((ent instanceof Shovel || ent instanceof Projectile) && ent.orig != this)) {
                ent.removeFromWorld = true;
                this.health--;
                this.utini.play();
            } else if (ent instanceof Platform && this.collision(ent)) {
                this.platform = ent;
            }
        }

        if (this.health < 0) this.removeFromWorld = true;

        if (this.walking) this.x -= 1;

        if (this.shooting) {
            if (this.currentAnimation.isDone()) {
                this.currentAnimation.elapsedTime = 0;
                this.shooting = false;
                this.hasShot = false;
                this.walking = true;
            }
            if (!this.hasShot) {
                if (this.proneShot) {
                    var p = new Projectile(this.game, this, this.y - 10);
                } else {
                    var p = new Projectile(this.game, this);
                }
                p.setDX(-5);
                this.game.addEntity(p);
                this.hasShot = true;
            }
        }
        Entity.prototype.update.call(this);
    }
    if (this.game.left && this.game.scrolling) this.x+=3 * 1;
    if (this.game.right && this.game.scrolling) this.x-=3 * 1;
}

Jawa.prototype.draw = function (ctx) {
    if (this.shooting) {
        if (this.proneShot) {
            this.currentAnimation = this.proneShotAnimation;
        } else {
            this.currentAnimation = this.shootAnimation;
        }
    } else if (this.walking) { 
        this.currentAnimation = this.walkAnimation;
    } else {
        this.currentAnimation = this.stillAnimation;
    }
    this.currentAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y, this.scaleBy);
    this.width = this.currentAnimation.frameWidth * this.scaleBy;
    this.height = this.currentAnimation.frameHeight * this.scaleBy;
    Entity.prototype.draw.call(this);
}

Jawa.prototype.collision = function(other) {
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

function SandPerson(game, x, y) {
    this.scaleBy = 1.5;
    this.health = 3;
    this.tuskenCry = new Audio("./sound/tusken_cry.mp3");
    this.tuskenCry.play();
    this.crying = true;
    this.raiderAnimation = new Animation(ASSET_MANAGER.getAsset("./img/jawas.png"), 178, 196, 38, 70, .3, 2, true, false);
    this.stillAnimation = new Animation(ASSET_MANAGER.getAsset("./img/jawas.png"), 178, 196, 38, 70, .3, 1, true, false);
    this.currentAnimation = this.stillAnimation;
    this.width = this.currentAnimation.frameWidth * this.scaleBy;
    this.height = this.currentAnimation.frameHeight * this.scaleBy;
    var that = this;
    setInterval(function() {
        that.crying = !that.crying;
        if (that.crying) that.tuskenCry.play();
    }, 10000);
    Entity.call(this, game, x, y);
}

SandPerson.prototype = new Entity();
SandPerson.prototype.constructor = SandPerson;

SandPerson.prototype.update = function() {
    for (var i = 0; i < this.game.entities.length; i++) {
        var ent = this.game.entities[i];
        if (this != ent && this.collision(ent) && (ent instanceof Shovel || ent instanceof Projectile)) {
            // this.shooting = true;
            ent.removeFromWorld = true;
            this.health--;
        }
    }

    if (this.health < 0) this.removeFromWorld = true;

    if (this.game.left && this.game.scrolling) this.x+=3 * 1;
    if (this.game.right && this.game.scrolling) this.x-=3 * 1;
    Entity.prototype.update.call(this);
}

SandPerson.prototype.draw = function (ctx) {
    if (this.crying && !this.tuskenCry.paused) {
        this.currentAnimation = this.raiderAnimation;
    } else {
        this.currentAnimation = this.stillAnimation;
    }
    this.currentAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y, this.scaleBy);
    this.width = this.currentAnimation.frameWidth * this.scaleBy;
    this.height = this.currentAnimation.frameHeight * this.scaleBy;
    ctx.font="20px Georgia";
    ctx.fillText("I'm a SandPerson!",this.x,this.y - this.height - 20);
    Entity.prototype.draw.call(this);
}

SandPerson.prototype.collision = function(other) {
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