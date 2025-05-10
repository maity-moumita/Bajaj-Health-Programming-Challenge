import "./globals.css";

export const metadata = {
    title: 'BFHL Challenge',
    description: 'Qualifier 1 API Demo',
  };
  
  export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <body style={{ fontFamily: 'sans-serif', padding: '20px' }}>
          {children}
        </body>
      </html>
    );
  }
  