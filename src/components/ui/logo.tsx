
import Link from "next/link"
import Image from "next/image";


const Logo = () => {
    return(
        <Link href="/home" className="flex items-center space-x-2">
            <Image src={"/imagens/logo.png"} alt={"Logo AllCritics"} width={50} height={50}/>
            <span className="text-2xl font-bold text-white">AllCritics</span>
        </Link>
    );
}

export default Logo;