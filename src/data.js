// All page copy lives here so components stay presentational.

export const heroWords = ['Producers', 'Sound designers', 'Labels'];

export const audiences = [
  {
    id: 'producers',
    label: 'Producers',
    split: ['Pro', 'du', 'cers'],
    title: 'Your bounce folder deserves an audience',
    accent: 'not another algorithm',
    body:
      'Tired of uploading a finished track and hearing nothing back? Loophaus is built for people who make records. Post full tracks or rough sketches, share stems, get real feedback from other producers, and find paid work without fighting a feed.',
    features: [
      ['Post tracks & sketches', 'Upload a finished master or a 16-bar idea. Tag BPM, key and genre so the right ears find it.'],
      ['Spins, not likes', 'Listeners give a track spins. Stack as many as it earns.'],
      ['Stem swaps', 'Share stems so others can flip your loop, and credit flows back to you.'],
      ['Get booked', 'Mixing, ghost production and sync briefs from people who actually pay.'],
      ['Studio profile', 'Show your gear, your DAW, your best five tracks and your links.'],
      ['Flip challenges', 'One sample, one week, every producer on the platform. May the best flip win.'],
      ['A&R visibility', 'Labels browse by sound, not follower count.'],
      ['More on the way', 'Session rooms and live listening parties are next.'],
    ],
  },
  {
    id: 'sound-designers',
    label: 'Sound designers',
    split: ['Sound', 'design', 'ers'],
    title: 'Show the sound behind the scene',
    accent: 'and who made it',
    body:
      'Foley, synth patches, game audio, trailer hits. Your work is everywhere and credited almost nowhere. Loophaus gives sound designers a place to show before-and-after breakdowns and get hired for the next project.',
    features: [
      ['Before / after players', 'Post the dry recording next to the final design. Let people hear the craft.'],
      ['Spins, not likes', 'Listeners give a sound spins. Stack as many as it earns.'],
      ['Patch sharing', 'Share presets for Serum, Vital and Pigments with version notes.'],
      ['Get hired', 'Game studios, agencies and film teams post briefs directly.'],
      ['Studio profile', 'List your mics, your libraries and the credits you can talk about.'],
      ['Design challenges', 'Monthly briefs: a door, a creature, a UI click. Same brief, different ears.'],
      ['Credit trail', 'Every reuse of your sound links back to your profile.'],
      ['More on the way', 'Spatial audio previews are in testing.'],
    ],
  },
  {
    id: 'labels',
    label: 'Labels',
    split: ['La', 'be', 'ls'],
    title: 'Find the next signing before everyone else does',
    accent: 'by ear',
    body:
      'Independent labels and collectives run on taste. Loophaus lets your team showcase your roster, run open calls, and discover producers by how they sound instead of how big their following is.',
    features: [
      ['Roster pages', 'One page for every artist you work with, releases and stems included.'],
      ['Spins, not likes', 'Fans give your releases spins. Stack as many as they earn.'],
      ['Open calls', 'Post a demo call with a genre, a BPM range and a deadline.'],
      ['Scout by sound', 'Filter submissions by key, tempo and loudness.'],
      ['Label profile', 'Your catalogue, your story, your submission rules.'],
      ['Remix contests', 'Release stems, collect remixes, pick a winner for the B-side.'],
      ['Team seats', 'A&R, mgmt and artists share one inbox.'],
      ['More on the way', 'Royalty split sheets are on the roadmap.'],
    ],
  },
];

export const sampleTrack = {
  title: 'Night Bus to Ocean Beach',
  artist: 'mira.wav',
  bpm: 124,
  key: 'F♯ minor',
  lufs: -9.2,
  length: '3:41',
  stems: [
    { name: 'Drums', level: 0.82 },
    { name: 'Bass', level: 0.68 },
    { name: 'Rhodes', level: 0.54 },
    { name: 'Vox chop', level: 0.4 },
  ],
};

export const whoFor = [
  'Beatmakers',
  'Mix engineers',
  'Foley artists',
  'Game audio teams',
  'Synth nerds',
  'Bedroom producers',
  'Indie labels',
  'Sample-pack makers',
  'Film composers',
  'DJs who edit',
];

export const timeline = [
  { label: 'Vision', status: 'done' },
  { label: 'Strategy', status: 'done' },
  { label: 'Design', status: 'done' },
  { label: 'Build', status: 'done' },
  { label: 'Pre-beta\ntesting', status: 'active' },
  { label: 'Closed\nbeta', status: 'next' },
  { label: 'Open\nbeta', status: 'next' },
  { label: 'Pre-launch\ntesting', status: 'next' },
  { label: 'Launch', status: 'next' },
];

export const roles = ['Producer', 'Sound designer', 'Label / collective', 'Just listening'];
