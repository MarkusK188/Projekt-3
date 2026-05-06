const mapContainer = document.querySelector('#mapContainer');
const joinBtn = document.querySelector('#joinBtn');
const userInput = document.querySelector('#userInput');
const startGameBtn = document.querySelector('#startGameBtn');
const endTurnBtn = document.querySelector('#endTurnBtn');
const surrenderBtn = document.querySelector('#surrenderBtn');
const moneyCounter = document.querySelector('.money');
const storeUnits = document.querySelectorAll('.storeUnit');
const turn = document.querySelector('#currentTurn');

let maps;

let playerKey;
let player = null
let fromCoordinates = null;
let toCoordinates = null;

moneyCounter.textContent = "0"
let money = 0;
let income = 0;
let upkeep = 0;

let userName = null;
checkName();



const url = 'https://tinkr.tech/sdb/markus_namespace/antiyoy1';

async function getMap(){
    const response = await fetch(url);
    const data = await response.json();
    let hex = data.map;
    player = data.players;
    

   if (data.phase !== "lobby"){
        getPlayerInfo();
        moneyCounter.textContent = userName +"'s"+ " " + "money: " + money + " "  + "income: "+income + " "  +"upkeep: " + upkeep 
        joinBtn.remove();
        startGameBtn.remove()
        userInput.remove()
         if (data.current_player === userName){
            turn.textContent = "Your turn!";
        } else { turn.textContent = "Wait for your turn!"}
        };
    if (data.winner !== null) {
        alert("Victory!")
    }

    mapContainer.innerHTML = "";

    for (const item of hex) {
        if (item.type !== "impassable"){
            
            let imageContainer = document.createElement('div');
            let image = document.createElement('img');
            image.src = `https://tinkr.tech/${item.image}`
            
            mapContainer.appendChild(imageContainer);
            imageContainer.appendChild(image);

            
            image.addEventListener('click',function(){
                if (fromCoordinates !== null){
                    hexTo(item);
                    sendMove(fromCoordinates, toCoordinates)
                    fromCoordinates = null;
                    console.log(toCoordinates)
                } else {hexOnClick(item);
                    console.log(fromCoordinates)
                    toCoordinates = null;
                }
                
            })

            mapContainer.classList.add('mapHexContainer');

            drawOnHex(image, item);
            
        if (item.building !== null) {
            let buildingImg = document.createElement('img');
            buildingImg.src = `https://tinkr.tech/${item.building_image}`;
            buildingImg.classList.add('building')

            imageContainer.appendChild(buildingImg);

            drawOnHex(buildingImg,item);
        }
        if (item.unit !== null) {
            let unitImg = document.createElement('img');
            unitImg.src = `https://tinkr.tech/${item.unit_image}`
            unitImg.classList.add('unit')

            imageContainer.appendChild(unitImg);

            drawOnHex(unitImg, item);
        }

        
        };
        
        
    }
} 

    
function drawOnHex(obj, item){
    obj.classList.add('mapHex')
    obj.style.left = item.x + 'px';
    obj.style.top = item.y +'px';
    obj.style.width = item.width + 'px';
    obj.style.height =item.height + 'px';
}
     

setInterval(function() {
    getMap();
    let playerKey = localStorage.getItem("player_key");
}, 1000);


storeUnits.forEach(unit =>{
    unit.addEventListener('click', function(){
        let storeItem = null;
        if (event.target.id === "1"){
            let storeItem = "peasant"
            buyStore(storeItem, fromCoordinates)
            console.log(storeItem);
            
        };
        if (event.target.id === "2"){
            let storeItem = "spearman"
            buyStore(storeItem, fromCoordinates)
            console.log(storeItem);
        };
        if (event.target.id === "3"){
            let storeItem = "baron"
            buyStore(storeItem, fromCoordinates)
            console.log(storeItem)
        };
        if (event.target.id === "4"){
            let storeItem = "knight"
            buyStore(storeItem, fromCoordinates)
            console.log(storeItem)
        };
        if (event.target.id === "5"){
            let storeItem = "farm"
            buyStore(storeItem, fromCoordinates)
            console.log(storeItem)
        };
        if (event.target.id === "6"){
            let storeItem = "tower"
            buyStore(storeItem, fromCoordinates)
            console.log(storeItem)
        };
        if (event.target.id === "7"){
            let storeItem = "fortress"
            buyStore(storeItem, fromCoordinates)
            console.log(storeItem)
        };
        fromCoordinates = null;
        
    });
});

joinBtn.addEventListener('click', function(){
    if (userInput.value.trim() !== "" ){
        userName = userInput.value.trim();
         localStorage.setItem("user_name", userName); 
        joinGame(userName);
    }
    else {
        alert("You must enter a username to join!")}
        
});



startGameBtn.addEventListener('click', function(){
    startGame();
});

endTurnBtn.addEventListener('click', function(){
    endTurn();
});


surrenderBtn.addEventListener('click',function(){
    console.log("jouuu")
    let playerKey = localStorage.getItem("player_key");
    console.log(playerKey)
    surrenderThyself(playerKey);
});

async function joinGame(playerName) {
        const join = {
             action: "join",
            username: playerName
            };
    const response = await fetch(url, {
     method: 'POST',
     headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(join)
  });
  if (!response.ok){
        let errorText = await response.text();
        alert(errorText);
    }
  
  const result = await response.json();
  let playerKey = result.player_key;

   localStorage.setItem("player_key", playerKey);       
  console.log(result);
  console.log(playerKey);
  joinBtn.remove();
    
};

async function startGame(){
    const start = {
        action: "start"
    }

    const respone = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(start)
    });
    const result = await respone.json();
    console.log(result);
    
};

async function surrenderThyself(Key) {
    
      const surrender = {
             action: "surrender",
             player_key: Key
            };
    const response = await fetch(url, {
     method: 'POST',
     headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(surrender)
  });
  const result = await response.json()
  console.log(result)
};

function hexOnClick(hex) {
    console.log('I WORK!');
    
       
        let col = hex.col;
        let row = hex.row;
        fromCoordinates = {col, row};
        console.log("from");
    


};

function hexTo(hexTo){
        let col = hexTo.col;
        let row = hexTo.row;
        toCoordinates = {col, row}
        console.log("to")
       
        
    
};


async function sendMove(From, To) {
    
    let move = {
        action: "move",
         player_key: localStorage.getItem("player_key"),
         from: From,
         to: To};

    let response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(move)
    });

    if (!response.ok){
        let errorText = await response.text();
        alert(errorText);
    }

    let result = await response.json()
    console.log(result)}
    
  



async function endTurn() {
     const end = {
             action: "end_turn",
            player_key: localStorage.getItem("player_key")
            };
    const response = await fetch(url, {
     method: 'POST',
     headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(end)
  });
   if (!response.ok){
        let errorText = await response.text();
        alert(errorText);};
};
async function buyStore(Unit, To) {
   let buy = {
        action: "buy",
         player_key: localStorage.getItem("player_key"),
         type: Unit,
         hex: To};
    let response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(buy)
    });
     if (!response.ok){
        let errorText = await response.text();
        alert(errorText);};
    let result = await response.json()
    console.log(result)};

function getPlayerInfo(){
    for (const players of player) {
        if (players.username === userName) {
            money = players.money;
            income = players.income;
            upkeep = players.upkeep;
            
        }
    }
};

function checkName(){
    if (localStorage.getItem("user_name")){
        userName = localStorage.getItem("user_name");
    }
};

function drawStore(){
    let price = document.createElement('p1');
    
};

