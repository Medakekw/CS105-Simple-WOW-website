// Variables to store player and game state
let player;
let enemiesDefeated = 0;

// Function to initialize the game
function initializeGame() {
    document.getElementById('gameArea').innerHTML = `
        <div class="character player">
            <img src="images/${player.image}" alt="${player.class}">
            <h3>${player.class.toUpperCase()}</h3>
            <div class="health-bar"><span style="width: 100%"></span></div>
            <p>HP: <span id="playerHp">${player.currentHp}</span>/${player.hp}</p>
        </div>
        <div class="enemy" id="enemyArea"></div>
        <div class="battle-log" id="battleLog"></div>
        <button onclick="startBattle()">Start Battle</button>
    `;
}

// Function to select a class and start the game
function selectClass(selectedClass) {
    const classes = {
        warrior: { hp: 200, damage: 20, dexterity: 10, intellect: 5, heal: 0, image: 'warrior.png' },
        mage: { hp: 100, damage: 40, dexterity: 5, intellect: 30, heal: 0, image: 'mage.png' },
        hunter: { hp: 150, damage: 30, dexterity: 25, intellect: 10, heal: 0, image: 'hunter.png' },
        paladin: { hp: 180, damage: 25, dexterity: 15, intellect: 20, heal: 0.1, image: 'paladin.png' },
        deathknight: { hp: 1000, damage: 100, dexterity: 100, intellect: 100, heal: 1, image: 'deathknight.png' } // New Class with Maximum Stats
    };

    player = { ...classes[selectedClass], class: selectedClass, currentHp: classes[selectedClass].hp };
    document.getElementById('classSelection').style.display = 'none';
    initializeGame();
}

function startBattle() {
    if (enemiesDefeated >= 10) {
        document.getElementById('battleLog').innerHTML = '<p>You have defeated all enemies! Victory!</p>';
        return;
    }

    let enemy = generateEnemy();
    const enemyTitle = enemiesDefeated === 9 ? 'BOSS' : `Enemy ${enemiesDefeated + 1}`; // Display "BOSS" for the 10th enemy

    document.getElementById('enemyArea').innerHTML = `
        <img src="images/${enemy.image}" alt="${enemyTitle}">
        <h3>${enemyTitle}</h3>
        <div class="health-bar"><span style="width: 100%"></span></div>
        <p>HP: <span id="enemyHp">${enemy.hp}</span>/${enemy.hp}</p>
    `;

    battle(enemy);
}
// Function to generate an enemy
function generateEnemy() {
    if (enemiesDefeated === 9) {  // Check if it's the 10th enemy (Boss)
        return {
            hp: 500, // Boss has higher health
            damage: 50, // Boss has higher damage
            currentHp: 500,
            image: 'boss.png'  // Boss image
        };
    } else {
        const baseHp = 100 + (enemiesDefeated * 20);
        const damage = 10 + (enemiesDefeated * 5);
        const images = ['enemy1.png', 'enemy2.png', 'enemy3.png', 'enemy4.png', 'enemy5.png','enemy6.png','enemy7.png','enemy8.png','enemy9.png']; 
        const enemyImage = images[enemiesDefeated % 4]; // Cycle through the enemy images

        return { hp: baseHp, damage: damage, currentHp: baseHp, image: enemyImage };
    }
}

// Function to handle battle logic
function battle(enemy) {
    let log = document.getElementById('battleLog');
    log.innerHTML = '';

    const battleInterval = setInterval(() => {
        if (player.currentHp <= 0) {
            clearInterval(battleInterval);
            log.innerHTML += '<p>You have been defeated!</p>';
            showRestartButton();
            return;
        }

        if (enemy.currentHp <= 0) {
            clearInterval(battleInterval);
            enemiesDefeated++;
            player.currentHp = Math.min(player.hp, player.currentHp + (player.heal * player.hp));
            log.innerHTML += `<p>Enemy defeated! ${10 - enemiesDefeated} enemies to go.</p>`;
            if (enemiesDefeated < 10) {
                startBattle();
            } else {
                log.innerHTML += '<p>You have defeated the BOSS! Victory!</p>';
                document.getElementById('gameArea').innerHTML += `<h3>Victory!</h3>`;
            }
            return;
        }

        const playerDamage = calculateDamage(player.damage, player.dexterity);
        enemy.currentHp -= playerDamage;
        document.getElementById('enemyHp').innerText = Math.max(0, enemy.currentHp);
        document.querySelector('#enemyArea .health-bar span').style.width = `${(enemy.currentHp / enemy.hp) * 100}%`;
        log.innerHTML += `<p>You hit the enemy for ${playerDamage} damage.</p>`;
        document.querySelector('.player img').classList.add('attack-animation');

        const enemyDamage = calculateDamage(enemy.damage);
        player.currentHp -= enemyDamage;
        document.getElementById('playerHp').innerText = Math.max(0, player.currentHp);
        document.querySelector('.player .health-bar span').style.width = `${(player.currentHp / player.hp) * 100}%`;
        log.innerHTML += `<p>The enemy hits you for ${enemyDamage} damage.</p>`;
        document.querySelector('.enemy img').classList.add('attack-animation');

        log.scrollTop = log.scrollHeight;

        setTimeout(() => {
            document.querySelector('.player img').classList.remove('attack-animation');
            document.querySelector('.enemy img').classList.remove('attack-animation');
        }, 500);
    }, 1000);
}

// Function to calculate damage with potential critical hits
function calculateDamage(baseDamage, dexterity = 0) {
    const critChance = Math.min(100, dexterity);
    const isCrit = Math.random() * 100 < critChance;
    return isCrit ? baseDamage * 1.5 : baseDamage;
}

// Function to show the restart button when player loses
function showRestartButton() {
    document.getElementById('gameArea').innerHTML += `
        <div class="restart-section">
            <button onclick="restartGame()">Restart Game</button>
        </div>
    `;
}

// Function to restart the game
function restartGame() {
    player = null;
    enemiesDefeated = 0;
    document.getElementById('classSelection').style.display = 'block';
    document.getElementById('gameArea').innerHTML = '';
}
