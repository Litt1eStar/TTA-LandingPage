// Buildings shown on the campus map (public/assets/kmutt-location-3d.svg).
// x and y are the position of the building's label on the map, as a percentage of the rendered
// map's width and height. Measure on a screenshot of the map, not on the raw embedded image: the
// SVG crops it. Which competitions each building hosts comes from buildingCode in topicsData.
export const venuesIsSample = true;

export const venueBuildings = [
  { code: 'S13', x: 31.5, y: 13.8 },
  { code: 'S12', x: 30.3, y: 18.1 },
  { code: 'S14', x: 40.8, y: 14.3 },
  { code: 'N16', x: 57.3, y: 26.5 },
  { code: 'N17', x: 47.3, y: 38.4 },
  { code: 'N2', x: 54.6, y: 45.6 },
  { code: 'S4', x: 33.7, y: 44.1 }
];
