import type { Metadata } from "next";
import "./globals.css";
import NavMenu from "./NavMenu";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({children}:{children: React.ReactNode}){
  return(
    <html lang="en">
      <body>
        <div className = "container">
          <NavMenu/>
          <div style={{ flex: 1 }}>{children}</div>
        </div>
      </body>
    </html>
  );
}
