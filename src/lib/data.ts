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
  "Trading",
  "Chatbot & Automatisation",
  "Création de site web",
  "Signaux Trading",
];

export const courses: Course[] = [
  {
    id: "1",
    title: "Formation Trading",
    shortDescription: "Apprenez les bases et les stratégies avancées du trading pour devenir rentable.",
    description: "Une formation complète sur le trading : analyse technique, gestion du risque, psychologie du trader, et stratégies rentables. Idéal pour les débutants comme les intermédiaires souhaitant maîtriser les marchés financiers.",
    category: "Trading",
    level: "Débutant",
    duration: "20h",
    price: 50000,
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop",
    instructor: "Admin",
    rating: 4.8,
    students: 320,
    modules: [
      { id: "m1", title: "Introduction au Trading", lessons: [
        { id: "l1", title: "Qu'est-ce que le trading ?", duration: "15min", type: "video" },
        { id: "l2", title: "Les marchés financiers", duration: "20min", type: "video" },
        { id: "l3", title: "Quiz introduction", duration: "10min", type: "quiz" },
      ]},
      { id: "m2", title: "Analyse Technique", lessons: [
        { id: "l4", title: "Les chandeliers japonais", duration: "30min", type: "video" },
        { id: "l5", title: "Supports et résistances", duration: "25min", type: "video" },
        { id: "l6", title: "Les indicateurs techniques", duration: "35min", type: "video" },
      ]},
      { id: "m3", title: "Gestion du risque", lessons: [
        { id: "l7", title: "Money management", duration: "20min", type: "video" },
        { id: "l8", title: "Psychologie du trader", duration: "25min", type: "video" },
        { id: "l9", title: "Plan de trading", duration: "15min", type: "pdf" },
      ]},
    ],
    objectives: [
      "Comprendre les marchés financiers",
      "Maîtriser l'analyse technique",
      "Gérer votre risque efficacement",
      "Élaborer un plan de trading rentable",
    ],
  },
  {
    id: "2",
    title: "Création Chatbot Facebook",
    shortDescription: "Créez un chatbot Facebook Messenger automatisé pour votre business.",
    description: "Apprenez à créer des chatbots Facebook Messenger puissants pour automatiser votre service client, générer des leads et booster vos ventes. Aucune compétence en code requise.",
    category: "Chatbot & Automatisation",
    level: "Débutant",
    duration: "10h",
    price: 30000,
    image: "https://images.unsplash.com/photo-1531746790095-e5995efe2704?w=600&h=400&fit=crop",
    instructor: "Admin",
    rating: 4.7,
    students: 540,
    modules: [
      { id: "m4", title: "Les bases du chatbot", lessons: [
        { id: "l10", title: "Pourquoi un chatbot ?", duration: "10min", type: "video" },
        { id: "l11", title: "Choisir sa plateforme", duration: "15min", type: "video" },
      ]},
      { id: "m5", title: "Création pas à pas", lessons: [
        { id: "l12", title: "Configuration du bot", duration: "30min", type: "video" },
        { id: "l13", title: "Scénarios automatisés", duration: "25min", type: "video" },
        { id: "l14", title: "Intégration Messenger", duration: "20min", type: "video" },
      ]},
    ],
    objectives: [
      "Créer un chatbot sans coder",
      "Automatiser le service client",
      "Générer des leads automatiquement",
      "Intégrer le chatbot à votre page Facebook",
    ],
  },
  {
    id: "3",
    title: "Création Site Web sur IA",
    shortDescription: "Créez un site web professionnel en utilisant les outils d'intelligence artificielle.",
    description: "Découvrez comment utiliser l'IA pour créer des sites web professionnels rapidement et sans coder. Apprenez les meilleurs outils IA, le design, et le déploiement de votre site.",
    category: "Création de site web",
    level: "Débutant",
    duration: "15h",
    price: 40000,
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&h=400&fit=crop",
    instructor: "Admin",
    rating: 4.9,
    students: 280,
    modules: [
      { id: "m6", title: "Introduction à l'IA pour le web", lessons: [
        { id: "l15", title: "Les outils IA disponibles", duration: "20min", type: "video" },
        { id: "l16", title: "Choisir le bon outil", duration: "15min", type: "video" },
      ]},
      { id: "m7", title: "Création du site", lessons: [
        { id: "l17", title: "Design avec l'IA", duration: "30min", type: "video" },
        { id: "l18", title: "Personnalisation avancée", duration: "25min", type: "video" },
        { id: "l19", title: "Déploiement en ligne", duration: "20min", type: "video" },
      ]},
    ],
    objectives: [
      "Utiliser l'IA pour créer un site web",
      "Concevoir un design professionnel",
      "Personnaliser votre site sans coder",
      "Déployer et mettre en ligne votre site",
    ],
  },
  {
    id: "4",
    title: "Signal Trading 7/7",
    shortDescription: "Recevez des signaux de trading fiables 7 jours sur 7 avec analyses détaillées.",
    description: "Accédez à un service de signaux de trading quotidiens, 7 jours sur 7. Chaque signal est accompagné d'une analyse technique détaillée, des niveaux d'entrée, de stop loss et de take profit.",
    category: "Signaux Trading",
    level: "Intermédiaire",
    duration: "Accès continu",
    price: 60000,
    image: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=600&h=400&fit=crop",
    instructor: "Admin",
    rating: 4.6,
    students: 750,
    modules: [
      { id: "m8", title: "Comment utiliser les signaux", lessons: [
        { id: "l20", title: "Introduction aux signaux", duration: "10min", type: "video" },
        { id: "l21", title: "Lire un signal correctement", duration: "15min", type: "video" },
        { id: "l22", title: "Gérer ses positions", duration: "20min", type: "video" },
      ]},
      { id: "m9", title: "Signaux en direct", lessons: [
        { id: "l23", title: "Accès aux signaux quotidiens", duration: "Continu", type: "video" },
        { id: "l24", title: "Analyses hebdomadaires", duration: "30min", type: "video" },
      ]},
    ],
    objectives: [
      "Comprendre et utiliser les signaux de trading",
      "Exécuter des trades rentables",
      "Gérer vos positions efficacement",
      "Suivre les analyses quotidiennes",
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
