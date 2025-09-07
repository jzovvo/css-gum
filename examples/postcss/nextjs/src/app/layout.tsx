import '../css/normal.css'
import '../css/tailwind/normal.css'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-bold">
        {children}
      </body>
    </html>
  )
}
