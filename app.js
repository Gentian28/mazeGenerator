const notVisited = [];
const visited = [];
const mazeContainer = document.getElementById('maze-container');
let col = document.getElementsByTagName('td');
let horizontalLenght = document.getElementsByName('horizontal-length')[0].value;
let verticalLenght = document.getElementsByName('vertical-length')[0].value;
let xIndex = document.getElementsByName('x-index')[0].value;
let yIndex = document.getElementsByName('y-index')[0].value;
const generate = document.getElementById('generate');
let message = document.getElementById('message');
let maze = {};

function generateMazeData(height, length) {
    let maze = {};
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < length; j++) {
            notVisited.push(`${i},${j}`);
            maze[`${i},${j}`] = { visited: false }
        }
    }
    return maze;
}

function generateVisualMaze(height, length) {
    const tbody = document.createElement('tbody');
    for (let i = 0; i < height; i++) {
        const tr = document.createElement('tr');
        for (let j = 0; j < length; j++) {
            const td = document.createElement('td');
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
    return tbody;
}

const randomProperty = function (obj) {
    var keys = Object.keys(obj)
    return obj[keys[keys.length * Math.random() << 0]];
};

function findRoute(x, y, height, width) {
    setTimeout(() => {
        x = Number(x);
        y = Number(y);
        height = Number(height);
        width = Number(width);
        col[x * width + y].style.backgroundColor = '#007bff';
        let current = [x, y];
        maze[`${x},${y}`].visited = true;
        const potential = {
            top: [x - 1, y],
            bottom: [x + 1, y],
            right: [x, y + 1],
            left: [x, y - 1]
        }
        if (notVisited.includes(String(current))) {
            const item = notVisited.indexOf(String(current));
            notVisited.splice(item, 1)
        }
        let neighbours = [];
        if (potential.top[0] > -1 && maze[`${potential.top[0]},${potential.top[1]}`].visited == false) {
            neighbours.push([x - 1, y]);
        }
        if (potential.left[1] > -1 && maze[`${potential.left[0]},${potential.left[1]}`].visited == false) {
            neighbours.push([x, y - 1]);
        }
        if (potential.bottom[0] < height && maze[`${potential.bottom[0]},${potential.bottom[1]}`].visited == false) {
            neighbours.push([x + 1, y]);
        }
        if (potential.right[1] < width && maze[`${potential.right[0]},${potential.right[1]}`].visited == false) {
            neighbours.push([x, y + 1]);
        }

        if (neighbours.length >= 1) {
            visited.push(current);
            const next = randomProperty(neighbours)
            if (current[0] < next[0]) {
                col[current[0] * width + current[1]].style.borderBottom = '1px solid #007bff';
                col[next[0] * width + next[1]].style.borderTop = '1px solid #007bff';
            }
            if (current[1] < next[1]) {
                col[current[0] * width + current[1]].style.borderRight = '1px solid #007bff';
                col[next[0] * width + next[1]].style.borderLeft = '1px solid #007bff';
            }
            if (current[0] > next[0]) {
                col[current[0] * width + current[1]].style.borderTop = '1px solid #007bff';
                col[next[0] * width + next[1]].style.borderBottom = '1px solid #007bff';
            }
            if (current[1] > next[1]) {
                col[current[0] * width + current[1]].style.borderLeft = '1px solid #007bff';
                col[next[0] * width + next[1]].style.borderRight = '1px solid #007bff';
            }
            current = next;
            col[current[0] * width + current[1]].style.backgroundColor = 'yellow';
        } else {
            if (notVisited.length > 0) {
                const prev = visited[visited.length - 1];
                current = prev;
                col[current[0] * width + current[1]].style.backgroundColor = 'yellow';
                visited.pop();
            }
        }

        if (notVisited.length > 0) {
            generate.disabled = true;
            return findRoute(current[0], current[1], height, width);
        } else {
            generate.disabled = false;
            message.classList.add('alert', 'alert-success');
            message.classList.remove('alert-info');
            message.innerHTML = 'Maze generated';
        }
    }, 20);
}

generate.onclick = function () {
    mazeContainer.innerHTML = '';
    message.classList.remove('alert-success');
    message.classList.add('alert', 'alert-info');
    message.innerHTML = 'Generating maze';
    horizontalLenght = document.getElementsByName('horizontal-length')[0].value;
    verticalLenght = document.getElementsByName('vertical-length')[0].value;
    xIndex = document.getElementsByName('x-index')[0].value;
    yIndex = document.getElementsByName('y-index')[0].value;
    mazeContainer.appendChild(generateVisualMaze(verticalLenght, horizontalLenght));
    maze = generateMazeData(verticalLenght, horizontalLenght);
    console.log(xIndex, yIndex)
    findRoute(xIndex, yIndex, verticalLenght, horizontalLenght);
}
