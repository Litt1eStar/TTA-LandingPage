// `date` is what the page shows; `start` (ISO, Bangkok time) decides which step is happening now.
export const scheduleSteps = [
  {
    step: 1,
    n: '01',
    icon: 'schedule',
    title: 'เปิดระบบลงทะเบียน',
    date: '30 ตุลาคม 2026',
    start: '2026-10-30',
    desc: 'เปิดรับสมัครทีมและผู้เข้าแข่งขันทุกสถาบันเครือข่าย'
  },
  {
    step: 2,
    n: '02',
    icon: 'move_to_inbox',
    title: 'ปิดรับสมัคร',
    date: '30 พฤศจิกายน 2026',
    start: '2026-11-30',
    desc: 'สิ้นสุดการส่งรายชื่อผู้เข้าแข่งขันและอาจารย์ที่ปรึกษา'
  },
  {
    step: 3,
    n: '03',
    icon: 'attach_file',
    title: 'ส่งเอกสารและผลงาน',
    date: '15 ธันวาคม 2026',
    start: '2026-12-15',
    desc: 'อัปโหลดแผนการสอน เอกสารรายงาน และคลิปผลงาน'
  },
  {
    step: 4,
    n: '04',
    icon: 'send',
    title: 'ประกาศรายชื่อผู้มีสิทธิ์แข่งขัน',
    date: '15 มกราคม 2027',
    start: '2027-01-15',
    desc: 'ตรวจสอบรายชื่อและกำหนดการแบ่งสายการแข่งขัน'
  },
  {
    step: 5,
    n: '05',
    icon: 'calendar_month',
    title: 'วันแข่งขัน',
    date: '5–6 กุมภาพันธ์ 2027',
    start: '2027-02-05',
    desc: 'จัดการแข่งขันทั้ง 10 รายการ ณ มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี'
  },
  {
    step: 6,
    n: '06',
    icon: 'check',
    title: 'ประกาศผลและมอบรางวัล',
    date: '7 กุมภาพันธ์ 2027',
    start: '2027-02-07',
    desc: 'พิธีปิดและมอบเหรียญรางวัลเกียรติยศ TTA ครั้งที่ 13'
  }
];

// The step happening today: the last one that has started, or the first if none has yet
export function getCurrentStep(today = new Date()) {
  const started = scheduleSteps.filter((s) => new Date(`${s.start}T00:00:00+07:00`) <= today);
  return started.length ? started[started.length - 1].step : scheduleSteps[0].step;
}
