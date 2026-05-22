"use client";

interface WelcomeProps {
    onStart: () => void;
}

export default function Welcome({ onStart }: WelcomeProps) {
    return (
        <div className="min-h-[calc(100vh-2rem)] flex items-center justify-center">
            <div className="text-center max-w-2xl mx-auto px-4">
                <div className="mb-6">
                    <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                        <span className="text-primary-foreground font-bold text-3xl">م</span>
                    </div>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                    به <span className="text-primary">مرورک</span> خوش اومدی!
                </h1>

                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                    همراه تو برای مدیریت یادگیری، برنامه‌ریزی هوشمند و افزایش بهره‌وری
                </p>
                <button
                    onClick={onStart}
                    className="bg-primary text-primary-foreground px-8 py-3 rounded-xl font-medium hover:bg-primary/90 transition-all"
                >
                    شروع کن
                </button>
            </div>
        </div>
    );
}