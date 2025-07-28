import type { Skill } from "../types/skills.ts";

export const skills: Skill[] = [
  {
    name: "Frontend",
    frameworks: [
      {
        name: "React",
        href: "https://react.dev/",
        description:
          "Librairie JavaScript pour créer des interfaces avec des composants réutilisables.",
      },
      {
        name: "Vue",
        href: "https://vuejs.org/",
        description:
          "Framework simple et flexible pour construire des interfaces interactives.",
      },
      {
        name: "Astro",
        href: "https://astro.build/",
        description:
          "Framework orienté performance pour créer des sites statiques modernes.",
      },
    ],
  },
  {
    name: "Backend",
    frameworks: [
      {
        name: "AdonisJS",
        href: "https://adonisjs.com/",
        description:
          "Framework Node.js complet, inspiré de Laravel, idéal pour les API.",
      },
      {
        name: "Fastify",
        href: "https://fastify.dev/",
        description: "Framework backend rapide et léger pour Node.js.",
      },
    ],
  },
  {
    name: "Bases de données",
    frameworks: [
      {
        name: "PostgreSQL",
        href: "https://www.postgresql.org/",
        description: "Base de données relationnelle robuste et open source.",
      },
      {
        name: "MySQL",
        href: "https://www.mysql.com/",
        description: "SGBD populaire, rapide et facile à intégrer.",
      },
      {
        name: "SQLite",
        href: "https://www.sqlite.org/",
        description: "Base de données légère et embarquée, sans serveur.",
      },
    ],
  },
  {
    name: "Outils & DevOps",
    frameworks: [
      {
        name: "Git",
        href: "https://git-scm.com/",
        description: "Système de versionnement pour collaborer efficacement.",
      },
      {
        name: "Docker",
        href: "https://www.docker.com/",
        description:
          "Conteneurisation d’applications pour une meilleure portabilité.",
      },
      {
        name: "Linux",
        href: "https://www.linux.org/",
        description:
          "Système d’exploitation stable, utilisé en développement et en production.",
      },
      {
        name: "Ansible",
        href: "https://docs.ansible.com/ansible/latest/index.html",
        description: "Outil d’automatisation pour la gestion des serveurs.",
      },
    ],
  },
];
