import type { ReactNode } from "react";
import "./styles.css";

export const metadata = {
  title: "Next.js Project Console Lab",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
