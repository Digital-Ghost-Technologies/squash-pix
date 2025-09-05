import { Donut, Heart } from 'lucide-react';
import Link from "next/dist/client/link";
import { ThemeToggle } from "../ui/theme-toggle";

export function Header() {
    return (
        <header className="bg-background border-border border-b">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="p-2 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-xl">
                                <Donut className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">
                                    SquashPix
                                </h1>
                                <p className="text-sm text-muted-foreground">Compress & Convert Images</p>
                            </div>
                        </Link>
                    </div>

                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <span>Made with</span>
                            <Heart className="w-4 h-4 text-red-500" />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
