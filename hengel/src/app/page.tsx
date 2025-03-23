"use client";
import { invoke } from '@tauri-apps/api/core';
import Image from "next/image";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { motion } from "framer-motion";
import { BarGraph } from "@/components/ui/bar-chart";
import { LineGraph } from "@/components/ui/line-chart";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";


import { useState } from "react";
export default function Home() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [assistantResponse, setAssistantResponse] = useState(
    "Welcome! How can I help you today?"
  );
  const placeholders = [
    "Ask something about web vunerabilities",
    "Ask something about me",
    "Any questions?",
  ];

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };
window.__TAURI__.core.invoke('start_read')
  return (
    <div className="w-full h-screen flex ">
      <div className="flex w-full">
        <div className="flex flex-col h-full p-20 pr-6 w-3/5 overflow-hidden relative">
          <div>
            <h1 className="text-8xl font-bold z-1">HENGEL</h1>
            <h2 className="text-xl font-light flex my-5 mt-2 opacity-50 z-1">
              for your safety
            </h2>
          </div>
          <BackgroundGradient className=" overflow-hidden relative">
            <CardSpotlight className="h-full z-2 p-12 mr-8 w-full flex flex-col overflow-hidden relative">
              <div className="z-2 m-2 mb-6 font-bold text-2xl">
                Here are your activities:
              </div>
              <div className="z-2 my-4 h-full min-w-full flex items-center justify-center">
                <div className="w-full h-full flex-grow overflow-hidden">
                  <Card className="flex flex-col h-full">
                    <div className="flex flex-col h-full">
                      <div className="m-4">
                        <h3 className="text-lg ml-4 font-semibold mb-4">Database Analysis</h3>
                        
                      </div>
                      <div className="h-full items-end flex justify-end mr-10">
                        <Button className="h-10">Start Background Scan</Button>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
              <div className="z-2 transform -rotate-1.8 flex h-full relative">
                <div className="w-1/2 h-fit">
                  <BarGraph />
                </div>
                <div className="w-1/2 ml-4 h-fit">
                  <LineGraph />
                </div>
              </div>
            </CardSpotlight>
          </BackgroundGradient>
        </div>
        <div className="flex items-center p-20 pl-6 w-2/5 h-full">
          <BackgroundGradient className="w-full h-full overflow-hidden">
            <CardSpotlight className="h-full z-2 p-12 w-full flex flex-col justify-between relative overflow-hidden">
              <div className="text-2xl font-bold z-3 m-4">AI Assistance</div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="m-4 rounded-lg opacity-100 text-2xl overflow-hidden relative h-full scrollbar-hide"
              >
                {isProcessing ? (
                  <div className="absolute inset-0 flex items-center justify-center w-full h-full">
                    <div className="text-sm font-bold w-full">
                      Processing your request...
                    </div>
                  </div>
                ) : (
                  <div className="h-full">
                    <TextGenerateEffect words={assistantResponse} />
                  </div>
                )}
              </motion.div>
              <div>
                <PlaceholdersAndVanishInput
                  placeholders={placeholders}
                  onChange={(e) => {
                    // Handle change event if needed
                  }}
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const inputElement = e.currentTarget
                      .elements[0] as HTMLInputElement;
                    const userInput = inputElement.value.trim();

                    if (!userInput) return;

                    setIsProcessing(true);
                    try {
                      const res = await fetch("/api/fetchChatResponse", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ userInput }),
                      });

                      if (!res.ok) {
                        throw new Error(`HTTP error! status: ${res.status}`);
                      }

                      const data = await res.json();
                      setAssistantResponse(
                        data.response ||
                          "I apologize, but I received an empty response."
                      );
                      inputElement.value = ""; // Clear input after successful submission
                    } catch (error) {
                      console.error("Error:", error);
                      setAssistantResponse(
                        "Sorry, I encountered an error processing your request. Please try again."
                      );
                    } finally {
                      setIsProcessing(false);
                    }
                  }}
                />
              </div>
            </CardSpotlight>
          </BackgroundGradient>
        </div>
      </div>
    </div>
  );
}
