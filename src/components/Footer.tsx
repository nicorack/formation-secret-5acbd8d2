import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";

export function Footer() {
  const navLinks = [
    { label: "Accueil", to: "/" },
    { label: "Formations", to: "/formations" },
    { label: "À propos", to: "/a-propos" },
    { label: "Contact", to: "/contact" },
  ];

  const supportLinks = [
    { label: "FAQ", to: "/faq" },
    { label: "Conditions d'utilisation", to: "/" },
    { label: "Politique de confidentialité", to: "/" },
  ];

  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
                <span className="text-sm font-bold text-accent-foreground font-display">F</span>
              </div>
              <span className="text-lg font-bold font-display">FormaPro</span>
            </div>
            <p className="text-sm text-primary-foreground/70 leading-relaxed">
              Plateforme de formation en ligne pour développer vos compétences digitales et booster votre carrière.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="mb-4 text-sm font-semibold font-display uppercase tracking-wider text-primary-foreground/50">Navigation</h4>
            <ul className="space-y-2">
              {navLinks.map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="mb-4 text-sm font-semibold font-display uppercase tracking-wider text-primary-foreground/50">Support</h4>
            <ul className="space-y-2">
              {supportLinks.map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-sm font-semibold font-display uppercase tracking-wider text-primary-foreground/50">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-primary-foreground/70">
                <Mail size={14} className="text-accent shrink-0" />
                <a href="mailto:secretia@gmail.com" className="hover:text-accent transition-colors">secretia@gmail.com</a>
              </li>
              <li className="flex items-center gap-2 text-sm text-primary-foreground/70">
                <Phone size={14} className="text-accent shrink-0" />
                <a href="tel:+261382696825" className="hover:text-accent transition-colors">038 26 968 25</a>
              </li>
              <li className="flex items-center gap-2 text-sm text-primary-foreground/70">
                <MapPin size={14} className="text-accent shrink-0" />
                Fianarantsoa, Madagascar
              </li>
            </ul>
            <a
              href="https://wa.me/261382696825"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-accent transition-colors"
            >
              <MessageCircle size={14} className="text-accent" /> WhatsApp
            </a>
          </div>
        </div>

        <div className="mt-10 border-t border-primary-foreground/10 pt-6 text-center">
          <p className="text-xs text-primary-foreground/50">
            © {new Date().getFullYear()} FormaPro. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
