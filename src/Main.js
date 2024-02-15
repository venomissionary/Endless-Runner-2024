/* Name: Steven Hernandez  
   Game Title: Rocket Jumper
   Hours spent: 25+ hours spent 


   Creative tilt: 
   1.did you do something technically interesting? 
   Are you particularly proud of a programming technique you implemented? 
   Did you look beyond the class examples and learn how to do something new? (1)
   
   - I did my best to implement collision detection with Phaser Arcade physics from watching a couple youtube videos with the coins and spikes. 

   2. Do you have a great visual style? 
   Does it use music or art that you're particularly proud of? 
   Are you trying something new or clever with the endless runner form? (1)

   - I wanted to add a school notepad theme to it, 
   Made the game feel like a you're a kid drawing a rocket flying through the notebook rather than the air just because I used to doodle from time to time. 
   
   Use multiple Scene classes (dictated by your game's style) (1)
   - Main
   - Menu
   - Play
   
   Properly transition between Scenes and allow the player to restart w/out having to reload the page (1)
   - All scenes can be restarted without refreshing the page. 
   
   Include in-game instructions using text or other means (e.g., tooltips, tutorial, diagram, etc.) (1)
   Have some form of player input/control appropriate to your game design (1)
   
   - Left and right arrow keys to move Rocket. 
   - Spacebar to start the run
   
   Include one or more animated characters that use a texture atlas* (1)
   
   - Simulate scrolling with a tileSprite (or equivalent means) (1)
   - Clouds and Notebook tile sprites scrolling from top to down.
   
   Implement proper collision detection (via Arcade Physics or a custom routine) (1)
   
   - Have looping background music* (1)
   - Coins and spikes are intractable with the Rocket during gameplay. 
   
   Use a minimum of four sound effects for key mechanics, UI, and/or significant events appropriate to your game design (1)
   - Sound for clicking on menu
   - Sound for picking up coin
   - Sound for losing to a spike
   - Background music of a classroom 
   https://www.youtube.com/watch?v=UT47Cmbw5ew&list=LL&index=1
   
   Use randomness to generate escalating challenges, e.g. terrain, pickups, etc. (1)
   - Spikes and coins spawn randomly in a range throughout the play scene. 
   - Getting hit by a spike is game over
   - Collecting coins
   - Both fall faster as time goes on and the higher you go
   
   Include some metric of accomplishment that a player can improve over time, e.g., score, survival time, etc. (1)
   
   - Catch coins dropping from the air and beat your high score. 
   
   Be theoretically endless (1)
   
   - It is endless theoretically 
   
   Be playable for at least 15 seconds for a new player of low to moderate skill (1)
   - Every 20 seconds, the speed goes up
   
   Run without significant crashes or errors (1)
   - Seems fine to me
   
   Include in-game credits for all roles, assets, music, etc. (1)
   - Added credits panel
   
   Include one or more animated characters that use a texture atlas* (1)
   - Animated Coin

*/


let config = {
    type: Phaser.AUTO,
    PixelArt: true,
    width:  900,
    height: 900,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0},
            debug: false
        }
    },
    scene: [Menu, Play]
}

let game = new Phaser.Game(config)
