// ─── SEO Data — Cities, Countries, Keywords, Blog Content ─────────────────────
// Used by programmatic SEO pages: /suppliers, /manufacturers, /buy, /price-guide, /global, /blog

export interface SeoCity {
  name: string;
  state: string;
  slug: string;
  knownFor: string;
}

export interface SeoCountry {
  name: string;
  slug: string;
  flag: string;
  demonym: string;
  whyIndia: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  category: string;
  readTime: number;
  publishedAt: string;
  content: string;
}

// ─── Indian Machinery Hub Cities ─────────────────────────────────────────────

export const SEO_CITIES: SeoCity[] = [
  { name: "Rajkot", state: "Gujarat", slug: "rajkot", knownFor: "CNC machines, lathe machines, precision engineering" },
  { name: "Coimbatore", state: "Tamil Nadu", slug: "coimbatore", knownFor: "pumps, motors, press machines, foundry equipment" },
  { name: "Pune", state: "Maharashtra", slug: "pune", knownFor: "hydraulic systems, automotive equipment, engineering goods" },
  { name: "Ludhiana", state: "Punjab", slug: "ludhiana", knownFor: "packaging machines, conveyor systems, auto parts" },
  { name: "Ahmedabad", state: "Gujarat", slug: "ahmedabad", knownFor: "pharma machinery, packaging equipment, textile machines" },
  { name: "Surat", state: "Gujarat", slug: "surat", knownFor: "textile machines, diamond tools, packaging equipment" },
  { name: "Chennai", state: "Tamil Nadu", slug: "chennai", knownFor: "automotive machinery, compressors, testing equipment" },
  { name: "Mumbai", state: "Maharashtra", slug: "mumbai", knownFor: "industrial automation, material handling, food processing" },
  { name: "Delhi", state: "NCR", slug: "delhi", knownFor: "sheet metal, welding equipment, fabrication machinery" },
  { name: "Faridabad", state: "Haryana", slug: "faridabad", knownFor: "press machines, sheet metal forming, industrial tools" },
  { name: "Kolkata", state: "West Bengal", slug: "kolkata", knownFor: "heavy engineering, steel machinery, conveyor systems" },
  { name: "Hyderabad", state: "Telangana", slug: "hyderabad", knownFor: "pharma machinery, testing equipment, precision tools" },
  { name: "Bengaluru", state: "Karnataka", slug: "bengaluru", knownFor: "CNC machines, aerospace tooling, electronics manufacturing" },
  { name: "Vadodara", state: "Gujarat", slug: "vadodara", knownFor: "chemical plant machinery, compressors, hydraulic systems" },
  { name: "Nashik", state: "Maharashtra", slug: "nashik", knownFor: "automotive components, CNC machines, tooling" },
  { name: "Indore", state: "Madhya Pradesh", slug: "indore", knownFor: "material handling, packaging machines, food processing" },
  { name: "Jamshedpur", state: "Jharkhand", slug: "jamshedpur", knownFor: "heavy machinery, steel plant equipment, conveyor systems" },
];

// ─── Export Markets ───────────────────────────────────────────────────────────

export const SEO_COUNTRIES: SeoCountry[] = [
  {
    name: "UAE",
    slug: "uae",
    flag: "🇦🇪",
    demonym: "UAE",
    whyIndia: "India is UAE's largest machinery import source. Indian manufacturers offer competitive pricing, fast delivery via sea freight (7–10 days from Mumbai/JNPT), and GST-free exports.",
  },
  {
    name: "USA",
    slug: "usa",
    flag: "🇺🇸",
    demonym: "American",
    whyIndia: "Indian CNC and precision machinery manufacturers meet ASME and ISO standards at 40–60% lower cost than US domestic suppliers.",
  },
  {
    name: "UK",
    slug: "uk",
    flag: "🇬🇧",
    demonym: "UK",
    whyIndia: "Post-Brexit, UK buyers are diversifying supply chains. Indian manufacturers offer CE-compliant machinery with strong after-sales support.",
  },
  {
    name: "Germany",
    slug: "germany",
    flag: "🇩🇪",
    demonym: "German",
    whyIndia: "India exports precision-engineered components and machinery to Germany for OEM assembly. Strong engineering base in Pune, Bengaluru, and Coimbatore.",
  },
  {
    name: "Bangladesh",
    slug: "bangladesh",
    flag: "🇧🇩",
    demonym: "Bangladeshi",
    whyIndia: "Bangladesh's textile and garment sector imports packaging, conveyor, and material handling equipment from India at low cost with minimal transit time.",
  },
  {
    name: "Sri Lanka",
    slug: "sri-lanka",
    flag: "🇱🇰",
    demonym: "Sri Lankan",
    whyIndia: "Indian industrial machinery dominates Sri Lanka's market due to proximity, language ease, and competitive pricing with quick delivery.",
  },
  {
    name: "Nepal",
    slug: "nepal",
    flag: "🇳🇵",
    demonym: "Nepali",
    whyIndia: "Nepal sources most of its industrial machinery from India via land routes. Indian machinery comes with local-language support and easy spare parts availability.",
  },
  {
    name: "Saudi Arabia",
    slug: "saudi-arabia",
    flag: "🇸🇦",
    demonym: "Saudi",
    whyIndia: "Saudi Arabia's Vision 2030 manufacturing push drives demand for Indian industrial machinery, especially in food processing, packaging, and material handling.",
  },
  {
    name: "South Africa",
    slug: "south-africa",
    flag: "🇿🇦",
    demonym: "South African",
    whyIndia: "Indian machinery manufacturers export mining equipment, water treatment, and packaging machinery to South Africa's growing industrial sector.",
  },
  {
    name: "Kenya",
    slug: "kenya",
    flag: "🇰🇪",
    demonym: "Kenyan",
    whyIndia: "Kenya's East Africa hub status drives demand for Indian-made food processing, packaging, and conveyor equipment across the region.",
  },
  {
    name: "Nigeria",
    slug: "nigeria",
    flag: "🇳🇬",
    demonym: "Nigerian",
    whyIndia: "Nigeria imports Indian packaging, pharma, and material handling machinery for its rapidly growing consumer goods and manufacturing sector.",
  },
  {
    name: "Australia",
    slug: "australia",
    flag: "🇦🇺",
    demonym: "Australian",
    whyIndia: "Australia sources CNC machines, mining equipment, and water treatment machinery from India under the India-Australia ECTA trade agreement.",
  },
];

// ─── Machine Category SEO Data ────────────────────────────────────────────────

export const CATEGORY_SEO: Record<string, {
  description: string;
  priceRange: string;
  priceTable: { spec: string; priceRange: string }[];
  buyGuide: string[];
  useCases: string[];
  topCities: string[];
}> = {
  "cnc-machines": {
    description: "CNC (Computer Numerical Control) machines are precision machining centers used to cut, mill, drill, and shape metal and other materials with computer-controlled accuracy. India has 2,000+ CNC machine manufacturers across Rajkot, Bengaluru, Pune, and Coimbatore.",
    priceRange: "₹5 Lakh – ₹50 Lakh+",
    priceTable: [
      { spec: "3-axis VMC (Small)", priceRange: "₹8 – 15 Lakh" },
      { spec: "3-axis VMC (Medium)", priceRange: "₹15 – 25 Lakh" },
      { spec: "4-axis VMC", priceRange: "₹25 – 40 Lakh" },
      { spec: "5-axis Machining Center", priceRange: "₹40 – 1.5 Cr" },
      { spec: "CNC Lathe (Basic)", priceRange: "₹5 – 12 Lakh" },
      { spec: "CNC Lathe (Heavy Duty)", priceRange: "₹12 – 30 Lakh" },
    ],
    buyGuide: ["Verify controller brand (Fanuc, Siemens, Mitsubishi)", "Check spindle speed and BT/SK tool holder compatibility", "Confirm after-sales service presence in your city", "Ask for test cut samples on your material", "Verify warranty period and spare parts availability"],
    useCases: ["Automotive component manufacturing", "Mold and die making", "Aerospace precision parts", "Medical device components", "Electronics enclosures"],
    topCities: ["Rajkot", "Bengaluru", "Pune", "Coimbatore", "Nashik"],
  },
  "packaging-machines": {
    description: "Packaging machines automate the process of filling, sealing, labeling, and wrapping products. India's packaging machinery industry serves FMCG, pharma, food & beverage, and agricultural sectors with 1,500+ manufacturers.",
    priceRange: "₹2 Lakh – ₹80 Lakh+",
    priceTable: [
      { spec: "Manual Sealing Machine", priceRange: "₹50K – 2 Lakh" },
      { spec: "Semi-auto Pouch Packing", priceRange: "₹2 – 5 Lakh" },
      { spec: "Automatic Pouch Packing", priceRange: "₹5 – 15 Lakh" },
      { spec: "Form-Fill-Seal Machine", priceRange: "₹8 – 25 Lakh" },
      { spec: "Carton Packing Line", priceRange: "₹15 – 50 Lakh" },
      { spec: "Complete Packaging Line", priceRange: "₹30 – 1.5 Cr" },
    ],
    buyGuide: ["Define your product type (powder, granule, liquid, solid)", "Specify required output speed (pouches/hour)", "Check food-grade compliance (SS 304 contact parts)", "Verify film compatibility and pouch size range", "Confirm GMP compliance for pharma applications"],
    useCases: ["FMCG product packaging", "Pharmaceutical blister packing", "Food & beverage filling", "Agricultural product bagging", "Chemical product packaging"],
    topCities: ["Ludhiana", "Ahmedabad", "Mumbai", "Coimbatore", "Indore"],
  },
  "material-handling": {
    description: "Material handling equipment includes cranes, hoists, forklifts, conveyors, and lifting systems used to move, store, and protect materials across warehouses and manufacturing facilities.",
    priceRange: "₹1 Lakh – ₹2 Cr+",
    priceTable: [
      { spec: "Chain Hoist (1–5 ton)", priceRange: "₹30K – 1.5 Lakh" },
      { spec: "Electric Hoist (1–10 ton)", priceRange: "₹1 – 5 Lakh" },
      { spec: "Overhead Crane (5 ton)", priceRange: "₹8 – 20 Lakh" },
      { spec: "Overhead Crane (10–20 ton)", priceRange: "₹20 – 60 Lakh" },
      { spec: "Forklift (Battery)", priceRange: "₹5 – 15 Lakh" },
      { spec: "AGV System", priceRange: "₹30 Lakh – 2 Cr" },
    ],
    buyGuide: ["Specify exact load capacity and span requirements", "Check duty cycle (light, medium, heavy)", "Verify safety certification (IS/IEC standards)", "Inspect structural steel quality and welding", "Ask about installation and commissioning support"],
    useCases: ["Warehouse logistics", "Steel plant operations", "Automotive assembly lines", "Shipyard & port handling", "Cold storage"],
    topCities: ["Mumbai", "Kolkata", "Hyderabad", "Pune", "Chennai"],
  },
  "hydraulic-systems": {
    description: "Hydraulic systems use pressurized fluid to generate, control, and transmit power. India's hydraulic manufacturing cluster in Pune, Vadodara, and Rajkot produces power packs, cylinders, and valves for industrial applications.",
    priceRange: "₹1 Lakh – ₹50 Lakh+",
    priceTable: [
      { spec: "Hydraulic Cylinder (Standard)", priceRange: "₹5K – 50K" },
      { spec: "Power Pack (5–10 HP)", priceRange: "₹80K – 2 Lakh" },
      { spec: "Power Pack (20–30 HP)", priceRange: "₹2 – 5 Lakh" },
      { spec: "Custom Power Pack (50+ HP)", priceRange: "₹5 – 15 Lakh" },
      { spec: "Hydraulic Press System", priceRange: "₹10 – 50 Lakh" },
      { spec: "Servo Hydraulic System", priceRange: "₹20 Lakh – 1 Cr" },
    ],
    buyGuide: ["Define system pressure requirements (bar)", "Specify flow rate (LPM) and motor HP", "Choose fixed vs variable displacement pump", "Verify seal material compatibility with hydraulic fluid", "Request 3D layout drawing before manufacturing"],
    useCases: ["Press machines and forming", "Construction equipment", "Marine and offshore systems", "Steel plant operations", "Injection molding machines"],
    topCities: ["Pune", "Vadodara", "Rajkot", "Mumbai", "Hyderabad"],
  },
  "lathe-machines": {
    description: "Lathe machines are the backbone of precision machining, used to shape metal by rotating the workpiece against cutting tools. India is one of the world's largest producers of conventional and CNC lathe machines.",
    priceRange: "₹50K – ₹25 Lakh",
    priceTable: [
      { spec: "Conventional Lathe (Small)", priceRange: "₹50K – 2 Lakh" },
      { spec: "Conventional Lathe (Heavy)", priceRange: "₹2 – 8 Lakh" },
      { spec: "CNC Lathe (Basic)", priceRange: "₹5 – 12 Lakh" },
      { spec: "CNC Lathe (Medium)", priceRange: "₹12 – 20 Lakh" },
      { spec: "CNC Turning Center", priceRange: "₹15 – 30 Lakh" },
      { spec: "Multi-Spindle CNC Lathe", priceRange: "₹25 – 60 Lakh" },
    ],
    buyGuide: ["Define swing over bed and distance between centers", "Check spindle bore size for your workpiece", "Verify chuck size and taper specification", "Assess rigidity for heavy vs precision work", "Check controller brand for CNC models"],
    useCases: ["Shaft and axle turning", "Flange and pulley manufacturing", "Automotive component production", "Valve and fitting machining", "Tool room work"],
    topCities: ["Rajkot", "Ludhiana", "Batala", "Coimbatore", "Faridabad"],
  },
  "welding-equipment": {
    description: "Welding equipment includes MIG, TIG, arc, and plasma welding machines used in fabrication, automotive, shipbuilding, and construction industries. India has a strong welding equipment manufacturing base in Delhi, Pune, and Bengaluru.",
    priceRange: "₹10K – ₹20 Lakh",
    priceTable: [
      { spec: "MIG Welder (Basic)", priceRange: "₹15K – 80K" },
      { spec: "TIG Welder (AC/DC)", priceRange: "₹30K – 2 Lakh" },
      { spec: "Inverter Arc Welder", priceRange: "₹8K – 50K" },
      { spec: "Plasma Cutter", priceRange: "₹50K – 5 Lakh" },
      { spec: "Spot Welding Machine", priceRange: "₹30K – 3 Lakh" },
      { spec: "Robotic Welding Cell", priceRange: "₹15 – 80 Lakh" },
    ],
    buyGuide: ["Determine welding process needed (MIG/TIG/Arc/Plasma)", "Check duty cycle percentage for production use", "Verify input power requirements (single/three phase)", "Confirm wire feed speed range for MIG applications", "Check shielding gas compatibility"],
    useCases: ["Structural steel fabrication", "Automotive body welding", "Pipe and pipeline welding", "Shipbuilding", "Pressure vessel manufacturing"],
    topCities: ["Delhi", "Pune", "Bengaluru", "Faridabad", "Mumbai"],
  },
  "sheet-metal": {
    description: "Sheet metal machines include press brakes, laser cutters, shearing machines, and roll-forming equipment for cutting, bending, and forming metal sheets in automotive, construction, and appliance industries.",
    priceRange: "₹3 Lakh – ₹1.5 Cr",
    priceTable: [
      { spec: "Hydraulic Shearing Machine", priceRange: "₹3 – 15 Lakh" },
      { spec: "Mechanical Press Brake", priceRange: "₹2 – 8 Lakh" },
      { spec: "CNC Press Brake (40–80 ton)", priceRange: "₹12 – 25 Lakh" },
      { spec: "CNC Press Brake (100–200 ton)", priceRange: "₹25 – 60 Lakh" },
      { spec: "Fiber Laser Cutting Machine", priceRange: "₹30 Lakh – 1.5 Cr" },
      { spec: "CNC Turret Punch Press", priceRange: "₹20 – 80 Lakh" },
    ],
    buyGuide: ["Define material thickness and type (MS, SS, Aluminium)", "Specify bending length and force requirements", "Check back gauge configuration (X, R, Z axes)", "For lasers: compare fiber vs CO2 for your material mix", "Verify CNC controller compatibility with your CAM software"],
    useCases: ["Electrical enclosure manufacturing", "Automotive body panels", "HVAC ductwork", "Furniture and fixtures", "Defence fabrication"],
    topCities: ["Faridabad", "Pune", "Coimbatore", "Delhi", "Hyderabad"],
  },
  "compressors": {
    description: "Industrial compressors compress air or gas for use in pneumatic tools, manufacturing processes, and industrial systems. India's compressor manufacturing industry is centered in Pune, Vadodara, and Ahmedabad.",
    priceRange: "₹50K – ₹50 Lakh",
    priceTable: [
      { spec: "Piston Compressor (Small)", priceRange: "₹30K – 1.5 Lakh" },
      { spec: "Screw Compressor (10–20 HP)", priceRange: "₹1.5 – 4 Lakh" },
      { spec: "Screw Compressor (30–50 HP)", priceRange: "₹4 – 10 Lakh" },
      { spec: "Screw Compressor (75–100 HP)", priceRange: "₹10 – 20 Lakh" },
      { spec: "Centrifugal Compressor", priceRange: "₹20 – 80 Lakh" },
      { spec: "Oil-Free Compressor", priceRange: "₹8 – 40 Lakh" },
    ],
    buyGuide: ["Define required free air delivery (CFM) and working pressure (bar)", "Choose between oil-injected vs oil-free based on application", "Compare fixed speed vs VFD for energy savings", "Check integrated dryer and filtration requirements", "Verify noise levels for indoor installation"],
    useCases: ["Automotive painting and assembly", "Pharma cleanroom air supply", "Textile spinning processes", "Food and beverage packaging", "General factory air tools"],
    topCities: ["Pune", "Vadodara", "Ahmedabad", "Coimbatore", "Chennai"],
  },
  "press-machines": {
    description: "Press machines apply force to shape, cut, or assemble materials. India manufactures hydraulic presses, pneumatic presses, mechanical presses, and power presses for automotive, electronics, and metal forming industries.",
    priceRange: "₹2 Lakh – ₹2 Cr",
    priceTable: [
      { spec: "Mechanical Power Press (20–50 ton)", priceRange: "₹2 – 8 Lakh" },
      { spec: "Hydraulic Press (50–100 ton)", priceRange: "₹5 – 15 Lakh" },
      { spec: "Hydraulic Press (200–400 ton)", priceRange: "₹15 – 50 Lakh" },
      { spec: "Pneumatic Press", priceRange: "₹50K – 3 Lakh" },
      { spec: "Fine Blanking Press", priceRange: "₹30 – 1.5 Cr" },
      { spec: "Transfer Press Line", priceRange: "₹50 Lakh – 5 Cr" },
    ],
    buyGuide: ["Determine tonnage requirements with 20% safety margin", "Choose mechanical vs hydraulic based on stroke speed needs", "Check bed size and throat depth clearance", "Verify safety guarding and CE/IS certification", "Confirm tooling compatibility and T-slot configuration"],
    useCases: ["Automotive stamping and blanking", "Electronics chassis forming", "White goods manufacturing", "Aerospace component forming", "Jewellery and coin minting"],
    topCities: ["Coimbatore", "Faridabad", "Pune", "Mumbai", "Ludhiana"],
  },
  "conveyor-systems": {
    description: "Conveyor systems transport materials across production floors, warehouses, and logistics facilities. India's conveyor manufacturers in Kolkata, Mumbai, and Ludhiana supply belt, roller, chain, and overhead conveyors.",
    priceRange: "₹50K – ₹2 Cr+",
    priceTable: [
      { spec: "Belt Conveyor (per meter)", priceRange: "₹8K – 25K/m" },
      { spec: "Roller Conveyor (per meter)", priceRange: "₹5K – 15K/m" },
      { spec: "Chain Conveyor System", priceRange: "₹5 – 30 Lakh" },
      { spec: "Screw Conveyor", priceRange: "₹1 – 10 Lakh" },
      { spec: "Overhead Conveyor", priceRange: "₹10 – 50 Lakh" },
      { spec: "Automated Sortation System", priceRange: "₹50 Lakh – 3 Cr" },
    ],
    buyGuide: ["Specify material type, weight, and dimensions to be conveyed", "Define conveyor speed, length, and elevation change", "Choose belt material (rubber, PVC, SS mesh) based on application", "Check load per meter and total system capacity", "Confirm drive motor sizing and speed control requirements"],
    useCases: ["Automotive assembly lines", "Food processing and packaging", "Pharmaceutical manufacturing", "Logistics and warehousing", "Mining and mineral processing"],
    topCities: ["Kolkata", "Mumbai", "Ludhiana", "Hyderabad", "Indore"],
  },
  "water-treatment": {
    description: "Water treatment equipment includes RO plants, ETP (effluent treatment), STP (sewage treatment), and industrial water purification systems. India's water treatment machinery sector serves pharma, food, and industrial buyers nationwide.",
    priceRange: "₹1 Lakh – ₹5 Cr",
    priceTable: [
      { spec: "RO Plant (500 LPH)", priceRange: "₹80K – 2 Lakh" },
      { spec: "RO Plant (2000–5000 LPH)", priceRange: "₹3 – 10 Lakh" },
      { spec: "ETP (Small 10 KLD)", priceRange: "₹5 – 15 Lakh" },
      { spec: "ETP (50–100 KLD)", priceRange: "₹20 – 80 Lakh" },
      { spec: "STP Package Plant", priceRange: "₹10 – 1 Cr" },
      { spec: "DM Plant (Industrial)", priceRange: "₹2 – 20 Lakh" },
    ],
    buyGuide: ["Get source water analysis (TDS, pH, hardness, contaminants)", "Define treated water quality requirements", "Size plant for peak flow demand + 20% buffer", "Check reject water disposal compliance", "Verify AMC and consumables availability locally"],
    useCases: ["Pharma and food grade water", "Industrial boiler feed water", "Effluent treatment compliance", "Drinking water for communities", "Textile dyeing process water"],
    topCities: ["Hyderabad", "Ahmedabad", "Bengaluru", "Chennai", "Vadodara"],
  },
  "testing-equipment": {
    description: "Testing and measuring equipment includes UTM (universal testing machines), hardness testers, CMMs, spectrometers, and quality control instruments for material and product verification.",
    priceRange: "₹50K – ₹1 Cr+",
    priceTable: [
      { spec: "Hardness Tester (Rockwell/Brinell)", priceRange: "₹50K – 3 Lakh" },
      { spec: "Universal Testing Machine (10–20 kN)", priceRange: "₹2 – 8 Lakh" },
      { spec: "UTM (100–600 kN)", priceRange: "₹8 – 25 Lakh" },
      { spec: "CMM (Coordinate Measuring)", priceRange: "₹10 – 80 Lakh" },
      { spec: "Spectrometer (OES)", priceRange: "₹5 – 40 Lakh" },
      { spec: "Impact Testing Machine", priceRange: "₹1 – 5 Lakh" },
    ],
    buyGuide: ["Define test standard (ASTM, ISO, BIS, EN) you need to comply with", "Specify measurement range and accuracy required", "Check calibration traceability to national standards (NABL)", "Assess software and data export requirements", "Verify after-sales calibration service availability"],
    useCases: ["Quality control in manufacturing", "R&D and material development", "NABL accredited labs", "Automotive and aerospace certification", "Import/export compliance testing"],
    topCities: ["Hyderabad", "Bengaluru", "Pune", "Mumbai", "Chennai"],
  },
};

// ─── Blog Posts ───────────────────────────────────────────────────────────────

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "how-to-write-rfq-cnc-machining",
    title: "How to Write a Perfect RFQ for CNC Machining — Step-by-Step Guide",
    description: "A well-written RFQ gets you better quotes, faster. Learn the 7 components every CNC machining RFQ must include to get accurate, comparable quotes from Indian manufacturers.",
    category: "Buyer Guides",
    readTime: 7,
    publishedAt: "2025-02-10",
    content: `## What is an RFQ?

An RFQ (Request for Quotation) is a structured document you send to manufacturers asking them to price your machining requirement. A vague RFQ gets vague quotes — and surprises during delivery.

## The 7 Components of a Good CNC RFQ

### 1. Part Name and Quantity
State what the part is called and how many you need. Include whether this is a one-time order or a monthly recurring requirement.

### 2. Material Specification
Don't just say "steel." Specify: EN8, EN24, SS304, Aluminium 6061-T6, etc. Include heat treatment requirements if any.

### 3. Dimensional Drawing or File
Attach a PDF drawing with all dimensions, tolerances, and GD&T callouts. If you have a CAD file (STEP, IGES, DXF), include it. Without drawings, vendors cannot price accurately.

### 4. Tolerance Requirements
State the tightest tolerances on critical features. Specify surface finish (Ra value) where needed.

### 5. Quantity and Delivery Schedule
How many pieces in the first batch? What is your delivery city and required date? Is this a blanket order with monthly releases?

### 6. Budget Range (Optional but Helpful)
Even a rough budget range helps vendors propose suitable manufacturing methods. A ₹500 part cannot be quoted the same way as a ₹5,000 part.

### 7. Quality and Compliance Requirements
Do you need a material test certificate? First Article Inspection (FAI) report? ISO 9001 supplier? State these upfront.

## Common Mistakes to Avoid

- Sending an RFQ without drawings and expecting accurate pricing
- Not specifying quantity — sample vs. production pricing differs by 50%+
- Asking for quotes from 20+ vendors — you'll get generic pricing; target 5–8 relevant vendors
- Ignoring lead time — always state your required delivery date

## Sample RFQ Template

**Part:** Hydraulic Cylinder Piston Rod
**Material:** EN24T (AISI 4340)
**Quantity:** 50 pcs (sample) / 200 pcs/month (production)
**Dimensions:** As per attached drawing Rev B
**Tolerances:** ±0.01mm on OD, Ra 0.8 on rod surface
**Delivery:** Pune, within 30 days from PO
**Certification:** Material test certificate required
**Budget:** ₹800–1,200/piece target

## Post an RFQ on A TO Z Machines

Our structured RFQ form guides you through all these details step by step. Vendors only see your requirement details — your contact stays private until you're interested in a quote.`,
  },
  {
    slug: "top-cnc-machine-manufacturers-india-2025",
    title: "Top CNC Machine Manufacturers in India 2025 — Verified List by City",
    description: "India has 2,000+ CNC machine manufacturers. This guide covers the top manufacturing clusters in Rajkot, Bengaluru, Pune, and Coimbatore with buying tips and price ranges.",
    category: "Industry Guides",
    readTime: 9,
    publishedAt: "2025-02-15",
    content: `## India's CNC Machine Industry

India is one of Asia's fastest-growing CNC machine markets — both as a manufacturer and as an importer. The domestic industry has matured significantly over the past decade, with several Indian brands now competing with imported machines from Taiwan, Japan, and Germany on quality while offering superior after-sales service.

## Top CNC Manufacturing Clusters

### Rajkot, Gujarat — The Precision Engineering Hub
Rajkot is India's #1 CNC machine manufacturing city. The city is home to 400+ manufacturers producing VMCs, turning centers, and special purpose machines. Key advantage: dense cluster means faster spare parts availability and competitive pricing.

### Bengaluru, Karnataka — Technology and Aerospace
Bengaluru's CNC manufacturers cater to aerospace, defence, and electronics sectors. Machines here typically meet tighter tolerances and often come with higher-accuracy spindles. Premium pricing but superior quality.

### Pune, Maharashtra — Automotive Focus
Pune's CNC manufacturers are tightly integrated with the automotive supply chain. Manufacturers here offer production-optimized machines with fast cycle times and good automation integration.

### Coimbatore, Tamil Nadu — Pumps, Motors, and Foundry
Coimbatore has a strong tradition of machine tool manufacturing tied to its foundry industry. VMCs and lathes from Coimbatore are known for robustness and value.

## Indian Brand vs Import: What to Choose?

| Factor | Indian Brand | Imported (Taiwan/Japan) |
|--------|-------------|------------------------|
| Price | ₹8–20 Lakh | ₹18–50 Lakh |
| After-Sales | Excellent (local) | Variable |
| Parts Availability | Same-day in cluster cities | 7–30 days (imported) |
| Accuracy | ±0.005 – 0.010 mm | ±0.002 – 0.005 mm |
| Controller | Fanuc/Siemens/GSK | Fanuc/Fanuc |

**Recommendation:** For general production work, Indian-made machines deliver excellent value. For tight-tolerance aerospace/medical work, consider imported machines.

## Key Questions to Ask Any CNC Manufacturer

1. What is the spindle warm-up procedure and thermal compensation method?
2. Can we see a test cut on material similar to ours?
3. What is the warranty period and what does it cover?
4. Do you have service engineers in our city?
5. What is the availability lead time for critical spare parts?

## Get Quotes from CNC Manufacturers

Post an RFQ on A TO Z Machines to receive quotes from verified CNC machine manufacturers across India within 24 hours.`,
  },
  {
    slug: "packaging-machine-price-guide-india",
    title: "Packaging Machine Price in India 2025 — Complete Buyer's Guide",
    description: "Packaging machine prices in India range from ₹50,000 for basic sealers to ₹1.5 Crore for full automated lines. This guide covers all machine types with real price ranges.",
    category: "Price Guides",
    readTime: 8,
    publishedAt: "2025-02-20",
    content: `## Packaging Machine Price Overview

India's packaging machinery industry is dominated by manufacturers in Ludhiana (Punjab), Ahmedabad (Gujarat), Mumbai, and Coimbatore. Prices vary widely based on automation level, output speed, and material compatibility.

## Price by Machine Type

### Pouch Packing Machines
- Manual: ₹50,000 – ₹1.5 Lakh
- Semi-automatic: ₹1.5 – ₹4 Lakh
- Automatic (servo-driven): ₹5 – ₹12 Lakh
- High-speed (1000+ packs/hour): ₹12 – ₹25 Lakh

### Form-Fill-Seal (FFS) Machines
- Vertical FFS (small): ₹4 – ₹10 Lakh
- Vertical FFS (production): ₹10 – ₹30 Lakh
- Horizontal FFS (flow wrap): ₹8 – ₹20 Lakh

### Blister Packing Machines
- Manual blister: ₹80K – ₹3 Lakh
- Semi-auto blister: ₹3 – ₹8 Lakh
- Automatic pharma blister: ₹15 – ₹60 Lakh

### Carton and Case Packing
- Cartoning machine: ₹8 – ₹25 Lakh
- Case packer: ₹10 – ₹40 Lakh
- Palletizer: ₹15 – ₹80 Lakh

## Factors That Affect Price

1. **Output speed:** Higher speed machines cost significantly more
2. **Material compatibility:** Multi-layer laminate capability adds cost
3. **Servo vs non-servo drive:** Servo machines cost 30–50% more but offer better accuracy
4. **GMP compliance:** Pharma-grade machines with documentation cost 40–60% more
5. **Automation level:** Fully automatic lines cost 3–5× manual equivalents

## Buying Tips

- Always request a machine demonstration with your actual product and packaging material
- Get at least 3 quotes — prices can vary 40% for similar specifications
- Ask about after-sales and consumables (sealing elements, sensors) before buying
- Factor in installation, training, and first-year maintenance costs

## Get Free Packaging Machine Quotes

Post your packaging machine requirement on A TO Z Machines and receive quotes from 10+ verified manufacturers within 24 hours.`,
  },
  {
    slug: "how-to-verify-machinery-supplier-india",
    title: "How to Verify an Industrial Machinery Supplier in India Before Buying",
    description: "Before paying any advance to a machinery supplier in India, follow these 7 verification steps to protect yourself from fraud, poor quality, and delivery failures.",
    category: "Buyer Guides",
    readTime: 6,
    publishedAt: "2025-03-01",
    content: `## Why Supplier Verification Matters

India has thousands of machinery manufacturers — but also dealers, traders, and middlemen posing as manufacturers. A few key verifications can save you from costly mistakes.

## 7 Steps to Verify a Machinery Supplier

### 1. GST Verification
Every registered business in India has a GST number. Verify it at the official GST portal (gst.gov.in). The GST registration should match the supplier's legal name and state. Unregistered suppliers or mismatched registrations are red flags.

### 2. Factory Visit (or Video Tour)
Visit the factory before placing a large order, or request a video call tour of the manufacturing floor. Check for:
- Actual production equipment (not just assembly)
- Number of employees and production capacity
- Quality control area and instruments
- Finished goods and WIP inventory

### 3. Client References
Ask for 3–5 client references in your industry. Call them. Ask: Did the machine perform as specified? Were there quality issues? Was delivery on time? How is after-sales support?

### 4. Company Registration
Request the Certificate of Incorporation or Shop Act license. Verify the company exists at MCA portal (mca.gov.in). Check establishment date — companies less than 2 years old carry higher risk.

### 5. Bank Account Verification
Never pay to an individual account. Ensure payment goes to the company's current account. The bank account name should match the company name exactly.

### 6. Quality Certifications
ISO 9001 is the minimum for manufacturing suppliers. CE marking is required for export. Ask for copies of certificates and verify directly with the certifying body if the order is large.

### 7. Sample/Test Run Before Full Payment
For orders above ₹5 Lakh, request a factory acceptance test (FAT) before final payment. Bring your own material and run a production trial. Only release final payment after satisfactory performance.

## Red Flags to Watch For

- Supplier refuses to share GST number or company registration
- Price is 40%+ below market — usually means cheaper components or no warranty
- Demands 100% advance payment
- Hesitates on factory visits
- Contact is only via personal mobile, no office landline or website

## How A TO Z Machines Helps

All vendors on A TO Z Machines are manually verified with GST number, company registration, and contact details checked before approval. Our admin team reviews every vendor before they go live.`,
  },
  {
    slug: "indiamart-vs-specialized-marketplace",
    title: "IndiaMART vs Specialized Marketplace: Which is Better for Industrial Machinery?",
    description: "IndiaMART has 150M+ buyers but is flooded with middlemen and spam. Here's an honest comparison of generic B2B platforms vs specialized machinery marketplaces for buyers and sellers.",
    category: "Platform Guides",
    readTime: 7,
    publishedAt: "2025-03-05",
    content: `## The Problem with Generic B2B Platforms

IndiaMART and TradeIndia were built to connect buyers and sellers across ALL product categories — from agarbatti to zinc plates. This breadth is their strength for discovery, but a critical weakness for specialized buyers like machinery procurement managers.

## Key Differences

### For Buyers

| Factor | IndiaMART | Specialized Marketplace |
|--------|-----------|------------------------|
| Vendor quality | Mixed — manufacturers, dealers, traders all listed | Verified manufacturers only |
| Spam calls | High — your contact shared with 20+ vendors immediately | Controlled — you decide who can contact you |
| Quote comparison | No built-in tool | Side-by-side quote dashboard |
| Technical accuracy | Generic product listings | Detailed specs, drawings, tolerances |
| Custom RFQ support | Basic inquiry form | Structured RFQ with file upload |
| Post-inquiry tracking | None | Full status tracking |

### For Vendors (Manufacturers)

| Factor | IndiaMART | Specialized Marketplace |
|--------|-----------|------------------------|
| Lead quality | Mixed intent, many browsing only | Buyers with real specs and budgets |
| Competition | 50+ vendors per query | Targeted to relevant vendors |
| Cost per lead | ₹500 – ₹5,000+ | Lower on specialized platforms |
| Category depth | Generic search | Machine-specific search and filters |

## When IndiaMART Still Makes Sense

- Discovery and brand awareness for a broad audience
- High-volume, commodity products where price is the only factor
- When you have a large sales team to handle lead volume

## When a Specialized Marketplace Wins

- Technical/complex machinery where buyers need detailed specs
- Custom manufacturing requests where structured RFQs are essential
- When vendor trust and verification are important to the buyer
- When you want structured quote comparison, not just contact sharing

## The Bottom Line

For industrial machinery specifically, the structured RFQ model is more appropriate than a directory listing. Machinery buyers need technical details, verified suppliers, and the ability to compare multiple quotes — not just a phone number.

A TO Z Machines is built specifically for this use case: structured RFQ, verified manufacturers, and buyer-controlled contact sharing.`,
  },
  {
    slug: "industrial-machinery-export-india-uae",
    title: "Exporting Industrial Machinery from India to UAE — Complete Guide 2025",
    description: "UAE is India's largest machinery export market. This guide covers export procedures, documentation, duties, and how to find verified Indian machinery manufacturers for UAE buyers.",
    category: "Export Guides",
    readTime: 10,
    publishedAt: "2025-03-10",
    content: `## India-UAE Machinery Trade Overview

UAE is India's #1 export destination for industrial machinery, driven by construction, manufacturing, and food processing sectors in Dubai, Abu Dhabi, and Sharjah. India exported over $2.5 billion in machinery to UAE in FY2024.

## Why UAE Buyers Prefer Indian Machinery

1. **Cost advantage:** Indian machinery costs 40–60% less than European equivalents for comparable quality
2. **Lead time:** Sea freight from JNPT (Mumbai) to Jebel Ali takes 7–10 days
3. **CEPA benefit:** India-UAE CEPA (Feb 2022) has reduced duties on 97% of tariff lines
4. **Hindi/Gujarati support:** Large Indian diaspora in UAE provides local language support
5. **Spare parts:** Indian spare parts are readily available in Dubai and Sharjah

## Export Documentation Required

- Commercial Invoice (in USD/AED)
- Packing List
- Bill of Lading / Air Waybill
- Certificate of Origin (CoO from FIEO/EEPC)
- GST Export Invoice (Bond/LUT)
- Technical specification sheet
- CE marking (for electrical machinery sold in UAE)

## Import Duties in UAE

- Most industrial machinery: 0–5% import duty under CEPA
- Machinery with motors: 5% duty (waived for most categories under CEPA)
- VAT: 5% on import value + duty (claimable by registered businesses)

## Freight Options

| Route | Transit Time | Cost (20ft FCL) |
|-------|-------------|-----------------|
| JNPT → Jebel Ali (Sea) | 7–10 days | $1,200 – $2,000 |
| Chennai → Jebel Ali (Sea) | 12–15 days | $1,500 – $2,500 |
| Mumbai → Dubai (Air) | 2–3 days | $5–10/kg |

## Finding the Right Indian Manufacturer for UAE

1. Look for manufacturers with existing UAE export experience
2. Check if the manufacturer has CE or ISO certification
3. Verify they can handle USD invoicing and LC (Letter of Credit)
4. Ask about their packaging standards for sea freight

## Post RFQ for UAE Buyers

A TO Z Machines connects UAE-based buyers directly with verified Indian machinery manufacturers who have export experience. Post your requirement and receive quotes with export pricing within 24 hours.`,
  },
  {
    slug: "custom-machinery-manufacturing-india-guide",
    title: "Custom Industrial Machinery Manufacturing in India — How It Works",
    description: "India's 5,000+ custom machinery fabricators can build almost any industrial machine to specification. Learn the process, timeline, and pricing for custom machinery orders.",
    category: "Buyer Guides",
    readTime: 8,
    publishedAt: "2025-03-15",
    content: `## What is Custom Machinery?

Custom machinery is purpose-built equipment designed for a specific manufacturing process or application. Unlike standard catalogued machines, custom machines are engineered to your exact specifications — dimensions, capacity, materials processed, output rate, and integration with existing equipment.

## When Do You Need Custom Machinery?

- Your process has unique space constraints (height, width, aisle width)
- Standard machines can't handle your material (temperature, corrosiveness, size)
- You need specific output rates not available in standard models
- You need integration with existing conveyors, PLCs, or automation systems
- Your product is unusual (irregular shapes, fragile, extreme weight)

## The Custom Machinery Development Process

### Step 1: Concept Discussion (Week 1)
Share your requirement with manufacturers. A good manufacturer will ask about your production environment, existing equipment, utilities available (power, pneumatics, water), and budget.

### Step 2: Concept Layout (Week 2–3)
The manufacturer provides a basic layout drawing (2D) with overall dimensions and key components identified. Review and approve before detailed engineering begins.

### Step 3: Detailed Engineering (Week 3–6)
Full 3D CAD design, BOM (Bill of Materials), and control logic are developed. You review drawings at key milestones. This is the most important stage — changes after fabrication begin are expensive.

### Step 4: Procurement (Week 4–8)
Long-lead items (motors, gear boxes, PLC/HMI, sensors, hydraulics) are ordered. Structural fabrication begins in parallel.

### Step 5: Assembly and Testing (Week 8–14)
Machine is assembled and tested in the manufacturer's shop. Factory Acceptance Test (FAT) is performed with your team if required.

### Step 6: Delivery and Commissioning (Week 14–18)
Machine is shipped and installed at your plant. Commissioning, training, and trial production runs are completed.

## Custom Machinery Pricing

Custom machinery pricing is highly variable. Factors:
- Complexity of mechanical design
- Material of construction (MS vs SS vs special alloys)
- Automation level (manual, semi-auto, fully automatic)
- Quantity (first machine vs repeat orders)
- Imported components (Siemens, Fanuc add 30–50% to cost)

As a rough guide: a custom material handling system costs ₹5–50 Lakh; a custom packaging line ₹15–80 Lakh; a custom press or forming machine ₹10–60 Lakh.

## Post Custom Machinery RFQ

A TO Z Machines supports custom machinery RFQs with file upload (drawings, specifications, reference images). Our system matches your requirement to relevant fabricators who specialize in your machine type.`,
  },
  {
    slug: "cnc-machine-types-buying-guide",
    title: "CNC Machine Types Explained — Complete Buying Guide for First-Time Buyers",
    description: "VMC, HMC, lathe, turning center, Swiss turn — CNC machine types can be confusing. This plain-language guide explains each type and helps you pick the right one.",
    category: "Buyer Guides",
    readTime: 8,
    publishedAt: "2025-03-18",
    content: `## CNC Machine Types

### Vertical Machining Center (VMC)
The most common CNC machine. The spindle is vertical (pointing down). Used for milling, drilling, and tapping of flat or contoured parts. Best for mold making, flat plate components, and 3D profiling.

**When to buy:** You need to machine flat parts, pockets, contours, and holes in large batches.

### Horizontal Machining Center (HMC)
The spindle is horizontal (pointing sideways). Chips fall away from the workpiece, enabling longer unattended machining. A pallet changer allows continuous operation. Higher productivity than VMC for complex parts.

**When to buy:** High-volume production of prismatic parts; you need 4-sided machining in one setup.

### CNC Turning Center (Lathe)
Rotates the workpiece while cutting tools shape it. Used for cylindrical parts: shafts, pins, pulleys, flanges. Two variants: flat-bed (for medium parts) and slant-bed (for production CNC).

**When to buy:** You primarily make round or cylindrical components.

### CNC Swiss Lathe (Swiss Turn)
A specialized turning machine for small, long, thin parts (medical pins, screws, shafts). The guide bushing supports the workpiece close to the cutting point, enabling extreme length-to-diameter ratios.

**When to buy:** You make small, precision parts < 32mm diameter, often in medical, electronics, or defence sectors.

### CNC Grinding Machine
Used for finishing operations to achieve Ra < 0.2 µm and tolerances < 0.005 mm. Includes cylindrical grinders, surface grinders, and CNC jig grinders.

**When to buy:** You need mirror finishes or ultra-tight tolerances on hardened steel parts.

### EDM (Electrical Discharge Machine)
Cuts conductive materials using electrical discharges. Wire EDM cuts 2D profiles; Die-sinking EDM creates 3D cavities. Essential for mold making and hardened tooling.

**When to buy:** You make hardened steel molds, dies, or complex cavities that can't be machined conventionally.

## How to Choose the Right CNC Machine

1. **Define your most common part geometry** — flat vs round vs prismatic determines VMC vs lathe vs HMC
2. **Set your accuracy requirement** — ±0.01mm for production parts, ±0.002mm for precision tools
3. **Estimate production volume** — low volume: VMC; high volume: VMC with pallet changer or HMC
4. **Budget realistically** — include tooling (15–20% of machine cost), workholding, and installation

## Get CNC Machine Quotes

Post your CNC machine requirement on A TO Z Machines. Specify your part family, material, and required accuracy, and receive quotes from verified manufacturers across India.`,
  },
  {
    slug: "top-industrial-cities-india-machinery",
    title: "Top Industrial Cities in India for Machinery — Hub Guide 2025",
    description: "India's industrial machinery is concentrated in specific city clusters. This guide maps out which cities specialize in which machines, helping buyers source locally.",
    category: "Industry Guides",
    readTime: 7,
    publishedAt: "2025-03-20",
    content: `## India's Industrial Machinery Geography

India's manufacturing base isn't evenly distributed. Specific cities dominate specific machine categories due to historical industrial clusters, raw material availability, and skills concentration.

## City-by-City Guide

### Rajkot, Gujarat — Precision Engineering Capital
India's most dense machinery manufacturing cluster. 5,000+ engineering units producing CNC machines, lathe machines, pump sets, and precision components. Average lead time from Rajkot manufacturers is lower than any other city due to cluster density.

**Best for:** CNC machines, lathe machines, pump sets, precision components

### Coimbatore, Tamil Nadu — Pumps, Motors & Press Machines
Called "The Manchester of South India." Strong tradition in pump manufacturing, electric motors, and press machines tied to the textile and foundry industries.

**Best for:** Pumps, motors, press machines, foundry equipment, compressors

### Ludhiana, Punjab — Packaging & Cycle Parts
India's leading city for packaging machinery, especially for FMCG and agricultural produce. Also known for cycle parts and auto components.

**Best for:** Packaging machines, conveyor systems, auto components, hosiery machinery

### Pune, Maharashtra — Automotive & Hydraulics
Pune's manufacturing ecosystem is deeply integrated with the auto industry. Strong in hydraulic systems, pneumatics, and specialized automotive equipment.

**Best for:** Hydraulic systems, automotive machinery, compressors, testing equipment

### Ahmedabad, Gujarat — Pharma & Textile Machinery
India's pharma machinery capital. Also strong in textile machinery (spinning, weaving equipment) and packaging for FMCG.

**Best for:** Pharma machinery, textile machines, packaging, chemical plant equipment

### Faridabad, Haryana — Sheet Metal & Press Tools
NCR's industrial heartland. Concentrated press machine manufacturers, sheet metal fabricators, and tool room operators serving the Delhi NCR automotive and electronics supply chain.

**Best for:** Press machines, sheet metal machines, fabrication equipment, dies and tools

### Kolkata, West Bengal — Heavy Engineering
India's traditional heavy engineering hub. Manufacturers of heavy cranes, conveyors, steel plant equipment, and heavy fabrication.

**Best for:** Heavy material handling, conveyor systems, steel plant equipment, ship repair

## How to Use This Guide

When posting an RFQ on A TO Z Machines, you can specify your preferred delivery city. Our system prioritizes vendors in the nearest industrial cluster to minimize freight costs and lead times.`,
  },
  {
    slug: "rfq-vs-direct-inquiry-machinery",
    title: "RFQ vs Direct Inquiry for Industrial Machinery — Which Method Gets Better Results?",
    description: "Should you post an RFQ or send a direct inquiry to get industrial machinery quotes? Here's a practical comparison with guidance on when to use each approach.",
    category: "Buyer Guides",
    readTime: 5,
    publishedAt: "2025-03-22",
    content: `## Two Ways to Get Machinery Quotes

When sourcing industrial machinery, buyers typically use two approaches: posting a structured RFQ (Request for Quotation) or sending direct inquiries to individual vendors.

## Direct Inquiry

A direct inquiry is an unstructured message sent to one vendor at a time. This is what most B2B directory platforms facilitate.

**Pros:**
- Simple and fast to send
- Good for simple, standard products
- Suitable when you already know the specific vendor

**Cons:**
- Get quotes from only 1–2 vendors at a time
- Vendors often respond with calls instead of written quotes
- Hard to compare prices — each quote has different formats and inclusions
- Your contact is shared immediately, leading to sales calls

## Structured RFQ

A structured RFQ captures all your requirements in a standardized format and sends them to multiple relevant vendors simultaneously.

**Pros:**
- 5–15 vendors see your requirement and respond
- Standardized quote format makes comparison easier
- Your contact remains private until you show interest
- Vendors who respond are genuinely interested
- File attachments (drawings, specs) are shared securely

**Cons:**
- Takes slightly more time to fill out (10–15 minutes)
- Not ideal for very simple, commodity products where price is the only factor

## When to Use Each Method

| Use Case | Recommended Method |
|----------|--------------------|
| Custom or complex machinery | RFQ |
| First-time sourcing (unknown vendors) | RFQ |
| Repeat order from trusted vendor | Direct inquiry |
| Simple standard product (bolt, pipe) | Direct inquiry |
| Need quotes from 5+ vendors | RFQ |
| Confidential requirement | RFQ |

## The Bottom Line

For industrial machinery — especially custom or complex equipment — an RFQ delivers significantly better results. You get more quotes, better comparison data, and maintain control over who receives your contact information.

A TO Z Machines is built specifically for the RFQ workflow. Post your requirement once and receive structured quotes from verified vendors within 24 hours.`,
  },
];

// ─── Indian States ────────────────────────────────────────────────────────────

export interface SeoState {
  name: string;
  slug: string;
  capital: string;
  industrialCities: string[];
  knownFor: string;
  vendorCount: number;
}

export const SEO_STATES: SeoState[] = [
  { name: "Gujarat", slug: "gujarat", capital: "Gandhinagar", industrialCities: ["Rajkot", "Ahmedabad", "Surat", "Vadodara"], knownFor: "CNC machines, pharma machinery, packaging equipment, textile machines", vendorCount: 520 },
  { name: "Maharashtra", slug: "maharashtra", capital: "Mumbai", industrialCities: ["Pune", "Mumbai", "Nashik", "Aurangabad"], knownFor: "Hydraulic systems, automotive machinery, compressors, precision engineering", vendorCount: 480 },
  { name: "Tamil Nadu", slug: "tamil-nadu", capital: "Chennai", industrialCities: ["Coimbatore", "Chennai", "Tiruppur", "Salem"], knownFor: "Press machines, pumps, motors, compressors, foundry equipment", vendorCount: 390 },
  { name: "Punjab", slug: "punjab", capital: "Chandigarh", industrialCities: ["Ludhiana", "Amritsar", "Jalandhar", "Batala"], knownFor: "Packaging machines, lathe machines, auto parts, conveyor systems", vendorCount: 280 },
  { name: "Haryana", slug: "haryana", capital: "Chandigarh", industrialCities: ["Faridabad", "Gurugram", "Panipat", "Ambala"], knownFor: "Sheet metal machines, press machines, welding equipment, fabrication", vendorCount: 240 },
  { name: "Karnataka", slug: "karnataka", capital: "Bengaluru", industrialCities: ["Bengaluru", "Mysuru", "Hubballi", "Mangaluru"], knownFor: "CNC machines, aerospace tooling, electronics manufacturing, precision tools", vendorCount: 310 },
  { name: "West Bengal", slug: "west-bengal", capital: "Kolkata", industrialCities: ["Kolkata", "Durgapur", "Asansol", "Siliguri"], knownFor: "Heavy engineering, conveyor systems, steel plant equipment, fabrication", vendorCount: 210 },
  { name: "Telangana", slug: "telangana", capital: "Hyderabad", industrialCities: ["Hyderabad", "Warangal", "Karimnagar"], knownFor: "Pharma machinery, testing equipment, precision tools, water treatment", vendorCount: 195 },
  { name: "Rajasthan", slug: "rajasthan", capital: "Jaipur", industrialCities: ["Jaipur", "Jodhpur", "Udaipur", "Bhilwara"], knownFor: "Textile machines, marble cutting equipment, mining machinery", vendorCount: 160 },
  { name: "Uttar Pradesh", slug: "uttar-pradesh", capital: "Lucknow", industrialCities: ["Kanpur", "Agra", "Meerut", "Noida", "Ghaziabad"], knownFor: "Leather machinery, sugar plant equipment, CNC machines, press machines", vendorCount: 290 },
  { name: "Madhya Pradesh", slug: "madhya-pradesh", capital: "Bhopal", industrialCities: ["Indore", "Bhopal", "Jabalpur", "Pithampur"], knownFor: "Packaging machines, material handling, food processing equipment", vendorCount: 145 },
  { name: "Andhra Pradesh", slug: "andhra-pradesh", capital: "Amaravati", industrialCities: ["Visakhapatnam", "Vijayawada", "Guntur", "Tirupati"], knownFor: "Steel plant equipment, pharma machinery, material handling", vendorCount: 130 },
  { name: "Jharkhand", slug: "jharkhand", capital: "Ranchi", industrialCities: ["Jamshedpur", "Ranchi", "Dhanbad", "Bokaro"], knownFor: "Heavy machinery, steel plant equipment, mining equipment, conveyor systems", vendorCount: 115 },
  { name: "Odisha", slug: "odisha", capital: "Bhubaneswar", industrialCities: ["Bhubaneswar", "Cuttack", "Rourkela", "Sambalpur"], knownFor: "Steel plant machinery, mining equipment, heavy fabrication", vendorCount: 95 },
  { name: "Kerala", slug: "kerala", capital: "Thiruvananthapuram", industrialCities: ["Kochi", "Thrissur", "Kozhikode", "Palakkad"], knownFor: "Rubber processing machinery, food processing, coconut processing equipment", vendorCount: 110 },
];

// ─── Industries ───────────────────────────────────────────────────────────────

export interface SeoIndustry {
  name: string;
  slug: string;
  icon: string;
  description: string;
  machineCategories: string[];
  topStates: string[];
  challenges: string[];
  benefits: string[];
}

export const SEO_INDUSTRIES: SeoIndustry[] = [
  {
    name: "Automotive",
    slug: "automotive",
    icon: "🚗",
    description: "India's automotive sector is the world's 3rd largest, requiring precision CNC machines, press machines, welding equipment, and conveyor systems for OEM and tier-1 suppliers.",
    machineCategories: ["cnc-machines", "press-machines", "welding-equipment", "conveyor-systems", "material-handling"],
    topStates: ["Maharashtra", "Gujarat", "Tamil Nadu", "Haryana", "Karnataka"],
    challenges: ["Sub-micron tolerances for engine components", "High-volume production consistency", "JIT delivery requirements", "Multi-material capability (steel, aluminium, composites)"],
    benefits: ["CNC machines enable lights-out production", "Press machines reduce material waste by 30%", "Automated conveyors improve throughput by 40%"],
  },
  {
    name: "Pharmaceutical",
    slug: "pharma",
    icon: "💊",
    description: "India is the world's pharmacy, manufacturing 20% of global generic drugs. Pharma plants require GMP-compliant packaging machines, water treatment systems, and testing equipment.",
    machineCategories: ["packaging-machines", "water-treatment", "testing-equipment", "compressors"],
    topStates: ["Gujarat", "Telangana", "Maharashtra", "Himachal Pradesh", "Andhra Pradesh"],
    challenges: ["GMP / Schedule M compliance mandatory", "FDA 21 CFR Part 11 data integrity", "Cleanroom contamination control", "Validation documentation (IQ/OQ/PQ)"],
    benefits: ["Automated packaging reduces human error", "RO/WFI water systems meet USP standards", "GMP compressors eliminate oil contamination"],
  },
  {
    name: "FMCG",
    slug: "fmcg",
    icon: "🛒",
    description: "India's FMCG sector requires high-speed packaging machines, filling systems, and conveyor lines to handle millions of units daily across food, beverage, and personal care categories.",
    machineCategories: ["packaging-machines", "conveyor-systems", "material-handling", "compressors"],
    topStates: ["Maharashtra", "Karnataka", "Punjab", "Gujarat", "Uttar Pradesh"],
    challenges: ["Speed requirements (1000+ packs/hour)", "Multi-SKU flexibility (quick changeover)", "Food-grade material compliance (SS 304/316)", "Shelf-life and seal integrity requirements"],
    benefits: ["Servo-driven packaging improves accuracy by 99%", "Automated lines reduce labor costs by 60%", "Integrated QC reduces rejects significantly"],
  },
  {
    name: "Food Processing",
    slug: "food-processing",
    icon: "🌾",
    description: "India's food processing industry is the 5th largest globally. Processing plants require packaging machines, conveyor systems, material handling equipment, and water treatment systems.",
    machineCategories: ["packaging-machines", "conveyor-systems", "water-treatment", "testing-equipment", "compressors"],
    topStates: ["Punjab", "Maharashtra", "Karnataka", "Andhra Pradesh", "Gujarat"],
    challenges: ["FSSAI compliance and food safety standards", "Hygienic design (IP65+ rating, no dead zones)", "Temperature control during processing", "Allergen cross-contamination prevention"],
    benefits: ["Automated grading reduces waste by 25%", "Hygienic conveyors meet HACCP requirements", "Efficient packaging extends shelf life"],
  },
  {
    name: "Aerospace & Defence",
    slug: "aerospace",
    icon: "✈️",
    description: "India's aerospace sector is growing rapidly with ISRO, HAL, and private players like Tata Advanced Systems. Aerospace manufacturing demands the highest-precision CNC machines and testing equipment.",
    machineCategories: ["cnc-machines", "testing-equipment", "sheet-metal", "welding-equipment"],
    topStates: ["Karnataka", "Tamil Nadu", "Maharashtra", "Telangana", "Uttar Pradesh"],
    challenges: ["AS9100D certification requirement", "Tolerances to ±0.002mm and tighter", "Material traceability for every component", "Special process approvals (Nadcap)"],
    benefits: ["5-axis CNC enables complex aerostructure parts", "CMM ensures dimensional compliance", "Automated welding improves joint consistency"],
  },
  {
    name: "Textile",
    slug: "textile",
    icon: "🧵",
    description: "India is the world's 2nd largest textile producer. Textile plants require specialized spinning machines, weaving equipment, compressors, and material handling systems.",
    machineCategories: ["compressors", "material-handling", "conveyor-systems", "testing-equipment"],
    topStates: ["Gujarat", "Tamil Nadu", "Maharashtra", "Rajasthan", "Punjab"],
    challenges: ["High humidity and dust environment", "Continuous 24/7 operation requirement", "Energy efficiency (textile is energy-intensive)", "Fiber contamination prevention"],
    benefits: ["Variable speed compressors save 30% energy", "Automated material handling reduces fiber damage", "Testing equipment ensures yarn quality standards"],
  },
  {
    name: "Steel & Metal",
    slug: "steel-metal",
    icon: "⚙️",
    description: "India is the world's 2nd largest steel producer. Steel plants and metal fabricators require heavy press machines, material handling equipment, CNC machines, and conveyor systems.",
    machineCategories: ["press-machines", "material-handling", "cnc-machines", "welding-equipment", "conveyor-systems"],
    topStates: ["Jharkhand", "Odisha", "West Bengal", "Chhattisgarh", "Maharashtra"],
    challenges: ["Extreme heat and scale management", "Heavy load handling (100+ ton coils)", "Tight flatness and thickness tolerances", "High cycle rate for rolling mill operations"],
    benefits: ["Heavy-duty conveyors handle 50-ton loads", "CNC plasma cutting improves yield by 15%", "Automated press lines reduce manning costs"],
  },
  {
    name: "Chemical & Petrochemical",
    slug: "chemical",
    icon: "🧪",
    description: "India's chemical industry is the 3rd largest in Asia. Chemical plants require corrosion-resistant equipment including special compressors, hydraulic systems, water treatment plants, and testing equipment.",
    machineCategories: ["compressors", "hydraulic-systems", "water-treatment", "testing-equipment"],
    topStates: ["Gujarat", "Maharashtra", "Andhra Pradesh", "Rajasthan", "Tamil Nadu"],
    challenges: ["Corrosion resistance (Hastelloy, SS 316L required)", "ATEX/PESO certified equipment for hazardous zones", "Compliance with CPCB effluent norms", "Continuous process — no downtime allowed"],
    benefits: ["ETP systems meet CPCB standards", "Special alloy compressors resist corrosion", "Hydraulic systems enable precise process control"],
  },
];

// ─── Glossary Terms ───────────────────────────────────────────────────────────

export interface GlossaryTerm {
  slug: string;
  term: string;
  shortDef: string;
  category: string;
  content: string;
  relatedTerms: string[];
  relatedCategories: string[];
}

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    slug: "what-is-rfq",
    term: "RFQ (Request for Quotation)",
    shortDef: "A formal document sent by a buyer to suppliers requesting a price quote for specific goods or services.",
    category: "Procurement",
    content: `An RFQ (Request for Quotation) is a standard procurement document that a buyer sends to one or more suppliers to request pricing for specific goods or services.

## How an RFQ Works

The buyer describes what they need — machine type, specifications, quantity, delivery location, and timeline. Suppliers review the RFQ and respond with a formal quote (price, lead time, payment terms).

## RFQ vs RFP vs RFI

- **RFQ** (Request for Quotation): You know exactly what you want, just need pricing
- **RFP** (Request for Proposal): You need suppliers to propose a solution, not just price it
- **RFI** (Request for Information): You're gathering market information, not ready to buy yet

## Key Components of an RFQ

1. Part name or machine description
2. Quantity required
3. Technical specifications or drawings
4. Delivery location and deadline
5. Budget range (optional but helpful)
6. Quality or certification requirements

## Benefits of Using RFQ

- Compare multiple supplier quotes in a standardized format
- Competitive pricing through supplier competition
- Clear documentation for purchase approval
- Audit trail for procurement compliance

## RFQ on A TO Z Machines

On A TO Z Machines, buyers post structured RFQs that are automatically matched to relevant verified manufacturers. You receive multiple quotes in a single dashboard within 24 hours.`,
    relatedTerms: ["purchase-order", "lead-time", "bill-of-materials", "factory-acceptance-test"],
    relatedCategories: ["cnc-machines", "packaging-machines"],
  },
  {
    slug: "what-is-vmc-machine",
    term: "VMC Machine (Vertical Machining Center)",
    shortDef: "A CNC machine tool with a vertical spindle orientation used for milling, drilling, and boring of metal parts.",
    category: "CNC Machines",
    content: `A VMC (Vertical Machining Center) is a CNC machine where the spindle axis is oriented vertically — the cutting tool points straight down at the workpiece.

## How a VMC Works

The workpiece is clamped on a horizontal table. The vertical spindle moves in X, Y, and Z axes to cut the material using rotating end mills, drills, or boring tools. A tool magazine automatically changes tools during the machining cycle.

## Key VMC Specifications

- **Table size**: Determines max workpiece dimensions (e.g., 850×450mm)
- **X/Y/Z travel**: Maximum cutting envelope
- **Spindle speed**: Typically 8,000–15,000 RPM for standard VMCs
- **Tool magazine**: 20–40 tools in automatic tool changer (ATC)
- **Controller**: Fanuc, Siemens, Mitsubishi, GSK

## VMC vs HMC

| Feature | VMC | HMC |
|---------|-----|-----|
| Spindle orientation | Vertical | Horizontal |
| Chip evacuation | Poor (gravity into pocket) | Excellent (gravity away) |
| Cost | Lower | Higher (30–50%) |
| Part accessibility | Good for flat parts | Better for 4-sided machining |
| Productivity | Good | Higher for production |

## VMC Price in India

Standard 3-axis VMC: ₹8–25 Lakh. 4-axis: ₹25–40 Lakh. 5-axis: ₹40 Lakh–1.5 Crore.

## Top Indian VMC Manufacturers

Rajkot (Gujarat) is India's largest VMC manufacturing cluster, with brands like Jyoti, Feeler (Taiwan assembled in India), and many others.`,
    relatedTerms: ["what-is-hmc-machine", "cnc-controller", "tool-changer", "spindle-speed"],
    relatedCategories: ["cnc-machines", "lathe-machines"],
  },
  {
    slug: "what-is-hmc-machine",
    term: "HMC Machine (Horizontal Machining Center)",
    shortDef: "A CNC machining center where the spindle is oriented horizontally, enabling better chip evacuation and 4-sided machining.",
    category: "CNC Machines",
    content: `An HMC (Horizontal Machining Center) is a CNC machine where the spindle points horizontally at the workpiece. Unlike VMCs, HMCs use pallet changers for continuous production and excel at multi-sided machining.

## Advantages of HMC

- **Chip evacuation**: Chips fall away from the workpiece by gravity, preventing re-cutting
- **Pallet changer**: While one part is being machined, the next part is being loaded on the second pallet — near-continuous operation
- **4-sided machining**: Rotary table enables machining on 4 faces without re-clamping
- **Higher rigidity**: Horizontal spindle design is inherently more rigid for heavy cuts

## When to Choose HMC over VMC

Choose an HMC when: you need high-volume production of prismatic parts, you need 4-sided machining in one setup, you need better chip management, or your cycle time needs to be minimized.

## HMC Price in India

HMC machines cost 30–50% more than equivalent VMCs. Typical range: ₹30–80 Lakh for standard models. 5-axis HMC: ₹1–3 Crore.

## Applications

Engine blocks, transmission cases, hydraulic manifolds, aerospace structural parts, and any prismatic component requiring multiple machined faces.`,
    relatedTerms: ["what-is-vmc-machine", "pallet-changer", "4-axis-machining"],
    relatedCategories: ["cnc-machines"],
  },
  {
    slug: "what-is-cnc",
    term: "CNC (Computer Numerical Control)",
    shortDef: "Technology that uses computers to control machine tools, enabling precise, repeatable, and automated machining of parts.",
    category: "Technology",
    content: `CNC (Computer Numerical Control) is the automated control of machine tools using computers and G-code programs. A CNC machine reads a program and precisely moves cutting tools to machine a part.

## How CNC Works

1. A CAD (Computer-Aided Design) model of the part is created
2. CAM (Computer-Aided Manufacturing) software converts the model into G-code — a series of coordinate-based movement instructions
3. The CNC controller reads the G-code and commands servo motors to move the machine axes
4. The cutting tool removes material precisely according to the program

## CNC vs Conventional Machines

| Feature | CNC Machine | Conventional Machine |
|---------|-------------|---------------------|
| Repeatability | ±0.001–0.01mm | ±0.05–0.1mm |
| Speed | High (automated) | Operator-dependent |
| Skill required | CNC programming | Manual machining skill |
| Setup time | Longer (programming) | Shorter |
| Batch production | Excellent | Labor-intensive |

## CNC Machine Types

- **CNC VMC**: Vertical milling
- **CNC Lathe/Turning Center**: Cylindrical parts
- **CNC EDM**: Hardened steel, complex cavities
- **CNC Grinding**: Ultra-precision finishing
- **CNC Plasma/Laser**: Sheet metal cutting

## CNC Price in India

Entry-level CNC lathe: ₹5–8 Lakh. Standard VMC: ₹10–25 Lakh. Advanced 5-axis machining center: ₹40 Lakh–2 Crore.`,
    relatedTerms: ["what-is-vmc-machine", "what-is-hmc-machine", "g-code", "cam-software"],
    relatedCategories: ["cnc-machines", "lathe-machines"],
  },
  {
    slug: "what-is-hydraulic-press",
    term: "Hydraulic Press",
    shortDef: "A machine that uses hydraulic pressure to generate compressive force for stamping, forming, and deep drawing metal.",
    category: "Press Machines",
    content: `A hydraulic press uses Pascal's law — pressure applied to a confined fluid is transmitted equally in all directions — to generate large compressive forces for metalworking operations.

## How a Hydraulic Press Works

A hydraulic pump pressurizes oil in a cylinder. The pressurized oil pushes a ram (piston) downward with controlled force. The ram applies this force to a die or tooling, forming or cutting the workpiece.

## Hydraulic Press vs Mechanical Press

| Feature | Hydraulic Press | Mechanical Press |
|---------|----------------|-----------------|
| Force control | Variable, precise | Fixed at bottom dead center |
| Speed | Slower | Faster (SPM higher) |
| Stroke control | Flexible | Fixed by crank |
| Tonnage range | Small to very large | Typically up to 400T |
| Deep drawing | Excellent | Limited |
| Cost | Higher | Lower for same tonnage |

## Key Specifications

- **Tonnage (capacity)**: Force in metric tons (20T to 5000T)
- **Table size**: Bed dimensions for tooling
- **Stroke length**: Maximum ram travel
- **Daylight**: Open height between table and ram
- **Control**: Manual, semi-auto, or PLC/servo

## Hydraulic Press Price in India

50-ton: ₹5–8 Lakh. 100-ton: ₹8–15 Lakh. 200-ton: ₹15–30 Lakh. 500-ton: ₹40–80 Lakh.

## Applications

Deep drawing (kitchen sinks, auto parts), stamping, forging, powder compaction, rubber moulding, and plastic forming.`,
    relatedTerms: ["what-is-rfq", "hydraulic-power-pack", "die-stamping", "deep-drawing"],
    relatedCategories: ["press-machines", "hydraulic-systems"],
  },
  {
    slug: "what-is-bom",
    term: "BOM (Bill of Materials)",
    shortDef: "A comprehensive list of all raw materials, components, and assemblies required to manufacture a product.",
    category: "Manufacturing",
    content: `A BOM (Bill of Materials) is a structured list of all materials, components, sub-assemblies, and quantities needed to manufacture a product or machine.

## Types of BOM

- **Engineering BOM (EBOM)**: Created by design engineering, reflects the design intent
- **Manufacturing BOM (MBOM)**: Adapted for production, includes process-specific details
- **Sales BOM (SBOM)**: Used by sales to configure products for customers

## BOM in Machinery Procurement

When buying a custom machine, always request the BOM from the manufacturer. It reveals:
- Brand and origin of key components (motor, gearbox, controller, sensors)
- Whether Indian or imported components are used
- Replacement parts availability
- Total system complexity and maintainability

## What to Check in a Machine BOM

1. Motor brand (Siemens, ABB, Crompton vs unknown)
2. PLC/controller brand (Siemens, Allen-Bradley, Delta vs no-name)
3. Bearing brand (SKF, FAG, Timken vs generic)
4. Pneumatic/hydraulic components (SMC, Festo, Parker vs local)
5. Electrical components (L&T, Schneider, ABB vs unbranded)

The component quality in the BOM directly determines machine reliability and maintenance cost over its lifetime.`,
    relatedTerms: ["what-is-rfq", "factory-acceptance-test", "lead-time"],
    relatedCategories: ["cnc-machines", "packaging-machines", "hydraulic-systems"],
  },
  {
    slug: "factory-acceptance-test",
    term: "FAT (Factory Acceptance Test)",
    shortDef: "A test performed at the manufacturer's facility before shipment to verify the machine meets agreed specifications.",
    category: "Quality",
    content: `A Factory Acceptance Test (FAT) is a formal test conducted at the machine manufacturer's facility before the equipment is shipped to the buyer. The buyer's team witnesses the test to confirm the machine meets all agreed specifications.

## Why FAT Matters

Fixing problems at the factory is far cheaper than fixing them after installation at your plant. A FAT catches:
- Dimensional or performance deviations from specs
- Control logic errors
- Safety system failures
- Missing or wrong components

## FAT Checklist for Industrial Machines

1. **Dimensional verification**: Key dimensions match drawing
2. **Performance test**: Run at rated speed/load for defined duration
3. **Accuracy check**: Measure output parts or test cuts
4. **Safety systems**: E-stops, guards, interlocks all functional
5. **Controls check**: All HMI screens, alarms, modes working
6. **Documentation**: Manuals, spare parts list, certificates available

## FAT vs SAT

- **FAT** (Factory Acceptance Test): At manufacturer's facility
- **SAT** (Site Acceptance Test): After installation at buyer's plant

## When to Insist on FAT

For any machine order above ₹10 Lakh, always insist on witnessing a FAT. For complex custom machines or import orders, FAT is non-negotiable — it saves expensive site visits for rework.`,
    relatedTerms: ["what-is-rfq", "what-is-bom", "lead-time"],
    relatedCategories: ["cnc-machines", "packaging-machines", "testing-equipment"],
  },
  {
    slug: "lead-time",
    term: "Lead Time (Machinery)",
    shortDef: "The total time from placing a purchase order to receiving the machine at your facility.",
    category: "Procurement",
    content: `Lead time in machinery procurement is the time from when you place a purchase order (PO) to when the machine is delivered and ready for use at your facility.

## Components of Machinery Lead Time

1. **Manufacturing lead time**: Time to build the machine (most significant)
2. **Procurement lead time**: Time to source imported components (motors, controllers)
3. **Testing time**: FAT and documentation
4. **Shipping time**: Transit from factory to your location
5. **Installation time**: Commissioning and handover

## Typical Lead Times by Machine Type

| Machine Type | Standard | Custom |
|-------------|---------|--------|
| Lathe machines | 2–4 weeks | 4–8 weeks |
| CNC VMC (standard) | 4–8 weeks | 8–16 weeks |
| Packaging machines | 3–6 weeks | 6–12 weeks |
| Hydraulic press | 4–8 weeks | 8–20 weeks |
| Custom machinery | N/A | 12–24 weeks |

## Factors That Affect Lead Time

- Imported components (Fanuc, Siemens): Add 4–8 weeks
- Custom non-standard specifications: Adds engineering time
- Busy season (Oct–March in India): Manufacturers have full order books
- Payment terms: Most manufacturers start production after advance payment

## How to Reduce Lead Time Risk

- Order well in advance of your startup date
- Confirm component availability before PO
- Lock in delivery date in your purchase order
- Build in 2-week buffer for unexpected delays`,
    relatedTerms: ["what-is-rfq", "factory-acceptance-test", "what-is-bom"],
    relatedCategories: ["cnc-machines", "packaging-machines", "hydraulic-systems"],
  },
  {
    slug: "gst-verified-vendor",
    term: "GST Verified Vendor",
    shortDef: "A supplier whose GST registration number has been verified against government records, confirming they are a legally registered business.",
    category: "Trust & Compliance",
    content: `A GST verified vendor is a supplier whose GSTIN (Goods and Services Tax Identification Number) has been verified against the official GST database at gst.gov.in.

## Why GST Verification Matters

In India, any business with annual turnover above ₹40 Lakh (₹20 Lakh for services) is required to register for GST. A GST number confirms:
- The business is legally registered in India
- They file tax returns (indicates active business)
- They can issue valid GST invoices (important for input tax credit)
- Their business name and state match their claims

## How to Verify a GST Number Yourself

1. Visit gst.gov.in → Search Taxpayer → Search by GSTIN
2. Enter the supplier's GSTIN
3. Verify: Legal name, Trade name, Registration date, Status (Active/Cancelled), State

## Red Flags in GST Verification

- Status shows "Cancelled" — business may have shut down
- Registration date is very recent (< 6 months) for a supplier claiming years of experience
- State mismatch — claiming to be from Gujarat but GST shows Maharashtra
- Name mismatch — invoice name differs from GST registration

## GST Verification on A TO Z Machines

All vendors on A TO Z Machines are required to submit their GST number during registration. Our admin team manually verifies it before approving the vendor profile. The "GST Verified" badge on vendor profiles confirms this check has been completed.`,
    relatedTerms: ["what-is-rfq", "factory-acceptance-test"],
    relatedCategories: ["cnc-machines", "packaging-machines"],
  },
  {
    slug: "screw-compressor-vs-piston-compressor",
    term: "Screw Compressor vs Piston Compressor — Which Should You Buy?",
    shortDef: "Screw compressors are better for continuous heavy-duty use; piston compressors suit intermittent or lighter duty applications.",
    category: "Compressors",
    content: `Choosing between a screw compressor and a piston (reciprocating) compressor is one of the most common dilemmas for plant managers. Here's a detailed comparison.

## How They Work

**Screw compressor**: Two interlocking helical rotors trap and compress air continuously. No reciprocating motion — smooth, vibration-free operation.

**Piston compressor**: A piston moves back and forth in a cylinder, drawing in and compressing air in strokes. Simpler mechanism, lower cost.

## Head-to-Head Comparison

| Feature | Screw Compressor | Piston Compressor |
|---------|-----------------|-------------------|
| Duty cycle | 100% continuous | 50–70% (needs cooling) |
| Air quality | Oil-injected or oil-free | Generally oil-injected |
| Energy efficiency | Better with VFD | Less efficient |
| Noise level | Lower (60–70 dB) | Higher (75–85 dB) |
| Maintenance | Lower (longer intervals) | Higher (more wear parts) |
| Initial cost | Higher | Lower |
| HP range | 5–500 HP | 1–100 HP |
| Vibration | Low (balanced rotors) | High (reciprocating) |

## When to Choose Screw

- Continuous production requiring air 24/7
- Sensitive environments (cleanrooms, labs)
- Above 15 HP requirement
- When energy cost is a major concern (VFD screw saves 20–35%)

## When to Choose Piston

- Intermittent use (few hours/day)
- Small workshop or garage
- Budget is the primary constraint
- Below 10 HP requirement

## Price Comparison in India

| Type | 10 HP | 25 HP | 50 HP |
|------|-------|-------|-------|
| Piston | ₹60K–1L | ₹1.5–2.5L | ₹3–5L |
| Screw | ₹1.5–2.5L | ₹3–5L | ₹6–10L |`,
    relatedTerms: ["what-is-rfq", "lead-time"],
    relatedCategories: ["compressors"],
  },
];

// ─── Comparison Pages ─────────────────────────────────────────────────────────

export interface ComparisonPage {
  slug: string;
  title: string;
  shortDesc: string;
  machineA: string;
  machineB: string;
  categoryA: string;
  categoryB: string;
  content: string;
}

export const COMPARISONS: ComparisonPage[] = [
  {
    slug: "cnc-machine-vs-conventional-lathe",
    title: "CNC Machine vs Conventional Lathe — Which is Right for Your Workshop?",
    shortDesc: "CNC lathes offer precision and repeatability for production; conventional lathes suit toolrooms and low-volume bespoke work.",
    machineA: "CNC Machine",
    machineB: "Conventional Lathe",
    categoryA: "cnc-machines",
    categoryB: "lathe-machines",
    content: `## Overview

Choosing between a CNC machine and a conventional lathe is a fundamental decision for any machining workshop. The right choice depends on your production volume, budget, and workforce skills.

## Key Differences

| Feature | CNC Machine | Conventional Lathe |
|---------|-------------|-------------------|
| Accuracy | ±0.001–0.01mm | ±0.02–0.05mm |
| Repeatability | Excellent (same every time) | Operator-dependent |
| Setup time | Longer (programming) | Shorter |
| Operator skill | CNC programming | Manual machining |
| Production volume | High volume ideal | Low volume, prototypes |
| Cost | ₹5–30 Lakh | ₹50K–5 Lakh |
| Complexity of parts | Complex, multi-feature | Simple to medium |

## When CNC Wins

- Batch sizes above 10 pieces
- Tight tolerances (±0.01mm or tighter)
- Complex profiles, threading, grooving in one setup
- Consistent quality needed across large batches
- Overnight/lights-out production required

## When Conventional Lathe Wins

- One-off repairs and prototype work
- Simple turning where CNC programming overhead isn't justified
- Budget constraints (conventional lathes cost 5–10× less)
- Remote locations where CNC technicians aren't available

## Total Cost of Ownership

A CNC lathe costs more to buy but produces more parts per hour, reducing cost per piece in production. For batches above 50 pieces, CNC almost always wins on cost per part.

## Recommendation

**Start with conventional** if you do repair work, prototypes, or small batches. **Go CNC** if you have regular production orders with repeating part numbers.`,
  },
  {
    slug: "hydraulic-press-vs-pneumatic-press",
    title: "Hydraulic Press vs Pneumatic Press — Comparison Guide for Buyers",
    shortDesc: "Hydraulic presses offer higher force and stroke control; pneumatic presses are faster and cleaner for lighter applications.",
    machineA: "Hydraulic Press",
    machineB: "Pneumatic Press",
    categoryA: "press-machines",
    categoryB: "press-machines",
    content: `## Overview

Both hydraulic and pneumatic presses use fluid pressure to generate force, but they use different media (oil vs air) and have different characteristics suited to different applications.

## Technical Comparison

| Feature | Hydraulic Press | Pneumatic Press |
|---------|----------------|-----------------|
| Force range | 1 ton – 5,000+ tons | Up to 30 tons |
| Force control | Precise, variable | Limited control |
| Speed | Slower | Faster (high SPM) |
| Stroke control | Excellent | Limited |
| Cleanliness | Oil leak risk | Clean (air) |
| Energy | Higher operating cost | Lower cost |
| Cost | Higher | Lower |
| Maintenance | Oil changes, seals | Simpler |

## Best Use Cases

**Hydraulic press:**
- Deep drawing operations
- Large-tonnage forming (100–5000 ton)
- Applications requiring precise force/stroke control
- Forging, powder compaction, rubber moulding

**Pneumatic press:**
- Light assembly operations (pressing bearings, pins)
- Spot welding assist
- Labelling and marking
- High-speed, low-force repetitive operations

## Price in India

- Pneumatic press (5–20 ton): ₹50K–3 Lakh
- Hydraulic press (50 ton): ₹5–10 Lakh
- Hydraulic press (200 ton): ₹15–35 Lakh

## The Bottom Line

If you need more than 30 tons of force, you need hydraulic. For light, fast, clean applications under 20 tons, pneumatic is simpler and cheaper to operate.`,
  },
  {
    slug: "mig-welding-vs-tig-welding",
    title: "MIG Welding vs TIG Welding — Which Process for Your Application?",
    shortDesc: "MIG is faster and easier for structural steel; TIG produces cleaner, stronger welds for stainless, aluminium, and precision work.",
    machineA: "MIG Welding",
    machineB: "TIG Welding",
    categoryA: "welding-equipment",
    categoryB: "welding-equipment",
    content: `## Overview

MIG (Metal Inert Gas) and TIG (Tungsten Inert Gas) are the two most common welding processes in industrial manufacturing. Choosing the right one depends on your material, weld quality needs, and production speed requirements.

## Process Comparison

| Feature | MIG Welding | TIG Welding |
|---------|-------------|-------------|
| Speed | Fast | Slow |
| Skill required | Lower | High |
| Material range | Steel, SS, Aluminium | All metals including thin gauge |
| Weld quality | Good | Excellent |
| Spatter | Some | None |
| Automation | Easy | Difficult |
| Equipment cost | ₹15K–2 Lakh | ₹30K–3 Lakh |
| Filler metal | Continuous wire | Separate filler rod (manual) |
| Shielding gas | CO2, Argon mix | Pure Argon |

## When to Use MIG

- Structural steel fabrication
- Automotive body repair and manufacturing
- Heavy plate welding
- Production environments needing speed
- Robotic welding integration

## When to Use TIG

- Stainless steel (food, pharma, chemical industries)
- Aluminium welding
- Thin gauge sheet metal
- Pipe welding with full penetration requirement
- Aerospace and precision components where appearance matters

## Cost Comparison in India

| Equipment | MIG | TIG |
|-----------|-----|-----|
| Basic machine | ₹15K–50K | ₹30K–1.5 Lakh |
| Industrial grade | ₹80K–2 Lakh | ₹1–3 Lakh |
| Robotic cell | ₹15–50 Lakh | ₹20–80 Lakh |

## Recommendation

Use MIG for speed and volume. Use TIG when weld quality, appearance, or material compatibility requires it. Many shops have both — MIG for structural work, TIG for finishing or special materials.`,
  },
  {
    slug: "belt-conveyor-vs-roller-conveyor",
    title: "Belt Conveyor vs Roller Conveyor — Which is Right for Your Plant?",
    shortDesc: "Belt conveyors handle irregular, fragile items smoothly; roller conveyors suit heavy, rigid loads with lower maintenance.",
    machineA: "Belt Conveyor",
    machineB: "Roller Conveyor",
    categoryA: "conveyor-systems",
    categoryB: "conveyor-systems",
    content: `## Overview

Belt and roller conveyors are the two most common material handling solutions in Indian manufacturing and warehousing. The right choice depends on your product, environment, and budget.

## Technical Comparison

| Feature | Belt Conveyor | Roller Conveyor |
|---------|--------------|-----------------|
| Product type | Any — loose, irregular, fragile | Rigid products with flat base |
| Speed control | Easy with VFD | Possible but limited |
| Incline capability | Yes (up to 30°) | Limited (gravity roller) |
| Noise | Low | Moderate |
| Maintenance | Belt replacement (periodic) | Bearing/roller replacement |
| Cleanliness | Food-grade belts available | Harder to clean |
| Cost | Moderate | Lower (gravity) |

## Best Applications

**Belt conveyor:**
- Food and pharmaceutical (hygienic belts)
- Bags, boxes, irregular shapes
- Inclined or declined transport
- Sorting and accumulation systems

**Roller conveyor:**
- Heavy cartons, pallets, drums
- Warehouse order picking
- Gravity flow (no motor needed for flat/slight decline)
- Assembly lines with operator stations

## Price in India

- Belt conveyor: ₹8,000–25,000/meter (depending on width and load)
- Gravity roller conveyor: ₹3,000–8,000/meter
- Powered roller conveyor: ₹6,000–15,000/meter

## Recommendation

Choose belt for fragile or irregular products, food/pharma environments, or inclined transport. Choose roller for heavy rigid loads, warehousing, and where lower cost is the priority.`,
  },
  {
    slug: "fiber-laser-vs-co2-laser-cutting",
    title: "Fiber Laser vs CO2 Laser Cutting Machine — Complete Comparison",
    shortDesc: "Fiber lasers excel at cutting metals faster with lower running costs; CO2 lasers are better for non-metals like acrylic and wood.",
    machineA: "Fiber Laser",
    machineB: "CO2 Laser",
    categoryA: "sheet-metal",
    categoryB: "sheet-metal",
    content: `## Overview

Fiber laser and CO2 laser cutting machines have different beam generation technologies that make them suited to very different applications. For industrial metal cutting in India, fiber laser has largely replaced CO2.

## Technology Comparison

| Feature | Fiber Laser | CO2 Laser |
|---------|-------------|-----------|
| Wavelength | 1,064 nm | 10,600 nm |
| Metal cutting | Excellent | Good |
| Non-metal cutting | Poor | Excellent |
| Cutting speed | 2–3× faster on thin metals | Slower |
| Running cost | Lower (no laser gas) | Higher (CO2 gas) |
| Maintenance | Lower (solid state) | Higher (gas tubes, mirrors) |
| Initial cost | Higher | Lower for equivalent power |
| Reflective metals | Yes (Copper, Brass, Aluminium) | Difficult |
| Electrical efficiency | ~30% wall-plug | ~10% wall-plug |

## Best Materials

**Fiber laser:** MS, SS, Aluminium, Copper, Brass, Titanium (all metals)
**CO2 laser:** Acrylic, wood, MDF, rubber, leather, glass etching, some plastics

## Price in India

| Power | Fiber Laser | CO2 Laser |
|-------|-------------|-----------|
| 1 kW | ₹30–40 Lakh | ₹15–25 Lakh |
| 2–3 kW | ₹45–70 Lakh | ₹25–40 Lakh |
| 6–10 kW | ₹80–1.5 Crore | Not common |

## Recommendation

**For metal fabrication shops:** Fiber laser is the clear choice. Better speed, lower running cost, and can cut reflective metals.

**For signage, advertising, or mixed material shops:** CO2 still makes sense for non-metal cutting.

Almost all new industrial sheet metal shops in India are buying fiber laser — it has become the industry standard.`,
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function getCityBySlug(slug: string): SeoCity | undefined {
  return SEO_CITIES.find((c) => c.slug === slug);
}

export function getCountryBySlug(slug: string): SeoCountry | undefined {
  return SEO_COUNTRIES.find((c) => c.slug === slug);
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getStateBySlug(slug: string): SeoState | undefined {
  return SEO_STATES.find((s) => s.slug === slug);
}

export function getIndustryBySlug(slug: string): SeoIndustry | undefined {
  return SEO_INDUSTRIES.find((i) => i.slug === slug);
}

export function getGlossaryTermBySlug(slug: string): GlossaryTerm | undefined {
  return GLOSSARY_TERMS.find((t) => t.slug === slug);
}

export function getComparisonBySlug(slug: string): ComparisonPage | undefined {
  return COMPARISONS.find((c) => c.slug === slug);
}
