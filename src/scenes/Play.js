class Play extends Phaser.Scene{
    constructor() {
        super('playScene')
    }

    create(){
        //place tile sprite
        this.starfield = this.add.tileSprite(0 ,0 ,640 , 480, 'starfield').setOrigin(0,0)

        // green UI backround
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0,0)
        //white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0)
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0)
        this.add.rectangle(0,0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0)
        this.add.rectangle(game.config.width- borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0)
        
        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0)

        // add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0,0)
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2,'spaceship', 0, 20).setOrigin(0,0)
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship',0 ,10).setOrigin(0,0)
        //define keys
        keyFIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        }

    update(){
        this.starfield.tilePositionX -= 4
        this.p1Rocket.update()

        this.ship01.update() //update spaceships
        this.ship02.update()
        this.ship03.update()

        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)){
            //console.log('kaboom ship 03')
            this.p1Rocket.reset()
            //this.ship03.reset()
            this.shipExplode(this.ship03)
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)){
            //console.log('kaboom ship 02')
            this.p1Rocket.reset()
            //this.ship02.reset()
            this.shipExplode(this.ship02)
        }
        if(this.checkCollision(this.p1Rocket, this.ship01)){
            //console.log('kaboom ship 01')
            this.p1Rocket.reset()
            //this.ship01.reset()
            this.shipExplode(this.ship01)
        }
    }

    checkCollision(rocket,ship){
        // simple AABB checking
        if(rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x && rocket.y < ship.y + ship.height && rocket.height + rocket.y > ship.y) {
                return true
            } else {
                return false
            }
    }

    shipExplode(ship){
        // temp hide ship
        ship.alpha = 0
        //create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0,0);
        boom.anims.play('explode')              // play explosion animation
        boom.on('animationcomplete', () =>{     // callback after anim completes
            ship.reset()                        // reset ship position
            ship.aplha = 1                      // make ship visible
            boom.destroy()                      // remove explosion sprite
        } )
    }
}