
import Head from 'next/head';
import Link from 'next/link';

export default function Works() {
    return (
        <>
            <Head>
                <title>Works - EternaxCode</title>
            </Head>

            <div className="min-h-screen w-full flex flex-col items-center justify-center p-8 pt-24 text-white">

                <h1 className="text-4xl md:text-5xl font-light mb-12 tracking-wide text-center">
                    Selected Works
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
                    {/* Project Card: ddubakehouse */}
                    <a
                        href="https://ddubakehouse.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative flex flex-col overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 transition-all duration-300 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(75,0,130,0.3)]"
                    >
                        <div className="aspect-video w-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative overflow-hidden">
                            {/* Placeholder or Image. Since we don't have an image yet, use a nice gradient or text */}
                            <span className="text-2xl font-bold opacity-30 group-hover:opacity-100 transition-opacity">ddubakehouse</span>
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                        </div>

                        <div className="p-6">
                            <h2 className="text-2xl font-semibold mb-2 text-white/90 group-hover:text-white">ddubakehouse.com</h2>
                            <p className="text-sm text-gray-300 mb-4 line-clamp-2">
                                A web experience for Ddu Bakehouse. Implemented with modern web technologies to capture the brand's unique atmosphere.
                            </p>
                            <div className="flex gap-2 text-xs font-mono text-white/50">
                                <span className="bg-white/10 px-2 py-1 rounded">Web</span>
                                <span className="bg-white/10 px-2 py-1 rounded">Branding</span>
                            </div>
                        </div>
                    </a>

                    {/* Placeholder for future works */}
                    <div className="group relative flex flex-col items-center justify-center rounded-2xl bg-white/5 border border-white/5 border-dashed min-h-[300px] text-white/20">
                        <span className="text-sm">More coming soon...</span>
                    </div>

                </div>
            </div>
        </>
    );
}
