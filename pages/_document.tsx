import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang='en'>
            <Head>
                <meta name="google-site-verification" content="he98BLmJS2x3Q6MkJjd_12lh6W6kvDKows2f2QVkMtk" />
                <link rel="icon" type="image/png" href="/favicon/favicon-96x96.png" sizes="96x96" />
                <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
                <link rel="shortcut icon" href="/favicon/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
                <link rel="manifest" href="/site.webmanifest" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600&family=Poppins:wght@600&family=Press+Start+2P&display=swap"
                    rel="stylesheet"
                />
                <script src="https://www.google.com/recaptcha/api.js" async defer></script>
            </Head>

            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}