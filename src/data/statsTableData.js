// Number of institutions entered in each competition. Sample numbers until registration closes
// and the team sends the real counts; set statsTableIsSample to false then.
//
// The table is drawn as two bands (one per inner array) so all 17 names fit without
// scrolling on desktop. `columnPrefix` is shown as a small line above each column label, so the
// header reads as the full name (กลุ่มสาขาวิชา + ไฟฟ้า) without repeating it in large type.
// A `\n` in a label marks where a long name breaks onto its second line.
export const statsTableIsSample = true;

export const statsTableBands = [
  [
    {
      label: 'การแข่งขันสอนทฤษฎี',
      tone: 'orange',
      columnPrefix: 'กลุ่มสาขาวิชา',
      columns: [
        { label: 'ไฟฟ้า', count: 10 },
        { label: 'อุตสาหการ', count: 8 },
        { label: 'โยธา', count: 7 },
        { label: 'เครื่องกล', count: 9 },
        { label: 'คอมพิวเตอร์', count: 10 }
      ]
    },
    {
      label: 'การแข่งขันสอนปฏิบัติ',
      tone: 'blue',
      columnPrefix: 'กลุ่มสาขาวิชา',
      columns: [
        { label: 'ไฟฟ้า', count: 9 },
        { label: 'อุตสาหการ', count: 7 },
        { label: 'โยธา', count: 6 },
        { label: 'เครื่องกล', count: 8 }
      ]
    }
  ],
  [
    {
      label: 'การแข่งขันศิลปวัฒนธรรม',
      tone: 'gold',
      columns: [
        { label: 'ประกวด\nร้องเพลงลูกทุ่ง', count: 10 },
        { label: 'แดนเซอร์\nจินตลีลา', count: 9 },
        { label: 'การแข่งขันประเภท\nสื่อสร้างสรรค์', count: 8 }
      ]
    },
    // Single-column categories: the header spans both rows. They share the navy tone.
    { label: 'Hardware', count: 10 },
    { label: 'Software', count: 10 },
    { label: 'Robot', count: 7 },
    { label: 'Research', count: 9 },
    { label: 'Pitching', count: 8 }
  ]
];
