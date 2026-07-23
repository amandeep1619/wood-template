import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "1",
    slug: "hartwell-estate-library",
    title: "Hartwell Estate Library",
    shortDescription:
      "A floor-to-ceiling mahogany library with rolling ladder, coffered ceiling, and integrated bar.",
    description:
      "The Hartwell Estate called for a study that would anchor the entire home — a room that commanded attention and encouraged hours of quiet contemplation. We designed and built a 1,200 sq. ft. private library in rich Honduras mahogany, featuring 28-foot floor-to-ceiling bookshelves, a traditional coffered ceiling, and an integrated wet bar concealed behind panel doors.",
    challenge:
      "The ceiling height presented structural complexity — installing 28-foot continuous shelf units required custom steel backing concealed behind the woodwork, while maintaining the appearance of pure solid timber construction.",
    solution:
      "We engineered a proprietary hidden-steel-bracket system that provides structural support for the full shelf load while keeping the face of every shelf and pier in solid mahogany. The rolling brass ladder system is fully recessed into the ceiling cornice when not in use.",
    client: "The Hartwell Family",
    location: "Greenwich, CT",
    duration: "4 months",
    year: 2024,
    category: "residential",
    coverImage:
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&q=80",
      "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80",
    ],
    materials: [
      "Honduras Mahogany",
      "Brass hardware",
      "Hand-rubbed oil finish",
      "Reclaimed heart pine flooring",
    ],
    featured: true,
    serviceSlug: "interior-woodwork",
    testimonial: {
      id: "t1",
      name: "Catherine Hartwell",
      role: "Homeowner",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&q=80",
      rating: 5,
      text: "The library is quite simply the finest room in our home. The craftsmanship is on a level I didn't know was still possible. Every guest who walks in stops speaking mid-sentence.",
      projectSlug: "hartwell-estate-library",
    },
  },
  {
    id: "2",
    slug: "north-shore-kitchen",
    title: "North Shore Kitchen Transformation",
    shortDescription:
      "Full custom kitchen remodel with white oak cabinetry, integrated appliances, and barrel-vault island.",
    description:
      "A 600 sq. ft. kitchen gut renovation for a lakefront residence on Chicago's North Shore. The client wanted a kitchen that felt both professional-grade and deeply welcoming — a space where serious cooking happened alongside casual entertaining.",
    challenge:
      "The original kitchen had a structural beam running directly through the proposed island location, and the ceiling height varied by 8 inches across the kitchen due to a previous addition.",
    solution:
      "We designed the island as a barrel-vault feature that incorporated the beam as a visible architectural element rather than hiding it. The varying ceiling heights were addressed with stepped upper cabinets that used the height differential as a design feature.",
    client: "The Mercer Family",
    location: "Lake Forest, IL",
    duration: "3 months",
    year: 2024,
    category: "kitchen",
    coverImage:
      "https://images.unsplash.com/photo-1556909114-44e3e9399a2e?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1556909114-44e3e9399a2e?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=80",
      "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=800&q=80",
    ],
    materials: [
      "Rift-sawn white oak",
      "Calacatta marble",
      "Blum Legrabox drawers",
      "Lacanche range surround",
    ],
    featured: true,
    serviceSlug: "kitchen-cabinets",
    testimonial: {
      id: "t2",
      name: "James Mercer",
      role: "Homeowner",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
      rating: 5,
      text: "We've had three kitchens professionally designed over the years. This is the first one where we actually cook every meal at home. The functionality is extraordinary.",
      projectSlug: "north-shore-kitchen",
    },
  },
  {
    id: "3",
    slug: "axiom-capital-headquarters",
    title: "Axiom Capital Headquarters",
    shortDescription:
      "Executive boardroom and private offices for a $40B hedge fund in Midtown Manhattan.",
    description:
      "Axiom Capital required offices that communicated their firm's permanence, discipline, and understated power. We delivered a complete fit-out of their 12,000 sq. ft. Midtown suite, including a 30-seat conference table in book-matched walnut, 14 private offices with integrated credenzas, and a reception featuring a 40-foot feature wall.",
    challenge:
      "Manhattan high-rise construction meant every piece had to be built off-site in modular panels, transported on freight elevators, and assembled on-site without traditional woodworking tools — all in a 6-week installation window.",
    solution:
      "We developed a modular CNC-joinery system where every panel and component locks together with concealed hardware, achieving the same visual quality as traditional site-built work but in a fraction of the installation time.",
    client: "Axiom Capital Management",
    location: "New York, NY",
    duration: "5 months",
    year: 2023,
    category: "office",
    coverImage:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
      "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&q=80",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    ],
    materials: [
      "Book-matched American black walnut",
      "Brushed bronze hardware",
      "Acoustic fabric panels",
      "Integrated LED lighting",
    ],
    featured: true,
    serviceSlug: "office-furniture",
    testimonial: {
      id: "t3",
      name: "David Chen",
      role: "Managing Director",
      company: "Axiom Capital",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
      rating: 5,
      text: "When institutional clients walk into our boardroom, the room closes deals before a word is spoken. That's exactly what we needed.",
      projectSlug: "axiom-capital-headquarters",
    },
  },
  {
    id: "4",
    slug: "bellmore-dining-suite",
    title: "Bellmore Dining Suite",
    shortDescription:
      "12-person solid cherry dining table, sideboard, and custom china cabinet.",
    description:
      "The Bellmore family had hosted three generations of Sunday dinners on mismatched furniture. For their 40th anniversary, their adult children commissioned a complete dining suite — a table large enough for the whole family, a sideboard, and a china cabinet — all in American cherry that would age beautifully for another 40 years.",
    challenge:
      "American cherry is notoriously difficult to finish consistently across large panels because it darkens unevenly with UV exposure. The table's 12-foot top required a finish approach that would age evenly.",
    solution:
      "We UV-pre-aged all the cherry before finishing using a controlled tanning process, then sealed with a UV-protective oil-wax finish. The entire suite will develop a rich, consistent honey-brown patina over the decades.",
    client: "The Bellmore Family",
    location: "Boston, MA",
    duration: "10 weeks",
    year: 2024,
    category: "furniture",
    coverImage:
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
      "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=800&q=80",
    ],
    materials: [
      "American cherry",
      "Hand-cut mortise & tenon joints",
      "UV-stable oil-wax finish",
      "Hand-forged iron pulls",
    ],
    featured: true,
    serviceSlug: "custom-furniture",
    testimonial: {
      id: "t4",
      name: "Margaret Bellmore",
      role: "Homeowner",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
      rating: 5,
      text: "My grandchildren will eat Sunday dinners at this table with their own grandchildren. I know this because of how it's built.",
      projectSlug: "bellmore-dining-suite",
    },
  },
  {
    id: "5",
    slug: "westport-whole-home",
    title: "Westport Whole-Home Renovation",
    shortDescription:
      "Complete architectural woodwork package for a 6,200 sq. ft. colonial renovation.",
    description:
      "A comprehensive renovation of a 1920s colonial in Westport, CT — new staircase, all new trim throughout, wainscotting in formal rooms, built-in mudroom cabinetry, a butler's pantry, and a custom home office with floor-to-ceiling shelving.",
    challenge:
      "The home had settled unevenly over 100 years, meaning no walls, floors, or ceilings were plumb or level. Every piece of millwork had to be scribed to fit the building's idiosyncrasies.",
    solution:
      "We 3D-laser-scanned the entire interior before design, giving us accurate as-built dimensions and allowing us to pre-cut everything in the shop to within 1/16\" — significantly reducing on-site fitting time.",
    client: "The Thornton Family",
    location: "Westport, CT",
    duration: "6 months",
    year: 2023,
    category: "renovation",
    coverImage:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&q=80",
      "https://images.unsplash.com/photo-1581070651045-15ef9b49da6e?w=800&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
    ],
    materials: [
      "Poplar paint-grade millwork",
      "White oak floors",
      "Maple kitchen cabinetry",
      "Black walnut stair treads",
    ],
    featured: false,
    serviceSlug: "renovation-woodwork",
  },
  {
    id: "6",
    slug: "heirloom-secretary-desk",
    title: "Victorian Secretary Desk Restoration",
    shortDescription:
      "Complete museum-quality restoration of an 1875 English secretary desk.",
    description:
      "A stunning 1875 English secretary desk arrived at our workshop with significant water damage, a broken interior mechanism, missing veneer across 40% of the exterior, and a refinish job from the 1970s that had obscured the original figure. Our conservation team spent 8 weeks returning it to its 1875 condition.",
    challenge:
      "The original veneer was an extinct species of Cuban mahogany no longer available. We needed to source a period-correct material that would match the existing veneer's color, grain, and figure.",
    solution:
      "We sourced matched vintage Cuban mahogany veneer from a specialist dealer of salvaged period materials, ensuring a seamless match. The 1970s lacquer was carefully chemically stripped to reveal the original shellac beneath, which we then cleaned and revived.",
    client: "Private Collector",
    location: "Philadelphia, PA",
    duration: "8 weeks",
    year: 2024,
    category: "restoration",
    coverImage:
      "https://images.unsplash.com/photo-1526142684086-7ebd69df27a5?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1526142684086-7ebd69df27a5?w=800&q=80",
      "https://images.unsplash.com/photo-1581070651045-15ef9b49da6e?w=800&q=80",
      "https://images.unsplash.com/photo-1594814974784-fa5e0a01e2e7?w=800&q=80",
      "https://images.unsplash.com/photo-1567958451986-2de427a4a0be?w=800&q=80",
    ],
    materials: [
      "Salvaged Cuban mahogany veneer",
      "Period shellac finish",
      "Hand-cut replacement brass fittings",
      "Hide glue",
    ],
    featured: false,
    serviceSlug: "wood-restoration",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}
