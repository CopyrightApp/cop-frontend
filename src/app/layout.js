import "./globals.css";
import  { AppWrapper }  from "./context/index.jsx";
import Navbar from './components/navbar';

export const metadata = {
  title: "Lyric Checker",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AppWrapper>
        <body>{children}</body>
      </AppWrapper>     
    </html>
  );
}
