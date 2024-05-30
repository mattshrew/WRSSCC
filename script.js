var FAQs = [
    {
        question: "How much does the WRSSCC cost to attend?",
        answer: "The WRSSCC is completely free to attend!"
    },
    {
        question: "Will there be food at the tournament?",
        answer: "Yes! There will be many free snacks provided throughout the tournament and pizza at the end, after the closing ceremony."
    },
    {
        question: "What if I'm not good at chess?",
        answer: "Don't worry! The WRSSCC welcomes all skill levels, beginners and advanced players alike."
    },
    {
        question: "How long will the tournament run?",
        answer: "The WRSSCC will start at 3:20 PM and end at around 5:30 PM."
    },
    {
        question: "Will there be prizes for winners?",
        answer: "Prizes will be awarded to the top 5 performing players. A raffle will also be hosted, so all players will have the chance to win leave with a prize!"
    },
    {
        question: "What is the tournament format?",
        answer: "Everyone will play 7 games. Each game will have a time limit of 5 minutes per player, with no increment. There will be an estimated 5 minute break in between each game."
    },
    {
        question: "Can I leave in the middle of the tournament?",
        answer: "It’d be great if you could stay the duration of the whole tournament, but if you must go in the middle, make sure to let one of the arbiters at the tournament know."
    },
    {
        question: "What can I do if I arrive early?",
        answer: "We'll have a BINGO challenge (with prizes for winners) for players who arrive before 3:20 PM. The BINGO board will be revealed on the day of the tournament."
    },
    {
        question: "Do I need to register for the event?",
        answer: "Nope! All you need to do is to show up before 3:20 PM on June 10th at WCI."
    },
    {
        question: "Where in WCI will the tournament be held?",
        answer: "The tournament will be held in the <a href='https://docs.google.com/document/d/1HdUx42nVZA-e47hEEcPy-1xZQ_8En1bzxnCaeB9rCzo/edit#heading=h.7mpr1r4ff46s' target='_blank'>WCI cafeteria</a>."
    },
]

function sleep(ms) {  
    return new Promise(resolve => setTimeout(resolve, ms));  
} 

var css = new function() {
    function addStyle() {
       let head = document.head;
       let style = document.createElement("style");
       head.appendChild(style);
    }
    this.insert = function(rule) {
       if(document.styleSheets.length == 0) { addStyle(); }
       let sheet = document.styleSheets[0];
       let rules = sheet.cssRules;
       sheet.insertRule(rule, rules.length);
    }
}
 

async function buildFAQs() {
    const FAQcols = document.getElementsByClassName('faq-col');
    var i = 0
    FAQs.forEach(async (faq) => {
        const accordion = document.createElement("div"); accordion.classList = "faq-accordion";
        const symbol = document.createElement("img"); symbol.classList = "faq-symbol"; symbol.src = "img/faq.svg";
        const question = document.createElement("div"); question.classList = "faq-question";
        const questionTitle = document.createElement("h5"); questionTitle.classList = "faq-question-title";
        questionTitle.innerHTML = faq.question;
        const questionAnswer = document.createElement("p"); questionAnswer.classList = "faq-question-answer";
        questionAnswer.innerHTML = faq.answer;
        
        question.appendChild(questionTitle);
        question.appendChild(questionAnswer);
        accordion.appendChild(symbol);
        accordion.appendChild(question);
        
        await sleep(50);

        FAQcols[i % 2].appendChild(accordion);
        
        i++;
        
        let height = questionAnswer.clientHeight;
        // console.log(questionAnswer, height);

        accordion.id = `faq-${i}`;
        accordion.classList.add("closed");

        css.insert(`.faq-accordion.open#${accordion.id} .faq-question-answer {max-height: ${height}px !important}`);

        accordion.addEventListener('mouseenter', function() {
            accordion.classList.add('hover');
        });
        accordion.addEventListener('mouseleave', function() {
            accordion.classList.remove('hover');
        });
        

        [symbol, questionTitle].forEach((e) => {
            e.addEventListener('click', function() {
                if (accordion.classList.contains('closed')) {
                    accordion.classList.remove('closed');
                    accordion.classList.add('open');
                } else if (accordion.classList.contains('open')) {
                    accordion.classList.remove('open');
                    accordion.classList.add('closed');
                }
            });
            e.addEventListener('mouseenter', function() {
                accordion.classList.add('hover');
            });
            e.addEventListener('mouseleave', function() {
                accordion.classList.remove('hover');
            });
        });
    });
}

document.addEventListener('DOMContentLoaded', async function () {
    await sleep(100);

    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    console.log(vh);

    window.addEventListener('resize', () => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }); 

    await buildFAQs();

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