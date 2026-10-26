// Buildings shown on the campus map (public/assets/kmutt-campus-map.webp, rendered from the
// original SVG kept in design/originals/). x and y are the position of the building's label on the
// map, as a percentage of the map image's width and height. Which competitions each building hosts comes from buildingCode in topicsData.
export const venuesIsSample = true;

// `cb` is the classroom building (อาคารเรียนรวม) at that spot: a sample pairing until the team
// confirms which master-plan building each CB is.
export const venueBuildings = [
  { code: 'S13', cb: 'CB5', x: 31.5, y: 13.8 },
  { code: 'S12', cb: 'CB4', x: 30.3, y: 18.1 },
  { code: 'S14', cb: 'CB1', x: 40.8, y: 14.3 },
  { code: 'N16', cb: 'CB2', x: 57.3, y: 26.5 },
  { code: 'N17', cb: 'CB3', x: 47.3, y: 38.4 }
];
