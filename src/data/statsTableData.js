// Number of institutions entered in each competition. Sample numbers until registration closes
// and the team sends the real counts; set statsTableIsSample to false then.
export const statsTableIsSample = true;

export const statsTableGroups = [
  {
    label: 'การแข่งขันสอนทฤษฎี',
    columns: [
      { label: 'กล', count: 9 },
      { label: 'โย', count: 7 },
      { label: 'ไฟ', count: 10 },
      { label: 'อุต', count: 8 },
      { label: 'คอม', count: 10 }
    ]
  },
  {
    label: 'การแข่งขันสอนปฏิบัติ',
    columns: [
      { label: 'กล', count: 8 },
      { label: 'โย', count: 6 },
      { label: 'ไฟ', count: 9 },
      { label: 'อุต', count: 7 }
    ]
  },
  {
    label: 'ศิลป',
    columns: [
      { label: 'ร้อง', count: 10 },
      { label: 'แสดง', count: 9 }
    ]
  },
  // Single-column categories: the header spans both rows.
  { label: 'HW', count: 10 },
  { label: 'SW', count: 10 },
  { label: 'VDO', count: 8 },
  { label: 'Robot', count: 7 },
  { label: 'Research', count: 9 },
  { label: 'Pitching', count: 8 }
];
