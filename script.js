            const resultElement = document.querySelector('.text-result');
            const playerElement = document.querySelector('.playerPick');
            const computerElement = document.querySelector('.computerPick');
            const winsElement = document.querySelector('.text-wins');
            const lossesElement = document.querySelector('.text-losses');
            const tiesElement = document.querySelector('.text-ties');
            const clickSound = new Audio('assets/sounds/sfx/click.mp3');
            clickSound.volume = 0.5;


            let score = JSON.parse(localStorage.getItem('score')) || {
            wins: 0,
            losses: 0,
            ties: 0
            };

            function playGame(playerMove) {
                clickSound.play();
                const computerMove = pickComputerMove();
                let result = '';

                if (playerMove === 'scissors') {
                    if (computerMove === 'rock') {
                        result = 'You lose.';
                    }
                    else if (computerMove === 'paper') {
                        result = 'You win.';
                    }
                    else if (computerMove === 'scissors') {
                        result = 'Tie.';
                    }
                }

                else if (playerMove === 'paper') {
                    if (computerMove === 'rock') {
                        result = 'You win.';
                    }
                    else if (computerMove === 'paper') {
                        result = 'Tie.';
                    }
                    else if (computerMove === 'scissors') {
                        result = 'You lose.';
                    }
                }
                
                else if (playerMove === 'rock') {
                    if (computerMove === 'rock') {
                        result = 'Tie.';
                    }
                    else if (computerMove === 'paper') {
                        result = 'You lose.';
                    }
                    else if (computerMove === 'scissors') {
                        result = 'You win.';
                    }
                }
                
                if (result === 'You win.') {
                    score.wins += 1;
                    resultElement.innerText = 'You win!!'
                }
                else if (result === 'You lose.') {
                    score.losses += 1;
                    resultElement.innerText = 'You lose...'
                }
                else {
                    score.ties += 1;
                    resultElement.innerText = "It's a tie."
                }

                playerElement.innerHTML = `You <img src="assets/images/${playerMove}-emoji.png" class="move-icon">`;
                computerElement.innerHTML = `<img src="assets/images/${computerMove}-emoji.png" class="move-icon"> Computer`;

                winsElement.innerText = score.wins;
                lossesElement.innerText = score.losses;
                tiesElement.innerText = score.ties;

                // alert(`You picked ${playerMove}. Computer picked ${computerMove}. ${result}\nWins: ${score.wins} Lose: ${score.losses} Tie: ${score.ties}`);

                localStorage.setItem('score', JSON.stringify(score));
            }

            function pickComputerMove() {
                const randomNumber = Math.random();

                let computerMove = '';

                if (randomNumber >= 0 && randomNumber < 1/3) {
                    computerMove = `rock`;
                }
                else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
                    computerMove = `paper`;
                }
                else if (randomNumber >= 2 / 3 && randomNumber < 1) {
                    computerMove = `scissors`;
                }
                return computerMove;
            }

            function resetScore() {
                clickSound.play();
                score.wins = 0;
                score.losses = 0;
                score.ties = 0;
                localStorage.removeItem('score');

                winsElement.innerText = 0;
                lossesElement.innerText = 0;
                tiesElement.innerText = 0;

                resultElement.innerText = '';
                playerElement.innerText = ``;
                computerElement.innerText = ``;
            }

            winsElement.innerText = score.wins;
            lossesElement.innerText = score.losses;
            tiesElement.innerText = score.ties;

            const bgMusic = document.querySelector('.bg-music');
            bgMusic.volume = 0.1;
            const musicToggleBtn = document.querySelector('.music-toggle');

            musicToggleBtn.addEventListener('click', () => {
                if (bgMusic.paused) {
                    bgMusic.play();
                    musicToggleBtn.textContent = '🔊';
                } else {
                    bgMusic.pause();
                    musicToggleBtn.textContent = '🔇';
                }
            });