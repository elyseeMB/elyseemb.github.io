export type Framework = {
  name: string;
  logo?: string;
  href?: string;
  description?: string;
};

export type Skill = {
  name: string;
  frameworks?: Framework[];
};

export type Projet = {
  name: string;
  description: string;
  href: string;
};
