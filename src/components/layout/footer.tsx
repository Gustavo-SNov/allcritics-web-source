"use client"

import Logo from "@/components/ui/logo";

const Footer = () => {

    return (
        <footer className="bg-gray-900 border-t border-gray-800 py-12">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <Logo/>
                        <p className="text-gray-400">
                            Junte-se à comunidade de críticos e compartilhe suas ideias sobre diversas mídias.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-white font-semibold mb-4">Conteúdos</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="#" className="hover:text-white transition-colors">Filmes</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Séries</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Jogos</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Reviews</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-white font-semibold mb-4">Comunidade</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="#" className="hover:text-white transition-colors">Diretrizes</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Top Critics</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Fóruns</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Suporte</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-white font-semibold mb-4">Empresa</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="#" className="hover:text-white transition-colors">Sobre</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Privacidade</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Termos</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                    <p>&copy; 2025 AllCritics. All rights reserved.</p>
                </div>
            </div>
        </footer>);
}

export default Footer;