import { useState } from "react";
import { motion } from "framer-motion";
import { trpc } from "@/providers/trpc";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare, Clock } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const submitMutation = trpc.contact.submit.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    await submitMutation.mutateAsync(form);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Contact Us</h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Have questions or feedback? We'd love to hear from you
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="space-y-4">
            {[
              { icon: MapPin, title: "Address", desc: "Monrovia, Liberia", color: "#0B5ED7" },
              { icon: Phone, title: "Phone", desc: "+231 77 123 4567", color: "#198754" },
              { icon: Mail, title: "Email", desc: "info@wassceprep.lr", color: "#DC3545" },
              { icon: Clock, title: "Hours", desc: "Mon - Sat: 8AM - 6PM", color: "#FFC107" },
            ].map((item) => (
              <div key={item.title} className="bg-white dark:bg-gray-900 rounded-xl p-5 border border-gray-100 dark:border-gray-800 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${item.color}15` }}>
                  <item.icon className="w-5 h-5" style={{ color: item.color }} />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white text-sm">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}

            <div className="bg-gradient-to-br from-[#0B5ED7] to-[#0a4bb8] rounded-2xl p-6 text-white">
              <h3 className="font-semibold mb-2">Need Immediate Help?</h3>
              <p className="text-blue-200 text-sm mb-4">Chat with our AI tutor for instant answers to your WASSCE questions.</p>
              <a href="/ai-tutor">
                <Button className="bg-white text-[#0B5ED7] hover:bg-blue-50 gap-2">
                  <MessageSquare className="w-4 h-4" /> Ask AI Tutor
                </Button>
              </a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 md:p-8 border border-gray-100 dark:border-gray-800">
              {submitted ? (
                <div className="text-center py-12">
                  <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Message Sent!</h3>
                  <p className="text-gray-500">Thank you for reaching out. We'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input id="name" required value={form.name} onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))} />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input id="email" type="email" required value={form.email} onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))} />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" value={form.phone} onChange={e => setForm(prev => ({ ...prev, phone: e.target.value }))} />
                    </div>
                    <div>
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" value={form.subject} onChange={e => setForm(prev => ({ ...prev, subject: e.target.value }))} />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea id="message" required rows={5} value={form.message} onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))} />
                  </div>
                  <Button type="submit" className="bg-[#0B5ED7] hover:bg-[#0a4bb8] gap-2">
                    <Send className="w-4 h-4" /> Send Message
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
