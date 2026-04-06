const mapContainer = document.querySelector('#mapContainer');


let maps;




async function getMap(){
    const response = await fetch('https://tinkr.tech/sdb/markus_namespace/antiyoy1');
    const data = await response.json();
    let hex = data.map;
    console.log(hex)
    for (const item of hex) {
        if (item.type !== "impassable"){
        
            let image = document.createElement('img');
            image.src = `https://tinkr.tech/${item.image}`
           
            mapContainer.appendChild(image)

            image.classList.add('mapHex')
            image.style.left = item.x + 'px';
            image.style.top = item.y +'px';
            image.style.width = item.width + 'px';
            image.style.height =item.height + 'px';
            
        
            console.log(item);}
    }
} 

    

getMap();

