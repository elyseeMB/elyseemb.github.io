const designPatterns = [
  {
    id: 1,
    name: "Singleton",
    category: "Création",
    description: "Pattern lié à la création d'objets",
  },
  {
    id: 2,
    name: "Factory Method",
    category: "Création",
    description: "Pattern lié à la création d'objets",
  },
  {
    id: 3,
    name: "Builder",
    category: "Création",
    description: "Pattern lié à la création d'objets",
  },
  {
    id: 4,
    name: "Observer",
    category: "Comportement",
    description: "Pattern lié aux interactions et comportements entre objets",
  },
  {
    id: 5,
    name: "Strategy",
    category: "Comportement",
    description: "Pattern lié aux interactions et comportements entre objets",
  },
  {
    id: 6,
    name: "Decorator",
    category: "Structure",
    description: "Pattern lié à la composition des objets",
  },
];

// Ou organisé par catégorie
const designPatternsByCategory = {
  Création: [
    {
      id: 1,
      name: "Singleton",
      description: "Patterns liés à la création d'objets",
    },
    {
      id: 2,
      name: "Factory Method",
      description: "Patterns liés à la création d'objets",
    },
    {
      id: 3,
      name: "Builder",
      description: "Patterns liés à la création d'objets",
    },
  ],
  Structure: [
    {
      id: 6,
      name: "Decorator",
      description: "Patterns liés à la composition des objets",
    },
  ],
  Comportement: [
    {
      id: 4,
      name: "Observer",
      description:
        "Patterns liés aux interactions et comportements entre objets",
    },
    {
      id: 5,
      name: "Strategy",
      description:
        "Patterns liés aux interactions et comportements entre objets",
    },
  ],
};

export { designPatterns, designPatternsByCategory };
