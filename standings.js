function sleep(ms) {  
    return new Promise(resolve => setTimeout(resolve, ms));  
} 


document.addEventListener('DOMContentLoaded', async function () {
    await sleep(100);

    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    window.addEventListener('resize', () => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }); 
    window.addEventListener('fullscreenchange', () => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }); 

    const inputBox = document.getElementById('input-box');
    const fileInput = document.getElementById('input-file');
  
    inputBox.addEventListener('click', function () {
        fileInput.click();
    });
  
    fileInput.addEventListener('change', async function () {
        const file = fileInput.files[0];
        if (file) {
            console.log('Uploaded file:', file.name);
            let fr = new FileReader();
            fr.onload = receivedText;
            fr.readAsText(file);

            function receivedText() {
                console.log(fr.result);
                buildStandings(fr.result)
            }
        }
    });
  
    inputBox.addEventListener('dragover', function (e) {
        e.preventDefault();
        inputBox.classList.add('dragover');
    });
  
    inputBox.addEventListener('dragleave', function () {
        inputBox.classList.remove('dragover');
    });
  
    inputBox.addEventListener('drop', async function (e) {
        e.preventDefault();
        inputBox.classList.remove('dragover');
        const file = e.dataTransfer.files[0];
        if (file) {
            console.log('Uploaded file:', file.name);
            let fr = new FileReader();
            fr.onload = receivedText;
            fr.readAsText(file);

            function receivedText() {
                console.log(fr.result);
                buildStandings(fr.result)
            }
        }
    });
});

function buildStandings(raw) {
    const inputContainer = document.getElementById('input-container');
    const standingsContainer = document.getElementById('standings-container');
    const tables = document.getElementsByTagName('table');
    
    inputContainer.classList.add('hidden');
    standingsContainer.classList.remove('hidden');

    var rows = raw.split('\n');
    var headers = rows[0].split(',');
    const len = rows.length - 1;
    var data = {};
    
    headers.forEach((h) => {
        data[h] = [];
    });

    rows.slice(1).forEach((r) => {
        r.split(',').forEach((x, i) => {
            data[headers[i]].push(x);
        })
    })

    const lens = [Math.ceil(len/6), Math.ceil(len/6), Math.ceil(len/6), Math.ceil(len/6), Math.ceil(len/6), len - (5*Math.ceil(len/6))];
    const lensPSA = [lens[0]];
    lens.slice(1).forEach((x, i) => {lensPSA.push(lensPSA[i]+x)});

    var i = 0;
    var j = 0;
    while (j < lensPSA[i]) {
        rank = data["Rank"][j];
        player = trim(data["Player"][j]);
        console.log(rank, player);
        const tableRow = document.createElement("tr");
        const rankCell = document.createElement("td"); rankCell.innerHTML = rank; tableRow.appendChild(rankCell);
        const playerCell = document.createElement("td"); playerCell.innerHTML = player; tableRow.appendChild(playerCell);

        tables[i].appendChild(tableRow);

        j++;
        if (j == lensPSA[i] && i < 5) i++;
    }

    console.log(data);
    
}

function trim(str) {
    if (str == "BYE") return str;
    var arr = str.split(' ');
    return `${arr[0]} ${arr[1][0]}.`;
}

// MAY NEED TO TRIM GOOGLE SHEETS NAMES BEFORE IF NAMES SHOW UP WRONG