export default function DataChange(number, duration) {
    const coordinates = [
        { lat: 50 - 2, lng: 9 + 2 },  // c1 - center
        { lat: 50 - 2, lng: 27 + 2 }, // c2 - right
        { lat: 90, lng: 9 + 2 },      // c3 - up
        { lat: 5, lng: 9 + 2 }        // c4 - down
    ];

    const dataStory = [];
    let lat, lng, latStart, lngStart, latEnd, lngEnd, isReverse;
    let steps = duration;

    switch (number) {
        case 1:
        case 2: // Moving horizontally (c1 to c2 or c2 to c1)
            lat = coordinates[0].lat;
            lngStart = coordinates[0].lng;
            lngEnd = coordinates[1].lng;
            isReverse = (number === 2);
            // steps = 16;
            break;

        case 3:
        case 4: // Moving vertically (c1 to c4 or c4 to c1)
            lng = coordinates[0].lng;
            latStart = coordinates[0].lat;
            latEnd = coordinates[3].lat;
            isReverse = (number === 4);
            // steps = 29;
            break;

        case 5:
        case 6: // Moving vertically (c1 to c3 or c3 to c1)
            lng = coordinates[0].lng;
            latStart = coordinates[0].lat;
            latEnd = coordinates[2].lat;
            isReverse = (number === 6);
            // steps = 29;
            break;

        default:
            return dataStory; // Return empty if an invalid number is passed
    }

    // Generate coordinates for the path
    for (let i = 0; i <= steps; i++) {
        if (number === 1 || number === 2) {
            // Horizontal movement (c1 to c2 or c2 to c1)
            lng = lngStart + (lngEnd - lngStart) * (isReverse ? (1 - i / steps) : (i / steps));
        } else {
            // Vertical movement (c1 to c4/c3 or c4/c3 to c1)
            lat = latStart + (latEnd - latStart) * (isReverse ? (1 - i / steps) : (i / steps));
        }
        dataStory.push({ lat, lng });
        // console.log(steps);
    }

    return dataStory;
}
