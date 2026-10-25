// Slides for the banner slider below the hero. พี่เอ็ม is designing the real banners.
// Until then each slide shows a placeholder in its theme. To use a real banner, put the file in
// public/banners/ and add `image: '/banners/<file>'` (recommended size 1920×600, ratio 16:5).
// `alt` describes the banner for screen readers once an image is in place.
export const bannersData = [
  {
    id: 'event',
    title: 'ชื่องาน',
    subtitle: 'Thailand Teaching Academy Award 2027 (TTA ครั้งที่ 13)',
    icon: 'campaign',
    theme: 'brand',
    alt: 'Thailand Teaching Academy Award 2027'
  },
  {
    id: 'royal-trophy',
    title: 'ถ้วยพระราชทาน',
    subtitle: 'รางวัลถ้วยพระราชทานสำหรับสถาบันชนะเลิศ',
    icon: 'emoji_events',
    theme: 'gold',
    alt: 'ถ้วยพระราชทาน'
  },
  {
    id: 'mourning',
    title: 'ไว้อาลัย',
    subtitle: 'พื้นที่สำหรับ Banner ไว้อาลัย',
    icon: 'local_florist',
    theme: 'mourning',
    alt: 'ไว้อาลัย'
  }
];
