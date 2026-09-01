import { Heading } from '~/components/heading';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { Transition } from '~/components/transition';
import { Divider } from '~/components/divider';
import { useTheme } from '~/components/theme-provider';
import { cssProps } from '~/utils/style';
import styles from './project-archive.module.css';

const archiveProjects = [
  {
    title: 'Aziza : Jeu Social',
    description: 'Une plateforme de jeu en temps réel avec intégration de sockets pour une interactivité maximale.',
    tags: ['React', 'Node.js', 'Socket.io', 'Framer Motion'],
    link: 'https://portfolio-jolidon-v2.vercel.app',
    device: 'laptop',
    code: 'OPS-AZIZA-402'
  },
  {
    title: 'KlipSave Media Gateway',
    description: 'Système de gestion et de téléchargement de médias multi-plateformes avec architecture microservices.',
    tags: ['Next.js', 'Docker', 'Redis', 'Cloudinary'],
    link: 'https://portfolio-jolidon-v2.vercel.app',
    device: 'phone',
    code: 'OPS-KLIP-105'
  },
  {
    title: 'NeuralShield Security',
    description: 'Interface de monitoring de sécurité cybernétique avec visualisation de données en temps réel.',
    tags: ['Three.js', 'WebGL', 'Security', 'React'],
    link: 'https://portfolio-jolidon-v2.vercel.app',
    device: 'laptop',
    code: 'OPS-SHIELD-999'
  }
];

export function ProjectArchive({ id, sectionRef, visible }) {
  const { theme } = useTheme();

  return (
    <Section
      className={styles.archive}
      as="section"
      id={id}
      ref={sectionRef}
      tabIndex={-1}
    >
      <div className={styles.content}>
        <Transition in={visible}>
          {({ visible: transitionVisible }) => (
            <>
              <Heading
                level={3}
                as="h2"
                className={styles.title}
                data-visible={transitionVisible}
              >
                Projets Archivés
              </Heading>
              <Text className={styles.subtitle} data-visible={transitionVisible}>
                Une sélection d'expérimentations passées et de systèmes opérationnels.
              </Text>
              
              <div className={styles.grid}>
                {archiveProjects.map((project, index) => (
                  <div 
                    key={project.title} 
                    className={styles.card} 
                    data-visible={transitionVisible}
                    style={cssProps({ delay: `${index * 200 + 400}ms` })}
                  >
                    <div className={styles.mockupContainer}>
                      <div className={styles.mockup} data-device={project.device}>
                        <div className={styles.screen}>
                          <div className={styles.scanningLine} />
                          <div className={styles.screenContent}>
                            <div className={styles.projectIdentity}>
                              <span className={styles.codeLine}>{project.code}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className={styles.cardDetails}>
                      <div className={styles.cardHeader}>
                        <Heading level={4} as="h3" className={styles.cardTitle}>
                          {project.title}
                        </Heading>
                        <div className={styles.tags}>
                          {project.tags.map(tag => (
                            <span key={tag} className={styles.tag}>{tag}</span>
                          ))}
                        </div>
                      </div>
                      <Text className={styles.cardDescription}>
                        {project.description}
                      </Text>
                      <a href={project.link} className={styles.cardLink} target="_blank" rel="noopener noreferrer">
                        DÉCRYPTER
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </Transition>
      </div>
    </Section>
  );
}
