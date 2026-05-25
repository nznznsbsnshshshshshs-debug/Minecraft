export const metadata = {
  title: "YGP Minecraft",
  description: "Minecraft Mods & YouTube Hub",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          background: "#050505",
          color: "white",
          fontFamily: "Arial",
        }}
      >
        {children}
      </body>
    </html>
  );
}
