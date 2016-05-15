//Creates new player who will be controlled by user.
function MegaMan(game, x, y, scaleBy) {
    this.scaleBy = scaleBy;
    this.shootFrequency = 500; //Milliseconds per projectile
    this.facingRight = true;
    this.health = 5;
    this.jumping = false;
    this.doubleJumping = false;
    this.movingUp = false;
    this.dying = false;
    this.falling = true;
    this.ladder = null;
    this.canShoot = true;
    this.platform = null;
    this.collisionRight = false;
    this.invincible = false;

    //Sound stuff
    this.deathSound = new Audio("./sound/atomic-bomb.mp3");
    this.ouch = new Audio("./sound/ouch.mp3");
    this.scream = new Audio("./sound/willhelm.mp3");
    this.deathSoundStarted = false;
    
    //Move left/right animations
    this.runRightAnimation = new Animation(ASSET_MANAGER.getAsset("./img/MegaSheet.gif"), 558, 1192, 46, 39, 0.1, 10, true, false);
    this.runLeftAnimation = new Animation(ASSET_MANAGER.getAsset("./img/MegaSheet.gif"), 558, 1243, 46, 39, 0.1, 10, true, false);
    
    //Crouch/roll animations
    this.crouchAnimation = new Animation(ASSET_MANAGER.getAsset("./img/MegaSheet.gif"), 4, 1183, 30, 27, 1, 1, true, false);
    this.crouchLeftAnimation = new Animation(ASSET_MANAGER.getAsset("./img/MegaSheet.gif"), 6, 1117, 30, 27, 0.1, 1, true, true);
    this.rollRightAnimation = new Animation(ASSET_MANAGER.getAsset("./img/MegaSheet.gif"), 4, 1183, 30, 27, 0.1, 8, true, false);
    this.rollLeftAnimation = new Animation(ASSET_MANAGER.getAsset("./img/MegaSheet.gif"), 6, 1117, 30, 27, 0.1, 8, true, true);

    //Climbing animations
    this.climbAnimation = new Animation(ASSET_MANAGER.getAsset("./img/MegaSheet.gif"), 5, 1030, 28, 52, 0.8, 6, true, true);
    this.stillClimbAnimation = new Animation(ASSET_MANAGER.getAsset("./img/MegaSheet.gif"), 5, 1030, 28, 52, 0.15, 1, true, true);
    
    //Passive animations
    this.stillAnimation = new Animation(ASSET_MANAGER.getAsset("./img/MegaSheet.gif"), 4, 56, 35, 41, 0.2, 6, true, false);
    this.faceLeftAnimation = new Animation(ASSET_MANAGER.getAsset("./img/MegaSheet.gif"), 315, 1035, 35, 41, 0.2, 6, true, false);
    
    //Fighting animations
    this.runRightAndShootAnimation = new Animation(ASSET_MANAGER.getAsset("./img/MegaSheet.gif"), 290, 504, 43, 37, 0.1, 6, true, false);
    this.runLeftAndShootAnimation = new Animation(ASSET_MANAGER.getAsset("./img/MegaSheet.gif"), 563, 1297, 43, 37, 0.1, 6, true, true);
    this.punchAnimation = new Animation(ASSET_MANAGER.getAsset("./img/MegaSheet.gif"), 549, 1136, 43, 42, 0.1, 7, true, false);
    this.shootRightAnimation = new Animation(ASSET_MANAGER.getAsset("./img/MegaSheet.gif"), 900, 980, 56, 39, .15, 3, true, false);
    this.shootLeftAnimation = new Animation(ASSET_MANAGER.getAsset("./img/MegaSheet.gif"), 900, 1075, 56, 39, .15, 3, true, true);

    //Death explosion animation
    this.explosionAnimation = new Animation(ASSET_MANAGER.getAsset("./img/explosion.png"), 0, 0, 96, 96, .15, 15, false, false);
    
    //Jumping/Falling Animations
    this.fallRightAnimation = new Animation(ASSET_MANAGER.getAsset("./img/MegaSheet.gif"), 346, 742, 32, 50, .15, 1, true, false);
    this.fallLeftAnimation = new Animation(ASSET_MANAGER.getAsset("./img/MegaSheet.gif"), 346, 794, 32, 50, .15, 1, true, false);
    this.fallAndShootRightAnimation = new Animation(ASSET_MANAGER.getAsset("./img/MegaSheet.gif"), 346, 346, 40, 51, .1, 1, true, false);
    this.fallAndShootLeftAnimation = new Animation(ASSET_MANAGER.getAsset("./img/MegaSheet.gif"), 1024, 85, 40, 50, .1, 1, true, false);
    this.jumpAnimation = new Animation(ASSET_MANAGER.getAsset("./img/MegaSheet.gif"), 4, 1254, 55, 74, 0.1, 8, false, true);

    this.currentAnimation = this.stillAnimation;
    this.width = this.currentAnimation.frameWidth * this.scaleBy;
    this.height = this.currentAnimation.frameHeight * this.scaleBy;
    Entity.call(this, game, x, y);
}

MegaMan.prototype = new Entity();
MegaMan.prototype.constructor = MegaMan;

MegaMan.prototype.update = function() {

    this.game.playerMoving = this.x < this.game.surfaceWidth / 2 - this.width || this.x > this.game.surfaceWidth / 2 + this.width;

    //Mega Man will die when health below 1
    if (this.health < 1) {
        this.dying = true;
        if (!this.deathSoundStarted) {
            this.deathSoundStarted = true;
            this.deathSound.play();
            this.scream.play();
        }
    }

    //Once death animation done Mega Man removed from world.
    if (this.dying && this.explosionAnimation.isDone()) {
        this.removeFromWorld = true;
        console.log("Megaman has fallen...");
        this.game.playerCount--;
    }

    //If last move was right, Megaman is looking right
    if (this.game.right && !this.game.left) this.facingRight = true;

    //If last move was left, Megaman is now looking left
    if (this.game.left && !this.game.right) this.facingRight = false;

    //If Megaman runs off edges of his current platform he will start to fall 
    if (this.platform && this.x > this.platform.x + this.platform.width) this.falling = true; 
    if (this.platform && this.x + this.width < this.platform.x) this.falling = true;

    //If megaman falls off map HE DEAD!!
    if (this.y - this.height > this.game.ctx.canvas.height) this.health = -1;

    //If megaman is near a ladder he will not fall
    if (this.ladder && this.collision(this.ladder)) this.falling = false;

    //Changes Megaman's y-position when falling. 
    if (this.falling) this.y+=5;

    //Check for collisions, when done will call different functions based on what
    //Mega Man is colliding with.
    for (var i = 0; i < this.game.entities.length; i++) {
        var ent = this.game.entities[i];
        if (this != ent && this.collision(ent) && (ent instanceof Shovel || (ent instanceof Projectile && ent.orig != this))) {
            this.takeDamage();
            ent.removeFromWorld = true;
        } else if (ent instanceof Ladder && this.collision(ent)) {
            this.ladder = ent;
            this.falling = false;
            console.log("Near ladder!");
        } else if (ent instanceof Platform && this.collision(ent) && !this.collisionAbove(ent)) {
            this.falling = false;
            this.platform = ent;
            if (this.y > ent.y) this.y = ent.y - ent.height;
        }
        if (ent instanceof Spikes && this.collision(ent)) {
            this.takeDamage();
            this.jumping = true;
        }

        //If Megaman hits a platform from below and he is jumping, will make him start to fall
        if (this != ent && ent instanceof Platform && this.collisionAbove(ent)) {
            this.jumping = false;
            this.jumpAnimation.elapsedTime = 0;
            this.falling = true;
        }
    }

    //Things Mega Man can do when alive
    if (!this.dying) {

        //When the game can't scroll anymore, Megaman will now be able to move 
        if (!this.game.screenScrolling && this.game.right && !this.game.left && this.x + this.width < 3330) this.x += 3;
        if (!this.game.screenScrolling && this.game.left && !this.game.right && this.x > 0) this.x -= 3;
        if (this.x > 350 && this.x < 450) this.game.screenScrolling = true;
        if (!this.game.scrolling) this.game.screenScrolling = false;

        //Shooting code
        if (this.game.shooting && this.canShoot) {
            var projectile = new Projectile(this.game, this);
            this.facingRight ? projectile.setDX(5) : projectile.setDX(-5);
            this.game.addEntity(projectile);
            this.canShoot = false;
            var that = this;
            setTimeout(function () { // This should be delay only once, not repeating interval.
                that.canShoot = true;
            }, this.shootFrequency);
        }

        // Will be used when Mega Man is colliding with a ladder entity.
        if (!this.game.shooting && this.ladder && this.collision(this.ladder)) {
            if (this.game.up && !this.game.down) this.y -= 5;
            if (this.game.down && !this.game.up && (!this.platform || this.y < this.ladder.y)) this.y += 5;
        }

        //If spacebar is hit and megaman isn't already jumping or falling will initiate new jump.
        if (this.game.space && !this.falling && !this.jumping) {
            this.jumping = true;
        }

        if (this.jumping) {
            if (this.jumpAnimation.isDone()) {
                this.jumpAnimation.elapsedTime = 0;
                this.jumping = false;
                if (this.y < this.platform.y - this.platform.height) this.falling = true;
            }
            this.y -= 7 - this.jumpAnimation.elapsedTime * 10;
        }
    }

    if (this.ladder && this.collision(this.ladder)) this.falling = false;

    Entity.prototype.update.call(this);
}

//Order of animations determines which take priority. For example, if Mega Man is dying then his
//death animation will play because that is the first check that occurs. 
MegaMan.prototype.draw = function (ctx) {
    if (this.dying) {
        this.currentAnimation = this.explosionAnimation;
    } else if (this.jumping) {
        this.currentAnimation = this.jumpAnimation;
    } else if (this.falling && this.facingRight && !this.game.shooting) {
        this.currentAnimation = this.fallRightAnimation;
    } else if (this.falling && !this.facingRight && !this.game.shooting) {
        this.currentAnimation = this.fallLeftAnimation;
    } else if (this.game.right && this.game.down && !this.game.left) {
        this.currentAnimation = this.rollRightAnimation;
    } else if (this.game.left && this.game.down && !this.game.right) {
        this.currentAnimation = this.rollLeftAnimation;
    } else if ((this.falling || this.jumping) && this.game.shooting && this.facingRight) {
        this.currentAnimation = this.fallAndShootRightAnimation;
    } else if ((this.falling || this.jumping) && this.game.shooting && !this.facingRight) {
        this.currentAnimation = this.fallAndShootLeftAnimation;
    } else if (this.game.right && !this.game.left && this.game.shooting) {
        this.currentAnimation = this.runRightAndShootAnimation;
    } else if (this.game.left && !this.game.right && this.game.shooting) {
        this.currentAnimation = this.runLeftAndShootAnimation;
    } else if (this.game.shooting && this.facingRight) {
        this.currentAnimation = this.shootRightAnimation;
    } else if (this.game.shooting && !this.facingRight) {
        this.currentAnimation = this.shootLeftAnimation;
    } else if ((this.game.up || this.game.down || this.game.right || this.game.left) && this.ladder && this.collision(this.ladder)) {
        this.currentAnimation = this.climbAnimation;
    } else if (this.ladder && this.collision(this.ladder) && !this.game.up) {
        this.currentAnimation = this.stillClimbAnimation;
    } else if (this.game.down && this.facingRight) {
        this.currentAnimation = this.crouchAnimation;
    } else if (this.game.down && !this.facingRight) {
        this.currentAnimation = this.crouchLeftAnimation;
    } else if (this.game.right && !this.game.left) {
        this.currentAnimation = this.runRightAnimation;
    } else if (this.game.left && !this.game.right) {
        this.currentAnimation = this.runLeftAnimation;
    } else if (this.game.punching) {
        this.currentAnimation = this.punchAnimation;
    } else if (this.facingRight) {
        this.currentAnimation = this.stillAnimation;
    } else {
        this.currentAnimation = this.faceLeftAnimation;
    }

    this.currentAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y, this.scaleBy);
    this.width = this.currentAnimation.frameWidth * this.scaleBy;
    this.height = this.currentAnimation.frameHeight * this.scaleBy;
    Entity.prototype.draw.call(this);
}

//Checks to see if Mega Man is colliding with another object based on width, height, and x, y coordinates.
//Uses rectangular collisions.
MegaMan.prototype.collision = function(other) {
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

MegaMan.prototype.collisionAbove = function(other) {
    var collisionX = (this.x >= other.x && this.x <= other.x + other.width)
                        || (this.x + this.width >= other.x && this.x + this.width <= other.x + other.width)
                        || (this.x >= other.x && this.x + this.width <= other.x + other.width)
                        || (other.x >= this.x && other.x + other.width <= this.x + this.width);
    var collisionY = (this.y - this.height >= other.y - other.height && this.y - this.height <= other.y);
    if (collisionY && collisionX) console.log("Collision Above!!!");
    return collisionX && collisionY;
}

MegaMan.prototype.collisionRight = function(other) {
    var collisionY = (this.y <= other.y && this.y >= other.y - other.height)
                        || (this.y - this.height <= other.y && this.y - this.height >= other.y - other.height)
                        || (this.y - this.height >= other.y - other.height && this.y <= other.y)
                        || (other.y <= this.y && other.y - other.height >= this.y - this.height);
    var collisionX = (this.x + this.width >= other.x && this.x + this.width <= other.x + other.width);
    if (collisionY && collisionX) console.log("Collision Right");
    return collisionX && collisionY;
}

MegaMan.prototype.takeDamage = function() {
    var that = this;
    if (!this.invincible) {
        this.health--;
        this.invincible = true;
        setTimeout(function() {
            that.invincible = false;
        }, 1000);
    }
    this.ouch.play();
    console.log("MegaMan has been hit! His health is at " + this.health);
}