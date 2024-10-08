export default function DataChange(number){
  const cordinate2 = [50, 9]; // center
  const cordinate3 = [50, 27]; // right
  const cordinate4 = [90, 9]; // up
  const cordinate5 = [5,9]; // down

  const dataStory = [];
  let lat = 0;
  let lng = 0;
  let sus = 0;

  switch (number) {
    case 1:
      lng = 9;
      sus = (27 - 9) / 16;
      for (let i = 0; i < 16; i++) {
        lng = lng + sus; 
        dataStory.push({ lat: 47, lng });
      }
      break;
    case 2:
      lng = 27;
      sus = (27 - 9) / 16;
      for (let i = 0; i < 16; i++) {
        lng = lng - sus; 
        dataStory.push({ lat: 47, lng });
      }
      break;
    case 3:
      lat = 50;
      sus = (50 - 0) / 29;
      for (let i = 0; i <= 29; i++) {
        lat = lat - sus;
        dataStory.push({ lat, lng: 9 });
      }
      break;
    case 4:
      lat = 0;
      sus = (50 - 0) / 29;
      for (let i = 0; i <= 29; i++) {
        lat = lat + sus;
        dataStory.push({ lat, lng: 9 });
      }
      break;
    case 5:
      lat = 50;
      sus = (90 - 50) / 29;
      for (let i = 0; i <= 29; i++) {
        lat = lat + sus;
        dataStory.push({ lat, lng: 9 });
      }
      break;
    case 6:
      lat = 90;
      sus = (90 - 50) / 29;
      for (let i = 0; i <= 29; i++) {
        lat = lat - sus;
        dataStory.push({ lat, lng: 9 });
      }
      break;
  }
  return dataStory;
}
