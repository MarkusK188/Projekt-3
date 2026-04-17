const mapContainer = document.querySelector('#mapContainer');
const joinBtn = document.querySelector('#joinBtn');
const userInput = document.querySelector('#userInput');
const startGameBtn = document.querySelector('#startGameBtn');

let maps;

let playerKey;

let fromCoordinates = null;
let toCoordinates = null;



const url = 'https://tinkr.tech/sdb/markus_namespace/antiyoy1';

async function getMap(){
    const response = await fetch(url);
    const data = await response.json();
    let hex = data.map;

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
    console.log('refreshed');
    let playerKey = localStorage.getItem("player_key");
      console.log(playerKey);

}, 2000);

joinBtn.addEventListener('click', function(){
    if (userInput.value.trim() !== "" ){
        let name = userInput.value.trim();
        joinGame(name);}
    else {
        console.log("You must enter a username to join!")}
        console.log(userInput.value.trim() );
});

startGameBtn.addEventListener('click', function(){
    startGame();
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
  
  const result = await response.json();
  let playerKey = result.player_key;

   localStorage.setItem("player_key", playerKey);       
  console.log(result);
  console.log(playerKey);
    
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
        fromCoordinates = null;
        
    
}


