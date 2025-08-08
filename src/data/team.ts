import { Team } from "@/lib/types";

const teamNames = [
  "Alpha Squad",
  "Beta Force",
  "Gamma Team",
  "Delta Unit",
  "Epsilon Group",
  "Zeta Division",
  "Eta Crew",
  "Theta Team",
  "Iota Squad",
  "Kappa Force",
  "Lambda Unit",
  "Mu Division",
  "Nu Team",
  "Xi Squad",
  "Omicron Group",
  "Pi Force",
  "Rho Unit",
  "Sigma Team",
  "Tau Squad",
  "Upsilon Division",
  "Phi Crew",
  "Chi Team",
  "Psi Squad",
  "Omega Force",
  "Innovation Hub",
  "Digital Warriors",
  "Tech Titans",
  "Code Crusaders",
  "Data Dynamos",
  "Cyber Champions",
  "Cloud Commanders",
  "API Architects",
  "DevOps Dragons",
  "Frontend Fighters",
  "Backend Builders",
  "Full Stack Force",
  "Mobile Masters",
  "Security Shields",
  "Analytics Aces",
  "Platform Pioneers",
  "Product Pros",
  "Design Dynamos",
  "UX Unicorns",
  "Marketing Mavericks",
  "Sales Stars",
  "Customer Champions",
  "Support Squad",
  "Operations Ops",
  "Finance Force",
  "HR Heroes",
  "Legal Lions",
  "Strategy Squad",
  "Research Rangers",
];

export const entities = [
  "Access Bank",
  "Zenith Bank",
  "First Bank of Nigeria",
  "United Bank for Africa (UBA)",
  "Guaranty Trust Bank (GTBank)",
  "Fidelity Bank",
  "Union Bank of Nigeria",
  "Stanbic IBTC Bank",
  "Ecobank Nigeria",
  "Sterling Bank",
  "Wema Bank",
  "Polaris Bank",
  "Keystone Bank",
  "Heritage Bank",
  "Unity Bank",
  "Jaiz Bank",
  "Providus Bank",
  "Titan Trust Bank",
  "SunTrust Bank",
  "Globus Bank",
];

export const managers = [
  "John Smith",
  "Sarah Johnson",
  "Michael Brown",
  "Emily Davis",
  "David Wilson",
  "Jessica Miller",
  "Christopher Garcia",
  "Ashley Rodriguez",
  "Matthew Martinez",
  "Amanda Anderson",
  "Joshua Taylor",
  "Michelle Thomas",
  "Andrew Jackson",
  "Stephanie White",
  "Daniel Harris",
  "Jennifer Martin",
  "Ryan Thompson",
  "Rachel Garcia",
  "Kevin Martinez",
  "Lauren Robinson",
  "Jason Clark",
  "Melissa Rodriguez",
  "Brandon Lewis",
  "Nicole Lee",
  "Tyler Walker",
  "Samantha Hall",
  "Jonathan Allen",
  "Elizabeth Young",
  "Nicholas Hernandez",
  "Brittany King",
  "Alexander Wright",
  "Christina Lopez",
  "Benjamin Hill",
  "Victoria Scott",
  "Jacob Green",
  "Danielle Adams",
  "Zachary Baker",
  "Kimberly Gonzalez",
  "Nathan Nelson",
  "Megan Carter",
  "Ethan Mitchell",
  "Kayla Perez",
  "Aaron Roberts",
  "Lisa Turner",
  "Jordan Phillips",
  "Hannah Campbell",
  "Connor Parker",
  "Alexis Evans",
  "Sean Edwards",
  "Taylor Collins",
  "Austin Stewart",
  "Morgan Sanchez",
  "Gabriel Morris",
];

const descriptions = [
  "Responsible for developing innovative solutions",
  "Focused on delivering exceptional customer experiences",
  "Dedicated to maintaining high-quality standards",
  "Committed to driving business growth and success",
  "Specialized in cutting-edge technology implementations",
  "Expert team handling complex technical challenges",
  "Creative professionals delivering outstanding results",
  "Strategic team focused on long-term objectives",
  "Operational excellence and process optimization",
  "Data-driven decision making and analytics",
  "Cross-functional collaboration and integration",
  "Agile development and continuous improvement",
  "Customer-centric approach to problem solving",
  "Innovation and research-driven initiatives",
  "Quality assurance and testing excellence",
];

function generateTeamCode(name: string, index: number): string {
  const words = name.split(" ");
  const initials = words.map((word) => word.charAt(0)).join("");
  const number = String(index + 1).padStart(3, "0");
  return `${initials}${number}`;
}

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)] as T;
}

function generateRandomDate(start: Date, end: Date): Date {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

export const mockTeams: Team[] = Array.from({ length: 524 }, (_, index) => {
  const name =
    index < teamNames.length
      ? (teamNames[index] as string)
      : `${getRandomElement(teamNames)} ${Math.floor(index / teamNames.length) + 1}`;

  const entity = getRandomElement(entities);
  const manager = getRandomElement(managers);
  const description = getRandomElement(descriptions);
  const status = Math.random() > 0.2 ? "Active" : ("Inactive" as const);

  const createdAt = generateRandomDate(
    new Date("2020-01-01"),
    new Date("2024-01-01")
  );

  const updatedAt = generateRandomDate(createdAt, new Date());

  return {
    id: `team_${String(index + 1).padStart(3, "0")}_${Date.now() + index}`,
    name,
    description: `${description} for the ${entity} department.`,
    code: generateTeamCode(name, index),
    email: `${name.toLowerCase().replace(/\s+/g, ".")}@company.com`,
    entity,
    manager,
    status,
    createdAt,
    updatedAt,
  };
});
