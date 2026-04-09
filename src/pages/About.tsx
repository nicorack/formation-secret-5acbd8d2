import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";
import { Target, Users, Award, Lightbulb } from "lucide-react";

const values = [
  { icon: Target, title: "Excellence", desc: "Des formations de qualité conçues par des experts du domaine." },
  { icon: Users, title: "Accessibilité", desc: "Un apprentissage accessible à tous, où que vous soyez à Madagascar." },
  { icon: Award, title: "Certification", desc: "Des certificats reconnus pour valoriser vos compétences." },
  { icon: Lightbulb, title: "Innovation", desc: "Des méthodes pédagogiques modernes et interactives." },
];

const About = () => (
  <Layout>
    <section className="gradient-hero py-16">
      <div className="container mx-auto px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-3xl font-bold text-primary-foreground md:text-4xl"
        >
          À propos de FormaPro
        </motion.h1>
        <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/80">
          FormaPro est une plateforme de formation en ligne basée à Fianarantsoa, Madagascar.
          Notre mission est de rendre l'éducation digitale accessible à tous les Malgaches.
        </p>
      </div>
    </section>

    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl space-y-6 text-muted-foreground leading-relaxed">
          <h2 className="font-display text-2xl font-bold text-foreground">Notre mission</h2>
          <p>
            Chez FormaPro, nous croyons que chacun mérite d'avoir accès à une éducation de qualité.
            C'est pourquoi nous proposons des formations en ligne dans les domaines du trading,
            de la création de chatbots, du développement web par IA, et bien plus encore.
          </p>
          <p>
            Nos cours sont conçus pour être pratiques et orientés résultats. Que vous soyez débutant
            ou expérimenté, nos formations vous accompagnent étape par étape vers la maîtrise de
            nouvelles compétences digitales.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-4xl gap-6 sm:grid-cols-2">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="rounded-xl border border-border bg-card p-6"
            >
              <v.icon size={28} className="mb-3 text-accent" />
              <h3 className="font-display font-semibold text-foreground">{v.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default About;
