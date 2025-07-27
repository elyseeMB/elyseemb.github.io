const designPatterns = [
  {
    id: 1,
    slug: "singleton",
    name: "Singleton",
    category: "Création",
    description: "Pattern lié à la création d'objets",
  },
  {
    id: 2,
    slug: "factory-method",
    name: "Factory Method",
    category: "Création",
    description: "Pattern lié à la création d'objets",
  },
  {
    id: 3,
    slug: "builder",
    name: "Builder",
    category: "Création",
    description: "Pattern lié à la création d'objets",
  },
  {
    id: 4,
    slug: "observer",
    name: "Observer",
    category: "Comportement",
    description: "Pattern lié aux interactions et comportements entre objets",
  },
  {
    id: 5,
    slug: "strategy",
    name: "Strategy",
    category: "Comportement",
    description: "Pattern lié aux interactions et comportements entre objets",
  },
  {
    id: 6,
    slug: "decorator",
    name: "Decorator",
    category: "Structure",
    description: "Pattern lié à la composition des objets",
  },
];

const designPatternsByCategory = {
  Création: designPatterns.filter((p) => p.category === "Création"),
  Structure: designPatterns.filter((p) => p.category === "Structure"),
  Comportement: designPatterns.filter((p) => p.category === "Comportement"),
};

export { designPatterns, designPatternsByCategory };
