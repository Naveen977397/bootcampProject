import "./globals.css";
import Navbar from "./components/Navbar";
import Login from "./login/page";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
          <Navbar/>
          {children}
      </body>
    </html>
  );
}
