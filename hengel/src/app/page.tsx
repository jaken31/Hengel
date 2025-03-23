import Image from "next/image";
import {Boxes} from "../components/ui/background-boxes";
import { div } from "framer-motion/client";

export default function Home() {
  return (
    <div className="w-full h-screen ">
      <div className="flex flex-col min-h-screen p-16 ">
        <Boxes className="z-0" />
        <h1 className="text-4xl font-bold z-1">HELLO WORLD!</h1>
        <h2 className="text-2xl font-bold flex my-5 opacity-50 z-1">using<span className="mx-1"><Image className="dark:invert mx-1" alt={"text"} height={5} width={100} src={"./next.svg"}></Image></span></h2>
      </div>
      <div>

      </div>
    </div>
    
  );
}
