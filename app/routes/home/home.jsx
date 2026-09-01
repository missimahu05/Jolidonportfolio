import { Footer } from '~/components/footer';
import { baseMeta } from '~/utils/meta';
import { Intro } from './intro';
import { Profile } from './profile';
import { ProjectSummary } from './project-summary';
import { ProjectArchive } from './project-archive';
import { useEffect, useRef, useState } from 'react';
import config from '~/config.json';
import { projects } from '~/data/projects';
import styles from './home.module.css';

// Prefetch draco decoader wasm
export const links = () => {
  return [
    {
      rel: 'prefetch',
      href: '/draco/draco_wasm_wrapper.js',
      as: 'script',
      type: 'text/javascript',
      importance: 'low',
    },
    {
      rel: 'prefetch',
      href: '/draco/draco_decoder.wasm',
      as: 'fetch',
      type: 'application/wasm',
      importance: 'low',
    },
  ];
};

export const meta = () => {
  return baseMeta({
    title: 'Développeur Full-Stack & UI/UX Designer | JjTech\'s',
    description: `Portfolio de ${config.name} — Développeur Full-Stack, Designer UI/UX et Expert en solutions Web & Mobile à Parakou, Bénin. Architecte de solutions numériques innovantes.`,
    ogImage: `${config.url}/profile-jolidon.jpeg`,
  });
};

export const Home = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const intro = useRef();
  const details = useRef();
  
  // Create refs for projects dynamically
  const projectRefs = useRef([]);
  if (projectRefs.current.length !== projects.length) {
    projectRefs.current = projects.map(() => ({ current: null }));
  }

  useEffect(() => {
    const sections = [intro, ...projectRefs.current, details];

    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const section = entry.target;
            observer.unobserve(section);
            if (visibleSections.includes(section)) return;
            setVisibleSections(prevSections => [...prevSections, section]);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    const indicatorObserver = new IntersectionObserver(
      ([entry]) => {
        setScrollIndicatorHidden(!entry.isIntersecting);
      },
      { rootMargin: '-100% 0px 0px 0px' }
    );

    sections.forEach(section => {
      if (section.current) {
        sectionObserver.observe(section.current);
      }
    });

    indicatorObserver.observe(intro.current);

    return () => {
      sectionObserver.disconnect();
      indicatorObserver.disconnect();
    };
  }, [visibleSections]);

  return (
    <div className={styles.home}>
      <Intro
        id="intro"
        sectionRef={intro}
        scrollIndicatorHidden={scrollIndicatorHidden}
      />
      
      {projects.map((project, index) => (
        <ProjectSummary
          key={project.id}
          id={project.id}
          index={index + 1}
          alternate={project.alternate}
          sectionRef={projectRefs.current[index]}
          visible={visibleSections.includes(projectRefs.current[index]?.current)}
          title={project.title}
          description={project.description}
          buttonText={project.buttonText}
          buttonLink={project.buttonLink}
          model={project.model}
        />
      ))}

      <Profile
        sectionRef={details}
        visible={visibleSections.includes(details.current)}
        id="details"
      />
      <Footer />
    </div>
  );
};
