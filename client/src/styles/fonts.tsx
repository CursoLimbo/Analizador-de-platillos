import { Dancing_Script, Didact_Gothic } from 'next/font/google';

const welcomeFont = Dancing_Script({
    subsets: ['latin'],
    display: "block"
});

const titleStyle = {
    fontSize: '100px',
    display:'flex',
    justifyContent: "center",
    marginTop: '5%'
}


const profileFont = Didact_Gothic ({
    weight: "400",
    subsets: ['latin']
});

export const Fonts = { welcomeFont, titleStyle, profileFont }


