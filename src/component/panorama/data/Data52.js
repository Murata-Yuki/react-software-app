const dataStory = [];
let lng = 27;
let sus = (27 - 13) / 16;
for (let i = 0; i < 16; i++) {
  lng = lng - sus; 
  dataStory.push({ lat: 42, lng });
}

export default dataStory;