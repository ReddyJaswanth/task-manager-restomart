import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Task Manager - Restomart',
    description: 'A simple task management application',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <div className="min-h-screen bg-gray-50">
                    <header className="bg-white shadow-sm border-b">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex justify-center items-center py-6">
                                <h1 className="text-3xl font-bold text-gray-900">
                                    Task Manager
                                </h1>
                            </div>
                        </div>
                    </header>
                    <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                        {children}
                    </main>
                </div>
            </body>
        </html>
    )
} 