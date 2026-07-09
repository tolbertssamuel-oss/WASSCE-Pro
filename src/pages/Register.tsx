import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap, Eye, EyeOff, ArrowLeft, CheckCircle2 } from "lucide-react";

const counties = [
  "Bomi", "Bong", "Gbarpolu", "Grand Bassa", "Grand Cape Mount", "Grand Gedeh",
  "Grand Kru", "Lofa", "Margibi", "Maryland", "Montserrado", "Nimba",
  "River Cess", "River Gee", "Sinoe",
];

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    fullName: "", email: "", phone: "", school: "", county: "", password: "", confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (step === 1) {
      if (!form.fullName.trim()) newErrors.fullName = "Full name is required";
      if (!form.email.trim()) newErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Invalid email";
      if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    }
    if (step === 2) {
      if (!form.school.trim()) newErrors.school = "School name is required";
      if (!form.county) newErrors.county = "County is required";
    }
    if (step === 3) {
      if (!form.password) newErrors.password = "Password is required";
      else if (form.password.length < 6) newErrors.password = "Password must be at least 6 characters";
      if (form.password !== form.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) setStep(step + 1);
  };

  const handleSubmit = () => {
    if (validate()) {
      navigate("/login?registered=true");
    }
  };

  const update = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => { const n = { ...prev }; delete n[field]; return n; });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-950 dark:to-gray-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 p-8">
          <div className="text-center mb-6">
            <Link to="/" className="inline-flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#0B5ED7] to-[#0a4bb8] rounded-xl flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                WASSCE<span className="text-[#FFC107]">Prep</span>
              </span>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create Account</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Step {step} of 3</p>
          </div>

          <div className="flex gap-2 mb-6">
            {[1, 2, 3].map(s => (
              <div key={s} className={`h-1.5 flex-1 rounded-full transition-colors ${s <= step ? "bg-[#0B5ED7]" : "bg-gray-200 dark:bg-gray-700"}`} />
            ))}
          </div>

          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" placeholder="John Doe" value={form.fullName} onChange={e => update("fullName", e.target.value)} className={errors.fullName ? "border-red-500" : ""} />
                {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="john@example.com" value={form.email} onChange={e => update("email", e.target.value)} className={errors.email ? "border-red-500" : ""} />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" placeholder="+231 77 123 4567" value={form.phone} onChange={e => update("phone", e.target.value)} className={errors.phone ? "border-red-500" : ""} />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
              <div>
                <Label htmlFor="school">School Name</Label>
                <Input id="school" placeholder="Your senior high school" value={form.school} onChange={e => update("school", e.target.value)} className={errors.school ? "border-red-500" : ""} />
                {errors.school && <p className="text-red-500 text-xs mt-1">{errors.school}</p>}
              </div>
              <div>
                <Label htmlFor="county">County</Label>
                <select id="county" value={form.county} onChange={e => update("county", e.target.value)} className={`w-full h-10 rounded-md border px-3 text-sm ${errors.county ? "border-red-500" : "border-gray-300 dark:border-gray-600"} bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}>
                  <option value="">Select county</option>
                  {counties.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                {errors.county && <p className="text-red-500 text-xs mt-1">{errors.county}</p>}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input id="password" type={showPassword ? "text" : "password"} placeholder="Min 6 characters" value={form.password} onChange={e => update("password", e.target.value)} className={errors.password ? "border-red-500 pr-10" : "pr-10"} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input id="confirmPassword" type="password" placeholder="Repeat password" value={form.confirmPassword} onChange={e => update("confirmPassword", e.target.value)} className={errors.confirmPassword ? "border-red-500" : ""} />
                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
              </div>
              <div className="flex items-start gap-2 text-sm text-gray-500">
                <CheckCircle2 className="w-4 h-4 mt-0.5 text-[#198754] shrink-0" />
                <span>By registering, you agree to our Terms of Service and Privacy Policy</span>
              </div>
            </motion.div>
          )}

          <div className="flex gap-3 mt-6">
            {step > 1 && (
              <Button variant="outline" onClick={() => setStep(step - 1)} className="flex-1 gap-2">
                <ArrowLeft className="w-4 h-4" /> Back
              </Button>
            )}
            {step < 3 ? (
              <Button onClick={handleNext} className="flex-1 bg-[#0B5ED7] hover:bg-[#0a4bb8] gap-2">
                Next <ArrowLeft className="w-4 h-4 rotate-180" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} className="flex-1 bg-[#198754] hover:bg-[#157347] gap-2">
                <CheckCircle2 className="w-4 h-4" /> Create Account
              </Button>
            )}
          </div>

          <p className="text-center text-sm text-gray-500 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-[#0B5ED7] hover:underline font-medium">Log In</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
