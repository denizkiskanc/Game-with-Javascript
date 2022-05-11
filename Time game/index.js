const game = {
    player: 'Player ',
    score: 0,
    time: null,
    action: () => {
        game.time = setTimeout(() => {
            game.over();
          }, 3000);
    },
    over: () => {
        const lose = document.getElementById('lose');
        lose.style.display = "block";
    },
    clear: () => {
        clearTimeout(game.time);
    },
    increment: () => {
        game.score++;
        if (game.score == 2 ) {
            const win = document.getElementById('win');
            win.style.display = "block";
        }
    }

}