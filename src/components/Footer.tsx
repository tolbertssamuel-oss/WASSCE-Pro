import { Link } from "react-router";
import { GraduationCap, Mail, Phone, MapPin, Facebook, Twitter, Youtube, Instagram, Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 bg-gradient-to-br from-[#0B5ED7] to-[#0a4bb8] rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                WASSCE<span className="text-[#FFC107]">Prep</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Liberia's premier WASSCE preparation platform. Helping students achieve excellence through practice, analytics, and AI-powered learning.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Youtube, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-[#0B5ED7] transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { label: "Subjects", path: "/subjects" },
                { label: "Practice Questions", path: "/practice" },
                { label: "Mock Exams", path: "/mock-exams" },
                { label: "Study Notes", path: "/study-notes" },
                { label: "AI Tutor", path: "/ai-tutor" },
                { label: "Leaderboard", path: "/leaderboard" },
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-gray-400 hover:text-[#FFC107] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2.5">
              {[
                { label: "Blog", path: "/blog" },
                { label: "About Us", path: "/about" },
                { label: "Contact", path: "/contact" },
                { label: "FAQ", path: "/faq" },
                { label: "Privacy Policy", path: "/privacy" },
                { label: "Terms of Service", path: "/terms" },
              ].map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="text-sm text-gray-400 hover:text-[#FFC107] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#0B5ED7] mt-0.5 shrink-0" />
                <span className="text-sm text-gray-400">Monrovia, Liberia</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#0B5ED7] shrink-0" />
                <span className="text-sm text-gray-400">+231 77 123 4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#0B5ED7] shrink-0" />
                <span className="text-sm text-gray-400">info@wassceprep.lr</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            &copy; {currentYear} Liberia WASSCE Prep. All rights reserved.
          </p>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> for Liberian students
          </p>
        </div>
      </div>
    </footer>
  );
}
