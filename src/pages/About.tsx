import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { GraduationCap, Target, Heart, Users, BookOpen, Award, Globe, Lightbulb } from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";

const values = [
  { icon: Target, title: "Excellence", desc: "We strive for the highest quality educational content aligned with WASSCE standards.", color: "#0B5ED7" },
  { icon: Heart, title: "Accessibility", desc: "Education should be accessible to every Liberian student, regardless of background.", color: "#DC3545" },
  { icon: Lightbulb, title: "Innovation", desc: "We use AI and modern technology to make learning more effective and engaging.", color: "#FFC107" },
  { icon: Users, title: "Community", desc: "Building a supportive learning community for students across Liberia.", color: "#198754" },
];

const team = [
  { name: "Dr. Samuel Tolbert", role: "Founder & CEO", init: "ST", color: "#0B5ED7" },
  { name: "Prof. Grace Kollie", role: "Head of Academics", init: "GK", color: "#198754" },
  { name: "Mr. James Doe", role: "Lead Developer", init: "JD", color: "#DC3545" },
  { name: "Ms. Faith Weah", role: "Content Director", init: "FW", color: "#6F42C1" },
];

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />

      <section className="bg-gradient-to-br from-[#0B5ED7] to-[#0a4bb8] text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="w-16 h-16 bg-white/15 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <GraduationCap className="w-8 h-8" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">About Liberia WASSCE Prep</h1>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto">
              Empowering Liberian students with world-class WASSCE preparation tools and resources
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
            <div className="w-10 h-10 rounded-xl bg-[#0B5ED7]/10 flex items-center justify-center mb-4">
              <Target className="w-5 h-5 text-[#0B5ED7]" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Our Mission</h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              To provide every Liberian senior secondary school student with access to high-quality WASSCE preparation materials, 
              personalized learning experiences, and AI-powered tutoring that helps them achieve academic excellence and secure 
              a brighter future.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
            <div className="w-10 h-10 rounded-xl bg-[#198754]/10 flex items-center justify-center mb-4">
              <Globe className="w-5 h-5 text-[#198754]" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Our Vision</h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              To become the leading digital education platform in West Africa, transforming how students prepare for critical 
              examinations by leveraging technology, data-driven insights, and community support to dramatically improve 
              WASSCE pass rates across Liberia.
            </p>
          </motion.div>
        </div>

        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Our Core Values</h2>
          <p className="text-gray-500 dark:text-gray-400">The principles that guide everything we do</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 text-center"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: `${v.color}15` }}>
                <v.icon className="w-6 h-6" style={{ color: v.color }} />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{v.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{v.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Our Team</h2>
          <p className="text-gray-500 dark:text-gray-400">Passionate educators and technologists</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 text-center"
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-lg font-semibold" style={{ backgroundColor: member.color }}>
                {member.init}
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">{member.name}</h3>
              <p className="text-sm text-gray-500">{member.role}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Partners & Affiliations</h2>
          <p className="text-gray-500 dark:text-gray-400">Working together for better education</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {["WAEC Liberia", "Ministry of Education", "University of Liberia", "Cuttington University"].map((name) => (
            <div key={name} className="bg-white dark:bg-gray-900 rounded-xl p-5 border border-gray-100 dark:border-gray-800 text-center">
              <div className="w-10 h-10 rounded-lg bg-[#0B5ED7]/10 flex items-center justify-center mx-auto mb-2">
                <Award className="w-5 h-5 text-[#0B5ED7]" />
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{name}</span>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-[#0B5ED7] to-[#198754] rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-3">Join Our Mission</h2>
          <p className="text-blue-100 mb-6 max-w-lg mx-auto">
            Whether you're a student, teacher, or education advocate, there's a place for you in our community.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/register">
              <Button className="bg-white text-[#0B5ED7] hover:bg-blue-50 gap-2">
                <GraduationCap className="w-4 h-4" /> Get Started
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 gap-2">
                <BookOpen className="w-4 h-4" /> Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
