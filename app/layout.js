import './globals.css';
import { GlobalProvider } from '../context/GlobalContext';
import LayoutWrapper from '../components/LayoutWrapper';

export const metadata = {
    title: 'Manthan - Trade Made Easy',
    description: 'A digital export-import facilitation platform.',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Outfit:wght@400;600;800&display=swap" rel="stylesheet" />
            </head>
            <body>
                <GlobalProvider>
                    <LayoutWrapper>
                        {children}
                    </LayoutWrapper>
                </GlobalProvider>
            </body>
        </html>
    );
}
