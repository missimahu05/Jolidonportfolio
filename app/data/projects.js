import mouvementTexture from '~/assets/mouvement-benin.png';
import oliveTexture from '~/assets/olive-sanny.png';
import istiTexture from '~/assets/isti-yarou.png';
import flammesUpTexture from '~/assets/flammes-up-new.png';
import azizaTexture from '~/assets/aziza-game.png';
import klipsaveTexture from '~/assets/klipsave-mobile.jpeg';
import cvGeneratorTexture from '~/assets/cv-generator.png';

export const projects = [
  {
    id: 'project-1',
    title: 'Mouvement Patriotique du Bénin',
    description: 'Une plateforme engagée pour le renouveau citoyen et la participation politique au Bénin.',
    buttonText: 'Voir le site',
    buttonLink: 'https://mouvementpatriotiquedubenin.netlify.app',
    model: {
      type: 'laptop',
      alt: 'Mouvement Patriotique du Bénin',
      textures: [
        {
          srcSet: `${mouvementTexture} 1280w`,
          placeholder: mouvementTexture,
        },
      ],
    },
  },
  {
    id: 'project-2',
    alternate: true,
    title: 'Olive Sanny : Portfolio Créatif',
    description: 'Une vitrine interactive mettant en avant des compétences en développement full-stack et design UI/UX.',
    buttonText: 'Explorer',
    buttonLink: 'https://olivesanny.netlify.app',
    model: {
      type: 'laptop',
      alt: 'Portfolio Olive Sanny',
      textures: [
        {
          srcSet: `${oliveTexture} 1280w`,
          placeholder: oliveTexture,
        },
      ],
    },
  },
  {
    id: 'project-3',
    title: 'ISTI Yarou : Design & Social Media',
    description: 'Portfolio de création de contenu et stratégie social media pour une identité visuelle forte.',
    buttonText: 'Découvrir',
    buttonLink: 'https://istidjabathyarou.netlify.app',
    model: {
      type: 'laptop',
      alt: 'ISTI Yarou',
      textures: [
        {
          srcSet: `${istiTexture} 1280w`,
          placeholder: istiTexture,
        },
      ],
    },
  },
  {
    id: 'project-4',
    alternate: true,
    title: 'Flammes UP : L\'Étincelle Sociale',
    description: 'Une application mobile innovante pour des interactions éphémères et spontanées.',
    buttonText: 'Lancer l\'app',
    buttonLink: 'https://flammesup.netlify.app',
    model: {
      type: 'phone',
      alt: 'Flammes UP App',
      textures: [
        {
          srcSet: `${flammesUpTexture} 375w`,
          placeholder: flammesUpTexture,
        },
      ],
    },
  },
  {
    id: 'project-5',
    title: 'Aziza Game : L\'Aventure Ludique',
    description: 'Un jeu interactif immersif conçu pour tester les réflexes et la stratégie des joueurs.',
    buttonText: 'Jouer maintenant',
    buttonLink: 'https://azizagame.netlify.app',
    model: {
      type: 'laptop',
      alt: 'Aziza Game',
      textures: [
        {
          srcSet: `${azizaTexture} 1280w`,
          placeholder: azizaTexture,
        },
      ],
    },
  },
  {
    id: 'project-6',
    alternate: true,
    title: 'KlipSave : Stream Mastery',
    description: 'Téléchargeur multi-plateformes rapide et efficace pour tous vos besoins multimédia.',
    buttonText: 'Tester KlipSave',
    buttonLink: 'https://klipsave.netlify.app',
    model: {
      type: 'phone',
      alt: 'Application KlipSave',
      textures: [
        {
          srcSet: `${klipsaveTexture} 375w`,
          placeholder: klipsaveTexture,
        },
      ],
    },
  },
  {
    id: 'project-7',
    title: 'CV Generator : Architecte de Carrière',
    description: 'Créez des CV professionnels et optimisés en quelques clics grâce à l\'IA et au cloud.',
    buttonText: 'Générer mon CV',
    buttonLink: 'https://cv-generator-bice-beta.vercel.app/',
    model: {
      type: 'laptop',
      alt: 'Dashboard CV Generator',
      textures: [
        {
          srcSet: `${cvGeneratorTexture} 1280w`,
          placeholder: cvGeneratorTexture,
        },
      ],
    },
  },
];
