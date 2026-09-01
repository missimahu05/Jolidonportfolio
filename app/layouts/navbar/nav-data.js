import config from '~/config.json';

export const navLinks = [
  {
    label: 'projects',
    pathname: '/#project-1',
  },
  {
    label: 'about',
    pathname: '/#details',
  },
  {
    label: 'contact',
    pathname: '/contact',
  },
];

export const socialLinks = [
  {
    label: 'Github',
    url: `https://github.com/${config.github}`,
    icon: 'github',
  },
];
