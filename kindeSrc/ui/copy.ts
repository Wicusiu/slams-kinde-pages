/**
 * The page's own sentences. The widget's are translated by the identity
 * provider, in the language it was asked for; these follow the same
 * `request.locale.lang`, in the two languages the application speaks.
 *
 * Nothing here names the identity provider: who runs the sign-in is nobody's
 * business but ours.
 */

export type Variant = 'login' | 'register' | 'default';

export type Language = 'fr' | 'en';

export function languageOf(lang: string | undefined): Language {
  return lang?.toLowerCase().startsWith('fr') ? 'fr' : 'en';
}

interface Copy {
  kicker: string;
  display: Record<Variant, string>;
  lede: Record<Variant, string>;
  audiences: readonly string[];
  tagline: string;
  home: string;
  back: string;
  clubNote: string;
  clubLink: string;
}

export const COPY: Record<Language, Copy> = {
  fr: {
    kicker: 'Coaching tennis',
    display: {
      login: 'Le jeu se construit point par point.',
      register: 'Votre progression commence ici.',
      default: 'Le jeu se construit point par point.',
    },
    lede: {
      login:
        'Analyses d’entraînement, matchs, tests physiques et objectifs : ce que votre coach et vous suivez, au même endroit.',
      register:
        'Créez votre compte pour retrouver vos séances, vos matchs et les objectifs que votre coach vous fixe.',
      default:
        'Analyses d’entraînement, matchs, tests physiques et objectifs : ce que votre coach et vous suivez, au même endroit.',
    },
    audiences: ['Joueurs', 'Entraîneurs', 'Parents', 'Clubs'],
    tagline: 'SLAMS — la performance au service du jeu.',
    home: 'Accueil SLAMS',
    back: 'Retour à SLAMS',
    clubNote: 'Vous représentez un club ou une académie ?',
    clubLink: 'Inscrire ma structure',
  },
  en: {
    kicker: 'Tennis coaching',
    display: {
      login: 'The game is built point by point.',
      register: 'Your progress starts here.',
      default: 'The game is built point by point.',
    },
    lede: {
      login:
        'Practice analyses, matches, physical tests and goals: what you and your coach follow, in one place.',
      register:
        'Create your account to find your sessions, your matches and the goals your coach sets you.',
      default:
        'Practice analyses, matches, physical tests and goals: what you and your coach follow, in one place.',
    },
    audiences: ['Players', 'Coaches', 'Parents', 'Clubs'],
    tagline: 'SLAMS — performance in service of the game.',
    home: 'SLAMS home',
    back: 'Back to SLAMS',
    clubNote: 'Representing a club or an academy?',
    clubLink: 'Register my structure',
  },
};
