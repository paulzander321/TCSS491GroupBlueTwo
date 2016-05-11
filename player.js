//Creates new player who will be controlled by user.
function MegaMan(game, x, y, scaleBy) {
    this.scaleBy = scaleBy;
    this.facingRight = true;
    this.shootingCount = 25;
    this.health = 5;
    this.jumping = false;
    this.doubleJumping = false;
    this.movingUp = false;
    this.dying = false;
    this.ground = y;
    this.falling = true;
    this.ladder = null;
    this.jumpOrig = y;
    this.jumpCount = 0;
    this.platform = null;

    this.deathSound = new Audio("atomic-bomb.mp3");
    this.ouch = new Audio("ouch.mp3");
    this.scream = new Audio("willhelm.mp3");
    this.deathSoundStarted = false;

    this.runRightAnimation = new Animation(ASSET_MANAGER.getAsset("./img/MegaSheet.gif"), 558, 1192, 46, 39, 0.1, 10, true, false);
    this.runLeftAnimation = new Animation(ASSET_MANAGER.getAsset("./img/MegaSheet.gif"), 558, 1243, 46, 39, 0.1, 10, true, false);
    this.jumpAnimation = new Animation(ASSET_MANAGER.getAsset("./img/MegaSheet.gif"), 4, 1254, 55, 74, 0.1, 8, false, true);
    this.crouchAnimation = new Animation(ASSET_MANAGER.getAsset("./img/MegaSheet.gif"), 4, 1183, 30, 27, 1, 1, true, false);
    this.crouchLeftAnimation = new Animation(ASSET_MANAGER.getAsset("./img/MegaSheet.gif"), 6, 1117, 30, 27, 0.1, 1, true, true);
    this.climbAnimation = new Animation(ASSET_MANAGER.getAsset("./img/MegaSheet.gif"), 5, 1030, 28, 52, 0.15, 6, true, true);
    this.walkForwardAnimation = new Animation(ASSET_MANAGER.getAsset("./img/MegaSheet.gif"), 554, 978, 23, 38, 0.1, 8, true, false);
    this.rollRightAnimation = new Animation(ASSET_MANAGER.getAsset("./img/MegaSheet.gif"), 4, 1183, 30, 27, 0.1, 8, true, false);
    this.rollLeftAnimation = new Animation(ASSET_MANAGER.getAsset("./img/MegaSheet.gif"), 6, 1117, 30, 27, 0.1, 8, true, true);
    this.stillAnimation = new Animation(ASSET_MANAGER.getAsset("./img/MegaSheet.gif"), 4, 56, 35, 41, 0.2, 6, true, false);
    this.faceLeftAnimation = new Animation(ASSET_MANAGER.getAsset("./img/MegaSheet.gif"), 315, 1035, 35, 41, 0.2, 6, true, false);
    this.punchAnimation = new Animation(ASSET_MANAGER.getAsset("./img/MegaSheet.gif"), 549, 1136, 43, 42, 0.1, 7, true, false);
    this.shootAnimation = new Animation(ASSET_MANAGER.getAsset("./img/MegaSheet.gif"), 900, 980, 56, 39, .15, 3, true, false);
    this.explosionAnimation = new Animation(ASSET_MANAGER.getAsset("./img/explosion.png"), 0, 0, 96, 96, .15, 15, false, false);
    
    this.currentAnimation = this.stillAnimation;
    this.width = this.stillAnimation.frameWidth * this.scaleBy;
    this.height = this.stillAnimation.frameHeight * this.scaleBy;
    Entity.call(this, game, x, y);
}

MegaMan.prototype = new Entity();
MegaMan.prototype.constructor = MegaMan;

MegaMan.prototype.update = function() {

    //Mega Man will die when health below 1
    if (this.health < 1) {
        this.dying = true;
        if (!this.deathSoundStarted) {
            this.deathSoundStarted = true;
            this.deathSound.play();
            this.scream.play();
        }
    }

    if (this.platform && this.x > this.platform.x + this.platform.width) this.falling = true; 
    if (this.platform && this.x + this.currentAnimation.frameWidth * this.scaleBy < this.platform.x) this.falling = true;
    if (this.y > this.game.ctx.canvas.height) {
        this.removeFromWorld = true;
        this.game.playerCount--;
    }

    if (this.falling) this.y+=5;

    //Once death animation done Mega Man removed from world.
    if (this.dying && this.explosionAnimation.isDone()) {
        this.removeFromWorld = true;
        console.log("Megaman has fallen...");
        this.game.playerCount--;
    }

    //Check for collisions, when done will call different functions based on what
    //Mega Man is colliding with.
    for (var i = 0; i < this.game.entities.length; i++) {
        var ent = this.game.entities[i];
        if (this != ent && this.collision(ent) && (ent instanceof Shovel || ent instanceof Projectile)) {
            ent.removeFromWorld = true;
            this.health--;
            this.ouch.play();
            console.log("MegaMan has been hit! His health is at " + this.health);
        } else if (ent instanceof Jawa && this.collision(ent)) {
            // this.health--;
            // this.ouch.play();
        } else if (ent instanceof Ladder && this.collision(ent)) {
            this.ladder = ent;
            console.log("Near ladder!");
        } else if (ent instanceof Platform && this.collision(ent)) {
            this.ground = ent.y - ent.height;
            this.falling = false;
            this.platform = ent;
        }
    }

    //Things Mega Man can do when alive
    if (!this.dying) {
        if (this.game.shooting && this.shootingCount % 50 == 0) {
            var shovel = new Shovel(this.game, this, 5, 0);
            this.game.addEntity(shovel);
            this.shovelCount++;
            this.shootingCount++;
        } else if (this.game.shooting) {
            this.shootingCount++;
        }

        if (this.game.left && !this.game.right && !this.game.shooting) {
            // this.x -= 5;
            if (this.x < -48) {
                this.x = 848;
            }
        }
        if (this.game.right && !this.game.left && !this.game.shooting) {
            // this.x += 5;
            if (this.x > 848) {
                this.x = -48;
            }
        }

        if (this.y == this.ground) this.jumpCount = 0;

        // Will be used when Mega Man is colliding with a ladder entity.
        if (this.game.up && !this.game.shooting && this.ladder) {
            if (this.y > this.currentAnimation.frameHeight * this.scaleBy) {
                this.y -= 5;
            }
        }

        if (this.game.space) {
            this.jumping = true;
            this.jumpOrig = this.y;
        }

        if (this.jumping) {
            if (this.jumpAnimation.isDone()) {
                this.jumpAnimation.elapsedTime = 0;
                this.jumping = false;
                if (this.y + this.height < this.ground) this.falling = true;
            }
            var jumpDistance = this.jumpAnimation.elapsedTime / this.jumpAnimation.totalTime;
            var totalHeight = 150;

            if (jumpDistance > 0.5)
                jumpDistance = 1 - jumpDistance;

            var height = totalHeight*(-4 * (jumpDistance * jumpDistance - jumpDistance));
            this.y = this.ground - height;
        }
    }

    if (this.game.shooting) {
        this.game.playerCanMove = false;
    } else {
        this.game.playerCanMove = true;
    }

    Entity.prototype.update.call(this);
}

//Order of animations determines which take priority. For example, if Mega Man is dying then his
//death animation will play because that is the first check that occurs. 
MegaMan.prototype.draw = function (ctx) {
    if (this.dying) {
        this.currentAnimation = this.explosionAnimation;
    } else if (this.jumping) {
        this.currentAnimation = this.jumpAnimation;
    } else if (this.game.right && this.game.down && !this.game.left) {
        this.currentAnimation = this.rollRightAnimation;
        this.facingRight = true;
    } else if (this.game.left && this.game.down && !this.game.right) {
        this.currentAnimation = this.rollLeftAnimation;
        this.facingRight = false;
    } else if (this.game.shooting) {
        this.currentAnimation = this.shootAnimation;
    } else if (this.game.up) {
        this.currentAnimation = this.climbAnimation;
    } else if (this.game.down && this.facingRight) {
        this.currentAnimation = this.crouchAnimation;
    } else if (this.game.down && !this.facingRight) {
        this.currentAnimation = this.crouchLeftAnimation;
    } else if (this.game.right && !this.game.left) {
        this.currentAnimation = this.runRightAnimation;
        this.facingRight = true;
    } else if (this.game.left && !this.game.right) {
        this.currentAnimation = this.runLeftAnimation;
        this.facingRight = false;
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