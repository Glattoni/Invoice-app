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
    '--background-secondary': 'hsl(0deg 0% 100%)',
    '--foreground-primary': 'hsl(231deg 20% 61%)',
    '--sidebar-background': 'hsl(231deg 20% 27%)',
    '--sidebar-border': 'hsl(232deg 20% 36%)',
    '--danger': 'hsl(0deg 80% 63%)',
    '--danger-light': 'hsl(0deg 100% 80%)',
    '--button-3-bg': 'hsl(231deg 67% 99%)',
    '--button-3-fg': 'hsl(231deg 36% 63%)',
    '--button-3-bg-hover': 'hsl(231deg 73% 91%)',
    '--button-3-fg-hover': 'hsl(231deg 36% 63%)',
    '--button-4-bg': 'hsl(231deg 20% 27%)',
    '--button-4-fg': 'hsl(231deg 20% 61%)',
    '--button-4-bg-hover': 'hsl(231deg 28% 7%)',
    '--button-4-fg-hover': 'hsl(231deg 20% 61%)',
    '--button-6-bg': 'hsl(231deg 67% 99%)',
    '--button-6-fg': 'hsl(231deg 36% 63%)',
    '--button-6-bg-hover': 'hsl(231deg 73% 93%)',
    '--button-6-fg-hover': 'hsl(231deg 36% 63%)',
    '--header-foreground': 'hsl(231deg 28% 7%)',
    '--radio-background': 'hsl(231deg 73% 93%)',
    // box-shadows
    '--box-shadow-primary': 'hsla(232, 38%, 45%, 0.25)',
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
    '--background-secondary': 'hsl(233deg 30% 21%)',
    '--foreground-primary': 'hsl(231deg 75% 93%)',
    '--sidebar-background': 'hsl(233deg 31% 17%)',
    '--sidebar-border': 'hsl(232deg 20% 36%)',
    '--danger': 'hsl(0deg 80% 63%)',
    '--danger-light': 'hsl(0deg 100% 80%)',
    '--button-3-bg': 'hsl(233deg 30% 21%)',
    '--button-3-fg': 'hsl(231deg 75% 93%)',
    '--button-3-bg-hover': 'hsl(0deg 0% 100%)',
    '--button-3-fg-hover': 'hsl(231deg 75% 93%)',
    '--button-4-bg': 'hsl(231deg 20% 27%)',
    '--button-4-fg': 'hsl(231deg 75% 93%)',
    '--button-4-bg-hover': 'hsl(233deg 31% 17%)',
    '--button-4-fg-hover': 'hsl(231deg 75% 93%)',
    '--button-6-bg': 'hsl(231deg 67% 99%)',
    '--button-6-fg': 'hsl(231deg 36% 63%)',
    '--button-6-bg-hover': 'hsl(231deg 73% 93%)',
    '--button-6-fg-hover': 'hsl(231deg 36% 63%)',
    '--header-foreground': 'hsl(0deg 0% 100%)',
    '--radio-background': 'hsl(233deg 31% 17%)',
    // box-shadows
    '--box-shadow-primary': 'hsla(0, 0%, 0%, 0.25)',
  },
};
