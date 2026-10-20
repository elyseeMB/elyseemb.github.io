import type { Skill } from "../types/skills.ts";

export function getSkills(): Skill[] {
  return [
    {
      name: "Frontend",
      frameworks: [
        {
          name: "React",
          href: "https://react.dev/",
          description: "skills.react.description",
        },
        {
          name: "Svelte",
          href: "https://svelte.dev/",
          description: "skills.svelte.description",
        },
        {
          name: "Vue",
          href: "https://vuejs.org/",
          description: "skills.vue.description",
        },
        {
          name: "Astro",
          href: "https://astro.build/",
          description: "skills.astro.description",
        },
      ],
    },
    {
      name: "Backend",
      frameworks: [
        {
          name: "AdonisJS",
          href: "https://adonisjs.com/",
          description: "skills.adonis.description",
        },
        {
          name: "Fastify",
          href: "https://fastify.dev/",
          description: "skills.fastify.description",
        },
        {
          name: "Golang",
          href: "https://go.dev/",
          description: "skills.golang.description",
        },
      ],
    },
    {
      name: "Bases de données",
      frameworks: [
        {
          name: "PostgreSQL",
          href: "https://www.postgresql.org/",
          description: "skills.postgres.description",
        },
        {
          name: "MySQL",
          href: "https://www.mysql.com/",
          description: "skills.mysql.description",
        },
        {
          name: "SQLite",
          href: "https://www.sqlite.org/",
          description: "skills.sqlite.description",
        },
      ],
    },
    {
      name: "Outils & DevOps",
      frameworks: [
        {
          name: "Git",
          href: "https://git-scm.com/",
          description: "skills.git.description",
        },
        {
          name: "Docker",
          href: "https://www.docker.com/",
          description: "skills.docker.description",
        },
        {
          name: "Linux",
          href: "https://www.linux.org/",
          description: "skills.linux.description",
        },
        {
          name: "Ansible",
          href: "https://docs.ansible.com/ansible/latest/index.html",
          description: "skills.ansible.description",
        },
      ],
    },
  ];
}
