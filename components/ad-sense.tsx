import Script from 'next/script';

interface AdSenseProp {
    pId: string;
}

export function AdSense({ pId = '' }: AdSenseProp) {
    return (
        <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${pId}`}
            crossOrigin='anonymous'
            strategy='afterInteractive'></Script>
    )
}