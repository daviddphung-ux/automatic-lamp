import "./globals.css";

export const metadata = {
  title: "Automatic Lamp — Food Checker",
  description: "A simple, beginner-friendly way to learn whether a food is junk food.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
