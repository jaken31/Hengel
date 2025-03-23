'use client'
import Image from "next/image";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { div } from "framer-motion/client";
import { BarGraph } from "@/components/ui/bar-chart";
import { LineGraph } from "@/components/ui/line-chart";
import { Card } from "@/components/ui/card";
import { Bar } from "recharts";

export default function Home() {
  const placeholders = [
    "What's the first rule of Fight Club?",
    "Who is Tyler Durden?",
    "Where is Andrew Laeddis Hiding?",
    "Write a Javascript method to reverse a string",
    "How to assemble your own PC?",
  ];
 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };
  return (
    <div className="w-full h-screen flex ">
      <div className="flex w-full">
        <div className="flex flex-col h-full p-20 pr-6 w-3/5 ">
          <div>
            <h1 className="text-4xl font-bold z-1">HELLO WORLD!</h1>
            <h2 className="text-2xl font-bold flex my-5 opacity-50 z-1">using<span className="mx-1"><Image className="dark:invert mx-1" alt={"text"} height={5} width={100} src={"./next.svg"}></Image></span></h2>
          </div>
          <BackgroundGradient className="">
          <CardSpotlight className="h-full z-2 p-12 mr-8 w-full flex flex-col" >
            <div className="z-2 m-2 mb-6">
              Here are your activities:
            </div>
            <div className="z-2 my-4 h-full min-w-full flex items-center justify-center">
              <div className="w-full h-full">
                <Card>
                  <div className="m-4">
                    Analysis
                  </div>
                </Card>
              </div>
            </div>
            <div className="z-2 transform -rotate-1.8 flex items-end h-full">
              <div className="w-1/2 h-fit">
                <BarGraph  />  
              </div>
              <div className="w-1/2 ml-4 h-fit">
                <LineGraph  />  
              </div>
            </div>
          </CardSpotlight>
          </BackgroundGradient>
        </div>
        <div className="flex items-center p-20 pl-6 w-2/5 h-full">
        <BackgroundGradient className="w-full h-full">
          <CardSpotlight className="h-full z-2 p-12 w-full flex flex-col justify-between" >
              <div>
                AI Text Placeholder
              </div>
              <div>
                <PlaceholdersAndVanishInput 
                placeholders={placeholders}
                onChange={handleChange}
                onSubmit={onSubmit}
                />
              </div>
            </CardSpotlight>
        </BackgroundGradient>
        </div>
      </div>
    </div>
    
  );
}
