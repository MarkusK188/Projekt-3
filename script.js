const mapContainer = document.querySelector('#mapContainer');


let maps;




async function getMap(){
    const response = await fetch('https://tinkr.tech/sdb/markus_namespace/antiyoy1');
    const data = await response.json();
    let hex = data.map;
    console.log(hex)
    for (const item of hex) {
        if (item.type !== "Impassable"){
        let image = document.createElement('img');
        image.src = `https://tinkr.tech/${item.image}`
        mapContainer.appendChild(image)
        console.log(item);}
    }
} 

    

getMap();

