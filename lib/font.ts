import { Exo_2, Space_Mono } from 'next/font/google';

const exo2 = Exo_2({ 
    subsets: ['latin'], 
    weight: ['400', '600'], 
    variable: '--font-exo2' 
});
const spaceMono = Space_Mono({ 
    subsets: ['latin'], 
    weight: ['400', '700'], 
    variable: '--font-space-mono' 
});

export { exo2, spaceMono };
