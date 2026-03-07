export default function Footer() {
    return (
        <footer className="w-full bg-black text-white py-16 px-6 border-t border-white/10 relative z-20">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="col-span-1 md:col-span-2">
                    <h3 className="text-3xl font-bold tracking-tighter mb-4">Rushikesh</h3>
                    <p className="text-gray-400 max-w-sm">
                        Creative Developer & AI Engineer blurring the lines between art, logic, and profound digital experiences.
                    </p>
                </div>

                <div>
                    <h4 className="font-semibold mb-4 text-white uppercase tracking-widest text-sm">Socials</h4>
                    <ul className="space-y-2 text-gray-400 font-light text-sm">
                        <li><a href="#" className="hover:text-violet-400 transition-colors">GitHub</a></li>
                        <li><a href="#" className="hover:text-violet-400 transition-colors">LinkedIn</a></li>
                        <li><a href="#" className="hover:text-violet-400 transition-colors">Twitter // X</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-semibold mb-4 text-white uppercase tracking-widest text-sm">Status</h4>
                    <div className="flex items-center gap-3">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </span>
                        <span className="text-gray-400 text-sm font-light">Available for freelance</span>
                    </div>
                    <p className="text-gray-600 text-xs mt-8">
                        © {new Date().getFullYear()} Rushikesh. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
