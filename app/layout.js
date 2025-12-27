import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { GlobalProvider } from '../context/GlobalContext';

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
                    <Navbar />
                    <main>{children}</main>
                    <Footer />
                </GlobalProvider>
            </body>
        </html>
    );
}
