"use client";
import { useState } from 'react';
import ChartJS from '../components/chartjs';

export default function Home() {

  const [isCameraVisible, setIsCameraVisible] = useState(true);
  const [translate, setTranslate] = useState(false);
  const [showStarted, setShowStarted] = useState(false);

  const handleCamera = () => {
    setTranslate(true);
    setShowStarted(true);
    setTimeout(() => {
      setIsCameraVisible(false);
    }, 3000);
  };

  return (
    <main className='h-screen w-screen background relative overflow-hidden max-lg:overflow-auto'>
      {
        isCameraVisible && (
          <img
            src="/projecteur.svg"
            alt="background"
            draggable={false}
            height={150}
            width={150}
            className={`absolute top-[78vh] z-10 left-[45vw] transition-transform duration-300 ease-linear h-[150px] w-[150px] ${translate ? 'translate-y-[150%]' : ''}`}
            onClick={handleCamera}
          />
        )
      }
      {showStarted && (
        <>
          <ChartJS />
        </>
      )}
    </main>
  )
}
