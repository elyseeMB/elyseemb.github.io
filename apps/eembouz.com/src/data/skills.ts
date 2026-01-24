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
          description: __("Molière dans toute sa compréhension et inéluctable"),
        },
        {
          name: "Svelte",
          href: "https://svelte.dev/",
          description: __("... le shakespeare des interfaces web"),
        },
        {
          name: "Vue",
          href: "https://vuejs.org/",
          description: __("Le couteau suisse... polyvalence et harmonie"),
        },
        {
          name: "Astro",
          href: "https://astro.build/",
          description: __(
            "... le lac silencieux qui regorge de plein de mystères"
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
            "La Rolls royce des frameworks de l'écosystème Node.js"
          ),
        },
        {
          name: "Fastify",
          href: "https://fastify.dev/",
          description: __("Rapidité et légèreté sont mes prénoms pour Node.js"),
        },
        {
          name: "Golang",
          href: "https://go.dev/",
          description: __("Le loup déguisé du troupeau des langages"),
        },
      ],
    },
    {
      name: "Bases de données",
      frameworks: [
        {
          name: "PostgreSQL",
          href: "https://www.postgresql.org/",
          description: __("L'usine à gaz des bases de données relationnelles"),
        },
        {
          name: "MySQL",
          href: "https://www.mysql.com/",
          description: __("... le premier de sa classe"),
        },
        {
          name: "SQLite",
          href: "https://www.sqlite.org/",
          description: __(
            "Le portefeuille clé : léger et embarqué, sans serveur"
          ),
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
            "... je vois tout, entends tout, détecte tout : qui suis-je ?"
          ),
        },
        {
          name: "Docker",
          href: "https://www.docker.com/",
          description: __("... plus d'excuses, ça marche partout"),
        },
        {
          name: "Linux",
          href: "https://www.linux.org/",
          description: __("... le Dragon Ball Z des systèmes d'exploitation"),
        },
        {
          name: "Ansible",
          href: "https://docs.ansible.com/ansible/latest/index.html",
          description: __("L'électricien avant l'emménagement"),
        },
      ],
    },
  ];
}
