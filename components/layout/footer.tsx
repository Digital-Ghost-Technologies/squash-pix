import Link from "next/dist/client/link";

export function Footer() {
    return (
        <footer className="bg-background border-border border-t py-8 mt-auto w-full">
            <div className="container mx-auto px-8 text-center space-y-2">

                <p className="text-sm text-muted-foreground">&copy; 2025 SquashPix. Built with Next.js and Tailwind CSS.</p>
                <div className="flex flex-row justify-center gap-4 text-sm">
                    <Link
                        href="/terms"
                        className="text-gray-600 hover:text-indigo-700 dark:text-gray-300 dark:hover:text-indigo-500 transition-colors"
                    >
                        Terms & Conditions
                    </Link>

                    <Link
                        href="/privacy"
                        className="text-gray-600 hover:text-indigo-700 dark:text-gray-300 dark:hover:text-indigo-500 transition-colors"
                    >
                        Privacy Policy
                    </Link>
                </div>
            </div>
        </footer>
    );
}
