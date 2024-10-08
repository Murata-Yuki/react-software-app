const dataStory = [];
let lat = 47;
let sus = (90 - 47) / 29;
for (let i = 0; i <= 29; i++) {
  lat = lat + sus;
  dataStory.push({ lat, lng: 11 });
}

export default dataStory;