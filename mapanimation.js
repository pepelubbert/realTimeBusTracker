
mapboxgl.accessToken = 'pk.eyJ1IjoicGVwZWx1YmJlcnQiLCJhIjoiY2tuZmdycnB3MWtqbTJ2bGxpejY2cTNuayJ9.o1FLbh-pzecEVS9qdkJ7IA';

let map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-71.104081, 42.365554],
  zoom: 14,
});


let counter = 0;
async function run() {
    // This function will run repeatedly to add and remove markers as the bus positions update.
        var marker = new mapboxgl.Marker();      
        const locations = await getBusLocations();
        // Gets bus locations by calling getBusLocations() function.

        console.log(new Date()); 
        console.log(locations);
   
        
        marker.setLngLat([locations[counter].attributes.longitude,locations[counter].attributes.latitude])
        .addTo(map);
        counter +=1;

        setTimeout(run, 15000);
}


async function getBusLocations(){
	const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
	const response = await fetch(url); // this ferches bus locations from mbta api
	const json = await response.json(); // this puts json format readable for js
	return json.data; // returns de data in the json file
}