export type Framework = {
  name: string;
  logo: string;
  href?: string;
};

export type Techno = {
  name: string;
  logo?: string;
  description?: string;
  frameworks?: Framework[];
};

export type Skill = {
  name: string;
  techno: Techno[];
};
