import profileImg from '~/assets/profile-jolidon.jpeg';
import { Button } from '~/components/button';
import { DecoderText } from '~/components/decoder-text';
import { Divider } from '~/components/divider';
import { Heading } from '~/components/heading';
import { Image } from '~/components/image';
import { Link } from '~/components/link';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { Transition } from '~/components/transition';
import { Fragment, useState } from 'react';
import { media } from '~/utils/style';
import katakana from './katakana.svg';
import styles from './profile.module.css';

const ProfileText = ({ visible, titleId }) => (
  <Fragment>
    <Heading className={styles.title} data-visible={visible} level={3} id={titleId}>
      <DecoderText text="Salut !" start={visible} delay={500} />
    </Heading>
    <Text className={styles.description} data-visible={visible} size="l" as="p">
      Je suis Jolidon HOUNGUE, CEO de JjTech's et Architecte Numérique. Ma mission est de transformer des visions audacieuses en réalités technologiques percutantes, en fusionnant innovation stratégique et excellence technique.
    </Text>
    <Text className={styles.description} data-visible={visible} size="l" as="p">
      En dehors du code, je m'immerge dans l'univers du mannequinat et de la veille technologique, cherchant toujours à allier créativité et précision. Si vous avez un projet hors du commun en tête, parlons-en !
    </Text>
    <div 
      className="badge-base LI-profile-badge" 
      data-locale="fr_FR" 
      data-size="medium" 
      data-theme="dark" 
      data-type="VERTICAL" 
      data-vanity="jolidon-houngue" 
      data-version="v1"
      style={{ marginTop: '20px' }}
    >
      <a className="badge-base__link LI-simple-link" href="https://bj.linkedin.com/in/jolidon-houngue?trk=profile-badge">
        Jolidon Houngue
      </a>
    </div>
  </Fragment>
);

export const Profile = ({ id, visible, sectionRef }) => {
  const [focused, setFocused] = useState(false);
  const titleId = `${id}-title`;

  return (
    <Section
      className={styles.profile}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      as="section"
      id={id}
      ref={sectionRef}
      aria-labelledby={titleId}
      tabIndex={-1}
    >
      <Transition in={visible || focused} timeout={0}>
        {({ visible, nodeRef }) => (
          <div className={styles.content} ref={nodeRef}>
            <div className={styles.column}>
              <ProfileText visible={visible} titleId={titleId} />
              <Button
                secondary
                className={styles.button}
                data-visible={visible}
                href="/contact"
                icon="send"
              >
                Envoyez-moi un message
              </Button>
            </div>
            <div className={styles.column}>
              <div className={styles.tag} aria-hidden>
                <Divider
                  notchWidth="64px"
                  notchHeight="8px"
                  collapsed={!visible}
                  collapseDelay={1000}
                />
                <div className={styles.tagText} data-visible={visible}>
                  À propos de moi
                </div>
              </div>
              <div className={styles.image}>
                <Image
                  reveal
                  delay={100}
                  placeholder={profileImg}
                  srcSet={`${profileImg} 480w, ${profileImg} 960w`}
                  width={960}
                  height={1280}
                  sizes={`(max-width: ${media.mobile}px) 100vw, 480px`}
                  alt="Jolidon HOUNGUE M. Jolidon"
                />
                <div className={styles.verticalText} data-visible={visible}>
                  建築家
                </div>
              </div>
            </div>
          </div>
        )}
      </Transition>
    </Section>
  );
};
