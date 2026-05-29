export type TopicId = 'math' | 'vocab' | 'funfacts' | 'science' | 'history' | 'philosophy' | 'wellness' | 'tech';

export interface Topic {
  id: TopicId;
  label: string;
  emoji: string;
  color: string;
  gradient: string;
  description: string;
}

export interface DailyItem {
  title: string;
  body: string;
  detail?: string;
  example?: string;
}

export const topics: Topic[] = [
  { id: 'math',        label: 'Math',        emoji: '🔢', color: '#6366f1', gradient: 'linear-gradient(135deg,#6366f1,#4338ca)', description: 'Mind-bending tricks & patterns' },
  { id: 'vocab',       label: 'Vocabulary',  emoji: '📚', color: '#f59e0b', gradient: 'linear-gradient(135deg,#f59e0b,#d97706)', description: 'Expand your word power daily' },
  { id: 'funfacts',    label: 'Fun Facts',   emoji: '🌍', color: '#10b981', gradient: 'linear-gradient(135deg,#10b981,#059669)', description: 'Surprising trivia about everything' },
  { id: 'science',     label: 'Science',     emoji: '🧪', color: '#3b82f6', gradient: 'linear-gradient(135deg,#3b82f6,#2563eb)', description: 'How the universe actually works' },
  { id: 'history',     label: 'History',     emoji: '🏛️', color: '#ef4444', gradient: 'linear-gradient(135deg,#ef4444,#dc2626)', description: 'Stories that shaped today' },
  { id: 'philosophy',  label: 'Philosophy',  emoji: '💡', color: '#8b5cf6', gradient: 'linear-gradient(135deg,#8b5cf6,#7c3aed)', description: 'Quotes and ideas to live by' },
  { id: 'wellness',    label: 'Wellness',    emoji: '🌱', color: '#14b8a6', gradient: 'linear-gradient(135deg,#14b8a6,#0d9488)', description: 'Daily tips for mind and body' },
  { id: 'tech',        label: 'Tech',        emoji: '💻', color: '#f97316', gradient: 'linear-gradient(135deg,#f97316,#ea580c)', description: 'How the digital world works' },
];

const library: Record<TopicId, DailyItem[]> = {
  math: [
    {
      title: 'The 9 Trick',
      body: 'Any number multiplied by 9 has digits that sum to 9 (or a multiple of 9).',
      detail: 'This works because 9 = 10 − 1, so multiplying by 9 is like multiplying by 10 and subtracting the original number. The digital root always collapses back to 9.',
      example: '9 × 8 = 72 → 7+2 = 9. Try 9 × 17 = 153 → 1+5+3 = 9. Try 9 × 99 = 891 → 8+9+1 = 18 → 1+8 = 9. It never fails.',
    },
    {
      title: 'Fibonacci in Nature',
      body: 'The Fibonacci sequence (1,1,2,3,5,8,13…) appears in sunflower seeds, pinecones, and galaxy spirals.',
      detail: 'Each number is the sum of the two before it, and the ratio between consecutive terms approaches φ ≈ 1.618, the Golden Ratio. Plants grow this way because it\'s the most efficient packing — each seed gets maximum sunlight with no gaps.',
      example: 'Count the spirals on a sunflower head: almost always 21 going one direction and 34 the other — consecutive Fibonacci numbers. A pine cone: 8 spirals clockwise, 13 counter-clockwise. Every time, Fibonacci.',
    },
    {
      title: 'Why 0! = 1',
      body: 'Zero factorial equals 1 by definition — there is exactly one way to arrange zero objects: do nothing.',
      detail: 'It also makes combinatorics formulas work consistently. The formula for choosing k items from n is C(n,k) = n! / (k! × (n−k)!). If choosing 0 items from 5, we need 0! = 1 or the formula breaks.',
      example: 'How many ways can you arrange 0 books on a shelf? One way — leave it empty. That\'s the intuition. Without 0! = 1, the formula for "how many ways to pick nothing" would divide by zero. Math demands it.',
    },
    {
      title: 'Lightning Fast Squaring',
      body: 'To square any number ending in 5: multiply the leading digit(s) by itself+1, then append 25.',
      detail: 'This works because (10n+5)² = 100n(n+1) + 25 — the algebra perfectly produces the leading digits × next number, then 25.',
      example: '35² → 3×4 = 12, append 25 → 1225. Check: 35×35 = 1225 ✓. Try 75²: 7×8 = 56, append 25 → 5625. Check: 75×75 = 5625 ✓. Works every time.',
    },
    {
      title: 'The Birthday Problem',
      body: 'In a room of just 23 people there is a 50% chance two share a birthday. With 70 people it\'s 99.9%.',
      detail: 'Our brains underestimate because we think linearly. But it\'s not "does anyone share MY birthday" — it\'s "does any pair share a birthday." With 23 people there are 253 unique pairs, and each pair has a 1/365 chance of matching.',
      example: 'In a class of 30 students, the probability of at least one shared birthday is ~70%. Try it — almost every class of 30 has a birthday match. The math seems impossible until you count the pairs instead of the people.',
    },
    {
      title: 'Infinity Types',
      body: 'Not all infinities are equal. The set of real numbers is provably larger than the set of whole numbers, even though both are infinite.',
      detail: 'Georg Cantor\'s diagonal argument (1891) showed you cannot list all real numbers — for any proposed list, he could construct a number guaranteed to be missing. Some infinities are "uncountably" larger.',
      example: 'You can count whole numbers one by one: 1, 2, 3... forever. But the real numbers between 0 and 1 alone (0.1, 0.11, 0.111...) cannot be fully listed no matter how clever your system. There are more of them. One infinity is literally bigger than the other.',
    },
    {
      title: 'Pi Never Repeats',
      body: 'π (3.14159…) is irrational — its decimal expansion never terminates and never repeats. We have computed over 100 trillion digits.',
      detail: 'Despite this, 39 decimal places of π is enough to calculate the circumference of the observable universe to within one hydrogen atom. The extra trillions of digits are computed to test computers, not for practical use.',
      example: 'Take any circle — a dinner plate, a planet, a subatomic particle. Divide its circumference by its diameter. You always get the same irrational number: 3.14159... The ratio is baked into the geometry of flat space itself.',
    },
    {
      title: 'The Rule of 72',
      body: 'Divide 72 by an annual interest rate to estimate how many years it takes to double your money.',
      detail: 'This works because of compound interest: ln(2) ≈ 0.693, and 72 is a convenient approximation of 69.3 that divides evenly by many common interest rates (2, 3, 4, 6, 8, 9, 12).',
      example: 'At 6% interest: 72 ÷ 6 = 12 years to double. At 9%: just 8 years. $10,000 at 6% becomes $20,000 in 12 years, $40,000 in 24, $80,000 in 36 — all without touching it. That\'s compound interest in action.',
    },
    {
      title: 'Prime Numbers are Infinite',
      body: 'Euclid proved around 300 BCE that there are infinitely many prime numbers. His proof takes just three lines.',
      detail: 'Assume a finite list of all primes. Multiply them together and add 1. The result is either itself prime (not in your list) or divisible by a prime not in your list. Either way, your list was incomplete — contradiction.',
      example: 'Try it: take primes 2, 3, 5. Multiply: 30. Add 1: 31. Is 31 prime? Yes — not divisible by 2, 3, or 5. Now try 2, 3, 5, 7, 11, 13: product = 30,030, add 1 = 30,031. It has prime factors 59 and 509 — neither was in your list. New primes, every time.',
    },
    {
      title: 'The Monty Hall Problem',
      body: 'Switching doors after a goat is revealed gives a 2/3 chance of winning the car. Staying gives only 1/3.',
      detail: 'This counterintuitive result baffled thousands of mathematicians when Marilyn vos Savant published it in 1990. The key: the host always reveals a goat, which transfers probability to the remaining door.',
      example: 'You pick door 1 (1/3 chance of car). Doors 2 and 3 together hold 2/3. Host opens door 3 (goat). Door 2 now holds that full 2/3. Switching wins 2 out of 3 games. Simulate it 100 times — switching wins roughly 67 times.',
    },
    {
      title: 'Benford\'s Law',
      body: 'In naturally occurring datasets, the leading digit is 1 about 30% of the time, not the expected 11%.',
      detail: 'This law is used to detect financial fraud — fabricated numbers don\'t follow it because people choose digits "too evenly." The IRS and forensic accountants use it as a red flag.',
      example: 'Check the leading digits of your city\'s street addresses, world river lengths, or stock prices. About 30% start with 1, ~18% with 2, ~12% with 3. When someone invents numbers, they spread them too evenly — that\'s the giveaway.',
    },
    {
      title: 'The Königsberg Bridge Problem',
      body: 'In 1736 Euler proved it\'s impossible to walk across all 7 bridges of Königsberg exactly once — founding graph theory in the process.',
      detail: 'He showed that for a single-path walk crossing every edge to exist, at most two "nodes" can have an odd number of connections. Königsberg had four such nodes — an impossible arrangement.',
      example: 'Draw Königsberg: 4 land areas, 7 bridges connecting them. Try to trace every bridge exactly once without lifting your pen. No matter how you try, you always get stuck. Euler proved it\'s mathematically impossible — not just hard, impossible.',
    },
    {
      title: 'Casting Out Nines',
      body: 'You can check multiplication by summing each number\'s digits down to a single digit and comparing products.',
      detail: 'This works because 10 ≡ 1 (mod 9), so any number equals the sum of its digits, mod 9. Multiplication preserves this relationship, making digit-sum a quick consistency check.',
      example: '123 × 456 = 56,088. Check: 1+2+3 = 6. 4+5+6 = 15 → 1+5 = 6. 6×6 = 36 → 3+6 = 9. Sum digits of 56,088: 5+6+0+8+8 = 27 → 2+7 = 9. Both sides give 9 ✓. If they differ, you made an arithmetic error.',
    },
    {
      title: 'The Four Color Theorem',
      body: 'Any map can be colored with only 4 colors such that no two adjacent regions share a color.',
      detail: 'Proved in 1976, it was the first major theorem verified with computer assistance — checking over 1,800 cases automatically. Mathematicians debated whether a computer proof "counted" as a proof.',
      example: 'Try coloring a map of the US with 4 colors — no two touching states the same color. No matter how complex the map, 4 always suffice. Try drawing your own wild map: any shape, any number of regions. Four colors. Always enough.',
    },
    {
      title: 'Gauss\'s Schoolboy Trick',
      body: 'To sum integers from 1 to n: n × (n+1) ÷ 2.',
      detail: 'Young Gauss supposedly solved 1+2+...+100 in seconds when his teacher assigned it as busywork. He noticed pairs: 1+100 = 101, 2+99 = 101... there are 50 such pairs, giving 50 × 101 = 5,050.',
      example: '1+2+...+100 = 100×101÷2 = 5,050. What about 1 to 1,000? 1,000×1,001÷2 = 500,500. What about 1 to a million? 1,000,000×1,000,001÷2 = 500,000,500,000. Instant answer, any n.',
    },
    {
      title: 'The Basel Problem',
      body: 'The sum of 1/n² for all positive integers n equals exactly π²/6 ≈ 1.6449. Euler proved this in 1734.',
      detail: 'This surprising appearance of π in a sum involving no circles shocked mathematicians of the era. It hints at deep connections between number theory and geometry that we still explore today.',
      example: 'Add: 1/1 + 1/4 + 1/9 + 1/16 + 1/25... = 1 + 0.25 + 0.111 + 0.0625 + 0.04... Keep going forever and the total approaches 1.6449... which is exactly π²/6. Pi appears with no circle in sight.',
    },
    {
      title: 'Imaginary Numbers are Real',
      body: 'The imaginary unit i = √(−1) seems fictional, but it\'s essential for electrical circuits, quantum mechanics, and signal processing.',
      detail: 'Complex numbers (a + bi) allow rotation in 2D space — which is why they\'re perfect for describing waves, oscillations, and anything that cycles. Every AC electrical circuit uses them.',
      example: 'An electrical engineer writes circuit impedance as Z = 5 + 3i: 5 ohms resistance + 3 ohms reactance. The "imaginary" part describes real, measurable voltage behavior in your phone charger. Remove i from the math, and the charger stops working.',
    },
    {
      title: 'The Pigeonhole Principle',
      body: 'If you have n+1 items in n containers, at least one container must have 2 or more items.',
      detail: 'This trivial-sounding principle proves non-obvious results about primes, graph theory, and combinatorics. It\'s the reason certain "coincidences" are mathematically guaranteed.',
      example: 'In any group of 13 people, at least two share a birth month. In London (9 million people), at least two people have the exact same number of hairs (max ~150,000). In any sequence of 101 integers, some two must have the same remainder when divided by 100.',
    },
    {
      title: 'Pascal\'s Triangle Hides Everything',
      body: 'Pascal\'s triangle contains the Fibonacci sequence, powers of 2, powers of 11, binomial coefficients, and fractal patterns all at once.',
      detail: 'Each row sums to a power of 2. The diagonal sums give Fibonacci numbers. Read each row as a number and you get powers of 11. The triangle is a single structure encoding dozens of mathematical relationships.',
      example: 'Write out 8 rows of Pascal\'s triangle. Shade every odd number. Step back — you\'ll see a perfect Sierpiński triangle fractal emerging. Math creates a fractal from a simple addition rule. No computers, no graphics — just arithmetic.',
    },
    {
      title: 'A Googol vs The Universe',
      body: 'A googol is 10¹⁰⁰. The estimated number of atoms in the observable universe is only about 10⁸⁰ — far smaller than a googol.',
      detail: 'A googolplex (10^googol) is so large it couldn\'t be written out even if every atom in the universe were a digit. These aren\'t just "big numbers" — they represent scales that physically cannot exist.',
      example: 'Count every atom in your body (7×10²⁷), every atom on Earth (10⁵⁰), every atom in the Milky Way (10⁶⁸), every atom in the observable universe (10⁸⁰). A googol (10¹⁰⁰) is still 10²⁰ times larger than all of those combined.',
    },
  ],

  vocab: [
    {
      title: 'Sonder',
      body: 'The realization that each passerby has a life as vivid and complex as your own.',
      detail: 'Coined by John Koenig in the Dictionary of Obscure Sorrows. Not an ancient word — invented to fill a gap in language for an experience nearly everyone has but couldn\'t name.',
      example: '"She felt a wave of sonder watching the crowd from the café window — each person hurrying somewhere urgent, loving someone, dreading something, completely unaware of her." Now you have the word for that feeling.',
    },
    {
      title: 'Ephemeral',
      body: '(adj.) Lasting for a very short time; transitory.',
      detail: 'From Greek ephēmeros, meaning "lasting a day." Often used for things whose value is partly defined by their brevity — a mayfly, a sunset, a Snapchat story.',
      example: '"The cherry blossoms are ephemeral — here for a week, then gone." Or: "Ephemeral art installations force you to see beauty differently because you know it will be gone tomorrow." Use it where "fleeting" feels too weak.',
    },
    {
      title: 'Petrichor',
      body: 'The pleasant earthy smell produced when rain falls on dry soil.',
      detail: 'From Greek petra (stone) + ichor (the fluid in the veins of the gods). Named by scientists Isabel Joy Bear and Richard Thomas in 1964. The compound responsible is geosmin, produced by soil bacteria.',
      example: '"The storm had been building all afternoon, and even before the first drop fell, she could smell the petrichor rising from the cracked sidewalks." Now you have the exact word for the smell you\'ve always recognized but couldn\'t name.',
    },
    {
      title: 'Liminal',
      body: '(adj.) Occupying a transitional or uncertain stage between two states.',
      detail: 'From Latin limen, "threshold." Used in anthropology for rites of passage, and in architecture for transitional spaces. "Liminal spaces" in internet culture refers to eerily empty familiar places — empty malls, school hallways at 2 AM.',
      example: '"Graduation is a liminal moment — you\'re no longer a student but not yet a professional." Or: "There\'s something unsettling about airports at 3 AM — pure liminal space, neither here nor there."',
    },
    {
      title: 'Hiraeth',
      body: 'A Welsh word with no English equivalent: a longing for home, a place you can\'t return to, or perhaps never was.',
      detail: 'Often described as a mixture of homesickness, grief, and nostalgia compressed into one emotion. The untranslatability is part of the word\'s value — English has no single container for this specific feeling.',
      example: 'You might feel hiraeth listening to a childhood song in an adult body, revisiting a hometown that changed while you were away, or missing a version of your life that no longer exists — or maybe never quite did. It\'s grief for something you can\'t even fully name.',
    },
    {
      title: 'Serendipity',
      body: 'Finding something good without looking for it; a happy accident.',
      detail: 'Coined by Horace Walpole in 1754, from "The Three Princes of Serendip" (Serendip = old name for Sri Lanka) — a fairy tale about princes who made clever discoveries by accident and sagacity.',
      example: '"By pure serendipity, she sat next to her future business partner on a flight to Tokyo." Fleming discovered penicillin by serendipity — a mold contaminated his petri dish and he noticed it killed bacteria instead of throwing it out.',
    },
    {
      title: 'Taciturn',
      body: '(adj.) Reserved or uncommunicative in speech; saying little.',
      detail: 'From Latin taciturnus. Stronger than "quiet" — it implies a habitual, deliberate economy of words. A taciturn person isn\'t shy; they simply find most words unnecessary.',
      example: '"The taciturn detective spoke only when the answer mattered, letting suspects fill the silence with their own confessions." Contrast with "reticent" (reluctant to speak) — taciturn is about style, reticent is about reluctance.',
    },
    {
      title: 'Mellifluous',
      body: '(adj.) Sweet or musical; pleasant to hear.',
      detail: 'From Latin mel (honey) + fluere (to flow). Literally "flowing with honey." Reserved for sounds — especially voices, music, or language — that feel smooth and pleasing to the ear.',
      example: '"Her mellifluous voice made even the difficult news feel somehow manageable." Or: "The cello\'s mellifluous tone filled the room." You wouldn\'t call a jarring symphony mellifluous — the smoothness is essential.',
    },
    {
      title: 'Recondite',
      body: '(adj.) Not known by many; obscure; abstruse.',
      detail: 'From Latin reconditus, "stored away, hidden." Describes knowledge that is deliberately or simply inaccessibly hidden — specialist knowledge, arcane lore, forgotten history.',
      example: '"His lectures were filled with recondite references that only specialists in 17th-century Dutch painting would recognize." The word itself is somewhat recondite — which makes it a pleasure to deploy in conversation.',
    },
    {
      title: 'Schadenfreude',
      body: 'Pleasure derived from another\'s misfortune.',
      detail: 'A German compound: Schaden (harm) + Freude (joy). English has no single word for this — proof that every language captures something unique about human experience. German is famously good at compound emotions.',
      example: 'Your coworker who landed the project you wanted gives a presentation that bombs spectacularly. That warm twinge of satisfaction you feel watching it happen? Pure schadenfreude. We all feel it; Germans just gave it a name.',
    },
    {
      title: 'Perspicacious',
      body: '(adj.) Having a ready insight; shrewd; having a clear, penetrating mind.',
      detail: 'From Latin perspicax, "sharp-sighted." Goes beyond being smart — it implies the ability to see through surfaces to what\'s actually happening. A perspicacious person notices what others miss.',
      example: '"Her perspicacious analysis cut through three hours of debate in one sentence — she saw the real problem before anyone else had framed it correctly." Perspicacious is a compliment that implies depth, not just intelligence.',
    },
    {
      title: 'Logophile',
      body: 'A lover of words.',
      detail: 'From Greek logos (word) + philos (loving). The word for someone who collects words, savors etymology, and genuinely delights in language as an object of study and pleasure.',
      example: '"She spent Sunday mornings with crosswords and etymology books, a true logophile who collected unusual words like others collect stamps." If you\'re reading this daily vocabulary and enjoying it, there\'s a good chance you\'re one.',
    },
    {
      title: 'Sesquipedalian',
      body: '(adj.) Long-worded; given to using long words.',
      detail: 'From Latin sesquipedalis, meaning "a foot and a half long." Describing a word as sesquipedalian is itself sesquipedalian — the meta-irony is part of its charm in conversation.',
      example: '"My professor\'s sesquipedalian writing style made a 5-page paper feel like 50." The elegant move: say to someone using big words, "That\'s a rather sesquipedalian way to say wordy."',
    },
    {
      title: 'Solipsism',
      body: 'The philosophical idea that only one\'s own mind is sure to exist; the self is all that can be known.',
      detail: 'From Latin solus (alone) + ipse (self). As a strict philosophical position it\'s nearly impossible to disprove — but if you act on it, it\'s also impossible to live by. Used colloquially to describe someone absorbed entirely in their own world.',
      example: '"His solipsism made every conversation about him — he couldn\'t conceive that other people\'s experiences were equally real." The philosophical version: you can\'t prove anyone else is conscious. Your friends might be very convincing automatons.',
    },
    {
      title: 'Inchoate',
      body: '(adj.) Just begun and not fully formed; undeveloped.',
      detail: 'From Latin inchoatus, "just begun." Useful for describing ideas, feelings, or plans that exist but haven\'t taken full shape yet — the productive, uncomfortable stage between having an impulse and knowing what to do with it.',
      example: '"She had an inchoate idea that would eventually become a bestselling novel — at this stage just a character name and a vague sense of wrongness." Or: "An inchoate feeling of dread settled over the team when the meeting started."',
    },
    {
      title: 'Defenestration',
      body: 'The act of throwing someone out of a window.',
      detail: 'From Latin fenestra (window). The Defenestration of Prague in 1618 — when Protestant noblemen threw three Catholic officials out of a castle window — sparked the Thirty Years\' War. The word exists because the act was historically significant enough to need one.',
      example: 'In 1618, three Catholic officials were thrown from a 70-foot window in Prague Castle. They survived (they landed in a dung heap). The incident started a war that killed 8 million people. If you ever need the word for this specific scenario, now you have it.',
    },
    {
      title: 'Vellichor',
      body: 'The strange wistfulness of used bookshops.',
      detail: 'Another invented word from John Koenig\'s Dictionary of Obscure Sorrows — the feeling that all those books carry the weight of lives already lived, thoughts already thought, stories already ended.',
      example: 'You pull an old novel off the shelf of a used bookshop and find someone\'s handwritten note inside: "For M — this one changed me. — R, 1987." Who were they? Why did they underline that passage? That specific ache you feel is vellichor.',
    },
    {
      title: 'Pulchritudinous',
      body: '(adj.) Beautiful.',
      detail: 'Widely considered the ugliest-sounding word meaning beautiful in English. A perfect paradox of language — the phonemes evoke disgust while the meaning is pure praise. Proof that the sound and sense of words don\'t have to match.',
      example: '"She is pulchritudinous." It sounds like a medical condition. The gap between how it sounds and what it means is the whole joke. Use it on someone who enjoys wordplay — they\'ll laugh, then want to know what it means.',
    },
    {
      title: 'Obstreperous',
      body: '(adj.) Noisy and difficult to control.',
      detail: 'From Latin obstrepere, "to make a noise against." Stronger than "rowdy" or "disruptive" — it carries a sense of deliberate, resistant unruliness, like someone who is loud specifically because they won\'t be quieted.',
      example: '"The obstreperous crowd refused to let the speaker finish, shouting down every attempt at calm." Or applied to a child: "obstreperous" captures the deliberate quality of the noise better than "loud" or "naughty."',
    },
    {
      title: 'Limerence',
      body: 'The involuntary state of intense infatuation with another person, including intrusive thoughts and longing.',
      detail: 'Coined by psychologist Dorothy Tennov in 1979 — distinct from love in that it\'s one-sided obsession rather than mutual connection. Limerence is neurologically similar to OCD: intrusive, unwanted, cycling thoughts you can\'t switch off.',
      example: 'Limerence is checking your phone every five minutes hoping for a text from one specific person. It\'s replaying a 30-second conversation for the hundredth time. It\'s not love — love is reciprocal. It\'s an involuntary obsession loop your brain runs whether you choose it or not.',
    },
  ],

  funfacts: [
    {
      title: 'Honey Never Expires',
      body: 'Archaeologists have found 3,000-year-old honey in Egyptian tombs that was still perfectly edible.',
      detail: 'Honey\'s low moisture content, acidic pH, and natural hydrogen peroxide make it inhospitable to bacteria indefinitely. It can crystallize, but crystallized honey is still good — warm it gently and it liquefies.',
      example: 'Archaeologists opened sealed jars in Egyptian tombs and tasted honey that was over 3,000 years old. Still sweet, still safe. No refrigeration, no preservatives — just chemistry. No other food on Earth does this.',
    },
    {
      title: 'A Day on Venus is Longer Than Its Year',
      body: 'Venus rotates so slowly that one Venusian day (243 Earth days) is longer than its year (225 Earth days).',
      detail: 'It also rotates backwards — if you could stand on Venus, the Sun would rise in the west and set in the east. The cause is likely a massive ancient collision that flipped its rotation.',
      example: 'If you were born on Venus, you\'d celebrate your birthday twice before experiencing a single sunrise. Your "year" (one orbit) finishes before your planet even completes one full spin. Day and year are inverted.',
    },
    {
      title: 'Octopuses Have Three Hearts',
      body: 'Two pump blood to the gills; one pumps it to the rest of the body. When an octopus swims, the main heart stops — making them tire easily.',
      detail: 'Their blood is blue because it uses copper-based hemocyanin instead of iron-based hemoglobin. Hemocyanin is less efficient at carrying oxygen, which is why octopuses prefer walking over swimming.',
      example: 'Watch a video of an octopus moving across the ocean floor — it crawls on its arms rather than swimming. That preference is partly because swimming stops its main heart, literally starving the body of oxygen. Walking keeps all three hearts pumping.',
    },
    {
      title: 'The Oxford Comma Once Cost Millions',
      body: 'In 2018, dairy drivers in Maine won a $5 million lawsuit because the absence of an Oxford comma made overtime exemptions ambiguous.',
      detail: 'The law exempted "the canning, processing, preserving, freezing, drying, marketing, storing, packing for shipment and distribution." Was "distribution" a separate exempt activity, or part of "packing for shipment"? No comma = ambiguous = $5M.',
      example: 'Without the Oxford comma: "We invited the strippers, JFK and Stalin." With it: "We invited the strippers, JFK, and Stalin." The comma clarifies JFK and Stalin aren\'t the strippers. In Maine, the missing comma cost $5 million. Grammar has consequences.',
    },
    {
      title: 'Cleopatra Lived Closer to the Moon Landing Than to the Pyramids',
      body: 'Cleopatra lived around 30 BCE. The Great Pyramid was built ~2560 BCE — 2,500 years before her. The Moon landing was 1969 — only 2,000 years after her.',
      detail: 'Time perspective is consistently our biggest blind spot. We compress the ancient world into a blur, not realizing how vast the distance between "ancient" events actually was.',
      example: 'For Cleopatra, the Great Pyramid was as ancient as the Roman Empire is for us today. She lived closer in time to the iPhone than to the Pyramid\'s construction. Let that sink in.',
    },
    {
      title: 'You Are Never More Than 6 Feet From a Spider',
      body: 'In most inhabited areas, spiders are so numerous you\'re statistically within 2 meters of one at nearly all times.',
      detail: 'Globally, spiders consume an estimated 400–800 million tons of prey per year — more than the entire weight of humanity. Without spiders, insect populations would overwhelm most ecosystems within weeks.',
      example: 'Look around whatever room you\'re in right now. There\'s almost certainly a spider within 2 meters — behind furniture, in a wall crack, under a shelf. They\'re quiet, nearly all harmless, and working hard to keep insects under control.',
    },
    {
      title: 'The Eiffel Tower Grows in Summer',
      body: 'The iron structure expands in heat and can grow up to 15 cm (6 inches) taller on the hottest days.',
      detail: 'Thermal expansion is why bridges have gaps between sections — to prevent buckling as metal expands and contracts with seasons. Engineers call them "expansion joints" and they\'re in every large metal structure.',
      example: 'Drive over a bridge and you\'ll feel small bumps — those are expansion joints, deliberate gaps allowing the metal to expand without cracking. The Eiffel Tower does this too, just without gaps: it simply gets taller.',
    },
    {
      title: 'Nintendo Was Founded in 1889',
      body: 'Nintendo started as a playing card company in Kyoto, Japan — 80 years before it entered electronics.',
      detail: 'The name roughly translates to "leave luck to heaven." They sold Hanafuda playing cards, attempted a taxi service, a love hotel chain, and a vacuum cleaner business before finding success in electronics.',
      example: 'When Nintendo was selling playing cards in 1889, the Eiffel Tower was just being built and the US had 38 states. By the time they released Super Mario Bros (1985), they\'d been a company for nearly a century. They still sell playing cards today.',
    },
    {
      title: 'The Human Body Contains Stardust',
      body: 'About 65% of your body is oxygen, 18% carbon — elements forged in the cores of dying stars billions of years ago.',
      detail: 'Elements heavier than hydrogen and helium were created by stellar nucleosynthesis — fusion inside stars. When those stars exploded as supernovas, they scattered the elements that eventually coalesced into our solar system.',
      example: 'The calcium in your bones was forged in a star that exploded before our solar system formed. The iron in your blood came from a different supernova. You are literally assembled from ancient stellar debris — recycled stardust that found its way into thinking, breathing form.',
    },
    {
      title: 'A Group of Flamingos is Called a Flamboyance',
      body: 'Other great collective nouns: a murder of crows, a parliament of owls, a conspiracy of lemurs, an ambush of tigers.',
      detail: 'Flamingos get their pink color from carotenoid pigments in the algae and shrimp they eat. Born white, they turn pink based on diet. A flamingo fed a carotenoid-poor diet turns white. The color is entirely diet-dependent.',
      example: 'At a zoo, flamingos fed a poor diet turn white. Add shrimp and algae back, they pink up again. So "a flamboyance of flamingos" are pink because they\'re well-fed — their color is literally a display of their diet quality.',
    },
    {
      title: 'The Shortest War in History Lasted 38 Minutes',
      body: 'The Anglo-Zanzibar War of 1896 began at 9:02 AM and ended at 9:40 AM when the Sultan\'s palace was shelled.',
      detail: 'Zanzibar unconditionally surrendered. Casualties: approximately 500 on the Zanzibar side, one British sailor wounded. The cause: Britain didn\'t approve of the new Sultan who had seized power.',
      example: 'The entire war — declaration, bombardment, palace destruction, surrender — fit between waking up and finishing breakfast. At 9:02 guns fired. At 9:40 the white flag went up. Shortest military conflict in recorded history.',
    },
    {
      title: 'Hot Water Freezes Faster Than Cold Water',
      body: 'The Mpemba Effect: under certain conditions, hot water will freeze before an equal amount of cold water.',
      detail: 'First documented by student Erasto Mpemba in 1963 — his physics teacher told him he was wrong. He wasn\'t. The exact mechanism is still debated: evaporation, convection currents, and dissolved gas content all play roles.',
      example: 'Fill two identical ice cube trays — one with hot tap water, one with cold. Freeze both. The hot water tray often freezes first. Mpemba noticed this when his warm ice cream mixture froze faster than his classmates\' cold mixture. His teacher dismissed it. He was right.',
    },
    {
      title: 'Maine and Alaska Share No Borders With Other U.S. States',
      body: 'Maine borders only New Hampshire. Alaska borders only Canada. They are the only two U.S. states touching just one other state or country.',
      detail: 'This also makes Alaska the northernmost, westernmost, AND easternmost state — it crosses the 180th meridian into the Eastern Hemisphere, pushing past even Hawaii in the east.',
      example: 'Pull up a US map. Every state except Maine and Alaska shares a border with at least two other states. Maine juts out into New England alone. Alaska sits detached entirely — an island of a state touching only Canada.',
    },
    {
      title: 'Sharks Are Older Than Trees',
      body: 'Sharks have existed for ~450 million years. Trees appeared ~350 million years ago. Sharks saw the first forests grow.',
      detail: 'Sharks have survived all five mass extinctions, including the one that killed the dinosaurs. Their basic design has changed remarkably little — the shark body plan is one of evolution\'s most durable solutions.',
      example: 'Imagine being a shark 350 million years ago, swimming near the shore, looking at the land. No forests — just bare rock and low-lying plants. Then, over millions of years, you watch the first trees appear. Sharks predate every tree that has ever lived.',
    },
    {
      title: 'There Are More Possible Games of Chess Than Atoms in the Universe',
      body: 'The number of possible chess games is estimated at 10¹²⁰ (the Shannon Number). Observable universe atoms: ~10⁸⁰.',
      detail: 'This is why computers can\'t brute-force chess — they use evaluation functions and pruning algorithms to narrow the search. Even the most powerful computers can only look ahead a finite number of moves.',
      example: 'White has 20 possible first moves. Black has 20. That\'s 400 positions after one move each. After 2 moves each: ~8,000. After 3 each: ~9 million. After 10 moves each: more positions than atoms in the universe. Every serious chess game ever played is almost certainly unique.',
    },
    {
      title: 'The Word "Salary" Comes From Salt',
      body: 'Roman soldiers were sometimes paid partly in salt (Latin: sal), making it one of history\'s first currencies.',
      detail: 'Salt was revolutionary — the only reliable way to preserve meat before refrigeration. Empires were built and destroyed over salt access. The expression "not worth his salt" comes directly from this era.',
      example: 'The Roman road Via Salaria (Salt Road) ran from Rome to the Adriatic — its entire purpose was moving salt. Cities grew where salt was found or traded. Your modern paycheck carries the word for an ancient, revolutionary mineral inside it: salary.',
    },
    {
      title: 'Bananas Are Berries; Strawberries Are Not',
      body: 'Botanically, a berry develops from a single flower with one ovary. Bananas qualify. Strawberries, raspberries, and blackberries do not.',
      detail: 'Avocados, kiwis, watermelons, cucumbers, and eggplants are also technically berries. Strawberries are "aggregate accessory fruits" — the red part is swollen receptacle tissue, not the fruit itself. The tiny yellow seeds are the actual fruits.',
      example: 'The next time you eat a banana: berry. Avocado in your salad: berry. Watermelon: berry. The strawberry you think of as the quintessential berry: not a berry. The botanical definition and the common English word point at completely different things.',
    },
    {
      title: 'The Great Wall of China Cannot Be Seen From Space',
      body: 'This is a persistent myth. The wall is wide enough to walk on but far too narrow to see from low Earth orbit without optical aid.',
      detail: 'Chinese astronaut Yang Liwei confirmed he couldn\'t see it during his 2003 space flight. From the International Space Station (400 km up), the wall would appear thinner than a human hair to the naked eye.',
      example: 'The Great Wall is 5–8 meters wide — about the width of a highway lane. At 400 km altitude, the ISS, you\'d need to spot something the width of a lane from the distance of a cross-country flight. Astronauts consistently confirm: not visible.',
    },
    {
      title: 'A Bolt of Lightning Contains About 1 Billion Joules',
      body: 'That\'s enough energy to toast 100,000 slices of bread — yet 99% is lost as heat, light, and sound in milliseconds.',
      detail: 'The average bolt lasts 0.2 seconds and reaches 30,000 Kelvin — five times hotter than the Sun\'s surface. The thunder you hear is the air superheating and explosively expanding.',
      example: 'A bolt delivers ~1 billion joules in 0.2 seconds. Your toaster uses ~1,000 watts (joules/second). One lightning bolt could run your toaster continuously for ~277 hours — nearly 12 days. The energy is real; capturing it is the problem.',
    },
    {
      title: 'The Inventor of the Frisbee Became a Frisbee',
      body: 'Walter Morrison, who sold the Frisbee concept to Wham-O in 1957, had his ashes mixed into memorial Frisbees after his death in 2010.',
      detail: 'The name "Frisbee" came from the Frisbie Pie Company — Yale students tossed the empty pie tins for fun in the 1940s, shouting "Frisbie!" as warning. Morrison saw this and invented a plastic version.',
      example: 'Morrison invented the plastic flying disc, sold the idea, watched it become a global phenomenon, and at the end of his life literally became one. His family honored his wishes: his ashes were pressed into Frisbees and given to friends. He is the toy.',
    },
  ],

  science: [
    {
      title: 'You Are Mostly Empty Space',
      body: 'If you removed all empty space from every atom in a human body, the remaining matter would fit in a sugar cube — but weigh 1,000 kg.',
      detail: 'Atoms are 99.9999999% empty space. What we perceive as "solid" is electromagnetic force between electron clouds, not actual contact between particles. Nothing ever truly touches anything else.',
      example: 'Your hand pressed against a table never actually touches it — electron clouds repel each other before the nuclei get close. The feeling of "solid" is electromagnetic resistance. If you could remove the empty space from your body, what remained would be a grain of sand that weighs as much as a small car.',
    },
    {
      title: 'Your Brain Uses 20% of Your Body\'s Energy',
      body: 'The brain is only ~2% of body weight but consumes 20% of energy and oxygen. It burns roughly 0.1 calorie per minute just existing.',
      detail: 'Thinking harder uses only slightly more energy — deep concentration increases consumption by about 1%. The "use your brain more to burn calories" strategy is effectively a myth. The brain bills you the same regardless.',
      example: 'Your brain uses ~400 calories per day at baseline. Intense studying for 8 hours adds maybe 20 extra calories — less than an apple. "Thinking hard" barely registers as extra energy use. The brain is expensive to run, but it doesn\'t charge extra for hard problems.',
    },
    {
      title: 'Water Can Boil and Freeze Simultaneously',
      body: 'At the "triple point" (0.01°C, 611.7 Pa), water can simultaneously exist as solid, liquid, and gas.',
      detail: 'This precise point is used to calibrate thermometers worldwide. It\'s one of the most reproducible physical phenomena in nature — same pressure, same temperature, every time, everywhere.',
      example: 'In a lab vacuum chamber, lower the pressure to 611.7 Pa and cool water to 0.01°C. The liquid surface begins boiling (gas escaping), while ice crystals form simultaneously, while liquid water sits between them. All three phases at once. It\'s real and reproducible.',
    },
    {
      title: 'Sound Can\'t Travel in Space — But Light Can',
      body: 'Sound needs a medium (air, water, solid) to propagate. Space is a near-vacuum. Explosions in space are completely silent.',
      detail: 'Light is an electromagnetic wave — it propagates as oscillating electric and magnetic fields and needs no medium. It can travel through a perfect vacuum at 299,792,458 m/s.',
      example: 'At a fireworks show: you see the explosion instantly (light travels 300,000 km/s), then hear the boom 1-3 seconds later (sound travels only 343 m/s through air). The gap is sound needing air to travel. In space: you\'d see the explosion but hear absolutely nothing.',
    },
    {
      title: 'The Smell of Rain is Geosmin',
      body: 'Petrichor\'s main compound is geosmin, produced by soil bacteria (Streptomyces). Humans can detect it at concentrations as low as 5 parts per trillion.',
      detail: 'We evolved extreme sensitivity to geosmin because rain meant water and survival for our ancestors. Our detection threshold for it is 200,000 times more sensitive than sharks\' ability to smell blood.',
      example: 'You can smell rain approaching before a single drop falls — geosmin rising from disturbed soil bacteria drifts ahead of the storm. At 5 parts per trillion, your nose detects it like smelling a single drop dissolved in 20 Olympic swimming pools. Evolution made you a rain sensor.',
    },
    {
      title: 'Quantum Entanglement is Real',
      body: 'Two particles can be "entangled" so that measuring one instantly determines the state of the other — no matter the distance.',
      detail: 'Einstein called it "spooky action at a distance" and believed it must be an error. The 2022 Nobel Prize in Physics went to researchers who proved experimentally that it is real and that no "hidden variables" explain it away.',
      example: 'Entangle two photons in a lab. Send one to Tokyo, keep one in New York. Measure the New York photon\'s spin: "up." The Tokyo photon\'s spin is simultaneously and definitively "down" — not because a signal traveled, but because the states are linked. Experimentally verified.',
    },
    {
      title: 'Trees Communicate Through Fungi',
      body: 'Forests are connected by a "Wood Wide Web" — a network of mycorrhizal fungi through which trees share nutrients, water, and chemical signals.',
      detail: 'Mother trees (oldest, largest) preferentially route carbon to their own seedlings through this network. When dying, trees have been observed sending resource pulses to neighbors. The network facilitates what looks functionally like forest-wide cooperation.',
      example: 'When a Douglas fir is damaged by insects, neighboring trees of the same species begin producing defensive compounds before being attacked — warned by chemical signals traveling through the fungal network. The forest thinks, slowly, in chemistry.',
    },
    {
      title: 'Your DNA Would Stretch 67 Billion Miles If Uncoiled',
      body: 'Each human cell contains ~6 feet (2 meters) of DNA. Multiply by 37 trillion cells and you get a strand that would reach the Sun and back over 350 times.',
      detail: 'Proteins called histones spool the DNA into a structure smaller than a grain of sand. The packing ratio is 1:40,000 — like folding a 100-kilometer thread into a marble.',
      example: 'Your DNA is 6 feet long but coiled so tightly it fits in a nucleus ~6 micrometers wide. If you took all the DNA from all your cells and laid it end to end: it would stretch from Earth to Pluto and back, 12 times.',
    },
    {
      title: 'Glass is Not a Slow-Moving Liquid',
      body: 'Old cathedral windows are thicker at the bottom because of imperfect medieval manufacturing, not because glass flows over centuries.',
      detail: 'Glass is an amorphous solid — its atoms lack the long-range order of crystals. At room temperature it would take longer than the age of the universe to flow any measurable amount. The "liquid" description is a persistent myth.',
      example: 'Medieval glassmakers couldn\'t produce perfectly uniform sheets. When the thicker-at-one-end panes were installed, glaziers put the heavy end at the bottom — structurally sensible. The bottom-heaviness is installation preference from 1400, not 600 years of flow.',
    },
    {
      title: 'The Mantis Shrimp Can Punch at 50 mph',
      body: 'Mantis shrimp strike with the force of a bullet and can shatter aquarium glass. The strike lasts only 1/3,000th of a second.',
      detail: 'The impact creates cavitation bubbles that collapse at 5,000°C — hotter than the Sun\'s surface — for a fraction of a microsecond, generating a second shockwave. The shrimp effectively punches twice.',
      example: 'Aquariums keep mantis shrimp in specially reinforced acrylic tanks because they punch through standard glass. The punch is so fast it heats the water hotter than the Sun\'s surface for a microsecond. They\'re also called "thumb-splitters" by fishermen who handle them carelessly.',
    },
    {
      title: 'Every Second, the Sun Converts 4 Million Tons Into Energy',
      body: 'Nuclear fusion in the Sun\'s core converts ~4 million metric tons of mass into pure energy per second via E=mc².',
      detail: 'The Sun loses 4 million tons per second yet has enough fuel for another 5 billion years. It has burned through about half its hydrogen supply — we\'re at the halfway point of our star\'s life.',
      example: 'That energy radiates in all directions. Earth intercepts only 1/2,000,000,000th of the Sun\'s output — a tiny sliver. That tiny sliver powers every plant, every weather system, every ocean current, every living thing on Earth. The rest beams away into space, unnoticed.',
    },
    {
      title: 'Cold Water Conducts Electricity Better Than Hot',
      body: 'Electrical conductivity in water decreases as temperature rises because ions move faster and collide more frequently, impeding electron flow.',
      detail: 'Pure distilled water is actually a very poor electrical conductor — it\'s the dissolved salts and minerals that carry current. The ions (Na⁺, Cl⁻, etc.) do the work.',
      example: 'Pure distilled water is nearly an insulator — you couldn\'t electrocute yourself in a tub of it. Add table salt and it becomes conductive. Ocean water is highly conductive because it\'s full of ions. The water doesn\'t conduct — the stuff dissolved in it does.',
    },
    {
      title: 'Your Gut Has Its Own Nervous System',
      body: 'The enteric nervous system contains 100–500 million neurons — more than the spinal cord. The gut can function independently of the brain.',
      detail: '90% of the vagus nerve\'s signals travel from gut to brain, not brain to gut. Your gut produces 90% of the body\'s serotonin. When people say "trust your gut," the gut genuinely processes information independently.',
      example: 'Butterflies before a speech, a sick feeling at bad news, a "gut feeling" about a decision — these are your enteric nervous system processing emotional signals before your conscious brain catches up. The gut isn\'t just digesting; it\'s computing.',
    },
    {
      title: 'Neutron Stars Are Mind-Bendingly Dense',
      body: 'A teaspoon of neutron star material would weigh roughly 10 million tons — the weight of a mountain.',
      detail: 'Neutron stars form when a star much more massive than our Sun collapses. The entire mass of a city-sized object (20 km diameter) is compressed so tightly that gravity warps spacetime measurably around it.',
      example: 'A marshmallow dropped from 1 meter above a neutron star\'s surface would hit with the force of a nuclear bomb — due to the extreme gravity. A sugar-cube of material would outweigh every skyscraper ever built, combined.',
    },
    {
      title: 'Photons Take 100,000 Years to Escape the Sun',
      body: 'Sunlight takes 8 minutes from the Sun\'s surface to Earth. But a photon takes ~100,000 years to travel from the Sun\'s core to its surface.',
      detail: 'The core is so dense that photons are constantly absorbed and re-emitted by plasma particles, zigzagging in a random walk. Their effective outward speed is just centimeters per year — then they break free and cross 150 million km in 8 minutes.',
      example: 'The light warming your face right now left the Sun\'s core roughly 100,000 years ago — when early humans were first spreading across Europe. It bounced around inside the Sun for 100 millennia, then crossed space in 8 minutes, then hit you.',
    },
    {
      title: 'Bees Can Recognize Human Faces',
      body: 'Honeybees use the same pattern-recognition system humans use — "configural processing" — to distinguish individual human faces.',
      detail: 'They can be trained to associate specific faces with sugar rewards and choose correctly when shown the faces again days later. This ability likely evolved to navigate complex flower patterns.',
      example: 'Scientists showed bees photos of human faces paired with sugar. Bees learned to fly toward a specific person\'s face to find the reward. When tested days later with new photos, they chose correctly. They\'re reading faces the same way you are — as a whole pattern, not individual features.',
    },
    {
      title: 'The Speed of Light Varies by Medium',
      body: 'Light travels at c = 299,792,458 m/s only in a vacuum. In glass it slows to ~200,000 km/s. In water, ~225,000 km/s.',
      detail: 'This slowing creates the refractive index. Cherenkov radiation — the blue glow in nuclear reactors — occurs when charged particles travel faster than light does in that medium, creating a visible shockwave of light.',
      example: 'A diamond\'s sparkle comes from light slowing to 124,000 km/s inside (refractive index 2.42) and bouncing internally before escaping at sharp angles. A fiber optic cable keeps light trapped inside by making the core slow light more than the cladding — physics becomes internet.',
    },
    {
      title: 'There Are More Trees Than Stars in the Milky Way',
      body: 'Earth has ~3 trillion trees. The Milky Way has ~200–400 billion stars. Trees outnumber stars by a factor of 7–15.',
      detail: 'Humanity has cut down roughly half of all trees since the start of civilization. We plant ~15 billion per year but cut ~46 billion. The net direction is still downward.',
      example: 'The Milky Way has ~300 billion stars. If you planted one tree per second without stopping, it would take 95,000 years just to match Earth\'s current tree count. And we still have more trees than stars in our own galaxy.',
    },
    {
      title: 'Viruses Outnumber Everything Else on Earth',
      body: 'There are an estimated 10³¹ viruses on Earth — more than all other life combined, and more than stars in the observable universe.',
      detail: 'If all Earth\'s viruses were laid end to end, the chain would extend 100 million light-years. Most viruses infect bacteria rather than animals. Viruses have likely driven much of evolution by transferring genes between species.',
      example: 'Right now, in one milliliter of ocean seawater, there are roughly 10 million viruses — and they\'re mostly infecting bacteria, not anything threatening to you. The ocean\'s viral load is the engine that recycles nutrients and drives the base of the food chain.',
    },
    {
      title: 'Time Passes Faster at Higher Altitudes',
      body: 'Gravity slows time (gravitational time dilation). Clocks on GPS satellites run ~38 microseconds faster per day than on Earth — and must be corrected.',
      detail: 'This effect was predicted by Einstein in 1915 and confirmed experimentally. Without the relativistic correction built into GPS, your location would drift ~10 km per day.',
      example: 'Every iPhone has Einstein\'s equations running invisibly inside it, correcting for the fact that time runs faster on satellites than on Earth. Without this correction, Google Maps would be wrong by 10 km per day. Relativity isn\'t abstract physics — it\'s why navigation works.',
    },
  ],

  history: [
    {
      title: 'The Library of Alexandria Wasn\'t Burned Down Once',
      body: 'The Library of Alexandria declined over centuries through multiple fires, budget cuts, and political shifts — not one dramatic burning.',
      detail: 'Julius Caesar accidentally burned part of it in 48 BCE. But it was still partially functional 400 years later. The "single fire" story is a myth that romanticizes a complex, gradual institutional decline.',
      example: 'The library\'s end was more like a university slowly losing funding, faculty leaving, and buildings being repurposed over generations — tragic but mundane. No single villain, no single bonfire. History\'s most famous library died of neglect, not drama.',
    },
    {
      title: 'Napoleon Was Not Especially Short',
      body: 'Napoleon stood about 5\'7" (170 cm) — average height for a Frenchman of his era. The "short" myth originated from British propaganda and a unit conversion error.',
      detail: 'He was listed as 5\'2" in French units (pouce) — which are longer than British inches. His nickname "le petit caporal" referred to affection from his troops, not his stature. British cartoonist James Gillray cemented the image.',
      example: 'A French pouce is 2.7 cm; a British inch is 2.54 cm. "5 feet 2 pouces" in French = 5 feet 7 inches in British. Translators made the error. James Gillray drew him as a tiny, furious man, and 200 years of cartoons followed. He wasn\'t short. We were fooled by a measurement mistake.',
    },
    {
      title: 'The Roman Empire Never Really Fell',
      body: 'The Eastern Roman Empire (Byzantine Empire) continued for nearly 1,000 years after 476 CE, falling to the Ottomans only in 1453.',
      detail: 'The Byzantines called themselves Romans and used Roman law. After Constantinople fell, the Ottoman Sultan Mehmed II adopted the title "Caesar of Rome." The fall of Rome was a very slow, very partial process.',
      example: 'In 1453, when the Ottomans conquered Constantinople, they were defeating soldiers who called themselves Romans, who used Roman law codes, and who traced their authority directly back to Augustus. "Rome fell in 476" is a western European story — the eastern half barely noticed.',
    },
    {
      title: 'The Fastest Soldiers in History Carried Phones',
      body: 'During WWII, carrier pigeons delivered messages more reliably than early radio in battlefield conditions. Pigeon Cher Ami delivered 12 critical messages and was awarded the Croix de Guerre.',
      detail: 'Cher Ami\'s most famous flight (1918): she was shot through the chest and lost a leg but still delivered the message that saved 194 trapped US soldiers. The last military carrier pigeon service was retired by India\'s Orissa police in 2004.',
      example: 'In WWI trenches, radio signals were intercepted and equipment was fragile. A pigeon could cross no-man\'s-land in minutes, couldn\'t be jammed, and enemy troops rarely shot them (they moved fast and were small targets). For decades, birds were more reliable than technology.',
    },
    {
      title: 'Coca-Cola Was Originally Green',
      body: 'Early glass bottles gave Coca-Cola a green tint. The drink was also marketed as a "nerve tonic" containing cocaine from coca leaves until 1903.',
      detail: 'The cocaine was removed not primarily for health reasons but because anti-cocaine legislation was approaching and the company acted preemptively. The "de-cocainized" leaves are still used as a flavoring today, processed in New Jersey.',
      example: 'In 1890, your Coca-Cola fix came in a greenish bottle, advertised as a headache cure containing small amounts of cocaine. Pharmacists sold it. By 1903, the cocaine was gone but the name remained. The brand survived a drug removal that would end most products today.',
    },
    {
      title: 'The Great Fire of London Killed Almost Nobody',
      body: 'The 1666 Great Fire destroyed 13,200 houses and 87 churches — yet only 6 confirmed deaths are recorded.',
      detail: 'The city\'s population of ~80,000 had days to evacuate as the fire spread slowly. Ironically, the fire ended a plague outbreak by burning the rat-infested timber slums where it thrived. Christopher Wren rebuilt a better city from the ashes.',
      example: 'The fire burned for 4 days across 373 acres. Records show 6 deaths. Compare: the 1906 San Francisco earthquake killed 3,000. The Great Fire killed fewer people than a bad traffic day because the city had time — the fire spread by wind, not explosion.',
    },
    {
      title: 'The First Computer Bug Was an Actual Bug',
      body: 'In 1947, Grace Hopper\'s team at Harvard found a moth trapped in relay 70 of the Harvard Mark II computer, causing errors.',
      detail: 'Hopper taped the moth into the logbook with the note "First actual case of bug being found." The logbook is now at the Smithsonian. The figurative use of "bug" for errors predates this — but this incident cemented the term permanently.',
      example: 'The entry reads: "1545 Relay #70 Panel F (moth) in relay. First actual case of bug being found." A literal insect caused a computer malfunction, and a note scrawled in a logbook gave us the word we still use for software errors. The moth is in a museum.',
    },
    {
      title: 'The Mongol Empire Was the World\'s Largest Contiguous Land Empire',
      body: 'At its peak in 1279, the Mongol Empire covered 24 million km² — about the size of Africa — and controlled 25% of the world\'s population.',
      detail: 'Under Pax Mongolica, trade along the Silk Road flourished. The Black Death likely spread along Mongol trade routes. Marco Polo traveled safely from Venice to China because the Mongols had made the route navigable.',
      example: 'At its peak, you could travel from Korea to Hungary without ever crossing a border — all Mongol territory. The Pax Mongolica made the Silk Road safe for Marco Polo. The cultural exchange he enabled helped spark the Renaissance. The largest empire in history accidentally boosted European civilization.',
    },
    {
      title: 'Oxford University Is Older Than the Aztec Empire',
      body: 'Teaching at Oxford began around 1096-1167 CE. The Aztec Empire was founded ~1428 CE. Oxford is at least 260 years older.',
      detail: 'Oxford also predates Windsor Castle in its current form, the invention of the mechanical clock, the Black Death, and the Hundred Years\' War. It was a functioning university when most European nations as we know them didn\'t exist.',
      example: 'In 1428, when the Aztec Triple Alliance was forming in Mexico, Oxford had already been teaching students for over 300 years. The same institution that opened before the Black Death is still giving lectures today.',
    },
    {
      title: 'Einstein Was Offered the Presidency of Israel',
      body: 'In 1952, Einstein was asked to become Israel\'s second president after Chaim Weizmann\'s death. He declined, saying he lacked the aptitude for people and politics.',
      detail: 'His exact words: "I am deeply moved by the offer from our State of Israel, and at once saddened and ashamed that I cannot accept it. I have neither the natural ability nor the experience to deal properly with people and to exercise official functions."',
      example: 'The man who derived General Relativity understood himself precisely: brilliant at physics, poor at people management. He reportedly said "politics is for the moment, but an equation is for eternity." He knew what he was good at and said no.',
    },
    {
      title: 'The Last Confederate General Surrendered in 1865 — in Liverpool',
      body: 'CSS Shenandoah continued raiding Union ships until August 1865 — four months after the Civil War ended — because the crew hadn\'t heard the news.',
      detail: 'Commander James Waddell finally learned the war was over in August 1865 from a passing British ship. He sailed to Liverpool and surrendered to British authorities on November 6, 1865 — the last Confederate officer to do so.',
      example: 'The Civil War ended April 9, 1865. The Shenandoah\'s crew kept raiding and sinking Union ships for months after, unaware. They surrendered not in a Confederate port (which no longer existed) but in Liverpool, England — the last Confederate flag to come down.',
    },
    {
      title: 'The 100 Years\' War Lasted 116 Years',
      body: 'The conflict between England and France ran from 1337 to 1453 — 116 years. It was actually several separate wars with long truces between them.',
      detail: 'The war produced Joan of Arc, permanently ended English territorial claims in France, and helped forge modern national identities in both countries. It\'s less a single war than a recurring conflict over the same fundamental dispute.',
      example: 'The "Hundred Years\' War" had decades-long truces — periods when peace held. It\'s like calling a recurring feud over property rights a single event. The name was coined by historians later. No one called it that while it was happening.',
    },
    {
      title: 'Nikola Tesla Claimed He Could Destroy the Earth',
      body: 'Tesla claimed his mechanical oscillator found the resonant frequency of his New York building and caused it to shake violently — and that the same principle could theoretically destroy any structure.',
      detail: 'He once activated his oscillator in his lower Manhattan lab, causing his building and nearby structures to shake until he smashed the device with a hammer before police arrived. He later claimed he could collapse the Brooklyn Bridge with a small device.',
      example: 'Resonance is real: every structure has a natural frequency. When soldiers march in step over a bridge, they\'re told to break stride — if the marching frequency matches the bridge\'s resonant frequency, the oscillation builds. Tesla understood this and pushed it to an extreme.',
    },
    {
      title: 'Alaska Was Purchased for 2 Cents an Acre',
      body: 'The U.S. bought Alaska from Russia in 1867 for $7.2 million — about $0.02 per acre. The press called it "Seward\'s Folly."',
      detail: 'Russia feared losing Alaska to Britain anyway and needed cash after the Crimean War. Alaska has since yielded trillions in oil, gas, gold, fish, and strategic military value. Prudhoe Bay alone has produced over $400 billion in oil revenue.',
      example: '$7.2 million in 1867 equals roughly $150 million today. Alaska\'s Prudhoe Bay oilfield has produced over $400 billion in revenue — 2,600 times the purchase price. "Seward\'s Folly" is now the textbook example of a brilliant real estate deal.',
    },
    {
      title: 'Ancient Romans Used Crushed Mouse Brains as Toothpaste',
      body: 'Roman dental hygiene included powders made from mouse brain, rabbit head ash, and lizard liver. Also: charcoal, crushed oyster shells, and urine.',
      detail: 'Urine contains ammonia — an effective cleaning agent. It was used as mouthwash in ancient Rome and was still marketed as a dental product in 18th-century Europe. Roman teeth found archaeologically are often surprisingly healthy by pre-modern standards.',
      example: 'Roman dental powder recipe: roasted mouse brain + rabbit skull ash + powdered oyster shells. Rinse with urine. Gross? Yes. Effective? Relatively — the abrasives cleaned plaque, the ammonia killed bacteria. Roman skulls often show less decay than medieval ones.',
    },
    {
      title: 'The First Webcam Watched a Coffee Pot',
      body: 'In 1991, Cambridge University researchers set up a camera aimed at their communal coffee pot to avoid wasted trips when it was empty.',
      detail: 'It became the first public webcam when connected to the internet in 1993. At its peak it had 2.4 million daily viewers. The pot sold on eBay in 2001 for £3,350 and is now in a German technology museum.',
      example: 'The entire purpose was lazy efficiency: "Is the coffee ready?" → walk to kitchen → no coffee → walk back → sad. Solution: point a camera at the pot and check online. The internet\'s first public webcam streamed a coffee machine. The whole thing was about not wasting a trip upstairs.',
    },
    {
      title: 'Woolly Mammoths Lived When the Great Pyramid Was Being Built',
      body: 'The last population of woolly mammoths died on Wrangel Island (Russia) around 1650 BCE. The Great Pyramid was completed ~2560 BCE.',
      detail: 'For 900 years, pharaohs and woolly mammoths coexisted on Earth. The mammoths outlasted the entire Old Kingdom of Egypt. They were still alive when Abraham, by biblical chronology, was leading his tribe through Canaan.',
      example: 'While workers were putting the finishing stones on the Great Pyramid (~2560 BCE), woolly mammoths were still grazing on an Arctic island. For 900 years, both existed simultaneously. The mammoths didn\'t go extinct in the Ice Age — they went extinct in recorded human history.',
    },
    {
      title: 'One Man May Have Prevented Nuclear War in 1983',
      body: 'On September 26, 1983, Soviet systems falsely detected 5 US missiles inbound. Lt. Colonel Stanislav Petrov decided it was a malfunction and did not report it up the chain.',
      detail: 'His reasoning: a first strike would involve hundreds of missiles, not five. He logged it as a system malfunction. For this deviation from protocol he was initially reprimanded. He was later recognized by the UN and awarded the Dresden Peace Prize.',
      example: 'Protocol: report confirmed attack immediately. Petrov\'s instinct: "Why would the US launch only 5 missiles for a first strike?" He waited, monitored ground radar, confirmed nothing, logged it as false alarm. His hesitation to follow protocol may have saved hundreds of millions of lives.',
    },
    {
      title: 'Ancient Egyptians Shaved Eyebrows When a Cat Died',
      body: 'Cats were sacred in ancient Egypt. When a household cat died, family members shaved their eyebrows as a sign of mourning.',
      detail: 'Herodotus recorded this in ~450 BCE. Killing a cat — even accidentally — was punishable by death. Temple cats were treated as living embodiments of the goddess Bastet. Egyptians reportedly died in house fires rather than leave their cats behind.',
      example: 'When a cat died in an Egyptian household, the mourning was visible: shaved eyebrows announced grief publicly, like wearing black today. Family members waited until the eyebrows grew back — the mourning period was literally biological.',
    },
    {
      title: 'LEGO Is the World\'s Largest Tire Manufacturer',
      body: 'LEGO produces about 318 million tiny rubber tires per year for its toy sets — more than any other company makes real tires.',
      detail: 'LEGO was founded by Ole Kirk Christiansen in 1932. The name combines Danish "leg godt" (play well). The interlocking brick was patented in 1958 and has been essentially unchanged since.',
      example: 'Bridgestone, Michelin, and Goodyear each make tens of millions of full-size tires per year. LEGO makes 318 million tiny ones. "Largest tire manufacturer" depends entirely on whether you count size. By count, it\'s LEGO — and it\'s not close.',
    },
  ],

  philosophy: [
    {
      title: 'Stoicism\'s Core Practice',
      body: '"Make the best use of what is in your power, and take the rest as it happens." — Epictetus',
      detail: 'Stoics divided the world into two categories: what is "up to us" (our thoughts, judgments, responses) and what is not (other people, outcomes, weather). Freedom comes from investing energy only in the first category.',
      example: 'You\'re stuck in traffic, about to miss an important meeting. The traffic is not "up to you." Your response — whether to panic, call ahead, accept it calmly — is. Stoicism says: spend zero energy on the traffic, all of it on your response. One is waste, one is productive.',
    },
    {
      title: 'Socrates on Knowledge',
      body: '"I know that I know nothing." — Socrates (paraphrased)',
      detail: 'The original Greek is more nuanced: recognizing ignorance is the beginning of wisdom. The "Socratic method" of persistent questioning to expose hidden assumptions changed education, law, and philosophy permanently.',
      example: 'Socrates walked Athens asking experts about justice, beauty, and virtue. Each claimed expertise. Through questioning, he showed their "knowledge" was assumption dressed as certainty. He concluded he was wiser only because he knew what he didn\'t know — they didn\'t even know that.',
    },
    {
      title: 'Pascal\'s Wager',
      body: 'If God exists and you believe, infinite gain. If God doesn\'t exist and you believe, finite loss. Logic therefore suggests belief.',
      detail: 'Critics (including Voltaire) noted this ignores which God to believe in and whether God would accept insincere belief. But it pioneered formal decision theory — using mathematical expected value to reason about uncertainty.',
      example: 'The decision matrix: God + belief = infinite heaven. God + no belief = infinite suffering. No God + belief = small cost (Sunday church, some rules). No God + no belief = trivial gain. Pascal says: the math demands you bet on belief. The downside of being wrong is infinite.',
    },
    {
      title: 'The Ship of Theseus',
      body: 'If you replace every plank of a ship over time, is it still the same ship? If not, at what point did it change?',
      detail: 'Applied to humans: your cells replace themselves on different schedules (liver: 18 months, skeleton: 10 years, neurons: largely never). You share almost no atoms with your 10-year-old self, yet continuous memory makes you feel the same person.',
      example: 'Your childhood bike gets a new wheel, new frame, new seat, new handlebars over the years. Is it the same bike? Now apply it to you: your liver replaces itself every 18 months. Most of your body is not the same matter it was a decade ago. What makes you "you"?',
    },
    {
      title: 'Plato\'s Cave',
      body: 'Prisoners chained in a cave see only shadows on a wall and mistake them for reality. Freedom means turning to see the true light.',
      detail: 'The allegory asks: could our entire reality be a projection of something deeper? Plato used it to argue that philosophers — who seek truth directly — should govern society. It resonates in modern debates about simulation theory and media bubbles.',
      example: 'We see the world filtered through language, culture, cognitive biases, and limited senses. A person who questions those filters — the scientist, the philosopher — is the prisoner who turns toward the fire. It hurts (reality rarely matches expectation) but they see more truly.',
    },
    {
      title: 'Kant\'s Categorical Imperative',
      body: '"Act only according to that maxim whereby you can at the same time will that it should become a universal law."',
      detail: 'In plain English: before acting, ask "what if everyone did this?" If the answer is "the world breaks down," don\'t do it. This is the foundation of modern duty-based (deontological) ethics.',
      example: '"Should I lie on my resume to look better?" Apply the imperative: what if everyone lied on resumes? Resumes become worthless — no one is hired based on them. The very tool the lie was supposed to help collapses. Kant says: don\'t lie, not because you\'ll get caught, but because universal lying destroys the practice.',
    },
    {
      title: 'Nietzsche\'s Eternal Return',
      body: 'What if you had to live your exact life — every joy and every suffering — infinitely repeated? Would you embrace it?',
      detail: 'Nietzsche used it as a thought experiment, not a cosmological claim. It\'s a test: if you wouldn\'t want to repeat your life forever, that\'s information about how you\'re living it. It challenges you to live in a way that warrants infinite replay.',
      example: '"If you had to relive today — exactly as it happened — forever, would you choose it?" Most people would change something. That discomfort is Nietzsche\'s point: if the thought horrifies you, that\'s a signal about how you\'re actually spending your time.',
    },
    {
      title: 'Occam\'s Razor',
      body: 'When two explanations fit the evidence equally well, prefer the simpler one.',
      detail: 'Named for William of Ockham (1287–1347). Often misquoted — it doesn\'t say the simplest explanation is correct, only that unnecessary complexity should be cut away. It\'s a principle of parsimony, not certainty.',
      example: 'Your car won\'t start. Explanation A: dead battery. Explanation B: an enemy sabotaged the fuel injector and also drained the battery. Both explain the symptoms. Occam\'s Razor says: check the battery first. Don\'t multiply explanations beyond necessity.',
    },
    {
      title: 'Camus on the Absurd',
      body: '"One must imagine Sisyphus happy." — Albert Camus',
      detail: 'The gods punished Sisyphus to push a boulder uphill forever, watch it roll down, and repeat eternally. Camus argues that acknowledging life has no inherent meaning doesn\'t require despair — the rebellion against meaninglessness is itself a form of meaning.',
      example: 'Sisyphus walks back down the hill to the boulder again. Camus says: at that moment, he can choose his relationship to the task. The rebellion — refusing to be crushed by an absurd fate — is the only authentic human response to a universe that offers no inherent purpose.',
    },
    {
      title: 'Hume\'s Is-Ought Problem',
      body: 'No "ought" (moral claim) can be logically derived from an "is" (factual claim) alone.',
      detail: 'This is one of philosophy\'s most important observations. Facts describe how things are; they cannot by themselves tell you how things should be. A moral claim requires an additional value premise.',
      example: '"Humans are naturally aggressive" (is) → "therefore aggression is acceptable" (ought). The jump is logically unjustified. "People cheat on diets" (is) → "therefore cheating is fine" (ought). Facts describe; they don\'t prescribe. The gap between is and ought always needs a values bridge.',
    },
    {
      title: 'The Trolley Problem',
      body: 'A trolley will kill 5 people. You can pull a lever to divert it, killing 1 instead. Do you act?',
      detail: 'Variants: push someone in front to stop it (same math: 1 vs 5). Most people say "pull lever yes, push person no." Same numbers, different moral intuitions — revealing we use different ethical frameworks for action vs. direct causation.',
      example: 'Pull the lever: most people say yes, 1 death vs 5 is clear. Now change it: push a large man off a bridge to stop the trolley — same 1-vs-5 math. Most people say no. The numbers are identical. What changed? We have one ethics for operating a switch, another for using a person as a tool.',
    },
    {
      title: 'Aristotle\'s Golden Mean',
      body: 'Virtue lies between two extremes of vice — deficiency and excess.',
      detail: 'This is the foundation of Aristotle\'s virtue ethics. Virtues aren\'t rules to follow — they\'re stable dispositions of character that hit the right balance between too little and too much.',
      example: 'Courage: the mean between cowardice (too little) and recklessness (too much). Generosity: the mean between miserliness and wastefulness. Confidence: the mean between self-deprecation and arrogance. Every virtue is a calibration, not a fixed rule.',
    },
    {
      title: 'Descartes\' Cogito',
      body: '"I think, therefore I am." — René Descartes',
      detail: 'Descartes doubted everything: senses lie, dreams feel real, maybe an evil demon deceives him. But the act of doubting itself proved something must exist — something must be doing the doubting. The one thing that survives total skepticism is the existence of a thinking thing.',
      example: 'Try to doubt your own existence. The very act of doubting creates a doubter. Even if your thoughts are false, something is generating them. Descartes found the one claim that is self-defeating to deny: "I don\'t exist" requires an "I" to not-exist. The cogito survives all doubt.',
    },
    {
      title: 'John Stuart Mill on Liberty',
      body: '"The only freedom which deserves the name is that of pursuing our own good in our own way."',
      detail: 'Mill\'s Harm Principle: society can only restrict individual freedom to prevent harm to others. "Your freedom ends where someone else\'s begins" is a direct descendant of Mill\'s 1859 work On Liberty.',
      example: 'You want to blast music at 3 AM. Mill\'s framework: your freedom to play music ends where it harms others (your neighbors\' sleep and health). Society may restrict it — not because music is wrong, but because the harm to others justifies the limit. Freedom has an edge, and it\'s always another person.',
    },
    {
      title: 'The Veil of Ignorance',
      body: 'John Rawls asked: what social rules would you design if you didn\'t know what position you\'d occupy in society?',
      detail: 'Not knowing if you\'d be born rich or poor, abled or disabled, any race or gender — you\'d build the fairest possible system, because any position might be yours. This is the foundation of modern liberal political philosophy.',
      example: 'Design a tax system without knowing if you\'ll be born wealthy or in poverty. Not knowing your position, you\'d likely want a safety net — because the risk of being poor is real. Rawls\'s insight: design the game\'s rules before you know your piece on the board.',
    },
    {
      title: 'Zeno\'s Paradox of Motion',
      body: 'To travel anywhere, you must first cross half the distance. Then half of what remains. Then half again — infinitely. So how does motion ever complete?',
      detail: 'Resolved by calculus: an infinite series of decreasing terms can sum to a finite total. But Zeno\'s question was actually prescient — at the quantum scale, space and time may be discrete, not infinitely divisible. The paradox still echoes in modern physics.',
      example: 'Walk toward a wall. First, cross half the room. Then half of what remains. Then half again. You never "run out" of halvings — yet you reach the wall. The resolution: 1/2 + 1/4 + 1/8 + 1/16... = 1. Infinite steps, finite sum. Motion is possible because infinity can converge.',
    },
    {
      title: 'The Chinese Room',
      body: 'John Searle\'s thought experiment: a person who speaks no Chinese, following rules to respond to Chinese characters, passes a language test — but does not understand Chinese. Can computers truly "understand"?',
      detail: 'This remains the central debate in AI philosophy. Pattern-matching that produces correct output is not obviously the same as understanding. The question of whether scale and complexity eventually produce genuine understanding is still unanswered.',
      example: 'A person in a sealed room receives Chinese characters, looks up responses in a rulebook, passes back answers — perfectly convincing from outside. Inside: zero understanding, just symbol manipulation. Is this what ChatGPT does? The outputs are impressive. The mechanism may be just a very large rulebook.',
    },
    {
      title: 'Simone de Beauvoir on Freedom',
      body: '"One is not born, but rather becomes, a woman." — Simone de Beauvoir',
      detail: 'Her 1949 work The Second Sex argued gender is a social construction, not a biological destiny — foundational to modern feminism. She applied existentialism to show how women were defined relationally (daughter, wife, mother) rather than as full human beings in themselves.',
      example: 'The traits we call "feminine" — submissive, emotional, domestic — de Beauvoir argued are not biological fate but patterns enforced by upbringing and social pressure. Girls are raised into them. Boys are raised as the default human. She was the first to articulate this systematically, in 1949.',
    },
    {
      title: 'The Paradox of Tolerance',
      body: 'Karl Popper: "Unlimited tolerance must lead to the disappearance of tolerance." If we extend tolerance to those who are intolerant, they will eventually destroy tolerance itself.',
      detail: 'Therefore, a tolerant society must retain the right to not tolerate intolerance — not as a contradiction, but as self-defense. Popper wrote this in 1945, having watched Nazi ideology use democratic freedoms to dismantle democracy.',
      example: 'A society that tolerates a movement dedicated to eliminating tolerance will eventually be consumed by it. Popper\'s solution: tolerance is conditional on reciprocity. You don\'t have to tolerate those whose explicit goal is ending your right to tolerate anyone.',
    },
    {
      title: 'Confucius on Self-Improvement',
      body: '"The man who moves a mountain begins by carrying away small stones." — Confucius',
      detail: 'Confucian ethics emphasize continuous self-cultivation (修身, xiū shēn) as the foundation of everything — good family, good governance, good world. Change starts with the individual, then ripples outward.',
      example: 'You don\'t become disciplined overnight. You wake up 5 minutes earlier. You read 10 pages. You do one rep. Done consistently, small stones move mountains. The insight is the direction: not the gesture but the habit, not the summit but the carrying.',
    },
  ],

  wellness: [
    {
      title: 'The 2-Minute Rule',
      body: 'If a task will take less than 2 minutes, do it immediately instead of scheduling it. The decision cost exceeds the doing cost.',
      detail: 'From David Allen\'s Getting Things Done. The mental overhead of tracking, remembering, feeling guilty about, and rescheduling tiny tasks accumulates into anxiety that far exceeds the cost of just doing them.',
      example: 'You see a dish in the sink. Scheduling it mentally costs: noticing it, feeling guilty, remembering it later, adding it to a mental list, rescheduling, feeling guilty again. Doing it costs: 90 seconds. Every time you defer a 2-minute task, you\'re paying more than it costs.',
    },
    {
      title: 'Sleep Is When Your Brain Washes Itself',
      body: 'The glymphatic system — your brain\'s waste-clearing mechanism — is nearly 10× more active during sleep. It flushes out proteins linked to Alzheimer\'s and depression.',
      detail: 'Even one night of poor sleep measurably increases beta-amyloid accumulation in the brain. Sleep is not downtime — it\'s essential biological maintenance that no other activity can replace.',
      example: 'Pull an all-nighter and your brain accumulates Alzheimer\'s-linked proteins measurably by morning. After a week of 5-hour nights, cognitive performance equals being legally drunk — and you stop noticing. The brain can\'t clean itself while it\'s awake. Sleep is the janitor shift.',
    },
    {
      title: 'Cold Exposure Boosts Dopamine 250%',
      body: 'A 20-second cold shower or cold plunge triggers a sustained dopamine release of 250% above baseline — lasting hours, not minutes.',
      detail: 'Unlike dopamine from food or drugs, this spike doesn\'t cause a crash. Dopamine is a molecule of motivation and drive, not just pleasure — the cold-induced version delivers a clean, sustained elevation.',
      example: 'End your morning shower with 20 seconds of cold. The dopamine spike takes 2-3 minutes to peak and lasts 2-3 hours — not a rush, but a steady elevation in mood and motivation. No crash afterward. The discomfort is brief; the effect is long.',
    },
    {
      title: 'You Can Only Focus Deeply for ~4 Hours Per Day',
      body: 'Research on elite performers shows most people have a biological ceiling of ~4 hours of genuine deep work per day. Beyond that, performance degrades significantly.',
      detail: 'Cal Newport and Anders Ericsson both documented this across musicians, athletes, writers, and scientists. The implication: protecting your best 4 hours matters more than total hours logged.',
      example: 'Mozart, Darwin, Dickens, and Freud all worked 3-4 hours of intensely focused creative work per day, then stopped. The rest was walks, correspondence, and leisure. Their output was extraordinary. More hours didn\'t produce more genius — better-used hours did.',
    },
    {
      title: 'Walking 11 Minutes a Day Cuts Mortality Risk 23%',
      body: 'A 2023 study in the British Journal of Sports Medicine found just 11 minutes of moderate-intensity exercise per day reduces all-cause mortality risk by ~23%.',
      detail: 'The relationship between exercise and mortality isn\'t linear — the biggest gains come from going from zero to moderate activity. Elite athletes get diminishing returns beyond a certain point. The first 11 minutes buy the most.',
      example: 'Walk to a coffee shop instead of driving. Take the stairs. Park further away. 11 minutes accumulates faster than you think. The mortality benefit is almost entirely captured by going from zero to light activity — you don\'t need a gym membership to get the biggest gain.',
    },
    {
      title: 'Gratitude Rewires the Brain',
      body: 'Consistently writing 3 specific things you\'re grateful for each day measurably increases gray matter in the medial prefrontal cortex — the area linked to positive emotion and resilience.',
      detail: 'Studies show effects begin after just 3 weeks. The key: be specific ("my friend texted to check in on me") not generic ("I\'m grateful for friendship"). Specificity requires genuine recall, which activates memory and emotion systems — that\'s what creates the change.',
      example: 'Write tonight: "My friend texted to check on me after a hard week" — not "I\'m grateful for friends." The specificity forces your brain to actually recall the moment. That recall activates the same neural circuits as the experience. Generic gratitude is just words; specific gratitude is a replay.',
    },
    {
      title: 'The HALT Check',
      body: 'Before reacting emotionally, ask: Am I Hungry, Angry, Lonely, or Tired? These four states account for most impulsive decisions and overreactions.',
      detail: 'HALT originated in addiction recovery but applies broadly. Identifying the biological state underneath an emotional reaction lets you address the cause rather than misattribute it to whoever is nearby.',
      example: 'You snap at your partner over something small. Before analyzing the "relationship issue," ask: Have you eaten in 5 hours? Are you running on 5 hours of sleep? Are you frustrated about work? Often the anger isn\'t about the thing it\'s aimed at. Fix the state first.',
    },
    {
      title: 'Nature Reduces Cortisol in 20 Minutes',
      body: 'Just 20 minutes in a natural setting measurably reduces cortisol (the primary stress hormone) — even in urban parks, not just wilderness.',
      detail: 'The effect is amplified significantly when you\'re not scrolling your phone during the nature time. Researchers call this "nature exposure" — it requires surprisingly little wilderness and is effective even in cities.',
      example: 'Sit in an urban park for 20 minutes without your phone. Your cortisol measurably drops. It doesn\'t require mountains or oceans — trees, grass, and birdsong work. The key variable researchers found: no phone during the time. The nature needs your full attention to work.',
    },
    {
      title: 'Social Connection Is as Important as Exercise',
      body: 'Loneliness is as harmful to health as smoking 15 cigarettes per day. Strong social ties increase longevity more than diet, exercise, or wealth combined.',
      detail: 'The Harvard Study of Adult Development followed 700+ men for 80 years. The single strongest predictor of health at age 80 was the quality of close relationships at age 50 — not cholesterol, not income, not genetics.',
      example: 'The study followed men from 1938 to their 90s. Men with warm close relationships at 50 were healthiest at 80 — regardless of cholesterol, wealth, or lifestyle. Lonely men deteriorated faster across every health metric. Connection is biology, not sentiment.',
    },
    {
      title: 'The 5-4-3-2-1 Grounding Technique',
      body: 'To interrupt anxiety or panic: name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, 1 you can taste.',
      detail: 'This forces the brain from the prefrontal cortex (future-worrying, catastrophizing) back into the sensorium (present moment). Used by therapists, military personnel, and athletes to interrupt the anxiety feedback loop.',
      example: 'You\'re anxious before a presentation. Right now: 5 things you can see (whiteboard, window, plant, chair, projector). 4 you can touch (shirt fabric, pen, desk edge, shoes). 3 you can hear (AC hum, typing, distant voices). 2 you can smell. 1 you can taste. Anxiety interrupts — your brain can\'t catastrophize and sense simultaneously.',
    },
    {
      title: 'Hydration Before Coffee',
      body: 'Cortisol peaks within 30–60 minutes of waking. Caffeine during this window builds tolerance, not energy. Wait 90 minutes; drink 500ml water first.',
      detail: 'Sleep dehydrates you by 0.5–1 liter. Rehydrating first thing improves cognitive performance measurably. Caffeine added to peak cortisol doesn\'t amplify it — it builds tolerance that makes the caffeine less effective later.',
      example: 'Coffee right when you wake up feels essential. But cortisol is already spiking to wake you up — caffeine on top of peak cortisol trains your body to need caffeine for the same effect. Wait 90 minutes, drink water first, and your afternoon slump will be noticeably smaller.',
    },
    {
      title: 'Your Attention Is Your Life',
      body: '"Your life is the sum of what you focus on." What you give attention to grows. What you ignore atrophies — including relationships, skills, and emotions.',
      detail: 'The average person will spend 7 years of their waking life on social media. Treating attention as a finite, precious resource rather than an infinite tap fundamentally changes how you allocate your days.',
      example: 'You have roughly 16 waking hours per day. Every hour spent on one thing is not spent on something else. If you spend 2 hours daily on social media, that\'s 730 hours per year — about 30 full days. Redirected to learning, exercise, or relationships, that compounds significantly over a decade.',
    },
    {
      title: 'Progressive Muscle Relaxation Reduces Anxiety Faster Than Breathing',
      body: 'Tensing and releasing muscle groups in sequence (feet → head, 5 seconds each) activates the parasympathetic nervous system faster than controlled breathing alone.',
      detail: 'Developed by Edmund Jacobson in 1920. The mechanism: the muscle release after tension creates a physiological contrast that drops heart rate and blood pressure faster than breathing alone. Combine both for best results.',
      example: 'You\'re lying in bed, anxious, can\'t sleep. Curl your toes tight for 5 seconds, release. Calves, thighs, stomach, hands, arms, shoulders, jaw, face. By the time you reach your face, the release contrast has activated your parasympathetic system. Most people fall asleep before finishing.',
    },
    {
      title: 'Decision Fatigue is Real',
      body: 'Every decision you make depletes the same mental resource — from "what to eat" to "should I hire this person." By evening, decision quality measurably drops.',
      detail: 'Studies show Israeli judges granted parole at significantly higher rates in the morning and after lunch breaks, dropping to near-zero before breaks. Same prisoners, same cases — different outcomes based purely on timing and judge energy levels.',
      example: 'Obama wore only gray or blue suits. Zuckerberg wears the same gray T-shirt daily. Not vanity — they\'re eliminating trivial decisions to preserve the resource for what matters. The judges study shows the stakes: decision fatigue affected whether people went free or stayed in prison.',
    },
    {
      title: 'Reading Fiction Builds Empathy',
      body: 'MRI studies show reading literary fiction activates the same neural networks as actually experiencing the events described — including theory-of-mind (understanding others\' mental states).',
      detail: 'Effects are measurable after reading a single short story. Genre fiction shows weaker effects, likely because character psychology is less complex and interiority less developed. Deep character study trains the social brain.',
      example: 'After reading a literary short story, subjects showed measurably higher accuracy in judging others\' emotions from photos of their eyes alone — a standard test of empathy. The effect was significant after a single story. You can literally practice empathy by reading fiction.',
    },
    {
      title: 'Napping for 26 Minutes Improves Performance 34%',
      body: 'NASA research on military pilots found a 26-minute nap improved performance by 34% and alertness by 100%. The specific duration avoids deep sleep (which causes grogginess).',
      detail: 'Set an alarm for exactly 26 minutes. Lie down immediately. Even if you don\'t fully sleep, horizontal rest with eyes closed provides benefit. Drinking caffeine before the nap maximizes the effect — it activates just as you wake.',
      example: 'The trick: drink coffee, set a 26-minute alarm, lie down immediately. Caffeine takes 20-30 minutes to kick in — so you rest fully, then it activates right as you wake. No grogginess, sustained alertness. NASA tested this on pilots with consistent results. The timing is the mechanism.',
    },
    {
      title: 'You Are What You Repeatedly Do',
      body: '"We are what we repeatedly do. Excellence, then, is not an act, but a habit." — Will Durant summarizing Aristotle',
      detail: 'The neuroscience: repeated behaviors myelinate neural pathways — literally making them faster and more automatic. Identity follows behavior, not the other way around. The feeling of "being" something comes after doing it consistently, not before.',
      example: '"I\'m not a runner" but you run 4 times a week — you are a runner. "I\'m not a writer" but you write daily — you are a writer. You don\'t need to feel like something to become it. Act first. The identity follows the behavior, not vice versa.',
    },
    {
      title: 'Sunlight Before Screens Sets Your Circadian Rhythm',
      body: 'Getting bright outdoor light within the first 30–60 minutes after waking anchors your cortisol/melatonin cycle for the whole day, improving energy, mood, and sleep.',
      detail: 'Indoor light is 100–200 lux. Outdoor light is 10,000–100,000 lux — even on a cloudy day. Your circadian clock needs this specific light signal to calibrate. Without it, your internal clock drifts.',
      example: 'On a completely overcast morning, outdoor light is still ~10,000 lux. Indoor lighting is ~200 lux. That 50× difference is what your circadian clock needs. Five minutes on your porch or a short walk is enough. Screens are useless substitutes — they\'re only ~500 lux.',
    },
    {
      title: 'The Best Exercise Is the One You\'ll Actually Do',
      body: 'Consistency beats optimization. A "suboptimal" workout done 4× a week outperforms a "perfect" workout done reluctantly once.',
      detail: 'Adherence is the single largest variable in fitness outcomes. Research consistently shows that enjoyment and social elements in exercise dramatically outperform any training program followed reluctantly.',
      example: 'The "optimal" 90-minute program you quit after 2 weeks delivers zero benefit. The 30-minute walk you\'ve done daily for a year delivers enormous benefit. Adherence is the variable that actually matters, and enjoyment is the strongest predictor of adherence. Find the one you\'ll do.',
    },
    {
      title: 'Journaling for 20 Minutes Reduces Trauma Symptoms',
      body: 'Psychologist James Pennebaker found that writing about traumatic events for 20 minutes over 4 days measurably reduced medical visits, improved immune function, and reduced PTSD symptoms.',
      detail: 'The mechanism: translating raw emotion into narrative language reduces amygdala activation. You don\'t need to share the writing with anyone. The act of structuring experience into words is itself therapeutic — it moves processing from the emotional brain to the narrative brain.',
      example: 'Write about something difficult for 20 minutes — unfiltered, unedited, private. Do it 4 days in a row. Pennebaker\'s subjects showed fewer doctor visits and improved immune markers 6 months later. No therapist required. Putting feelings into words shifts them from raw emotion to story — and stories can be resolved.',
    },
  ],

  tech: [
    {
      title: 'Your Phone Is a Million Times Faster Than Apollo 11',
      body: 'The Apollo Guidance Computer ran at 0.043 MHz with 4 KB RAM. A modern iPhone runs at ~3 GHz with 6 GB RAM — roughly a million times more powerful.',
      detail: 'Apollo\'s software was handwoven by women at MIT, literally threading copper wire through magnetic cores by hand to create ROM. Each bit was physical. The entire program to land on the Moon fit in 4 KB.',
      example: 'The Apollo Guidance Computer managed orbital mechanics, descent calculations, and landing with 4 KB — less than a plain-text email. Your phone\'s RAM is 6 GB — 1.5 million times more. The Moon landing used less computing power than your grocery store\'s checkout system.',
    },
    {
      title: 'The Internet Weighs About 50 Grams',
      body: 'All the electrons flowing through the internet\'s servers at any moment weigh an estimated 50 grams — about the weight of a strawberry.',
      detail: 'Calculated by physicist Russel Seitz using the mass of electrons in motion. The information itself has no weight — only the electrons temporarily storing and transmitting it do. Everything you\'ve ever read online, weighed together: a piece of fruit.',
      example: 'Every email, video, search, and social media post moving through the internet right now is carried by electrons. The electrons themselves total about 50 grams. All the world\'s digital information — medical records, financial transactions, streaming libraries — moves in something lighter than a lemon.',
    },
    {
      title: 'The First Email Was Sent in 1971',
      body: 'Ray Tomlinson sent the first networked email in 1971 on ARPANET. He also invented the @ symbol convention for email addresses.',
      detail: 'He couldn\'t remember what the first email said — probably "QWERTYUIOP." The @ was chosen because it means "at a location" and didn\'t appear in any person\'s name. He didn\'t think it would matter. Now ~300 billion emails per day use that @.',
      example: 'Tomlinson needed a character to separate username from machine name. He scanned his keyboard for something unused and unambiguous. @ had exactly one obvious meaning ("at") and appeared in no names. A practical choice made in minutes now appears in billions of communications daily.',
    },
    {
      title: 'HTTPS Protects Your Data With Math',
      body: 'HTTPS uses RSA or elliptic curve cryptography. Breaking a 2048-bit RSA key would take a classical computer longer than the age of the universe.',
      detail: 'Quantum computers running Shor\'s algorithm could theoretically break RSA. This is why post-quantum cryptography is being standardized now — the industry is preparing for a quantum future before quantum computers can threaten current encryption.',
      example: 'When you see the padlock in your browser, your device and the server did a mathematical handshake: the server proved it holds a private key that matches its public key, without revealing the key. Intercepted traffic is unreadable — decoding it would take longer than the universe has existed.',
    },
    {
      title: 'Git Was Written in 10 Days',
      body: 'Linus Torvalds wrote Git in approximately 10 days in April 2005, after a dispute with the BitKeeper version control system.',
      detail: 'He named it "git" — British slang for a stupid, contemptible person — joking: "I\'m an egotistical bastard, and I name all my projects after myself." (Linux being the first.) Git is now the dominant version control system globally.',
      example: 'By April 7, 2005, Torvalds had committed Git\'s first version. By April 29 — 22 days after starting — the Linux kernel itself was being managed in Git. He needed a tool, built it in a week and a half, and it now manages virtually all the world\'s code.',
    },
    {
      title: 'The First Computer Virus Was Released in 1986',
      body: '"Brain" was written by two Pakistani brothers to protect their medical software from piracy. It spread via floppy disks and displayed their name, address, and phone number.',
      detail: 'They offered to remove it if infected users called them. It was annoying but benign — no data destruction. The brothers later said they deeply regret it, not anticipating the era of malicious viruses their creation helped inspire.',
      example: 'The Brain virus was essentially a copyright notice with legs: "You copied our software illegally, here\'s our number, call us." Users who called received technical support and virus removal. The first computer virus was closer to an annoying business card than a weapon.',
    },
    {
      title: 'Over 500 Hours of Video Are Uploaded to YouTube Every Minute',
      body: 'As of 2024, users upload over 500 hours of video to YouTube every single minute — more than 30,000 hours per hour.',
      detail: 'If you tried to watch all YouTube content uploaded in a single minute, it would take you 82 years watching 24/7. The total library grows faster than any single human could ever observe.',
      example: 'Right now, while you read this sentence, ~8 hours of video uploaded to YouTube. By the time you finish this paragraph, another 5. If you started watching from YouTube\'s 2005 launch and watched 24/7, you couldn\'t catch up to what\'s being added today.',
    },
    {
      title: 'TCP/IP Was Designed Around Nuclear Resilience',
      body: 'ARPANET (the internet\'s predecessor) was designed so that if any nodes were destroyed, packets would reroute automatically through surviving paths.',
      detail: 'This is why the internet is so hard to censor or shut down — it was literally designed to survive attacks by routing around damage. Any path from A to B works; the network finds it automatically.',
      example: 'If a nuclear strike destroyed 30% of internet infrastructure in a city, your email would automatically reroute through other nodes — possibly going through Tokyo to reach someone next door. This resilience is a design feature, not an accident. The internet was built to survive catastrophe.',
    },
    {
      title: 'JavaScript Was Written in 10 Days',
      body: 'Brendan Eich created JavaScript in May 1995 in just 10 days while at Netscape. It was originally called Mocha, then LiveScript, then JavaScript.',
      detail: 'The name change to JavaScript was a marketing move to capitalize on Java\'s popularity — the two languages are completely unrelated. The 10-day rush shows: typeof null === "object" is a known bug that can\'t be fixed without breaking the web.',
      example: 'JavaScript quirks from the 10-day sprint: 0.1 + 0.2 ≠ 0.3 (floating point). typeof null === "object" (a bug). [] + [] = "" but [] + {} = "[object Object]". These aren\'t features — they\'re the legacy of a language built in a week and a half that now runs everything.',
    },
    {
      title: 'Your Password Is Probably Already Leaked',
      body: 'Over 10 billion unique username/password combinations have been collected in data breaches as of 2024. haveibeenpwned.com lets you check your email.',
      detail: 'Reusing passwords across sites is why single breaches cascade — one site\'s leak exposes every account sharing that password. A password manager generating unique passwords per site is the single highest-impact security improvement most people can make.',
      example: 'Visit haveibeenpwned.com and enter your email. If you\'ve been online more than 5 years, there\'s a high chance it appears in multiple breach databases. If your email password is the same as your bank password, one breach of any site exposes all of them.',
    },
    {
      title: 'The Cloud Is Just Someone Else\'s Computer',
      body: 'AWS, Azure, and Google Cloud together control ~65% of global cloud infrastructure. "The cloud" is primarily three companies\' data centers.',
      detail: 'AWS had a major outage in 2017 that took down Netflix, Slack, GitHub, and thousands of other services simultaneously — illustrating the risk of extreme infrastructure concentration in a few providers.',
      example: 'In December 2021, an AWS outage in one region took down Amazon\'s own warehouse robots (stopping fulfillment), Ring doorbells, the Disney+ app, and Slack simultaneously. Three companies\' buildings are the foundation under millions of businesses. When one building has a problem, the internet gets quiet.',
    },
    {
      title: 'AI Models Don\'t Actually Understand Language',
      body: 'Large language models (like GPT) predict the statistically likely next token given context. They have patterns, not beliefs, intentions, or understanding.',
      detail: 'Whether sophisticated pattern matching at sufficient scale produces something that counts as "understanding" is a genuine philosophical debate. The practical outputs — reasoning, coding, writing — emerge from architecture and scale, not comprehension in any traditional sense.',
      example: 'Ask a language model "what number comes after 9?" — it says 10, not because it understands numbers, but because "10" reliably follows "9" in training data. Ask it a math problem phrased unusually and it may confidently give the wrong answer. The output sounds like understanding; the mechanism is prediction.',
    },
    {
      title: 'The First iPhone Had No App Store',
      body: 'The original iPhone (2007) ran only Apple\'s built-in apps. Steve Jobs initially opposed third-party apps. The App Store launched in 2008 with 500 apps.',
      detail: 'Jobs\' original vision: web apps accessed through Safari would be sufficient for third-party developers. Phil Schiller and other executives pushed back until Jobs agreed. The App Store launched June 10, 2008, and today generates more revenue than Hollywood box offices worldwide.',
      example: 'The original iPhone had: Phone, Mail, Safari, iPod, Camera, Maps, Weather, Clock, Calculator, Notes, Settings. That\'s it. Jobs said web apps were the future. A year later, with 500 native apps available, the App Store generated $1M in revenue in its first weekend. He changed his mind quickly.',
    },
    {
      title: 'Wi-Fi Has a Speed Limit Explained by Physics',
      body: 'Wi-Fi radio waves travel at the speed of light, but actual throughput is limited by protocol overhead, interference, encoding, and range — often 50-90% lower than advertised.',
      detail: 'Wi-Fi 7 (802.11be) supports up to 46 Gbps theoretically. Real-world performance in ideal conditions is typically 2-5 Gbps. "Up to" in marketing means "theoretical maximum in an anechoic chamber with one device."',
      example: 'Your router advertises "Wi-Fi 6, 600 Mbps." You speed test and get 80 Mbps. The gap: neighbors\' routers create interference, walls absorb signal, your device\'s antenna has limits, and protocol overhead eats bandwidth. The physics is fine; the environment is messy.',
    },
    {
      title: 'Linux Runs Almost Everything',
      body: 'Android (Linux), most web servers (Linux), all top 500 supercomputers (Linux), 96% of cloud infrastructure — Linux dominates everything except the desktop.',
      detail: 'Linus Torvalds started it as a hobby project in 1991, writing in a newsgroup: "Just a hobby, won\'t be big and professional like gnu." He was spectacularly wrong. It is now arguably the most important software ever written.',
      example: 'The phone in your pocket (Android = Linux kernel). The server hosting this site (likely Linux). Your bank\'s backend (Linux). The ISS (Linux). Your smart TV, your router, your car\'s infotainment. The Windows desktop is one of the few places Linux hasn\'t won. It\'s everywhere else.',
    },
    {
      title: 'Moore\'s Law Is Slowing Down',
      body: 'Gordon Moore predicted in 1965 that transistor counts would double every ~2 years. This held for 50 years. TSMC\'s current 3nm chips pack 292 million transistors per mm².',
      detail: 'We\'re approaching physical limits — transistors are now roughly 10 atoms wide. The industry is shifting to 3D stacking, specialized chips (GPUs, NPUs), and quantum computing to continue performance gains as miniaturization stalls.',
      example: 'In 1971, Intel\'s 4004 had 2,300 transistors on a 10μm process. Apple\'s M3 (2023) has 25 billion on a 3nm process. A 3nm transistor is ~10 silicon atoms wide. We can\'t go much smaller — the quantum effects at that scale make electrons misbehave. The easy gains are over.',
    },
    {
      title: 'The Y2K Bug Cost $300 Billion to Fix — and Worked',
      body: 'Programmers stored years as 2-digit numbers. On Jan 1, 2000, "00" would read as 1900. ~$300 billion was spent globally on remediation.',
      detail: 'The near-absence of catastrophe on January 1, 2000 is proof the fixes worked, not proof the threat was overhyped. Systems that weren\'t fixed — some small plant control systems and embedded devices — did fail. The spending prevented the failures, not the other way around.',
      example: 'Banks, power grids, hospitals, and air traffic control all had Y2K bugs patched at enormous cost. On January 1, 2000: minimal disruption. Critics said it was overhyped. But countries that spent less on remediation experienced more failures. The $300B prevented what didn\'t happen.',
    },
    {
      title: 'Bluetooth Is Named After a Viking King',
      body: 'Harald "Bluetooth" Gormsson united Danish tribes in the 10th century. The wireless standard (1994) was named for him — the idea being it would unite communication protocols.',
      detail: 'The Bluetooth logo is a runic monogram of his initials: H (ᚼ) and B (ᛒ) overlaid in old Nordic script. The name was supposed to be a temporary codename. It wasn\'t. A 10th-century Viking\'s monogram is now on billions of devices.',
      example: 'Look at the Bluetooth symbol on your headphones: it\'s the combined runic initials of a Viking king who united Denmark in 958 CE. The engineers named a wireless standard after him because he "connected" things. The codename was never replaced. Harald Bluetooth\'s initials are on your ears.',
    },
    {
      title: 'The First Spam Email Was Sent in 1978',
      body: 'Gary Thuerk sent an unsolicited email to 393 ARPANET users advertising Digital Equipment Corporation computers. The response was furious — but he made sales.',
      detail: 'He\'s called the "Father of Spam." The message was accidentally sent 6 hours premature due to an ARPANET system clock issue. Today ~85% of all email is spam — around 160 billion messages per day.',
      example: 'May 3, 1978: Gary Thuerk sent an ad for DEC computers to 393 ARPANET users. Recipients were outraged. They demanded the practice be banned. Thuerk made sales. He proved the economics: if 1% of people respond to spam, it\'s profitable regardless of how many people are annoyed. The template was set.',
    },
    {
      title: 'Quantum Computers Exist — But Can\'t Beat Normal Computers Yet',
      body: 'Google\'s Sycamore (2019) solved a specific problem in 200 seconds that would take classical computers 10,000 years. But the problem was specifically designed for quantum computers.',
      detail: 'No quantum computer has solved a useful real-world problem faster than a classical computer. The hardware is extraordinarily fragile — qubits must be cooled to near absolute zero and are disrupted by the slightest environmental interference.',
      example: 'Google\'s "quantum supremacy" result: a sampling problem that\'s useless in practice but hard for classical computers. IBM disputed even that claim. Current quantum computers can factor small numbers and simulate simple molecules. Cracking encryption or solving logistics problems at scale: not yet, and maybe not for decades.',
    },
  ],
};

export function getDailyItem(topicId: TopicId): DailyItem {
  const items = library[topicId];
  const dayOfYear = Math.floor(Date.now() / 86_400_000); // days since epoch
  return items[dayOfYear % items.length];
}

export function getTodayKey(): string {
  return new Date().toISOString().split('T')[0];
}
