export interface Theme {
  name: string;
  properties: any;
}

export const light: Theme = {
  name: 'light',
  properties: {
    '--primary': 'hsl(252deg 94% 67%)',
    '--primary-light': 'hsl(252deg 100% 73%)',
    '--white': 'hsl(0deg 0% 100%)',
    '--base': 'hsl(228deg 29% 7%)',
    '--background-primary': 'hsl(240deg 27% 98%)',
    '--sidebar-background': 'hsl(231deg 20% 27%)',
    '--sidebar-border': 'hsl(232deg 20% 36%)',
  },
};

export const dark: Theme = {
  name: 'dark',
  properties: {
    '--primary': 'hsl(252deg 94% 67%)',
    '--primary-light': 'hsl(252deg 100% 73%)',
    '--white': 'hsl(0deg 0% 100%)',
    '--base': 'hsl(0deg 0% 100%)',
    '--background-primary': 'hsl(233deg 30% 11%)',
    '--sidebar-background': 'hsl(233deg 31% 17%)',
    '--sidebar-border': 'hsl(232deg 20% 36%)',
  },
};
