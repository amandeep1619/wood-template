import { Service } from "@/types";

export const services: Service[] = [
  {
    id: "1",
    slug: "custom-furniture",
    title: "Custom Furniture",
    shortDescription: "Bespoke pieces handcrafted to your exact specifications.",
    description:
      "Our custom furniture service transforms your vision into heirloom-quality pieces. Every item is handcrafted by master artisans using premium hardwoods, traditional joinery techniques, and meticulous hand-finishing. From a single statement chair to an entire room's worth of bespoke cabinetry, we bring unmatched craftsmanship to every project.",
    icon: "Armchair",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    category: "furniture",
    startingPrice: "$2,500",
    features: [
      "Hand-selected premium hardwoods",
      "Custom dimensions & configurations",
      "Traditional mortise & tenon joinery",
      "Hand-applied oil and wax finishes",
      "Dovetail drawer construction",
      "25-year structural warranty",
    ],
    benefits: [
      {
        title: "Perfectly Sized",
        description:
          "Every piece is built to your exact measurements, fitting your space like it was always meant to be there.",
      },
      {
        title: "Lifetime Investment",
        description:
          "Handcrafted with heirloom-quality joinery, our furniture is built to outlast generations.",
      },
      {
        title: "Unique to You",
        description:
          "Choose from hundreds of wood species, finishes, and hardware options for a truly one-of-a-kind piece.",
      },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
      "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=800&q=80",
    ],
    faqs: [
      {
        question: "How long does a custom furniture piece take?",
        answer:
          "Most custom pieces require 8–14 weeks from final design approval to delivery. Complex or large commissions may take longer. We'll give you a precise timeline during consultation.",
      },
      {
        question: "Can I see the wood before you start building?",
        answer:
          "Absolutely. We invite every client to our wood selection studio to hand-pick the exact boards that will become their piece.",
      },
      {
        question: "Do you offer any warranty?",
        answer:
          "All custom furniture comes with a 25-year structural warranty and a 5-year finish warranty. We also offer a lifetime refinishing service.",
      },
    ],
    process: [
      {
        step: 1,
        title: "Consultation",
        description: "We discuss your vision, needs, space, and budget.",
        icon: "MessageSquare",
        duration: "1–2 hours",
      },
      {
        step: 2,
        title: "Design & Quote",
        description:
          "Our designers produce detailed drawings and a transparent quote.",
        icon: "PenTool",
        duration: "3–5 days",
      },
      {
        step: 3,
        title: "Crafting",
        description:
          "Master artisans build your piece in our climate-controlled workshop.",
        icon: "Hammer",
        duration: "8–12 weeks",
      },
      {
        step: 4,
        title: "Delivery & Install",
        description: "White-glove delivery and professional installation.",
        icon: "Truck",
        duration: "1 day",
      },
    ],
  },
  {
    id: "2",
    slug: "kitchen-cabinets",
    title: "Kitchen Cabinets",
    shortDescription: "Precision-crafted cabinetry that elevates your kitchen.",
    description:
      "A kitchen is the heart of every home, and the cabinetry defines its character. We design and build custom kitchen cabinets that maximize storage, celebrate fine joinery, and stand up to decades of daily use. From sleek, handle-free Shaker panels to ornate traditional frames, every cabinet is built to exact specifications.",
    icon: "Layout",
    image:
      "https://images.unsplash.com/photo-1556909114-44e3e9399a2e?w=800&q=80",
    category: "kitchen",
    startingPrice: "$8,000",
    features: [
      "Solid wood face frames and doors",
      "Soft-close hinges and drawer slides",
      "Custom interior organization",
      "Dovetail-constructed drawers",
      "Water-resistant finishing",
      "Island and peninsula design",
    ],
    benefits: [
      {
        title: "Maximum Storage",
        description:
          "Custom sizing means every inch of your kitchen is used efficiently — no wasted corners or awkward gaps.",
      },
      {
        title: "Premium Hardware",
        description:
          "We partner with Blum and Hettich for hardware that glides silently for years of effortless use.",
      },
      {
        title: "Full Design Service",
        description:
          "Our kitchen designers create 3D renderings before a single board is cut, so you see exactly what you're getting.",
      },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1556909114-44e3e9399a2e?w=800&q=80",
      "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=80",
    ],
    faqs: [
      {
        question: "Do you handle the full kitchen renovation or just cabinets?",
        answer:
          "We specialize in the woodwork — cabinetry, islands, and pantries. We work closely with your contractor for plumbing, electrical, and countertop installation.",
      },
      {
        question: "What wood species do you recommend for kitchens?",
        answer:
          "White oak, hard maple, and cherry are our most popular choices for their durability and grain character. We also work with painted MDF for a clean modern look.",
      },
    ],
    process: [],
  },
  {
    id: "3",
    slug: "interior-woodwork",
    title: "Interior Woodwork",
    shortDescription:
      "Architectural millwork that defines rooms with character.",
    description:
      "Transform ordinary rooms into extraordinary spaces with our bespoke interior woodwork. From coffered ceilings and wainscotting to built-in libraries and window seats, we craft architectural elements that give homes their soul. Every profile, every panel, every joint is considered as part of the room's larger story.",
    icon: "Home",
    image:
      "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&q=80",
    category: "interior",
    startingPrice: "$5,000",
    features: [
      "Crown molding & casings",
      "Coffered & beamed ceilings",
      "Wainscotting & board-and-batten",
      "Built-in bookcases & shelving",
      "Window seats & benches",
      "Fireplace mantels",
    ],
    benefits: [
      {
        title: "Architectural Character",
        description:
          "Millwork is what separates a house from a home. Our work adds the kind of detail that makes people stop in doorways.",
      },
      {
        title: "Adds Real Value",
        description:
          "Quality architectural woodwork consistently returns 100–150% of its cost in property value.",
      },
      {
        title: "Seamless Integration",
        description:
          "We match existing profiles, paint grades, and wood tones so new work looks like it's always been there.",
      },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&q=80",
    ],
    faqs: [],
    process: [],
  },
  {
    id: "4",
    slug: "office-furniture",
    title: "Office Furniture",
    shortDescription: "Executive-grade workspaces that command respect.",
    description:
      "A well-designed workspace fuels productivity and communicates professionalism. We build executive desks, custom workstations, conference tables, and credenzas that reflect your brand's values and your personal standards. From private home offices to corporate boardrooms, we deliver boardroom-quality furniture on a custom timeline.",
    icon: "Briefcase",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    category: "office",
    startingPrice: "$3,500",
    features: [
      "Executive desks & standing desks",
      "Custom conference tables",
      "Built-in storage & credenzas",
      "Cable management integration",
      "Acoustic panel walls",
      "Reception area millwork",
    ],
    benefits: [
      {
        title: "Brand Alignment",
        description:
          "Your office furniture should reflect your brand identity. We work with your brand guidelines to create cohesive spaces.",
      },
      {
        title: "Ergonomic Design",
        description:
          "Every desk, chair rail height, and monitor position is considered for long-term comfort and productivity.",
      },
      {
        title: "Corporate-Grade Durability",
        description:
          "Built to withstand heavy daily commercial use with finishes that resist scratching and UV fading.",
      },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
      "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80",
    ],
    faqs: [],
    process: [],
  },
  {
    id: "5",
    slug: "renovation-woodwork",
    title: "Renovation Woodwork",
    shortDescription:
      "Complete renovation carpentry from framing to fine finish.",
    description:
      "Whether you're gutting a kitchen, reimagining a basement, or opening up a floor plan, our renovation carpentry team handles every wood element from rough framing to the finest trim work. We coordinate closely with your architect, GC, and trades to deliver seamless execution on complex projects.",
    icon: "Wrench",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
    category: "renovation",
    startingPrice: "$15,000",
    features: [
      "Structural rough carpentry",
      "Subfloor installation & leveling",
      "Stair construction & railing",
      "Door & window installation",
      "Trim, casing & base installation",
      "Project management",
    ],
    benefits: [
      {
        title: "Single-Point Accountability",
        description:
          "One team for all your woodwork needs means no finger-pointing between trades and a cleaner finish.",
      },
      {
        title: "On-Time Delivery",
        description:
          "Our dedicated project managers keep your renovation on schedule, coordinating across all trades.",
      },
      {
        title: "Code Compliance",
        description:
          "All structural work is engineered, permitted, and inspected to meet or exceed local building codes.",
      },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
      "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=800&q=80",
      "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800&q=80",
      "https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=800&q=80",
    ],
    faqs: [],
    process: [],
  },
  {
    id: "6",
    slug: "wood-restoration",
    title: "Wood Restoration",
    shortDescription:
      "Breathing life back into antique and damaged woodwork.",
    description:
      "Great woodwork deserves a second life. Our restoration specialists revive antique furniture, original hardwood floors, historic millwork, and damaged cabinetry using authentic period techniques alongside modern conservation science. We strip, stabilize, repair, and refinish with a commitment to preserving the piece's original character and patina.",
    icon: "RefreshCw",
    image:
      "https://images.unsplash.com/photo-1526142684086-7ebd69df27a5?w=800&q=80",
    category: "restoration",
    startingPrice: "$500",
    features: [
      "Antique furniture restoration",
      "Hardwood floor refinishing",
      "Water & fire damage repair",
      "Period-correct wood matching",
      "Structural consolidation",
      "Museum-quality conservation",
    ],
    benefits: [
      {
        title: "Preserve History",
        description:
          "Antique pieces carry stories. Our conservators restore them with minimal intervention to honor their original makers.",
      },
      {
        title: "Cost-Effective",
        description:
          "Restoring an antique piece typically costs 20–40% of replacing it with equivalent new custom work.",
      },
      {
        title: "Authentic Results",
        description:
          "We source period-correct materials and use traditional finishing techniques to make repairs invisible.",
      },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1526142684086-7ebd69df27a5?w=800&q=80",
      "https://images.unsplash.com/photo-1581070651045-15ef9b49da6e?w=800&q=80",
      "https://images.unsplash.com/photo-1594814974784-fa5e0a01e2e7?w=800&q=80",
      "https://images.unsplash.com/photo-1567958451986-2de427a4a0be?w=800&q=80",
    ],
    faqs: [],
    process: [],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
