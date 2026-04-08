export const categories = [
  "Toutes",
  "Trading",
  "Chatbot & Automatisation",
  "Création de site web",
  "Signaux Trading",
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
