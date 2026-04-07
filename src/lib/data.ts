export interface Course {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  category: string;
  level: "Débutant" | "Intermédiaire" | "Avancé";
  duration: string;
  price: number;
  originalPrice?: number;
  image: string;
  instructor: string;
  rating: number;
  students: number;
  modules: Module[];
  objectives: string[];
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: "video" | "pdf" | "quiz";
}

export const categories = [
  "Toutes",
  "Développement Web",
  "Marketing Digital",
  "Design",
  "Business",
  "Data Science",
];

export const courses: Course[] = [
  {
    id: "1",
    title: "Développement Web Complet 2024",
    shortDescription: "Apprenez HTML, CSS, JavaScript et React de zéro à héros.",
    description: "Une formation complète pour maîtriser le développement web moderne. Vous apprendrez les fondamentaux du HTML, CSS et JavaScript, puis vous passerez à React pour créer des applications web interactives et performantes.",
    category: "Développement Web",
    level: "Débutant",
    duration: "40h",
    price: 49000,
    originalPrice: 89000,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop",
    instructor: "Rado Andrianarisoa",
    rating: 4.8,
    students: 1250,
    modules: [
      { id: "m1", title: "Introduction au Web", lessons: [
        { id: "l1", title: "Comment fonctionne Internet", duration: "15min", type: "video" },
        { id: "l2", title: "HTML : les bases", duration: "45min", type: "video" },
        { id: "l3", title: "Quiz HTML", duration: "10min", type: "quiz" },
      ]},
      { id: "m2", title: "CSS & Design", lessons: [
        { id: "l4", title: "CSS Fondamentaux", duration: "50min", type: "video" },
        { id: "l5", title: "Flexbox & Grid", duration: "40min", type: "video" },
        { id: "l6", title: "Responsive Design", duration: "35min", type: "video" },
      ]},
      { id: "m3", title: "JavaScript", lessons: [
        { id: "l7", title: "Variables & Types", duration: "30min", type: "video" },
        { id: "l8", title: "Fonctions & DOM", duration: "45min", type: "video" },
        { id: "l9", title: "Exercices pratiques", duration: "20min", type: "pdf" },
      ]},
    ],
    objectives: [
      "Créer des sites web responsives de A à Z",
      "Maîtriser HTML5, CSS3 et JavaScript ES6+",
      "Construire des applications avec React",
      "Déployer vos projets en ligne",
    ],
  },
  {
    id: "2",
    title: "Marketing Digital : Stratégie Complète",
    shortDescription: "Maîtrisez le SEO, les réseaux sociaux et la publicité en ligne.",
    description: "Formez-vous aux stratégies de marketing digital qui fonctionnent réellement. Du SEO aux publicités Facebook/Google, en passant par l'email marketing et les réseaux sociaux.",
    category: "Marketing Digital",
    level: "Intermédiaire",
    duration: "25h",
    price: 39000,
    originalPrice: 69000,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    instructor: "Nomena Rakoto",
    rating: 4.6,
    students: 890,
    modules: [
      { id: "m4", title: "Fondamentaux du Marketing Digital", lessons: [
        { id: "l10", title: "Introduction au Marketing Digital", duration: "20min", type: "video" },
        { id: "l11", title: "Définir sa stratégie", duration: "35min", type: "video" },
      ]},
      { id: "m5", title: "SEO & Référencement", lessons: [
        { id: "l12", title: "Les bases du SEO", duration: "40min", type: "video" },
        { id: "l13", title: "Optimisation on-page", duration: "30min", type: "video" },
      ]},
    ],
    objectives: [
      "Élaborer une stratégie digitale complète",
      "Optimiser votre référencement SEO",
      "Créer des campagnes publicitaires rentables",
      "Analyser vos performances avec Google Analytics",
    ],
  },
  {
    id: "3",
    title: "UI/UX Design : Du Concept au Prototype",
    shortDescription: "Créez des interfaces utilisateur modernes avec Figma.",
    description: "Apprenez à concevoir des interfaces utilisateur intuitives et esthétiques. De la recherche utilisateur aux prototypes interactifs avec Figma.",
    category: "Design",
    level: "Débutant",
    duration: "30h",
    price: 45000,
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop",
    instructor: "Hery Ratsimba",
    rating: 4.9,
    students: 670,
    modules: [
      { id: "m6", title: "Introduction au Design", lessons: [
        { id: "l14", title: "Principes du design UI/UX", duration: "25min", type: "video" },
        { id: "l15", title: "Recherche utilisateur", duration: "35min", type: "video" },
      ]},
    ],
    objectives: [
      "Maîtriser Figma pour le design d'interfaces",
      "Appliquer les principes UX à vos projets",
      "Créer des prototypes interactifs",
      "Construire un portfolio professionnel",
    ],
  },
  {
    id: "4",
    title: "Lancer son Business en Ligne",
    shortDescription: "De l'idée au premier client : guide complet pour entrepreneurs.",
    description: "Transformez votre idée en business rentable. Apprenez à valider votre concept, créer votre offre, trouver vos premiers clients et automatiser votre activité.",
    category: "Business",
    level: "Débutant",
    duration: "20h",
    price: 35000,
    originalPrice: 55000,
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop",
    instructor: "Tina Razafindrakoto",
    rating: 4.7,
    students: 1100,
    modules: [
      { id: "m7", title: "Trouver son idée", lessons: [
        { id: "l16", title: "Identifier un problème", duration: "20min", type: "video" },
        { id: "l17", title: "Valider son idée", duration: "30min", type: "video" },
      ]},
    ],
    objectives: [
      "Trouver et valider une idée de business",
      "Créer une offre irrésistible",
      "Acquérir vos premiers clients",
      "Automatiser votre activité",
    ],
  },
  {
    id: "5",
    title: "Python & Data Science",
    shortDescription: "Analysez des données et créez des modèles prédictifs avec Python.",
    description: "Maîtrisez Python pour la data science. De l'analyse exploratoire aux modèles de machine learning, en passant par la visualisation de données.",
    category: "Data Science",
    level: "Avancé",
    duration: "50h",
    price: 59000,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    instructor: "Andry Rajoelina",
    rating: 4.5,
    students: 450,
    modules: [
      { id: "m8", title: "Python pour la Data", lessons: [
        { id: "l18", title: "Introduction à Python", duration: "30min", type: "video" },
        { id: "l19", title: "NumPy & Pandas", duration: "45min", type: "video" },
      ]},
    ],
    objectives: [
      "Maîtriser Python pour l'analyse de données",
      "Utiliser Pandas, NumPy et Matplotlib",
      "Créer des modèles de machine learning",
      "Visualiser et présenter vos résultats",
    ],
  },
  {
    id: "6",
    title: "React Native : Applications Mobiles",
    shortDescription: "Créez des apps iOS et Android avec React Native.",
    description: "Développez des applications mobiles natives avec React Native. Une seule codebase pour iOS et Android.",
    category: "Développement Web",
    level: "Intermédiaire",
    duration: "35h",
    price: 52000,
    originalPrice: 79000,
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop",
    instructor: "Rado Andrianarisoa",
    rating: 4.7,
    students: 380,
    modules: [
      { id: "m9", title: "Introduction à React Native", lessons: [
        { id: "l20", title: "Setup & premier projet", duration: "25min", type: "video" },
        { id: "l21", title: "Composants de base", duration: "40min", type: "video" },
      ]},
    ],
    objectives: [
      "Créer des apps mobiles cross-platform",
      "Maîtriser les composants React Native",
      "Gérer la navigation et l'état",
      "Publier sur l'App Store et Google Play",
    ],
  },
];

export const testimonials = [
  {
    id: "1",
    name: "Miora R.",
    role: "Développeuse Web Junior",
    content: "Grâce à FormaPro, j'ai pu décrocher mon premier emploi en développement web en seulement 3 mois. Les cours sont clairs et pratiques !",
    avatar: "MR",
  },
  {
    id: "2",
    name: "Jean-Claude M.",
    role: "Entrepreneur",
    content: "La formation Business en ligne m'a donné toutes les clés pour lancer mon e-commerce. Je recommande vivement !",
    avatar: "JM",
  },
  {
    id: "3",
    name: "Faniry A.",
    role: "Designer UI/UX",
    content: "Le cours de design est incroyable. J'ai appris Figma de zéro et maintenant je travaille en freelance pour des clients internationaux.",
    avatar: "FA",
  },
];

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("fr-MG", {
    style: "decimal",
    minimumFractionDigits: 0,
  }).format(price) + " Ar";
}
