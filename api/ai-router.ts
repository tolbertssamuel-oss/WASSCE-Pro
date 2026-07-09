import { z } from "zod";
import { createRouter, authedQuery } from "./middleware";

const knowledgeBase: Record<string, string> = {
  "photosynthesis": `**Photosynthesis** is the process by which green plants use sunlight, water, and carbon dioxide to create oxygen and energy in the form of sugar.

**Equation:**
6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂

**Key Points:**
- Takes place in the chloroplasts (contains chlorophyll)
- Light-dependent reactions occur in the thylakoid membranes
- Calvin cycle (light-independent) occurs in the stroma
- Factors affecting rate: light intensity, CO₂ concentration, temperature

**Importance:**
- Produces oxygen for aerobic respiration
- Removes CO₂ from the atmosphere
- Basis of food chains - producers make their own food`,

  "mitosis": `**Mitosis** is a type of cell division that results in two daughter cells each having the same number and kind of chromosomes as the parent nucleus.

**Stages:**
1. **Prophase** - Chromosomes condense, nuclear membrane breaks down
2. **Metaphase** - Chromosomes line up at the equator
3. **Anaphase** - Sister chromatids separate and move to opposite poles
4. **Telophase** - Nuclear membrane reforms, cell begins to divide

**Significance:**
- Growth and repair of tissues
- Asexual reproduction
- Maintains chromosome number (diploid → diploid)`,

  "pythagoras": `**Pythagoras' Theorem** states that in a right-angled triangle, the square of the hypotenuse equals the sum of the squares of the other two sides.

**Formula:**
a² + b² = c²

Where c is the hypotenuse (the side opposite the right angle).

**Example:**
If a = 3 and b = 4, then:
c² = 3² + 4² = 9 + 16 = 25
c = √25 = 5

**Applications:**
- Finding distances
- Navigation
- Construction and architecture`,

  "quadratic": `**Quadratic Equations** are equations of the form ax² + bx + c = 0, where a ≠ 0.

**Methods to Solve:**
1. **Factorization** - Express as product of two binomials
2. **Completing the Square** - Rewrite in the form (x + p)² = q
3. **Quadratic Formula:** x = (-b ± √(b² - 4ac)) / 2a

**The Discriminant (b² - 4ac):**
- > 0: Two distinct real roots
- = 0: One repeated real root
- < 0: No real roots (complex roots)

**Example:** Solve x² - 5x + 6 = 0
Factoring: (x - 2)(x - 3) = 0
Therefore: x = 2 or x = 3`,

  "photosynthesis2": `**Photosynthesis** is the process by which plants convert light energy into chemical energy.

**Equation:** 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂ (in presence of light)

**Key Points:**
- Occurs in chloroplasts
- Requires: sunlight, water, CO₂, chlorophyll
- Produces: glucose and oxygen
- Light reactions + Dark reactions (Calvin cycle)

**Factors affecting rate:** Light intensity, CO₂ concentration, temperature`,

  "cell": `**Cell Structure - Animal Cell:**
- Nucleus: Contains DNA, controls cell
- Mitochondria: Powerhouse, produces ATP
- Ribosomes: Protein synthesis
- Endoplasmic Reticulum: Transport
- Golgi Apparatus: Packaging
- Cell Membrane: Controls entry/exit
- Lysosomes: Digestion
- Cytoplasm: Where reactions occur

**Plant Cell Additional:**
- Cell Wall (cellulose for support)
- Chloroplasts (photosynthesis)
- Large Vacuole (storage)`,

  "ecosystem": `**Ecosystem** is a community of living organisms interacting with their environment.

**Components:**
- Biotic (living): Producers, consumers, decomposers
- Abiotic (non-living): Water, air, soil, light, temperature

**Energy Flow:**
Sun → Producers → Primary Consumers → Secondary Consumers → Decomposers

**Food Chain vs Food Web:**
- Food chain: Single linear sequence
- Food web: Interconnected food chains

**Ecological Pyramids:**
- Pyramid of numbers
- Pyramid of biomass
- Pyramid of energy`,

  "ohms-law": `**Ohm's Law** states that the current through a conductor is directly proportional to the voltage and inversely proportional to the resistance.

**Formula:** V = IR

Where:
- V = Voltage (Volts)
- I = Current (Amperes)
- R = Resistance (Ohms)

**Rearranged:**
- I = V/R
- R = V/I

**Example:** If V = 12V and R = 4Ω, then I = 12/4 = 3A`,
};

export const aiRouter = createRouter({
  ask: authedQuery
    .input(z.object({ question: z.string().min(3) }))
    .mutation(async ({ input }) => {
      const lowerQ = input.question.toLowerCase();
      let response = "";

      if (lowerQ.includes("photosynthe")) {
        response = knowledgeBase["photosynthesis"];
      } else if (lowerQ.includes("mitosis") || lowerQ.includes("cell division")) {
        response = knowledgeBase["mitosis"];
      } else if (lowerQ.includes("pythagoras") || lowerQ.includes("right triangle")) {
        response = knowledgeBase["pythagoras"];
      } else if (lowerQ.includes("quadratic") || (lowerQ.includes("equation") && lowerQ.includes("x²"))) {
        response = knowledgeBase["quadratic"];
      } else if (lowerQ.includes("cell") && (lowerQ.includes("structure") || lowerQ.includes("organelle"))) {
        response = knowledgeBase["cell"];
      } else if (lowerQ.includes("ecosystem") || lowerQ.includes("food chain")) {
        response = knowledgeBase["ecosystem"];
      } else if (lowerQ.includes("ohm") || (lowerQ.includes("current") && lowerQ.includes("voltage"))) {
        response = knowledgeBase["ohms-law"];
      } else if (lowerQ.includes("differentiate") || lowerQ.includes("derivative")) {
        response = `**Differentiation** is the process of finding the derivative of a function.

**Basic Rules:**
- Power rule: d/dx(xⁿ) = nxⁿ⁻¹
- Constant rule: d/dx(c) = 0
- Sum rule: d/dx(f + g) = f' + g'
- Product rule: d/dx(fg) = f'g + fg'
- Quotient rule: d/dx(f/g) = (f'g - fg')/g²

**Example:** Differentiate y = 3x⁴ + 2x² - 5x + 1
dy/dx = 12x³ + 4x - 5`;
      } else if (lowerQ.includes("integrate") || lowerQ.includes("integration")) {
        response = `**Integration** is the reverse of differentiation.

**Basic Rules:**
- ∫xⁿ dx = xⁿ⁺¹/(n+1) + C (n ≠ -1)
- ∫1/x dx = ln|x| + C
- ∫eˣ dx = eˣ + C

**Example:** Integrate ∫(3x² + 4x) dx
= x³ + 2x² + C`;
      } else if (lowerQ.includes("trigonometr") || lowerQ.includes("sine") || lowerQ.includes("cosine")) {
        response = `**Trigonometric Identities:**

**Pythagorean Identities:**
- sin²θ + cos²θ = 1
- 1 + tan²θ = sec²θ
- 1 + cot²θ = csc²θ

**Double Angle Formulas:**
- sin(2θ) = 2sinθcosθ
- cos(2θ) = cos²θ - sin²θ

**Example:** If sin θ = 3/5, find cos θ
Using sin²θ + cos²θ = 1
cos²θ = 1 - (3/5)² = 16/25
cos θ = 4/5`;
      } else {
        response = `I understand you're asking about **"${input.question}"**. Let me help you with that!

To provide the most helpful answer, could you:
1. Specify the subject (Math, Biology, Chemistry, Physics, etc.)
2. Let me know what specific concept you're studying
3. Share any example problem you're working on

In the meantime, here are some general study tips:
- Break down complex topics into smaller parts
- Practice with past questions
- Use diagrams and visual aids
- Review your mistakes to learn from them

**Try asking about specific topics like:**
- "Explain photosynthesis"
- "Solve quadratic equations"
- "What is Ohm's Law?"
- "Explain mitosis"`;
      }

      return { response };
    }),

  generateQuestions: authedQuery
    .input(z.object({
      topic: z.string(),
      difficulty: z.string().optional(),
      count: z.number().default(5),
    }))
    .mutation(async ({ input }) => {
      const lowerTopic = input.topic.toLowerCase();
      const generatedQuestions = [];

      if (lowerTopic.includes("algebra") || lowerTopic.includes("quadratic")) {
        for (let i = 0; i < input.count; i++) {
          const a = Math.floor(Math.random() * 5) + 1;
          const b = Math.floor(Math.random() * 10) + 1;
          const c = Math.floor(Math.random() * 10) + 1;
          generatedQuestions.push({
            question: `Solve: ${a}x² + ${b}x + ${c} = 0`,
            hint: `Use the quadratic formula: x = (-b ± √(b² - 4ac)) / 2a`,
            topic: "Algebra",
          });
        }
      } else if (lowerTopic.includes("geometry")) {
        for (let i = 0; i < input.count; i++) {
          const side = Math.floor(Math.random() * 10) + 3;
          generatedQuestions.push({
            question: `Find the area of a square with side length ${side}cm`,
            hint: `Area of square = side × side`,
            topic: "Geometry",
          });
        }
      } else {
        for (let i = 0; i < input.count; i++) {
          generatedQuestions.push({
            question: `Practice question ${i + 1} about ${input.topic}: Define and explain the key concepts`,
            hint: `Review your study notes on ${input.topic}`,
            topic: input.topic,
          });
        }
      }

      return { questions: generatedQuestions };
    }),
});
