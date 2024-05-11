document.addEventListener('DOMContentLoaded', function () {
    const leftArrow = document.getElementById('arrow-left');
    const rightArrow = document.getElementById('arrow-right');
    const images = document.querySelectorAll('#carousel-images > img');
    var mid = Math.floor((images.length + 1) / 2) - 1

    leftArrow.addEventListener('click', function() {
        mid = (mid - 1 + images.length) % images.length;
        updateImages();
    });

    rightArrow.addEventListener('click', function() {
        mid = (mid + 1) % images.length;
        updateImages();
    });

    function updateImages() {
        images.forEach((img) => {
            img.classList = "hidden";
        })

        images[mid].classList = "img-center";
        images[(mid+1) % images.length].classList = "img-mid-right";
        images[(mid-1 + images.length) % images.length].classList = "img-mid-left";
        images[(mid+2) % images.length].classList = "img-right";
        images[(mid-2 + images.length) % images.length].classList = "img-left";
        images[(mid+3) % images.length].classList = "hidden img-right";
        images[(mid-3 + images.length) % images.length].classList = "hidden img-left";
    }






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
                buildPairings(fr.result)
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
                buildPairings(fr.result)
            }
        }
    });
});

function buildPairings(raw) {
    const inputContainer = document.getElementById('input-container');
    const pairingsContainer = document.getElementById('pairings-container');
    const tables = document.getElementsByTagName('table');
    
    inputContainer.classList.add('hidden');
    pairingsContainer.classList.remove('hidden');

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

    const lens = [Math.ceil(len/3), Math.ceil(len/3), len - (2*Math.ceil(len/3))];
    const lensPSA = [lens[0]];
    lens.slice(1).forEach((x, i) => {lensPSA.push(lensPSA[i]+x)});

    var i = 0;
    var j = 0;
    while (j < lensPSA[i]) {
        board = data["#B"][j];
        white = trim(data["White player"][j]);
        black = trim(data["Black player"][j]);
        console.log(board, white, black);
        const tableRow = document.createElement("tr");
        const boardCell = document.createElement("td"); boardCell.innerHTML = board; tableRow.appendChild(boardCell);
        const whiteCell = document.createElement("td"); whiteCell.innerHTML = white; tableRow.appendChild(whiteCell);
        const blackCell = document.createElement("td"); blackCell.innerHTML = black; tableRow.appendChild(blackCell);

        tables[i].appendChild(tableRow);

        j++;
        if (j == lensPSA[i] && i < 2) i++;
    }

    console.log(data);
    
}

function trim(str) {
    if (str == "BYE") return str;
    var arr = str.split(' ');
    return `${arr[0]} ${arr[1][0]}.`;
}

// MAY NEED TO TRIM GOOGLE SHEETS NAMES BEFORE IF NAMES SHOW UP WRONG