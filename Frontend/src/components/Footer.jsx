import { linkSections } from "../assets/assets";
const Footer = () => {
    
    return (
        <div className="px-6 md:px-16 lg:px-24 xl:px-32">
            <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-600/30 text-gray-700">
                <div>
                    <img className="w-34 md:w-32"  src="/logo.png" alt="dummyLogoColored" />
                   <p className="max-w-[410px] mt-6 text-lg leading-relaxed text-gray-900 border-l-2 border-indigo-500 pl-3 italic">
    Your one-stop shop for the latest electronics, fashion, and accessories. We deliver quality products at the best prices, right to your doorstep.
</p>
                </div>
                <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
                    {linkSections.map((section, index) => (
                        <div key={index}>
                            <h3 className="font-semibold text-base text-gray-900 md:mb-5 mb-2">{section.title}</h3>
                            <ul className="text-sm space-y-1">
                                {section.links.map((link, i) => (
                                    <li key={i}>
                                        <a href={link.url} target="_blank" className="hover:underline transition">
                                            {link.txt}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div >
            <p className="py-4 text-center text-sm md:text-base text-gray-800/80">
                Copyright 2026 © <a href="#">Ai-Cart</a> All Right Reserved.
            </p>
        </div>
    );
};

export default Footer