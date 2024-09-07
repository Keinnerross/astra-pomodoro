import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { Poppins } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });



const poppins = Poppins({
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],  // Puedes configurar los pesos
  subsets: ['latin'],      // Subconjuntos de caracteres
});



export const metadata = {
  title: "Spartan Pomodoro",
  description: "Timer pomodoro like aspartan",
};




export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"></link>
      </head> */}
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
