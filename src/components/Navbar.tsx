import { useState } from "react";
import { Link, useLocation } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  BookOpen, GraduationCap, LayoutDashboard, Menu, X, LogIn, LogOut,
  Brain, Trophy, Newspaper, Phone, HelpCircle, Sun, Moon,
  User, Settings
} from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { label: "Subjects", path: "/subjects", icon: BookOpen },
    { label: "Practice", path: "/practice", icon: GraduationCap },
    { label: "Mock Exams", path: "/mock-exams", icon: HelpCircle },
    { label: "AI Tutor", path: "/ai-tutor", icon: Brain },
    { label: "Study Notes", path: "/study-notes", icon: Newspaper },
    { label: "Leaderboard", path: "/leaderboard", icon: Trophy },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-gradient-to-br from-[#0B5ED7] to-[#0a4bb8] rounded-lg flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-[#0B5ED7] to-[#198754] bg-clip-text text-transparent">
              WASSCE<span className="text-[#FFC107]">Prep</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive(link.path)
                    ? "bg-[#0B5ED7]/10 text-[#0B5ED7]"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-[#0B5ED7]"
                }`}
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>

            {user ? (
              <div className="flex items-center gap-2">
                <Link to="/dashboard">
                  <Button variant="ghost" size="sm" className="gap-1.5">
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </Button>
                </Link>
                <div className="flex items-center gap-2 pl-2 border-l border-gray-200 dark:border-gray-700">
                  {user.avatar ? (
                    <img src={user.avatar} alt="" className="w-8 h-8 rounded-full" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-[#0B5ED7] flex items-center justify-center text-white text-sm font-medium">
                      {user.name?.[0] || "S"}
                    </div>
                  )}
                  <Button variant="ghost" size="sm" onClick={logout} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="gap-1.5">
                    <LogIn className="w-4 h-4" />
                    Log In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm" className="gap-1.5 bg-[#0B5ED7] hover:bg-[#0a4bb8]">
                    <User className="w-4 h-4" />
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive(link.path)
                  ? "bg-[#0B5ED7]/10 text-[#0B5ED7]"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <link.icon className="w-4 h-4" />
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-gray-200 dark:border-gray-700 mt-2 space-y-1">
            <Link to="/blog" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
              <Newspaper className="w-4 h-4" /> Blog
            </Link>
            <Link to="/contact" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
              <Phone className="w-4 h-4" /> Contact
            </Link>
            <Link to="/about" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
              <Settings className="w-4 h-4" /> About
            </Link>
            {user ? (
              <>
                <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-[#0B5ED7] font-medium">
                  <LayoutDashboard className="w-4 h-4" /> Dashboard
                </Link>
                <button onClick={() => { logout(); setMobileOpen(false); }} className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-red-500 w-full hover:bg-red-50">
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </>
            ) : (
              <div className="flex gap-2 pt-2">
                <Link to="/login" onClick={() => setMobileOpen(false)} className="flex-1">
                  <Button variant="outline" className="w-full">Log In</Button>
                </Link>
                <Link to="/register" onClick={() => setMobileOpen(false)} className="flex-1">
                  <Button className="w-full bg-[#0B5ED7]">Get Started</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
