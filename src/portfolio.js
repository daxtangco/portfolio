const header = {
  // all the properties are optional - can be left empty or deleted
  homepage: 'https://portfolio-daxtangco.vercel.app/',
  title: 'DT.',
}

const about = {
  // all the properties are optional - can be left empty or deleted
  name: 'Dax Tangco',
  role: 'Full Stack Web Developer',
  description:
    'A graduate from KodeGo Bootcamp, and an aspiring Full Stack Web Developer that is equipped of languages required for a full stack website. Individually, knows that there are a lot to improve and will never stop learning to be the best in his craft. Can also do web designs that are compatible and will give best experience to users.',
  resume: 'https://drive.google.com/file/d/1VuYYNdq9cUHfFWOZJKEU1ZTwEM1tvMgm/view?usp=sharing',
  social: {
    linkedin: 'https://www.linkedin.com/in/dax-axis-tangco-ab5940240/',
    github: 'https://github.com/daxtangco',
  },
}

const projects = [
  // projects can be added an removed
  // if there are no projects, Projects section won't show up
  {
    name: 'Lakwatsa',
    description:
      'A travel website that solely focuses on the design of the website, with only using HTML and CSS3',
    stack: ['HTML5, CSS3'],
    sourceCode: 'https://github.com/daxtangco/daxtangco.github.io',
    livePreview: 'https://daxtangco.github.io/',
  },
  {
    name: 'PairGo',
    description:
      'Warehousing website that caters every storage that is needed for a supplier. Includes delivery and transportation services. A simple website that is compelete from the front-end.',
    stack: ['HTML5, CSS3, SASS, Javascript'],
    sourceCode: 'https://github.com/boymelvs/pairgo',
    livePreview: 'https://pairgo.vercel.app/',
  },
  {
    name: 'MusicApp',
    description:
      'Website that is made for music lovers and with simplified experience. Integrated Spotify API for the tracks, albums, and artists. It is also made with ReactJS for a faster and better transition from different sections.',
    stack: ['SASS, ReactJS, ExpressJS, MySQL, OracleDB'],
    sourceCode: 'https://github.com/boymelvs/musicapp',
    livePreview: 'https://musicapp-kodego-proj.vercel.app/',
  },
]

const skills = [
  // skills can be added or removed
  // if there are no skills, Skills section won't show up
  'HTML',
  'CSS3/SASS',
  'Javascript',
  'ReactJS',
  'ExpressJS',
  'Material UI',
  'Bootstrap',
  'PHP',
  'Laravel',
  'MySQL',
  'OracleDB',
  'Figma',
  'Adobe Photoshop',
  'Adobe Illustrator',
  'Adobe InDesign',
]

const contact = {
  // email is optional - if left empty Contact section won't show up
  email: 'daxtangco@gmail.com',
}

export { header, about, projects, skills, contact }
