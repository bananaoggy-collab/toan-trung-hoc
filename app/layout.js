import { Inter } from "next/font/google";
import "./globals.css";
import "katex/dist/katex.min.css"; // Import styles for math equations

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
});

export const metadata = {
  title: "Toán Trung Học - Website Học Toán Số 1",
  description: "Trang web giáo dục toán học dành cho học sinh trung học. Cung cấp lý thuyết, bài tập, và đề thi với công thức trực quan.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi" className={inter.variable}>
      <body>
        <div className="app-container">
          {children}
        </div>
      </body>
    </html>
  );
}
