import errorPoster from '~/assets/security-lab.png';
import { Button } from '~/components/button';
import { DecoderText } from '~/components/decoder-text';
import { Heading } from '~/components/heading';
import { Text } from '~/components/text';
import { Transition } from '~/components/transition';
import styles from './error.module.css';
import { Image } from '~/components/image';

export function Error({ error }) {
  const flatlined = !error.status;

  const getMessage = () => {
    switch (error.status) {
      case 404:
        return {
          summary: 'Erreur 404',
          message:
            "Cette page est introuvable. Elle n'existe peut-être plus ou a été supprimée.",
        };
      case 405:
        return {
          summary: 'Méthode non autorisée',
          message: error.data,
        };
      default:
        return {
          summary: 'Erreur',
          message: error.statusText || error.data || error.toString(),
        };
    }
  };

  const { summary, message } = getMessage();

  return (
    <section className={styles.page}>
      {flatlined && (
        <style
          dangerouslySetInnerHTML={{
            __html: `
            [data-theme='dark'] {
              --primary: oklch(69.27% 0.242 25.41);
              --accent: oklch(69.27% 0.242 25.41);
            }
            [data-theme='light'] {
              --primary: oklch(56.29% 0.182 26.5);
              --accent: oklch(56.29% 0.182 26.5);
            }
          `,
          }}
        />
      )}
      <Transition in>
        {({ visible }) => (
          <>
            <div className={styles.details}>
              <div className={styles.text}>
                {!flatlined && (
                  <Heading
                    className={styles.title}
                    data-visible={visible}
                    level={0}
                    weight="bold"
                  >
                    {error.status}
                  </Heading>
                )}
                <Heading
                  className={styles.titleFlatline}
                  data-visible={visible}
                  level={2}
                  as="h1"
                >
                  <DecoderText text="ERREUR" start={visible} delay={300} />
                </Heading>
                {!flatlined && (
                  <Heading
                    aria-hidden
                    className={styles.subheading}
                    data-visible={visible}
                    as="h2"
                    level={4}
                  >
                    <DecoderText text={summary} start={visible} delay={300} />
                  </Heading>
                )}
                <Text className={styles.description} data-visible={visible} as="p">
                  {message}
                </Text>
                <Button
                  secondary
                  iconHoverShift
                  className={styles.button}
                  data-visible={visible}
                  href="/"
                  icon="chevron-right"
                >
                  Retourner à l'accueil
                </Button>
              </div>
            </div>

            <div className={styles.videoContainer} data-visible={visible}>
              <Image
                reveal
                cover
                noPauseButton
                delay={600}
                className={styles.video}
                src={errorPoster}
                placeholder={errorPoster}
              />
            </div>
          </>
        )}
      </Transition>
    </section>
  );
}
