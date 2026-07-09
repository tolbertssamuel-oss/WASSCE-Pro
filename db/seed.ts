import { getDb } from "../api/queries/connection";
import {
  subjects,
  topics,
  questions,
  studyNotes,
  testimonials,
  blogPosts,
  mockExams,
} from "./schema";

async function seed() {
  const db = getDb();
  console.log("Seeding database...");

  // ─── Subjects ─────────────────────────────────────────
  const subjectData = [
    { name: "English Language", slug: "english", icon: "BookOpen", description: "Grammar, comprehension, essay writing, summary, lexis and structure", color: "#0B5ED7", totalQuestions: 500 },
    { name: "Mathematics", slug: "mathematics", icon: "Calculator", description: "Algebra, geometry, calculus, statistics, trigonometry", color: "#DC3545", totalQuestions: 650 },
    { name: "Biology", slug: "biology", icon: "Leaf", description: "Cell biology, genetics, ecology, human anatomy, plant biology", color: "#198754", totalQuestions: 480 },
    { name: "Chemistry", slug: "chemistry", icon: "FlaskConical", description: "Organic chemistry, inorganic chemistry, physical chemistry", color: "#6F42C1", totalQuestions: 420 },
    { name: "Physics", slug: "physics", icon: "Atom", description: "Mechanics, electricity, magnetism, waves, modern physics", color: "#0DCAF0", totalQuestions: 390 },
    { name: "Economics", slug: "economics", icon: "TrendingUp", description: "Microeconomics, macroeconomics, international trade, development", color: "#FD7E14", totalQuestions: 350 },
    { name: "Geography", slug: "geography", icon: "Globe", description: "Physical geography, human geography, map reading, climate", color: "#20C997", totalQuestions: 310 },
    { name: "History", slug: "history", icon: "Clock", description: "West African history, Liberian history, world history", color: "#7952B3", totalQuestions: 280 },
    { name: "Government", slug: "government", icon: "Landmark", description: "Political systems, constitution, citizenship, international relations", color: "#6610F2", totalQuestions: 260 },
    { name: "Literature", slug: "literature", icon: "Feather", description: "Prose, poetry, drama, literary devices, African literature", color: "#E83E8C", totalQuestions: 240 },
    { name: "Agriculture", slug: "agriculture", icon: "Sprout", description: "Crop production, animal husbandry, soil science, agroforestry", color: "#28A745", totalQuestions: 220 },
    { name: "Civic Education", slug: "civic-education", icon: "Users", description: "Citizenship, rights and duties, governance, national values", color: "#17A2B8", totalQuestions: 200 },
    { name: "Commerce", slug: "commerce", icon: "ShoppingCart", description: "Trade, business organizations, finance, marketing, transport", color: "#FFC107", totalQuestions: 190 },
    { name: "Accounting", slug: "accounting", icon: "Receipt", description: "Bookkeeping, financial statements, cost accounting, auditing", color: "#007BFF", totalQuestions: 180 },
    { name: "ICT", slug: "ict", icon: "Monitor", description: "Computer fundamentals, programming, networking, internet", color: "#6C757D", totalQuestions: 250 },
  ];

  for (const s of subjectData) {
    await db.insert(subjects).values(s).onDuplicateKeyUpdate({ set: s });
  }
  console.log("Subjects seeded");

  // ─── Topics for Mathematics ───────────────────────────
  const mathTopics = [
    { subjectId: 2, name: "Algebra", slug: "algebra", description: "Equations, inequalities, polynomials", order: 1 },
    { subjectId: 2, name: "Geometry", slug: "geometry", description: "Shapes, angles, theorems, constructions", order: 2 },
    { subjectId: 2, name: "Trigonometry", slug: "trigonometry", description: "Sine, cosine, tangent, identities", order: 3 },
    { subjectId: 2, name: "Calculus", slug: "calculus", description: "Differentiation, integration, limits", order: 4 },
    { subjectId: 2, name: "Statistics", slug: "statistics", description: "Data analysis, probability, distributions", order: 5 },
    { subjectId: 2, name: "Number Theory", slug: "number-theory", description: "Sets, indices, logarithms, surds", order: 6 },
    { subjectId: 2, name: "Coordinate Geometry", slug: "coordinate-geometry", description: "Straight lines, circles, curves", order: 7 },
    { subjectId: 2, name: "Vectors & Matrices", slug: "vectors-matrices", description: "Vector operations, matrix algebra", order: 8 },
  ];

  for (const t of mathTopics) {
    await db.insert(topics).values(t).onDuplicateKeyUpdate({ set: t });
  }

  // ─── Topics for English ───────────────────────────────
  const englishTopics = [
    { subjectId: 1, name: "Comprehension", slug: "comprehension", description: "Reading and understanding passages", order: 1 },
    { subjectId: 1, name: "Summary Writing", slug: "summary", description: "Condensing passages to key points", order: 2 },
    { subjectId: 1, name: "Essay Writing", slug: "essay", description: "Formal and informal essays", order: 3 },
    { subjectId: 1, name: "Lexis & Structure", slug: "lexis-structure", description: "Vocabulary, synonyms, antonyms", order: 4 },
    { subjectId: 1, name: "Grammar", slug: "grammar", description: "Parts of speech, tenses, sentence structure", order: 5 },
    { subjectId: 1, name: "Oral English", slug: "oral-english", description: "Vowels, consonants, stress, intonation", order: 6 },
  ];

  for (const t of englishTopics) {
    await db.insert(topics).values(t).onDuplicateKeyUpdate({ set: t });
  }

  // ─── Topics for Biology ───────────────────────────────
  const biologyTopics = [
    { subjectId: 3, name: "Cell Biology", slug: "cell-biology", description: "Cell structure, cell division, cell membranes", order: 1 },
    { subjectId: 3, name: "Genetics", slug: "genetics", description: "Heredity, DNA, variation, evolution", order: 2 },
    { subjectId: 3, name: "Ecology", slug: "ecology", description: "Ecosystems, food chains, pollution", order: 3 },
    { subjectId: 3, name: "Human Anatomy", slug: "human-anatomy", description: "Body systems, organs, physiology", order: 4 },
    { subjectId: 3, name: "Plant Biology", slug: "plant-biology", description: "Plant structure, photosynthesis, reproduction", order: 5 },
    { subjectId: 3, name: "Microorganisms", slug: "microorganisms", description: "Bacteria, viruses, fungi, protozoa", order: 6 },
  ];

  for (const t of biologyTopics) {
    await db.insert(topics).values(t).onDuplicateKeyUpdate({ set: t });
  }

  // ─── Topics for Chemistry ─────────────────────────────
  const chemistryTopics = [
    { subjectId: 4, name: "Organic Chemistry", slug: "organic-chemistry", description: "Hydrocarbons, functional groups, polymers", order: 1 },
    { subjectId: 4, name: "Inorganic Chemistry", slug: "inorganic-chemistry", description: "Periodic table, chemical bonding, metals", order: 2 },
    { subjectId: 4, name: "Physical Chemistry", slug: "physical-chemistry", description: "Equilibrium, kinetics, thermodynamics", order: 3 },
    { subjectId: 4, name: "Analytical Chemistry", slug: "analytical-chemistry", description: "Titration, qualitative analysis, quantitative analysis", order: 4 },
    { subjectId: 4, name: "Environmental Chemistry", slug: "environmental-chemistry", description: "Pollution, green chemistry", order: 5 },
  ];

  for (const t of chemistryTopics) {
    await db.insert(topics).values(t).onDuplicateKeyUpdate({ set: t });
  }

  // ─── Topics for Physics ───────────────────────────────
  const physicsTopics = [
    { subjectId: 5, name: "Mechanics", slug: "mechanics", description: "Motion, forces, energy, momentum", order: 1 },
    { subjectId: 5, name: "Electricity", slug: "electricity", description: "Circuits, Ohm's law, electrical power", order: 2 },
    { subjectId: 5, name: "Magnetism", slug: "magnetism", description: "Magnetic fields, electromagnetism", order: 3 },
    { subjectId: 5, name: "Waves", slug: "waves", description: "Sound, light, wave properties", order: 4 },
    { subjectId: 5, name: "Modern Physics", slug: "modern-physics", description: "Atomic physics, nuclear physics, quantum", order: 5 },
    { subjectId: 5, name: "Heat & Thermodynamics", slug: "heat-thermodynamics", description: "Temperature, heat transfer, gas laws", order: 6 },
  ];

  for (const t of physicsTopics) {
    await db.insert(topics).values(t).onDuplicateKeyUpdate({ set: t });
  }

  console.log("Topics seeded");

  // ─── Sample Questions for Mathematics ─────────────────
  const mathQuestions = [
    {
      subjectId: 2, topicId: 1, questionType: "multiple_choice" as const,
      question: "Solve for x: 2x + 5 = 17",
      options: ["x = 5", "x = 6", "x = 7", "x = 8"],
      correctAnswer: "x = 6",
      explanation: "Subtract 5 from both sides: 2x = 12, then divide by 2: x = 6",
      difficulty: "easy" as const, year: 2023, examType: "WASSCE", marks: 1, estimatedTime: 60,
    },
    {
      subjectId: 2, topicId: 1, questionType: "multiple_choice" as const,
      question: "If x² - 5x + 6 = 0, find the values of x",
      options: ["x = 2 or x = 3", "x = -2 or x = -3", "x = 1 or x = 6", "x = -1 or x = -6"],
      correctAnswer: "x = 2 or x = 3",
      explanation: "Factorizing: (x - 2)(x - 3) = 0, so x = 2 or x = 3",
      difficulty: "medium" as const, year: 2022, examType: "WASSCE", marks: 1, estimatedTime: 90,
    },
    {
      subjectId: 2, topicId: 2, questionType: "multiple_choice" as const,
      question: "The sum of the interior angles of a hexagon is:",
      options: ["540°", "720°", "900°", "1080°"],
      correctAnswer: "720°",
      explanation: "Using the formula (n-2) × 180° where n = 6: (6-2) × 180° = 720°",
      difficulty: "medium" as const, year: 2023, examType: "WASSCE", marks: 1, estimatedTime: 60,
    },
    {
      subjectId: 2, topicId: 3, questionType: "multiple_choice" as const,
      question: "If sin θ = 3/5 and θ is acute, find cos θ",
      options: ["4/5", "3/4", "5/4", "5/3"],
      correctAnswer: "4/5",
      explanation: "Using sin²θ + cos²θ = 1: cos²θ = 1 - (3/5)² = 1 - 9/25 = 16/25, so cos θ = 4/5",
      difficulty: "medium" as const, year: 2023, examType: "WASSCE", marks: 1, estimatedTime: 90,
    },
    {
      subjectId: 2, topicId: 4, questionType: "multiple_choice" as const,
      question: "Differentiate y = x³ + 2x² - 5x + 1 with respect to x",
      options: ["3x² + 4x - 5", "x⁴/4 + 2x³/3 - 5x²/2 + x", "3x² + 2x - 5", "x³ + 2x² - 5"],
      correctAnswer: "3x² + 4x - 5",
      explanation: "Using power rule: dy/dx = 3x² + 4x - 5",
      difficulty: "easy" as const, year: 2022, examType: "WASSCE", marks: 1, estimatedTime: 60,
    },
    {
      subjectId: 2, topicId: 5, questionType: "multiple_choice" as const,
      question: "Find the mean of the following data: 5, 8, 12, 15, 20",
      options: ["10", "11", "12", "13"],
      correctAnswer: "12",
      explanation: "Mean = (5 + 8 + 12 + 15 + 20) / 5 = 60 / 5 = 12",
      difficulty: "easy" as const, year: 2023, examType: "WASSCE", marks: 1, estimatedTime: 60,
    },
    {
      subjectId: 2, topicId: 1, questionType: "theory" as const,
      question: "Solve the simultaneous equations: 2x + 3y = 12 and x - y = 1",
      options: null,
      correctAnswer: "x = 3, y = 2",
      explanation: "From equation 2: x = y + 1. Substituting into equation 1: 2(y+1) + 3y = 12 → 5y + 2 = 12 → y = 2, therefore x = 3",
      difficulty: "medium" as const, year: 2023, examType: "WASSCE", marks: 4, estimatedTime: 180,
    },
    {
      subjectId: 2, topicId: 6, questionType: "multiple_choice" as const,
      question: "Simplify: log₂(8) + log₂(4)",
      options: ["log₂(12)", "5", "log₂(32)", "6"],
      correctAnswer: "5",
      explanation: "log₂(8) = 3 and log₂(4) = 2, so 3 + 2 = 5. Alternatively, log₂(8×4) = log₂(32) = 5",
      difficulty: "medium" as const, year: 2022, examType: "WASSCE", marks: 1, estimatedTime: 90,
    },
  ];

  for (const q of mathQuestions) {
    await db.insert(questions).values(q);
  }

  // ─── Sample Questions for English ─────────────────────
  const englishQuestions = [
    {
      subjectId: 1, topicId: 4, questionType: "multiple_choice" as const,
      question: "Choose the word nearest in meaning to ABERRATION:",
      options: ["Deviation", "Conformity", "Regularity", "Normality"],
      correctAnswer: "Deviation",
      explanation: "An aberration is a departure from what is normal or expected, hence 'deviation' is the closest synonym.",
      difficulty: "hard" as const, year: 2023, examType: "WASSCE", marks: 1, estimatedTime: 60,
    },
    {
      subjectId: 1, topicId: 4, questionType: "multiple_choice" as const,
      question: "Choose the correct sentence:",
      options: [
        "Neither John nor his friends is coming",
        "Neither John nor his friends are coming",
        "Neither John nor his friends was coming",
        "Neither John nor his friends were coming",
      ],
      correctAnswer: "Neither John nor his friends are coming",
      explanation: "With 'neither...nor', the verb agrees with the nearer subject. 'Friends' is plural, so 'are' is correct.",
      difficulty: "medium" as const, year: 2023, examType: "WASSCE", marks: 1, estimatedTime: 60,
    },
    {
      subjectId: 1, topicId: 5, questionType: "multiple_choice" as const,
      question: "Identify the figure of speech: 'The wind whispered through the trees'",
      options: ["Simile", "Metaphor", "Personification", "Hyperbole"],
      correctAnswer: "Personification",
      explanation: "The wind is given human quality (whispering), which is personification.",
      difficulty: "easy" as const, year: 2022, examType: "WASSCE", marks: 1, estimatedTime: 45,
    },
  ];

  for (const q of englishQuestions) {
    await db.insert(questions).values(q);
  }

  // ─── Sample Questions for Biology ─────────────────────
  const biologyQuestions = [
    {
      subjectId: 3, topicId: 1, questionType: "multiple_choice" as const,
      question: "Which organelle is known as the powerhouse of the cell?",
      options: ["Nucleus", "Mitochondria", "Ribosome", "Golgi body"],
      correctAnswer: "Mitochondria",
      explanation: "Mitochondria produce ATP through cellular respiration, earning them the name 'powerhouse of the cell'.",
      difficulty: "easy" as const, year: 2023, examType: "WASSCE", marks: 1, estimatedTime: 45,
    },
    {
      subjectId: 3, topicId: 3, questionType: "multiple_choice" as const,
      question: "In a food chain, organisms that produce their own food are called:",
      options: ["Consumers", "Decomposers", "Producers", "Scavengers"],
      correctAnswer: "Producers",
      explanation: "Producers (autotrophs) like plants make their own food through photosynthesis.",
      difficulty: "easy" as const, year: 2022, examType: "WASSCE", marks: 1, estimatedTime: 45,
    },
    {
      subjectId: 3, topicId: 2, questionType: "multiple_choice" as const,
      question: "A cross between a homozygous tall plant (TT) and a homozygous short plant (tt) will produce offspring that are:",
      options: ["All tall", "All short", "3 tall : 1 short", "1 tall : 1 short"],
      correctAnswer: "All tall",
      explanation: "All F1 offspring will be Tt (heterozygous tall) since tallness is dominant.",
      difficulty: "medium" as const, year: 2023, examType: "WASSCE", marks: 1, estimatedTime: 90,
    },
  ];

  for (const q of biologyQuestions) {
    await db.insert(questions).values(q);
  }

  console.log("Questions seeded");

  // ─── Study Notes ──────────────────────────────────────
  const notesData = [
    {
      subjectId: 2, topicId: 1,
      title: "Quadratic Equations - Complete Guide",
      content: "A quadratic equation is any equation that can be rearranged in standard form as ax² + bx + c = 0, where x represents an unknown, and a, b, and c represent known numbers, where a ≠ 0.\n\n**Methods of Solving:**\n1. Factorization\n2. Completing the square\n3. Quadratic formula: x = (-b ± √(b²-4ac)) / 2a\n\n**Example:** Solve x² - 5x + 6 = 0\nFactoring: (x - 2)(x - 3) = 0\nTherefore x = 2 or x = 3",
      summary: "Guide to solving quadratic equations using factorization, completing the square, and the quadratic formula.",
    },
    {
      subjectId: 2, topicId: 2,
      title: "Circle Theorems - Key Principles",
      content: "**Key Circle Theorems:**\n\n1. The angle at the center is twice the angle at the circumference subtended by the same arc.\n\n2. Angles in the same segment are equal.\n\n3. The angle in a semicircle is a right angle (90°).\n\n4. Opposite angles of a cyclic quadrilateral sum to 180°.\n\n5. The tangent to a circle is perpendicular to the radius at the point of contact.\n\n6. Two tangents drawn from an external point to a circle are equal in length.",
      summary: "Essential circle theorems for WASSCE including angles, tangents, and cyclic quadrilaterals.",
    },
    {
      subjectId: 1, topicId: 5,
      title: "English Tenses - Complete Overview",
      content: "**12 English Tenses:**\n\n**Simple Present:** I write\n**Present Continuous:** I am writing\n**Present Perfect:** I have written\n**Present Perfect Continuous:** I have been writing\n\n**Simple Past:** I wrote\n**Past Continuous:** I was writing\n**Past Perfect:** I had written\n**Past Perfect Continuous:** I had been writing\n\n**Simple Future:** I will write\n**Future Continuous:** I will be writing\n**Future Perfect:** I will have written\n**Future Perfect Continuous:** I will have been writing\n\nEach tense conveys different timing and aspect of actions.",
      summary: "Complete guide to all 12 English tenses with examples for WASSCE preparation.",
    },
    {
      subjectId: 3, topicId: 1,
      title: "Cell Structure and Functions",
      content: "**Animal Cell Organelles:**\n\n1. **Nucleus** - Contains genetic material (DNA), controls cell activities\n2. **Mitochondria** - Powerhouse, produces ATP through respiration\n3. **Ribosomes** - Protein synthesis\n4. **Endoplasmic Reticulum** - Transport and synthesis (Rough ER has ribosomes, Smooth ER does not)\n5. **Golgi Apparatus** - Packaging and distribution of proteins\n6. **Lysosomes** - Contain digestive enzymes\n7. **Cell Membrane** - Controls what enters and exits the cell\n\n**Plant Cell Additional Features:**\n- Cell wall (cellulose)\n- Chloroplasts (photosynthesis)\n- Large central vacuole",
      summary: "Detailed overview of cell organelles and their functions in animal and plant cells.",
    },
  ];

  for (const n of notesData) {
    await db.insert(studyNotes).values(n);
  }
  console.log("Study notes seeded");

  // ─── Testimonials ─────────────────────────────────────
  const testimonialData = [
    { name: "Sarah Kpadeh", role: "student", school: "St. Teresa Convent", county: "Montserrado", content: "This platform helped me score A1 in Mathematics and Biology in my WASSCE. The practice questions are exactly like the real exam!", rating: 5, isPublished: true },
    { name: "Mr. James Doe", role: "teacher", school: "Booker Washington Institute", county: "Margibi", content: "As a teacher, I recommend this platform to all my students. The detailed explanations and analytics help identify weak areas quickly.", rating: 5, isPublished: true },
    { name: "Faith Kollie", role: "student", school: "Cuttington University School", county: "Bong", content: "I improved my English Language score by 30% after using this app for just 3 months. The AI tutor is amazing!", rating: 5, isPublished: true },
    { name: "Mrs. Patricia Weah", role: "parent", school: "", county: "Nimba", content: "My daughter used this platform and passed her WASSCE with flying colors. Worth every penny for the premium features.", rating: 5, isPublished: true },
    { name: "Emmanuel Tarweh", role: "student", school: "Montserrado High School", county: "Montserrado", content: "The mock exams really prepared me for the actual WASSCE. I felt confident going into the exam hall.", rating: 5, isPublished: true },
    { name: "Ms. Agnes Freeman", role: "teacher", school: "ACF Faith Academy", county: "Grand Bassa", content: "The analytics dashboard helps me track my students' progress. I can see exactly which topics need more attention.", rating: 4, isPublished: true },
  ];

  for (const t of testimonialData) {
    await db.insert(testimonials).values(t);
  }
  console.log("Testimonials seeded");

  // ─── Blog Posts ───────────────────────────────────────
  const blogData = [
    {
      title: "10 Effective Study Strategies for WASSCE Success",
      slug: "10-study-strategies-wassce",
      excerpt: "Discover proven study techniques that will help you ace your WASSCE exams.",
      content: "**1. Create a Study Schedule**\nPlan your study time wisely. Allocate more time to subjects you find challenging.\n\n**2. Practice Past Questions**\nPast questions give you insight into the exam format and commonly tested topics.\n\n**3. Use Active Recall**\nTest yourself regularly instead of just re-reading notes.\n\n**4. Join Study Groups**\nCollaborative learning helps reinforce concepts.\n\n**5. Take Regular Breaks**\nUse the Pomodoro technique: 25 minutes study, 5 minutes break.\n\n**6. Teach What You Learn**\nExplaining concepts to others solidifies your understanding.\n\n**7. Get Adequate Sleep**\nYour brain consolidates memories during sleep.\n\n**8. Stay Hydrated and Eat Well**\nProper nutrition fuels your brain.\n\n**9. Exercise Regularly**\nPhysical activity improves cognitive function.\n\n**10. Stay Positive**\nBelieve in yourself and maintain a growth mindset.",
      category: "Study Tips",
      author: "Dr. Samuel Tolbert",
      isPublished: true,
    },
    {
      title: "Understanding the WASSCE Grading System",
      slug: "wassce-grading-system",
      excerpt: "A comprehensive guide to how WASSCE exams are graded.",
      content: "**WASSCE Grading Scale:**\n\n**A1 (Excellent)** - 75-100%\n**B2 (Very Good)** - 70-74%\n**B3 (Good)** - 65-69%\n**C4 (Credit)** - 60-64%\n**C5 (Credit)** - 55-59%\n**C6 (Credit)** - 50-54%\n**D7 (Pass)** - 45-49%\n**E8 (Pass)** - 40-44%\n**F9 (Fail)** - 0-39%\n\nTo pass WASSCE, you need at least a C6 in your core subjects including English and Mathematics.",
      category: "Exam Info",
      author: "Education Team",
      isPublished: true,
    },
    {
      title: "Top Universities in Liberia and Their Admission Requirements",
      slug: "liberia-universities-admission",
      excerpt: "Planning for university? Here's what you need to know.",
      content: "**University of Liberia**\n- Minimum 5 credits in WASSCE including English and Mathematics\n- Entrance examination\n- Application fee\n\n**Cuttington University**\n- 5 WASSCE credits\n- Recommendation letters\n- Personal statement\n\n**A.M.E. Zion University**\n- WASSCE certificate\n- Interview\n\n**United Methodist University**\n- 5 credits including English\n- Entrance exam",
      category: "Admissions",
      author: "Counseling Team",
      isPublished: true,
    },
  ];

  for (const b of blogData) {
    await db.insert(blogPosts).values(b);
  }
  console.log("Blog posts seeded");

  // ─── Mock Exams ───────────────────────────────────────
  const mockExamData = [
    {
      title: "WASSCE Mathematics Mock Exam 2024",
      description: "Full-length mock exam covering all WASSCE Mathematics topics. Duration: 2 hours 30 minutes.",
      subjectId: 2,
      duration: 150,
      totalMarks: 100,
      questionIds: [1, 2, 3, 4, 5, 6, 7, 8],
      isPublished: true,
    },
    {
      title: "WASSCE English Language Mock Exam 2024",
      description: "Complete English Language exam with comprehension, summary, essay, and objective sections.",
      subjectId: 1,
      duration: 120,
      totalMarks: 100,
      questionIds: [9, 10, 11],
      isPublished: true,
    },
    {
      title: "WASSCE Biology Mock Exam 2024",
      description: "Comprehensive Biology mock exam covering cell biology, genetics, ecology, and physiology.",
      subjectId: 3,
      duration: 120,
      totalMarks: 100,
      questionIds: [12, 13, 14],
      isPublished: true,
    },
  ];

  for (const m of mockExamData) {
    await db.insert(mockExams).values(m);
  }
  console.log("Mock exams seeded");

  console.log("✅ All seed data inserted successfully!");
}

seed().catch(console.error);
