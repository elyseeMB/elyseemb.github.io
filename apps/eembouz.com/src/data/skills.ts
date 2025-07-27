import type { Skill } from "../types/skills.ts";

export const skills: Skill[] = [
  {
    name: "Frontend",
    frameworks: [
      {
        name: "React",
        href: "https://react.dev/",
        description:
          "React est une bibliothèque JavaScript développée par Meta, utilisée pour créer des interfaces utilisateur réactives à l’aide de composants réutilisables.",
      },
      {
        name: "vue",
        href: "https://vuejs.org/",
        description:
          "Vue.js est un framework JavaScript progressif pour construire des interfaces utilisateur interactives, facile à intégrer dans des projets existants.",
      },
      {
        name: "astro",
        href: "https://astro.build/",
        description:
          "Astro est un framework moderne permettant de construire des sites web statiques ultra rapides en combinant plusieurs technologies front-end comme React, Vue ou Svelte.",
      },
    ],
  },
  {
    name: "Backend",
    frameworks: [
      {
        name: "AdonisJs",
        href: "https://adonisjs.com/",
        description:
          "AdonisJS est un framework Node.js complet et structuré, inspiré de Laravel, idéal pour développer des API robustes avec une architecture MVC claire.",
      },
      {
        name: "Fastify",
        href: "https://fastify.dev/",
        description:
          "Fastify est un framework backend Node.js ultra-rapide et extensible, optimisé pour la performance et idéal pour des applications web et API RESTful.",
      },
    ],
  },
  {
    name: "Bases de données",
    frameworks: [
      {
        name: "PostgreSQL",
        href: "https://www.postgresql.org/",
        description:
          "PostgreSQL est un système de gestion de base de données relationnelle open source puissant, reconnu pour sa fiabilité, sa robustesse et sa conformité aux standards SQL.",
      },
      {
        name: "MySQL",
        href: "https://www.mysql.com/",
        description:
          "MySQL est un système de gestion de base de données populaire, connu pour sa rapidité et son intégration avec de nombreuses applications web.",
      },
      {
        name: "SQLite",
        href: "https://www.sqlite.org/",
        description:
          "SQLite est une base de données légère, autonome et embarquée, parfaite pour les applications mobiles, embarquées ou les prototypes rapides.",
      },
    ],
  },
  {
    name: "Outils & DevOps",
    frameworks: [
      {
        name: "Git",
        href: "https://git-scm.com/",
        description:
          "Git est un système de gestion de version distribué, indispensable pour suivre l’évolution du code, collaborer en équipe et gérer les branches de développement.",
      },
      {
        name: "Docker",
        href: "https://www.docker.com/",
        description:
          "Docker permet de créer, déployer et exécuter des applications dans des conteneurs, assurant une portabilité et une cohérence entre les environnements.",
      },
      {
        name: "Linux",
        href: "https://www.linux.org/",
        description:
          "Linux est un système d'exploitation open source, stable et performant, très utilisé pour les serveurs, le développement et l'administration système.",
      },
      {
        name: "Ansible",
        href: "https://docs.ansible.com/ansible/latest/index.html",
        description:
          "Ansible est un outil d'automatisation DevOps permettant de gérer la configuration, le déploiement et l’orchestration de serveurs via des scripts simples en YAML.",
      },
    ],
  },
];
