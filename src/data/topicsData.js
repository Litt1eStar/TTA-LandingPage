export const categoryProfiles = {
  teach: {
    checkin: '07:30 – 08:30 น.',
    rules: [
      'ผู้เข้าแข่งขันต้องเป็นนักศึกษาระดับปริญญาตรีในเครือข่ายครุศาสตร์อุตสาหกรรม',
      'ส่งแผนการจัดการเรียนรู้ล่วงหน้าตามแบบฟอร์มที่กำหนดผ่านระบบ',
      'จับสลากหัวข้อการสอนก่อนการแข่งขัน 1 วัน',
      'สาธิตการสอนต่อคณะกรรมการ 20 นาที และตอบคำถาม 10 นาที',
      'แต่งกายด้วยชุดนักศึกษาตามระเบียบของสถาบัน'
    ],
    scoring: [
      { label: 'การออกแบบแผนการจัดการเรียนรู้', pts: 25, pct: '75%' },
      { label: 'เทคนิคและกระบวนการสอน', pts: 30, pct: '90%' },
      { label: 'การใช้สื่อและเทคโนโลยี', pts: 20, pct: '60%' },
      { label: 'บุคลิกภาพและการสื่อสาร', pts: 15, pct: '45%' },
      { label: 'การวัดและประเมินผล', pts: 10, pct: '30%' }
    ],
    agenda: [
      { time: '07:30', text: 'ลงทะเบียนและรายงานตัว' },
      { time: '08:30', text: 'ชี้แจงกติกาและจับสลากลำดับ' },
      { time: '09:00', text: 'เริ่มการแข่งขันช่วงเช้า' },
      { time: '12:00', text: 'พักรับประทานอาหารกลางวัน' },
      { time: '13:00', text: 'การแข่งขันช่วงบ่าย' },
      { time: '16:30', text: 'สิ้นสุดการแข่งขัน' }
    ]
  },
  innov: {
    checkin: '08:00 – 09:00 น.',
    rules: [
      'ทีมละ 2–3 คน และอาจารย์ที่ปรึกษา 1 คน',
      'ผลงานต้องพัฒนาขึ้นใหม่ และไม่เคยได้รับรางวัลระดับชาติมาก่อน',
      'ส่งรายงานผลงานและคลิปสาธิตล่วงหน้าผ่านระบบ',
      'ติดตั้งผลงานให้แล้วเสร็จก่อนเวลาแข่งขัน 30 นาที',
      'นำเสนอผลงาน 15 นาที และตอบคำถาม 10 นาที'
    ],
    scoring: [
      { label: 'ความคิดสร้างสรรค์และนวัตกรรม', pts: 30, pct: '90%' },
      { label: 'การออกแบบและความสมบูรณ์ของผลงาน', pts: 25, pct: '75%' },
      { label: 'ประโยชน์ต่อการจัดการเรียนรู้', pts: 25, pct: '75%' },
      { label: 'การนำเสนอและตอบคำถาม', pts: 20, pct: '60%' }
    ],
    agenda: [
      { time: '08:00', text: 'ลงทะเบียนและติดตั้งผลงาน' },
      { time: '09:00', text: 'ชี้แจงกติกาการแข่งขัน' },
      { time: '09:30', text: 'นำเสนอผลงานต่อคณะกรรมการ' },
      { time: '12:00', text: 'พักรับประทานอาหารกลางวัน' },
      { time: '13:00', text: 'นำเสนอผลงาน (ต่อ)' },
      { time: '16:00', text: 'จัดเก็บผลงาน' }
    ]
  },
  arts: {
    checkin: '09:00 – 10:00 น.',
    rules: [
      'ผู้เข้าแข่งขันเป็นนักศึกษาในสถาบันเครือข่ายเท่านั้น',
      'ร้องเพลงลูกทุ่งและแดนเซอร์จินตลีลา: ความยาวการแสดงไม่เกิน 7 นาที และส่งไฟล์เพลงประกอบล่วงหน้าตามวันที่กำหนด',
      'สื่อสร้างสรรค์: ส่งผลงานคลิปวิดีโอผ่านระบบภายในวันที่กำหนด ความยาวไม่เกิน 5 นาที',
      'ผู้เข้าแข่งขันเตรียมเครื่องแต่งกายและอุปกรณ์ประกอบเอง',
      'ห้ามละเมิดลิขสิทธิ์ภาพ เพลง และเนื้อหาของผู้อื่น'
    ],
    scoring: [
      { label: 'ความถูกต้องและความพร้อมเพรียง', pts: 30, pct: '90%' },
      { label: 'ความคิดสร้างสรรค์', pts: 25, pct: '75%' },
      { label: 'การสื่อความหมายและอารมณ์', pts: 25, pct: '75%' },
      { label: 'ความสวยงามและคุณภาพการผลิต', pts: 20, pct: '60%' }
    ],
    agenda: [
      { time: '09:00', text: 'ลงทะเบียนและรายงานตัว' },
      { time: '10:00', text: 'ซ้อมเวทีตามลำดับ' },
      { time: '12:00', text: 'พักรับประทานอาหารกลางวัน' },
      { time: '13:00', text: 'เริ่มการแข่งขันและฉายผลงานสื่อสร้างสรรค์' },
      { time: '16:00', text: 'ประกาศผลเบื้องต้น' }
    ]
  },
  media: {
    checkin: '08:30 – 09:00 น.',
    rules: [
      'ทีมละ 2–4 คน และอาจารย์ที่ปรึกษา 1 คน',
      'ความยาวผลงานหรือการนำเสนอไม่เกิน 5 นาที',
      'เนื้อหาต้องสอดคล้องกับหัวข้อที่คณะกรรมการกำหนด',
      'ห้ามละเมิดลิขสิทธิ์ภาพ เพลง และเนื้อหาของผู้อื่น',
      'ส่งผลงานผ่านระบบภายในวันที่กำหนด'
    ],
    scoring: [
      { label: 'เนื้อหาและแนวคิด', pts: 30, pct: '90%' },
      { label: 'ความคิดสร้างสรรค์', pts: 25, pct: '75%' },
      { label: 'เทคนิคการผลิตและการนำเสนอ', pts: 25, pct: '75%' },
      { label: 'ความน่าสนใจและการสื่อสาร', pts: 20, pct: '60%' }
    ],
    agenda: [
      { time: '08:30', text: 'ลงทะเบียนและรายงานตัว' },
      { time: '09:00', text: 'ชี้แจงกติกาการแข่งขัน' },
      { time: '09:30', text: 'นำเสนอผลงานตามลำดับ' },
      { time: '12:00', text: 'พักรับประทานอาหารกลางวัน' },
      { time: '13:00', text: 'นำเสนอผลงาน (ต่อ) และตอบคำถาม' },
      { time: '15:30', text: 'สิ้นสุดการแข่งขัน' }
    ]
  }
};

// Venues are sample data until the team sends the real building for each competition.
// venue/building use KMUTT classroom-building names (CB1–CB5) and are what the topic modal shows;
// buildingCode is the label on the campus master-plan map (S/N codes) where the marker sits.
// Cards sit on the circuit line in Topics.jsx: mapX/mapY is a card's top-left corner in the
// 1100×680 drawing (leftPct/topPct are the same point as percentages), four cards per row.
// `groups` lists the competitions inside a card. A group's buildingCode/building override the
// card's, so the venues map can place each competition on its own building.
const teachingGroups = (subjects) => subjects.map((s) => ({ name: `กลุ่มสาขาวิชา${s}` }));

export const topicsData = [
  {
    id: 1,
    n: '01',
    name: 'สอนทฤษฎี',
    sub: '5 กลุ่มสาขาวิชา',
    kind: 'teach',
    groups: teachingGroups(['ไฟฟ้า', 'อุตสาหการ', 'โยธา', 'เครื่องกล', 'คอมพิวเตอร์']),
    venue: 'อาคารเรียนรวม 5 (CB5)',
    buildingCode: 'S13',
    building: 'ห้อง CB5-501 – 505 ชั้น 5',
    date: '5 กุมภาพันธ์ 2027',
    icon: 'co_present',
    tone: 'orange',
    type: 'เดี่ยว',
    people: '1 คน',
    desc: 'การแข่งขันทักษะการสอนภาคทฤษฎี แบ่งออกเป็น 5 กลุ่มสาขาวิชา ผู้แข่งขันออกแบบแผนการสอนและสาธิตการสอนต่อคณะกรรมการ',
    mapX: 0,
    mapY: 30,
    leftPct: '0%',
    topPct: '4.41%'
  },
  {
    id: 2,
    n: '02',
    name: 'สอนปฏิบัติ',
    sub: '4 กลุ่มสาขาวิชา',
    kind: 'teach',
    groups: teachingGroups(['ไฟฟ้า', 'อุตสาหการ', 'โยธา', 'เครื่องกล']),
    venue: 'อาคารเรียนรวม 4 (CB4)',
    buildingCode: 'S12',
    building: 'ห้องปฏิบัติการ CB4 ชั้น 2–3',
    date: '5 กุมภาพันธ์ 2027',
    icon: 'engineering',
    tone: 'blue',
    type: 'เดี่ยว',
    people: '1 คน',
    desc: 'การแข่งขันทักษะการสอนภาคปฏิบัติ 4 กลุ่มสาขาวิชา เน้นการสาธิตงานปฏิบัติ ความปลอดภัย และการประเมินผลผู้เรียน',
    mapX: 301,
    mapY: 105,
    leftPct: '27.36%',
    topPct: '15.44%'
  },
  {
    id: 3,
    n: '03',
    name: 'ศิลปวัฒนธรรม',
    sub: 'การแข่งขันศิลปวัฒนธรรม 3 รายการ',
    kind: 'arts',
    groups: [
      { name: 'ประกวดร้องเพลงลูกทุ่ง', buildingCode: 'S14', building: 'ห้องประชุม CB1' },
      { name: 'แดนเซอร์จินตลีลา', buildingCode: 'S14', building: 'ห้องประชุม CB1' },
      { name: 'การแข่งขันประเภทสื่อสร้างสรรค์', buildingCode: 'N16', building: 'ห้อง CB2-201' }
    ],
    venue: 'อาคารเรียนรวม 1 (CB1) และอาคารเรียนรวม 2 (CB2)',
    buildingCode: 'S14',
    building: 'ห้องประชุม CB1 (ร้องเพลง · จินตลีลา) · ห้อง CB2-201 (สื่อสร้างสรรค์)',
    date: '6 กุมภาพันธ์ 2027',
    icon: 'theater_comedy',
    tone: 'orange',
    type: 'เดี่ยวและทีม',
    people: '1–13 คน',
    desc: 'การแข่งขันด้านศิลปวัฒนธรรม 3 รายการ ได้แก่ ประกวดร้องเพลงลูกทุ่ง แดนเซอร์จินตลีลา และสื่อสร้างสรรค์ สะท้อนคุณค่าของวิชาชีพครู',
    mapX: 602,
    mapY: 30,
    leftPct: '54.73%',
    topPct: '4.41%'
  },
  {
    id: 4,
    n: '04',
    name: 'Hardware',
    sub: 'นวัตกรรมฮาร์ดแวร์',
    kind: 'innov',
    venue: 'อาคารเรียนรวม 3 (CB3)',
    buildingCode: 'N17',
    building: 'โถงนิทรรศการ CB3 ชั้น 1',
    date: '5 กุมภาพันธ์ 2027',
    icon: 'memory',
    tone: 'blue',
    type: 'ทีม',
    people: '3 คน',
    desc: 'ออกแบบและสร้างชุดฝึกหรืออุปกรณ์ฮาร์ดแวร์เพื่อการเรียนการสอน พร้อมนำเสนอการใช้งานจริง',
    mapX: 904,
    mapY: 105,
    leftPct: '82.18%',
    topPct: '15.44%'
  },
  {
    id: 5,
    n: '05',
    name: 'Software',
    sub: 'นวัตกรรมซอฟต์แวร์',
    kind: 'innov',
    venue: 'อาคารเรียนรวม 3 (CB3)',
    buildingCode: 'N17',
    building: 'ห้อง CB3-301 ชั้น 3',
    date: '5 กุมภาพันธ์ 2027',
    icon: 'code_blocks',
    tone: 'orange',
    type: 'ทีม',
    people: '2 คน',
    desc: 'พัฒนาซอฟต์แวร์ แอปพลิเคชัน หรือสื่อดิจิทัลเพื่อส่งเสริมการเรียนรู้',
    mapX: 0,
    mapY: 360,
    leftPct: '0%',
    topPct: '52.94%'
  },
  {
    id: 6,
    n: '06',
    name: 'Robot',
    sub: 'หุ่นยนต์',
    kind: 'innov',
    venue: 'อาคารเรียนรวม 1 (CB1)',
    buildingCode: 'S14',
    building: 'ห้อง CB1-101 สนามแข่งขันหุ่นยนต์',
    date: '6 กุมภาพันธ์ 2027',
    icon: 'smart_toy',
    tone: 'blue',
    type: 'ทีม',
    people: '2 คน',
    desc: 'การแข่งขันออกแบบ สร้าง และควบคุมหุ่นยนต์ตามภารกิจที่กำหนด',
    mapX: 301,
    mapY: 455,
    leftPct: '27.36%',
    topPct: '66.91%'
  },
  {
    id: 7,
    n: '07',
    name: 'Research',
    sub: 'นวัตกรรมงานวิจัยในชั้นเรียน',
    kind: 'innov',
    venue: 'อาคารเรียนรวม 2 (CB2)',
    buildingCode: 'N16',
    building: 'ห้องประชุม CB2-306',
    date: '6 กุมภาพันธ์ 2027',
    icon: 'plagiarism',
    tone: 'orange',
    type: 'ทีม',
    people: '3 คน',
    desc: 'นำเสนอนวัตกรรมงานวิจัยในชั้นเรียนด้านครุศาสตร์อุตสาหกรรมและเทคโนโลยีการศึกษา',
    mapX: 602,
    mapY: 360,
    leftPct: '54.73%',
    topPct: '52.94%'
  },
  {
    id: 8,
    n: '08',
    name: 'Pitching',
    sub: 'การเป็นผู้ประกอบการ',
    kind: 'media',
    venue: 'อาคารเรียนรวม 2 (CB2)',
    buildingCode: 'N16',
    building: 'ห้องประชุม CB2-301',
    date: '5 กุมภาพันธ์ 2027',
    icon: 'record_voice_over',
    tone: 'blue',
    type: 'ทีม',
    people: '3 คน',
    desc: 'นำเสนอแนวคิดการเป็นผู้ประกอบการด้านนวัตกรรมการศึกษาภายในเวลาจำกัดต่อคณะกรรมการ',
    mapX: 904,
    mapY: 455,
    leftPct: '82.18%',
    topPct: '66.91%'
  }
];

export const statsData = [
  { id: 1, label: 'รายการแข่งขัน', target: 17, theme: 'gradient-orange' },
  { id: 2, label: 'ผู้แข่งขัน', target: 370, theme: 'white-orange' },
  { id: 3, label: 'ผู้ควบคุมทีม', target: 157, theme: 'gradient-blue' },
  { id: 4, label: 'ลงทะเบียนเข้าร่วม', target: 138, theme: 'white-blue' },
  { id: 5, label: 'รวมทั้งหมด', target: 665, theme: 'gradient-dark' }
];
