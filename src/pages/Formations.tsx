import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Layout } from "@/components/Layout";
import { CourseCard } from "@/components/CourseCard";
import { courses, categories } from "@/lib/data";

const Formations = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Toutes");

  const filtered = useMemo(() => {
    return courses.filter((c) => {
      const matchesSearch =
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.shortDescription.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        activeCategory === "Toutes" || c.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  return (
    <Layout>
      {/* Header */}
      <section className="gradient-hero py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 font-display text-3xl font-bold text-primary-foreground md:text-4xl">
            Nos <span className="text-accent">formations</span>
          </h1>
          <p className="mx-auto mb-8 max-w-md text-primary-foreground/80">
            Trouvez la formation qui correspond à vos objectifs et commencez votre parcours d'apprentissage.
          </p>
          <div className="mx-auto max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              placeholder="Rechercher une formation..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-card border-border"
            />
          </div>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Category filters */}
          <div className="mb-8 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? "gradient-accent text-accent-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-muted"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Results */}
          {filtered.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-muted-foreground">Aucune formation trouvée.</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((course, i) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                >
                  <CourseCard course={course} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Formations;
