import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Users, Star, BookOpen, Play, FileText, HelpCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Layout } from "@/components/Layout";
import { courses, formatPrice } from "@/lib/data";

const typeIcons = {
  video: Play,
  pdf: FileText,
  quiz: HelpCircle,
};

const FormationDetail = () => {
  const { id } = useParams();
  const course = courses.find((c) => c.id === id);

  if (!course) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="mb-4 font-display text-2xl font-bold text-foreground">Formation non trouvée</h1>
          <Button asChild><Link to="/formations">Retour au catalogue</Link></Button>
        </div>
      </Layout>
    );
  }

  const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);

  return (
    <Layout>
      {/* Header */}
      <section className="gradient-hero py-12 md:py-16">
        <div className="container mx-auto px-4">
          <Link to="/formations" className="mb-6 inline-flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
            <ArrowLeft size={16} /> Retour aux formations
          </Link>
          <div className="grid gap-8 lg:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-2"
            >
              <Badge className="mb-3 bg-accent/20 text-accent border-accent/30">{course.category}</Badge>
              <h1 className="mb-4 font-display text-3xl font-bold text-primary-foreground md:text-4xl leading-tight">
                {course.title}
              </h1>
              <p className="mb-6 text-primary-foreground/80 leading-relaxed">{course.description}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-primary-foreground/70">
                <span className="flex items-center gap-1"><Star size={14} className="text-warning fill-warning" /> {course.rating}</span>
                <span className="flex items-center gap-1"><Users size={14} /> {course.students} apprenants</span>
                <span className="flex items-center gap-1"><Clock size={14} /> {course.duration}</span>
                <span className="flex items-center gap-1"><BookOpen size={14} /> {totalLessons} leçons</span>
                <Badge variant="outline" className="border-primary-foreground/30 text-primary-foreground">{course.level}</Badge>
              </div>
              <p className="mt-3 text-sm text-primary-foreground/60">Par {course.instructor}</p>
            </motion.div>

            {/* Price card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-xl bg-card p-6 shadow-card-hover border border-border self-start"
            >
              <div className="mb-4">
                {course.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    {formatPrice(course.originalPrice)}
                  </span>
                )}
                <p className="text-3xl font-bold font-display text-accent">{formatPrice(course.price)}</p>
              </div>
              <Button className="w-full gradient-accent text-accent-foreground border-0 font-semibold shadow-lg hover:opacity-90" size="lg">
                Acheter la formation
              </Button>
              <p className="mt-3 text-center text-xs text-muted-foreground">Accès à vie • Certificat inclus</p>
              <div className="mt-4 rounded-lg bg-secondary p-4">
                <p className="mb-2 text-sm font-semibold text-foreground">Ce cours inclut :</p>
                <ul className="space-y-1.5 text-xs text-muted-foreground">
                  <li className="flex items-center gap-2"><Play size={12} className="text-accent" /> {course.duration} de vidéo</li>
                  <li className="flex items-center gap-2"><FileText size={12} className="text-accent" /> Supports PDF téléchargeables</li>
                  <li className="flex items-center gap-2"><HelpCircle size={12} className="text-accent" /> Quiz et exercices</li>
                  <li className="flex items-center gap-2"><CheckCircle size={12} className="text-accent" /> Certificat de fin</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-12">
              {/* Objectives */}
              <div>
                <h2 className="mb-4 font-display text-xl font-bold text-foreground">Objectifs pédagogiques</h2>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {course.objectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle size={16} className="mt-0.5 shrink-0 text-accent" />
                      {obj}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Programme */}
              <div>
                <h2 className="mb-4 font-display text-xl font-bold text-foreground">Programme de la formation</h2>
                <div className="space-y-3">
                  {course.modules.map((mod, mi) => (
                    <div key={mod.id} className="rounded-xl border border-border bg-card overflow-hidden">
                      <div className="flex items-center justify-between bg-secondary px-5 py-3">
                        <h3 className="font-display font-semibold text-foreground text-sm">
                          Module {mi + 1} : {mod.title}
                        </h3>
                        <span className="text-xs text-muted-foreground">{mod.lessons.length} leçons</span>
                      </div>
                      <ul className="divide-y divide-border">
                        {mod.lessons.map((lesson) => {
                          const Icon = typeIcons[lesson.type];
                          return (
                            <li key={lesson.id} className="flex items-center gap-3 px-5 py-3">
                              <Icon size={14} className="shrink-0 text-accent" />
                              <span className="flex-1 text-sm text-foreground">{lesson.title}</span>
                              <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cover image */}
              <div className="rounded-xl overflow-hidden border border-border">
                <img src={course.image} alt={course.title} className="w-full object-cover aspect-video" loading="lazy" width={800} height={450} />
              </div>
            </div>

            {/* Sticky sidebar (desktop) */}
            <div className="hidden lg:block" />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default FormationDetail;
