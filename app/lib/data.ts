// ─── Types ───────────────────────────────────────────────────────────────────

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: "buyer" | "vendor" | "admin";
  companyName?: string;
  phone?: string;
  createdAt: string;
}

export interface VendorProfile {
  id: string;
  userId: string;
  companyName: string;
  description: string;
  city: string;
  state: string;
  phone: string;
  website?: string;
  gstNumber?: string;
  establishedYear?: number;
  categories: string[];
  isApproved: boolean;
  initial: string;
  color: string;
}

export interface MachineListing {
  id: string;
  vendorId: string;
  vendorName: string;
  vendorCity: string;
  categorySlug: string;
  categoryName: string;
  title: string;
  description: string;
  priceMin?: number;
  priceMax?: number;
  leadTimeDays?: number;
  specs: Record<string, string>;
  isApproved: boolean;
  isActive: boolean;
  createdAt: string;
}

export interface RFQ {
  id: string;
  buyerId: string;
  buyerName: string;
  categorySlug: string;
  categoryName: string;
  title: string;
  description: string;
  quantity: number;
  unit: string;
  budgetMin?: number;
  budgetMax?: number;
  deliveryCity: string;
  deliveryDeadline?: string;
  status: "open" | "closed" | "cancelled";
  createdAt: string;
  expiresAt: string;
}

export interface Quote {
  id: string;
  rfqId: string;
  vendorId: string;
  vendorName: string;
  vendorCity: string;
  price: number;
  currency: string;
  leadTimeDays: number;
  validityDays: number;
  notes: string;
  status: "submitted" | "shortlisted" | "accepted" | "rejected";
  submittedAt: string;
}

// ─── Categories ───────────────────────────────────────────────────────────────

export const CATEGORIES = [
  { icon: "⚙️", name: "CNC Machines", slug: "cnc-machines", count: 420 },
  { icon: "📦", name: "Packaging Machines", slug: "packaging-machines", count: 310 },
  { icon: "🏗️", name: "Material Handling", slug: "material-handling", count: 280 },
  { icon: "🔧", name: "Hydraulic Systems", slug: "hydraulic-systems", count: 190 },
  { icon: "🔩", name: "Lathe Machines", slug: "lathe-machines", count: 350 },
  { icon: "⚡", name: "Welding Equipment", slug: "welding-equipment", count: 240 },
  { icon: "🧱", name: "Sheet Metal", slug: "sheet-metal", count: 175 },
  { icon: "🌀", name: "Compressors", slug: "compressors", count: 160 },
  { icon: "🔨", name: "Press Machines", slug: "press-machines", count: 210 },
  { icon: "🏭", name: "Conveyor Systems", slug: "conveyor-systems", count: 145 },
  { icon: "💧", name: "Water Treatment", slug: "water-treatment", count: 130 },
  { icon: "🔍", name: "Testing Equipment", slug: "testing-equipment", count: 120 },
];

// ─── Seed Data ────────────────────────────────────────────────────────────────

export const SEED_USERS: User[] = [
  {
    id: "u1",
    email: "buyer@demo.com",
    password: "demo123",
    name: "Amit Patel",
    role: "buyer",
    companyName: "Patel Engineering",
    phone: "9876543210",
    createdAt: "2025-01-15T10:00:00Z",
  },
  {
    id: "u2",
    email: "vendor@demo.com",
    password: "demo123",
    name: "Suresh Kumar",
    role: "vendor",
    companyName: "Rajkot Engineering Works",
    phone: "9876543211",
    createdAt: "2025-01-10T10:00:00Z",
  },
  {
    id: "u3",
    email: "vendor2@demo.com",
    password: "demo123",
    name: "Priya Sharma",
    role: "vendor",
    companyName: "Coimbatore Machine Tools",
    phone: "9876543212",
    createdAt: "2025-01-12T10:00:00Z",
  },
  {
    id: "u4",
    email: "admin@demo.com",
    password: "demo123",
    name: "Admin User",
    role: "admin",
    createdAt: "2025-01-01T10:00:00Z",
  },
  {
    id: "u5",
    email: "vendor3@demo.com",
    password: "demo123",
    name: "Ravi Gupta",
    role: "vendor",
    companyName: "Pune Hydraulics Pvt Ltd",
    phone: "9876543213",
    createdAt: "2025-01-08T10:00:00Z",
  },
  {
    id: "u6",
    email: "vendor4@demo.com",
    password: "demo123",
    name: "Manpreet Singh",
    role: "vendor",
    companyName: "Ludhiana Auto Pack",
    phone: "9876543214",
    createdAt: "2025-01-05T10:00:00Z",
  },
];

export const SEED_VENDORS: VendorProfile[] = [
  {
    id: "v1",
    userId: "u2",
    companyName: "Rajkot Engineering Works",
    description:
      "Leading manufacturer of CNC machines and lathe machines with 20+ years of experience. ISO 9001:2015 certified. Serving clients across Gujarat, Maharashtra, and Rajasthan.",
    city: "Rajkot",
    state: "Gujarat",
    phone: "9876543211",
    website: "www.rajkoteng.com",
    gstNumber: "24AAAAA0000A1Z5",
    establishedYear: 2005,
    categories: ["cnc-machines", "lathe-machines"],
    isApproved: true,
    initial: "R",
    color: "bg-blue-800",
  },
  {
    id: "v2",
    userId: "u3",
    companyName: "Coimbatore Machine Tools",
    description:
      "Specialized in press machines and sheet metal forming equipment. 25+ years in business with clients in automotive, aerospace, and electronics industries.",
    city: "Coimbatore",
    state: "Tamil Nadu",
    phone: "9876543212",
    website: "www.cbetools.com",
    gstNumber: "33BBBBB0000B1Z5",
    establishedYear: 1998,
    categories: ["press-machines", "sheet-metal"],
    isApproved: true,
    initial: "C",
    color: "bg-green-700",
  },
  {
    id: "v3",
    userId: "u5",
    companyName: "Pune Hydraulics Pvt Ltd",
    description:
      "Premier supplier of hydraulic systems and industrial compressors. Custom hydraulic solutions for manufacturing plants. ISO certified with 500+ installations.",
    city: "Pune",
    state: "Maharashtra",
    phone: "9876543213",
    website: "www.punehydraulics.com",
    gstNumber: "27CCCCC0000C1Z5",
    establishedYear: 2010,
    categories: ["hydraulic-systems", "compressors"],
    isApproved: true,
    initial: "P",
    color: "bg-orange-500",
  },
  {
    id: "v4",
    userId: "u6",
    companyName: "Ludhiana Auto Pack",
    description:
      "Manufacturer and exporter of packaging machines and conveyor systems. Serving FMCG, pharma, and food industries for 20+ years across India.",
    city: "Ludhiana",
    state: "Punjab",
    phone: "9876543214",
    website: "www.ludhianaautopack.com",
    gstNumber: "03DDDDD0000D1Z5",
    establishedYear: 2003,
    categories: ["packaging-machines", "conveyor-systems"],
    isApproved: true,
    initial: "L",
    color: "bg-purple-700",
  },
];

export const SEED_LISTINGS: MachineListing[] = [
  {
    id: "m1",
    vendorId: "v1",
    vendorName: "Rajkot Engineering Works",
    vendorCity: "Rajkot, Gujarat",
    categorySlug: "cnc-machines",
    categoryName: "CNC Machines",
    title: "CNC Vertical Machining Center VMC-850",
    description:
      "High-precision vertical machining center with 3-axis control, suitable for mold making, automotive parts, and precision components. Fanuc CNC controller.",
    priceMin: 1500000,
    priceMax: 2500000,
    leadTimeDays: 45,
    specs: {
      "Table Size": "850 x 450 mm",
      "X/Y/Z Travel": "800/450/500 mm",
      "Spindle Speed": "8000 RPM",
      "Tool Magazine": "24 tools",
      "Controller": "Fanuc 0i-MF",
    },
    isApproved: true,
    isActive: true,
    createdAt: "2025-02-10T10:00:00Z",
  },
  {
    id: "m2",
    vendorId: "v1",
    vendorName: "Rajkot Engineering Works",
    vendorCity: "Rajkot, Gujarat",
    categorySlug: "lathe-machines",
    categoryName: "Lathe Machines",
    title: "CNC Lathe Machine TL-46",
    description:
      "Heavy-duty CNC lathe machine for turning operations. High rigidity construction with Fanuc controller. Ideal for batch production of shafts, pulleys, and flanges.",
    priceMin: 800000,
    priceMax: 1200000,
    leadTimeDays: 30,
    specs: {
      "Swing Over Bed": "460 mm",
      "Distance Between Centers": "1000 mm",
      "Spindle Speed": "3000 RPM",
      "Turret Stations": "8",
      "Controller": "Fanuc 0i-TF",
    },
    isApproved: true,
    isActive: true,
    createdAt: "2025-02-12T10:00:00Z",
  },
  {
    id: "m3",
    vendorId: "v2",
    vendorName: "Coimbatore Machine Tools",
    vendorCity: "Coimbatore, Tamil Nadu",
    categorySlug: "press-machines",
    categoryName: "Press Machines",
    title: "Hydraulic Press Machine HP-200",
    description:
      "200-ton hydraulic press for stamping, forming, and deep drawing operations. Four-column design for uniform pressure distribution. PLC controlled.",
    priceMin: 600000,
    priceMax: 900000,
    leadTimeDays: 35,
    specs: {
      "Capacity": "200 Ton",
      "Table Size": "1200 x 1000 mm",
      "Stroke": "400 mm",
      "Daylight": "700 mm",
      "Control": "Siemens PLC",
    },
    isApproved: true,
    isActive: true,
    createdAt: "2025-02-08T10:00:00Z",
  },
  {
    id: "m4",
    vendorId: "v2",
    vendorName: "Coimbatore Machine Tools",
    vendorCity: "Coimbatore, Tamil Nadu",
    categorySlug: "sheet-metal",
    categoryName: "Sheet Metal",
    title: "CNC Press Brake PB-110",
    description:
      "110-ton CNC press brake for precision bending of sheet metal. Y1/Y2 axis synchronization for accurate angle control. Delem DA-66T controller.",
    priceMin: 1200000,
    priceMax: 1800000,
    leadTimeDays: 40,
    specs: {
      "Bending Force": "110 Ton",
      "Bending Length": "3200 mm",
      "Stroke": "200 mm",
      "Back Gauge": "X, R axes",
      "Controller": "Delem DA-66T",
    },
    isApproved: true,
    isActive: true,
    createdAt: "2025-02-14T10:00:00Z",
  },
  {
    id: "m5",
    vendorId: "v3",
    vendorName: "Pune Hydraulics Pvt Ltd",
    vendorCity: "Pune, Maharashtra",
    categorySlug: "hydraulic-systems",
    categoryName: "Hydraulic Systems",
    title: "Industrial Hydraulic Power Pack 30HP",
    description:
      "Custom hydraulic power pack unit with 30HP motor, variable displacement pump, and complete control panel. Suitable for presses, clamps, and lifting systems.",
    priceMin: 180000,
    priceMax: 350000,
    leadTimeDays: 20,
    specs: {
      "Motor Power": "30 HP",
      "Pump Type": "Variable Displacement",
      "Tank Capacity": "200 Litres",
      "Max Pressure": "350 Bar",
      "Flow Rate": "60 LPM",
    },
    isApproved: true,
    isActive: true,
    createdAt: "2025-02-06T10:00:00Z",
  },
  {
    id: "m6",
    vendorId: "v3",
    vendorName: "Pune Hydraulics Pvt Ltd",
    vendorCity: "Pune, Maharashtra",
    categorySlug: "compressors",
    categoryName: "Compressors",
    title: "Screw Air Compressor SAC-50",
    description:
      "50HP screw air compressor with integrated dryer and receiver tank. Energy-efficient VFD drive. Ideal for auto industry, pharma, and general manufacturing.",
    priceMin: 350000,
    priceMax: 550000,
    leadTimeDays: 15,
    specs: {
      "Motor Power": "50 HP",
      "Free Air Delivery": "250 CFM",
      "Working Pressure": "10 Bar",
      "Receiver Tank": "500 Litres",
      "Drive": "VFD",
    },
    isApproved: true,
    isActive: true,
    createdAt: "2025-02-09T10:00:00Z",
  },
  {
    id: "m7",
    vendorId: "v4",
    vendorName: "Ludhiana Auto Pack",
    vendorCity: "Ludhiana, Punjab",
    categorySlug: "packaging-machines",
    categoryName: "Packaging Machines",
    title: "Automatic Pouch Packing Machine PP-500",
    description:
      "High-speed automatic pouch packing machine for granules, powder, and liquid products. 500 pouches/hour capacity. Servo-driven film feeding.",
    priceMin: 250000,
    priceMax: 450000,
    leadTimeDays: 25,
    specs: {
      "Speed": "500 pouches/hour",
      "Pouch Size": "50x70 to 200x300 mm",
      "Film Width": "Up to 420 mm",
      "Power": "3.5 kW",
      "Material": "SS 304",
    },
    isApproved: true,
    isActive: true,
    createdAt: "2025-02-11T10:00:00Z",
  },
  {
    id: "m8",
    vendorId: "v4",
    vendorName: "Ludhiana Auto Pack",
    vendorCity: "Ludhiana, Punjab",
    categorySlug: "conveyor-systems",
    categoryName: "Conveyor Systems",
    title: "Belt Conveyor System BC-10M",
    description:
      "10-meter belt conveyor system with variable speed drive. Heavy-duty frame suitable for automotive, FMCG, and logistics industries. Custom lengths available.",
    priceMin: 80000,
    priceMax: 200000,
    leadTimeDays: 18,
    specs: {
      "Length": "10 Meters (customizable)",
      "Belt Width": "600 mm",
      "Load Capacity": "500 kg/m",
      "Speed": "0.1 – 1.5 m/s",
      "Motor": "1.5 kW, VFD",
    },
    isApproved: true,
    isActive: true,
    createdAt: "2025-02-07T10:00:00Z",
  },
];

export const SEED_RFQS: RFQ[] = [
  {
    id: "r1",
    buyerId: "u1",
    buyerName: "Amit Patel",
    categorySlug: "cnc-machines",
    categoryName: "CNC Machines",
    title: "CNC VMC Machine for Mold Making",
    description:
      "We need a CNC vertical machining center for mold making. Minimum 4-axis preferred. Must have tool changer and good surface finish capability.",
    quantity: 2,
    unit: "units",
    budgetMin: 1500000,
    budgetMax: 2500000,
    deliveryCity: "Ahmedabad",
    deliveryDeadline: "2025-05-30",
    status: "open",
    createdAt: "2025-03-01T10:00:00Z",
    expiresAt: "2025-03-15T10:00:00Z",
  },
  {
    id: "r2",
    buyerId: "u1",
    buyerName: "Amit Patel",
    categorySlug: "hydraulic-systems",
    categoryName: "Hydraulic Systems",
    title: "Hydraulic Power Pack for Press Line",
    description:
      "Need hydraulic power pack unit for 3 press machines. Total capacity requirement is around 90HP. Custom configuration required.",
    quantity: 1,
    unit: "system",
    budgetMin: 400000,
    budgetMax: 800000,
    deliveryCity: "Surat",
    deliveryDeadline: "2025-04-30",
    status: "open",
    createdAt: "2025-03-05T10:00:00Z",
    expiresAt: "2025-03-19T10:00:00Z",
  },
  {
    id: "r3",
    buyerId: "u1",
    buyerName: "Amit Patel",
    categorySlug: "packaging-machines",
    categoryName: "Packaging Machines",
    title: "Automated Pouch Packing Line",
    description:
      "Looking for complete automated pouch packing solution for granular product. Required speed: minimum 800 pouches/hour.",
    quantity: 1,
    unit: "line",
    budgetMin: 500000,
    budgetMax: 1000000,
    deliveryCity: "Rajkot",
    deliveryDeadline: "2025-06-15",
    status: "closed",
    createdAt: "2025-02-15T10:00:00Z",
    expiresAt: "2025-03-01T10:00:00Z",
  },
];

export const SEED_QUOTES: Quote[] = [
  {
    id: "q1",
    rfqId: "r1",
    vendorId: "v1",
    vendorName: "Rajkot Engineering Works",
    vendorCity: "Rajkot, Gujarat",
    price: 1800000,
    currency: "INR",
    leadTimeDays: 45,
    validityDays: 30,
    notes:
      "We can provide VMC-850 with 4th axis attachment. Delivery includes installation and training. GST extra.",
    status: "shortlisted",
    submittedAt: "2025-03-02T14:00:00Z",
  },
  {
    id: "q2",
    rfqId: "r1",
    vendorId: "v2",
    vendorName: "Coimbatore Machine Tools",
    vendorCity: "Coimbatore, Tamil Nadu",
    price: 2100000,
    currency: "INR",
    leadTimeDays: 60,
    validityDays: 20,
    notes:
      "We offer imported brand VMC with better spindle speed. 1-year warranty included.",
    status: "submitted",
    submittedAt: "2025-03-03T10:00:00Z",
  },
  {
    id: "q3",
    rfqId: "r2",
    vendorId: "v3",
    vendorName: "Pune Hydraulics Pvt Ltd",
    vendorCity: "Pune, Maharashtra",
    price: 520000,
    currency: "INR",
    leadTimeDays: 25,
    validityDays: 15,
    notes:
      "Custom 90HP power pack with 3 separate circuits for each press. Includes control panel and all accessories.",
    status: "submitted",
    submittedAt: "2025-03-06T09:00:00Z",
  },
  {
    id: "q4",
    rfqId: "r3",
    vendorId: "v4",
    vendorName: "Ludhiana Auto Pack",
    vendorCity: "Ludhiana, Punjab",
    price: 750000,
    currency: "INR",
    leadTimeDays: 30,
    validityDays: 30,
    notes:
      "Complete packing line with 900 pouches/hour capacity. Includes infeed conveyor and rejection system.",
    status: "accepted",
    submittedAt: "2025-02-17T11:00:00Z",
  },
];

// ─── Storage Keys ─────────────────────────────────────────────────────────────

export const STORAGE_KEYS = {
  USERS: "atoz_users",
  VENDORS: "atoz_vendors",
  LISTINGS: "atoz_listings",
  RFQS: "atoz_rfqs",
  QUOTES: "atoz_quotes",
  CURRENT_USER: "atoz_current_user",
  SEEDED: "atoz_seeded",
};
