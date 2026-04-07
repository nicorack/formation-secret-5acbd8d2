import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Users, Award, Play, Star, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { CourseCard } from "@/components/CourseCard";
import { courses, testimonials, formatPrice } from "@/lib/data";
import heroBg from "@/assets/hero-bg.jpg";

const stats = [
  { icon: BookOpen, value: "50+", label: "Formations" },
  { icon: Users, value: "5 000+", label: "Apprenants" },
  { icon: Award, value: "95%", label: "Taux de satisfaction" },
  { icon: Play, value: "500h+", label: "De contenu vidéo" },
];

const Index = () => {
  const featuredCourses = courses.slice(0, 3);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden gradient-hero">
        <div className="absolute inset-0 opacity-20">
          <img src={heroBg} alt="" className="h-full w-full object-cover" width={1920} height={1080} />
        </div>
        <div className="absolute inset-0 gradient-hero opacity-80" />
        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <span className="mb-4 inline-block rounded-full bg-accent/20 px-4 py-1.5 text-sm font-medium text-accent">
              🚀 Nouvelle plateforme de formation
            </span>
            <h1 className="mb-6 font-display text-4xl font-bold leading-tight text-primary-foreground md:text-5xl lg:text-6xl">
              Développez vos <span className="text-accent">compétences</span> à votre rythme
            </h1>
            <p className="mb-8 text-lg text-primary-foreground/80 leading-relaxed max-w-lg">
              Accédez à des formations de qualité en développement, marketing, design et business. Apprenez avec des experts et boostez votre carrière.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="gradient-accent text-accent-foreground border-0 shadow-lg hover:opacity-90 font-semibold" asChild>
                <Link to="/formations">
                  Explorer les formations
                  <ArrowRight className="ml-2" size={18} />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                <Link to="/a-propos">En savoir plus</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative -mt-12 z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="rounded-xl bg-card p-5 text-center shadow-card border border-border"
              >
                <stat.icon className="mx-auto mb-2 text-accent" size={24} />
                <p className="font-display text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-3 font-display text-3xl font-bold text-foreground">
              Formations <span className="text-accent">populaires</span>
            </h2>
            <p className="mx-auto max-w-md text-muted-foreground">
              Découvrez nos formations les plus suivies et commencez votre apprentissage dès aujourd'hui.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredCourses.map((course, i) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <CourseCard course={course} />
              </motion.div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button variant="outline" size="lg" asChild>
              <Link to="/formations">
                Voir toutes les formations
                <ArrowRight className="ml-2" size={16} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="bg-secondary/50 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-3 font-display text-3xl font-bold text-foreground">
              Pourquoi <span className="text-accent">FormaPro</span> ?
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Contenu de qualité", desc: "Des formations créées par des experts avec du contenu pratique et à jour." },
              { title: "Accès à vie", desc: "Achetez une fois, accédez pour toujours. Apprenez à votre rythme." },
              { title: "Certificats", desc: "Obtenez un certificat de fin de formation pour valoriser vos compétences." },
              { title: "Support dédié", desc: "Une équipe disponible pour répondre à toutes vos questions." },
              { title: "Mobile friendly", desc: "Apprenez partout depuis votre téléphone, tablette ou ordinateur." },
              { title: "Paiement facile", desc: "Payez par Mobile Money, carte bancaire ou virement en toute sécurité." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="flex gap-4 rounded-xl bg-card p-6 shadow-card border border-border"
              >
                <CheckCircle className="mt-0.5 shrink-0 text-accent" size={20} />
                <div>
                  <h3 className="mb-1 font-display font-semibold text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-3 font-display text-3xl font-bold text-foreground">
              Ce que disent nos <span className="text-accent">apprenants</span>
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="rounded-xl bg-card p-6 shadow-card border border-border"
              >
                <div className="mb-4 flex gap-1">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={14} className="text-warning fill-warning" />
                  ))}
                </div>
                <p className="mb-4 text-sm text-muted-foreground leading-relaxed italic">
                  "{t.content}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full gradient-hero text-xs font-bold text-primary-foreground">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="gradient-hero py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 font-display text-3xl font-bold text-primary-foreground">
            Prêt à commencer ?
          </h2>
          <p className="mx-auto mb-8 max-w-md text-primary-foreground/80">
            Rejoignez des milliers d'apprenants et développez les compétences qui feront la différence.
          </p>
          <Button size="lg" className="gradient-accent text-accent-foreground border-0 shadow-lg hover:opacity-90 font-semibold" asChild>
            <Link to="/formations">
              Découvrir les formations
              <ArrowRight className="ml-2" size={18} />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
