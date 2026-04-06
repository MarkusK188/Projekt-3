const mapContainer = document.querySelector('#mapContainer');


let maps;




async function getMap(){
    const response = await fetch('https://tinkr.tech/sdb/markus_namespace/antiyoy1');
    const data = await response.json();
    let hex = data.map;
    console.log(hex)
    for (const item of hex) {
        if (item.type !== "impassable"){
            
            let imageContainer = document.createElement('div');
            let image = document.createElement('img');
            image.src = `https://tinkr.tech/${item.image}`
            
            mapContainer.appendChild(imageContainer);
            imageContainer.appendChild(image);

            mapContainer.classList.add('mapHexContainer');

            drawOnHex(image, item);
            
        if (item.building !== null) {
            let buildingImg = document.createElement('img');
            buildingImg.src = `https://tinkr.tech/${item.building_image}`;

            imageContainer.appendChild(buildingImg);

            drawOnHex(buildingImg,item);
        }
        if (item.unit !== null) {
            let unitImg = document.createElement('img');
            unitImg.src = `https://tinkr.tech/${item.unit_image}`

            imageContainer.appendChild(unitImg);

            drawOnHex(unitImg, item);
        }

        
            console.log(item);
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
     


getMap();

