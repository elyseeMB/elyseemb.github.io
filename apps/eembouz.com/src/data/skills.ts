import { getTranslator } from "../libs/i18n.ts";
import type { Skill } from "../types/skills.ts";

export async function getSkills(lang: string | undefined): Promise<Skill[]> {
  const __ = await getTranslator(lang);
  return [
    {
      name: "Frontend",
      frameworks: [
        {
          name: "React",
          href: "https://react.dev/",
          description: __(
            "Bibliothèque d'interfaces utilisateur web et natives"
          ),
        },
        {
          name: "Vue",
          href: "https://vuejs.org/",
          description: __(
            "Framework simple et flexible pour construire des interfaces interactives."
          ),
        },
        {
          name: "Astro",
          href: "https://astro.build/",
          description: __(
            "Framework orienté performance pour créer des sites statiques modernes."
          ),
        },
      ],
    },
    {
      name: "Backend",
      frameworks: [
        {
          name: "AdonisJS",
          href: "https://adonisjs.com/",
          description: __(
            "Framework Node.js complet, inspiré de Laravel, idéal pour les API."
          ),
        },
        {
          name: "Fastify",
          href: "https://fastify.dev/",
          description: __("Framework backend rapide et léger pour Node.js."),
        },
        {
          name: "Golang",
          href: "https://go.dev/",
          description: __("Langage compilé, rapide et concurrent."),
        },
      ],
    },
    {
      name: "Bases de données",
      frameworks: [
        {
          name: "PostgreSQL",
          href: "https://www.postgresql.org/",
          description: __(
            "Base de données relationnelle robuste et open source."
          ),
        },
        {
          name: "MySQL",
          href: "https://www.mysql.com/",
          description: __("SGBD populaire, rapide et facile à intégrer."),
        },
        {
          name: "SQLite",
          href: "https://www.sqlite.org/",
          description: __("Base de données légère et embarquée, sans serveur."),
        },
      ],
    },
    {
      name: "Outils & DevOps",
      frameworks: [
        {
          name: "Git",
          href: "https://git-scm.com/",
          description: __(
            "Système de versionnement pour collaborer efficacement."
          ),
        },
        {
          name: "Docker",
          href: "https://www.docker.com/",
          description: __(
            "Conteneurisation d'applications pour une meilleure portabilité."
          ),
        },
        {
          name: "Linux",
          href: "https://www.linux.org/",
          description: __(
            "Système d'exploitation stable, utilisé en développement et en production."
          ),
        },
        {
          name: "Ansible",
          href: "https://docs.ansible.com/ansible/latest/index.html",
          description: __(
            "Outil d'automatisation pour la gestion des serveurs."
          ),
        },
      ],
    },
  ];
}
