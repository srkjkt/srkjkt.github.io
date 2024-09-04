$(document).ready(() => {
    let grid = [];
    let score = 0;
    let monsters = [];
    let isGameActive = true;

    const monsterTypes = [
        { name: "물", color: "#3498db" },
        { name: "불", color: "#e74c3c", shape: "fire" },
        { name: "흙", color: "#8B4513" },
        { name: "바람", color: "#7FB3D5" },
    ];

    const createFireSVG = () =>
        // `
        //     <svg class="fire-monster" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        //         <path fill="#e74c3c" d="M50 10 C55 25 65 30 70 40 Q80 60 70 80 Q60 90 50 90 Q40 90 30 80 Q20 60 30 40 C35 30 45 25 50 10z">
        //             <animate attributeName="d" dur="1.5s" repeatCount="indefinite" values="
        //                 M50 10 C55 25 65 30 70 40 Q80 60 70 80 Q60 90 50 90 Q40 90 30 80 Q20 60 30 40 C35 30 45 25 50 10z;
        //                 M50 10 C60 25 70 30 75 40 Q85 60 75 80 Q65 90 50 90 Q35 90 25 80 Q15 60 25 40 C30 30 40 25 50 10z;
        //                 M50 10 C55 25 65 30 70 40 Q80 60 70 80 Q60 90 50 90 Q40 90 30 80 Q20 60 30 40 C35 30 45 25 50 10z"
        //             />
        //         </path>
        //     </svg>
        // `;
        `
      <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="125px" height="189.864px" viewBox="0 0 125 189.864" enable-background="new 0 0 125 189.864" xml:space="preserve">
          <path class="flame-main" fill="#F36E21" d="M76.553,186.09c0,0-10.178-2.976-15.325-8.226s-9.278-16.82-9.278-16.82s-0.241-6.647-4.136-18.465 c0,0,3.357,4.969,5.103,9.938c0,0-5.305-21.086,1.712-30.418c7.017-9.333,0.571-35.654-2.25-37.534c0,0,13.07,5.64,19.875,47.54 c6.806,41.899,16.831,45.301,6.088,53.985"/>
          <path class="flame-main one" fill="#F6891F" d="M61.693,122.257c4.117-15.4,12.097-14.487-11.589-60.872c0,0,32.016,10.223,52.601,63.123 c20.585,52.899-19.848,61.045-19.643,61.582c0.206,0.537-19.401-0.269-14.835-18.532S57.576,137.656,61.693,122.257z"/>
          <path class="flame-main two" fill="#FFD04A" d="M81.657,79.192c0,0,11.549,24.845,3.626,40.02c-7.924,15.175-21.126,41.899-0.425,64.998 C84.858,184.21,125.705,150.905,81.657,79.192z"/>
          <path class="flame-main three" fill="#FDBA16" d="M99.92,101.754c0,0-23.208,47.027-12.043,80.072c0,0,32.741-16.073,20.108-45.79 C95.354,106.319,99.92,114.108,99.92,101.754z"/>
          <path class="flame-main four" fill="#F36E21" d="M103.143,105.917c0,0,8.927,30.753-1.043,46.868c-9.969,16.115-14.799,29.041-14.799,29.041 S134.387,164.603,103.143,105.917z"/>
          <path class="flame-main five" fill="#FDBA16" d="M62.049,104.171c0,0-15.645,67.588,10.529,77.655C98.753,191.894,69.033,130.761,62.049,104.171z"/>
          <path class="flame" fill="#F36E21" d="M101.011,112.926c0,0,8.973,10.519,4.556,16.543C99.37,129.735,106.752,117.406,101.011,112.926z"/>
          <path class="flame one" fill="#F36E21" d="M55.592,126.854c0,0-3.819,13.29,2.699,16.945C64.038,141.48,55.907,132.263,55.592,126.854z"/>
          <path class="flame two" fill="#F36E21" d="M54.918,104.595c0,0-3.959,6.109-1.24,8.949C56.93,113.256,52.228,107.329,54.918,104.595z"/>
      </svg>                    
      `;

    const initGame = () => {
        grid = Array(4)
            .fill()
            .map(() => Array(4).fill(0));
        score = 0;
        monsters = [];
        isGameActive = true;
        addRandomTile();
        addRandomTile();
        renderGrid();
        renderMonsterArea();
        renderMonsters();
        $("#game-over").hide();
        updateScore();
        updateLowestMonster();
    };

    const addRandomTile = () => {
        const availableCells = [];
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (grid[i][j] === 0) {
                    availableCells.push({ x: i, y: j });
                }
            }
        }
        if (availableCells.length > 0) {
            const { x, y } =
                availableCells[
                    Math.floor(Math.random() * availableCells.length)
                ];
            grid[x][y] = Math.random() < 0.9 ? 2 : 4;
        }
    };

    const renderGrid = () => {
        $("#game-container").empty();
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                const $tile = $("<div>").addClass("tile");
                if (grid[i][j] !== 0) {
                    $tile.text(grid[i][j]).css({
                        "background-color": getTileColor(grid[i][j]),
                        color: grid[i][j] > 4 ? "#f9f6f2" : "#776e65",
                        "font-size": getFontSize(grid[i][j]),
                    });
                }
                $("#game-container").append($tile);
            }
        }
    };

    const renderMonsterArea = () => {
        $("#monster-area").empty();
        for (let i = 0; i < 16; i++) {
            for (let j = 0; j < 16; j++) {
                $("<div>").addClass("monster-tile").appendTo("#monster-area");
            }
        }
    };

    const getTileColor = (value) => {
        const colors = {
            2: "#eee4da",
            4: "#ede0c8",
            8: "#f2b179",
            16: "#f59563",
            32: "#f67c5f",
            64: "#f65e3b",
            128: "#edcf72",
            256: "#edcc61",
            512: "#edc850",
            1024: "#edc53f",
            2048: "#edc22e",
            4096: "#3c3a32",
            8192: "#2c2a24",
            16384: "#1c1a16",
            32768: "#0c0a08",
            65536: "#000000",
        };
        return colors[value] || "#000000";
    };

    const getFontSize = (value) => {
        const sizes = {
            2: "36px",
            4: "36px",
            8: "36px",
            16: "36px",
            32: "36px",
            64: "34px",
            128: "30px",
            256: "28px",
            512: "26px",
            1024: "24px",
            2048: "22px",
            4096: "20px",
            8192: "18px",
            16384: "16px",
            32768: "14px",
            65536: "12px",
        };
        return sizes[value] || "12px";
    };

    const moveLeft = () => {
        let moved = false;
        let mergeScore = 0;
        for (let i = 0; i < 4; i++) {
            let row = grid[i].filter((x) => x !== 0);
            let newRow = [];
            for (let j = 0; j < row.length; j++) {
                if (j < row.length - 1 && row[j] === row[j + 1]) {
                    newRow.push(row[j] * 2);
                    mergeScore += row[j] * 2;
                    j++;
                } else {
                    newRow.push(row[j]);
                }
            }
            while (newRow.length < 4) newRow.push(0);
            if (newRow.join(",") !== grid[i].join(",")) {
                moved = true;
            }
            grid[i] = newRow;
        }
        score += mergeScore;
        return { moved, mergeScore };
    };

    const rotate = (grid) =>
        grid[0].map((_, i) => grid.map((row) => row[i]).reverse());

    const move = (direction) => {
        if (!isGameActive) return;

        let rotations = 0;
        switch (direction) {
            case "ArrowUp":
                rotations = 3;
                break;
            case "ArrowRight":
                rotations = 2;
                break;
            case "ArrowDown":
                rotations = 1;
                break;
        }

        for (let i = 0; i < rotations; i++) {
            grid = rotate(grid);
        }

        const { moved, mergeScore } = moveLeft();

        for (let i = 0; i < (4 - rotations) % 4; i++) {
            grid = rotate(grid);
        }

        if (moved) {
            addRandomTile();
            renderGrid();
            updateScore();
            updateMonsters(mergeScore);
            spawnMonster();
            renderMonsters();
            updateLowestMonster();

            if (is2048GameOver() || isMonsterGameOver()) {
                endGame();
            }
        } else if (is2048GameOver()) {
            endGame();
        }
    };

    const is2048GameOver = () => {
        if (grid.some((row) => row.includes(0))) {
            return false;
        }

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (
                    (j < 3 && grid[i][j] === grid[i][j + 1]) ||
                    (i < 3 && grid[i][j] === grid[i + 1][j])
                ) {
                    return false;
                }
            }
        }

        return true;
    };

    const updateScore = () => {
        $("#score").text(`점수: ${score}`);
    };

    const spawnMonster = () => {
        const x = Math.floor(Math.random() * 16);
        const type =
            monsterTypes[Math.floor(Math.random() * monsterTypes.length)];
        const speed = Math.random() * (1 - 0.3) + 0.3;
        monsters.push({
            id: Date.now(),
            x,
            y: 0,
            hp: 100,
            type,
            speed,
            accumulatedSpeed: 0,
        });
    };

    const updateMonsters = (damage) => {
        monsters.forEach((monster) => {
            monster.accumulatedSpeed += monster.speed;
            while (monster.accumulatedSpeed >= 1) {
                monster.y += 1;
                monster.accumulatedSpeed -= 1;
            }
            monster.hp -= damage;
        });
        monsters = monsters.filter(
            (monster) => monster.hp > 0 && monster.y < 16
        );
    };

    const renderMonsters = () => {
        $(".monster").remove();

        monsters.forEach((monster) => {
            let $monster;
            if (monster.type.shape === "fire") {
                $monster = $(createFireSVG()).addClass("monster");
            } else {
                $monster = $("<div>")
                    .addClass("monster")
                    .css("background-color", monster.type.color);
            }

            $monster.css({
                "grid-column": monster.x + 1,
                "grid-row": Math.floor(monster.y) + 1,
            });

            const $hpBar = $("<div>")
                .addClass("hp-bar")
                .css("width", `${monster.hp}%`);

            $monster.append($hpBar);
            $("#monster-area").append($monster);
        });
    };

    const updateLowestMonster = () => {
        if (monsters.length === 0) {
            $("#lowest-monster").text("가장 아래 몬스터: 없음");
        } else {
            const lowestMonster = monsters.reduce((lowest, current) =>
                current.y > lowest.y ? current : lowest
            );
            $("#lowest-monster").text(
                `가장 아래 몬스터: (${lowestMonster.x}, ${Math.floor(
                    lowestMonster.y
                )})`
            );
        }
    };

    const isMonsterGameOver = () => {
        return monsters.some((monster) => monster.y >= 15);
    };

    const endGame = () => {
        isGameActive = false;
        $("#game-over")
            .css({
                display: "flex",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "400px",
                height: "400px",
                "background-color": "rgba(238, 228, 218, 0.73)",
                "z-index": "1000",
            })
            .show();
    };

    $(document).on("keydown", (event) => {
        if (
            ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(
                event.key
            )
        ) {
            event.preventDefault();
            if (isGameActive) {
                move(event.key);
            }
        }
    });

    $("#restart").on("click", initGame);

    initGame();
});
