import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, Upload, BookOpen, Library } from "lucide-react";


export default function NavBar() {

    const NavItems = [
        { path: "/", label: "Home", icon: Sparkles },
        { path: "/generator", label: "AI Flashcard Generator", icon: Upload },
        { path: "/flashcards", label: "Flashcards", icon: BookOpen },
        { path: "/library", label: "My Library", icon: Library },

    ]

    return (
        <div className="text-gray-700">
            {/* Header */}
            < header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-lg" >
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    <a href="/" className="flex items-center gap-2 group">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-black transition-transform group-hover:scale-110">
                            <Sparkles className="h-5 w-5 text-white" />
                        </div>
                        <span className="font-display text-xl font-bold text-foreground text-black">
                            Manabu
                        </span>
                    </a>


                    <div className="flex items-center gap-1">

                        {NavItems.map((item) => {
                            const Icon = item.icon;

                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className="flex items-center justify-center gap-2"
                                >
                                    <Icon className="w-4 h-4" />
                                    <span className="hidden sm:block mr-7">{item.label}</span>
                                </Link>
                            );

                        })}
                    </div>


                    <div className="flex items-center gap-3">
                        <Link to="/generator">
                            <Button variant="hero" size="sm">
                                Get Started
                            </Button>
                        </Link>

                    </div>
                </div>
            </ header>
        </div>
    )
};