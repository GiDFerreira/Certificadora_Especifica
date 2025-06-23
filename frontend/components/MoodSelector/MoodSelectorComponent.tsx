"use client";

import Image from "next/image";
import CardComponent from "../Card/Card";
import { useState } from "react";


interface MoodOption {
  label: string;
  image: string;
  alt: string;
  onClick?: () => void;
}

interface MoodSelectorProps {
  moods?: MoodOption[]; 
  onMoodSelect?: (mood: string) => void;
  selectedMoodFromParent?: string | null;
}

const defaultMoods: MoodOption[] = [
  { label: "Feliz", image: "/feliz.svg", alt: "feliz" },
  { label: "Mais ou menos", image: "/maisoumenos.svg", alt: "maisoumenos" },
  { label: "Indiferente", image: "/indiferente.svg", alt: "indiferente" },
  { label: "Triste", image: "/triste.svg", alt: "triste" },
  { label: "Frustante", image: "/bravo.svg", alt: "bravo" },
];



const MoodSelectorComponent = ({ moods = defaultMoods, onMoodSelect,selectedMoodFromParent }: MoodSelectorProps) => {
  const handleClick = (moodLabel: string) => {
    if (onMoodSelect) {
      onMoodSelect(moodLabel);
    }
  };
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const finalSelectedMood = selectedMoodFromParent ?? selectedMood;

  const selectMoodDay = (moodLabel: string) => {
    setSelectedMood(moodLabel);  // Marca o selecionado
  };

  return (
    <CardComponent className="bg-[var(--lighter-pink)] w-full flex justify-center">
      <div className="flex items-center justify-between px-12 flex-wrap gap-4">
        {finalSelectedMood == null ? moods.map((mood, index) => (
          <div
            key={index}
            className="text-center cursor-pointer hover:scale-105 transition-transform"
            onClick={() => {
              handleClick(mood.label);
              selectMoodDay(mood.label);
            }}
          >
            <Image
              src={mood.image}
              alt={mood.alt}
              width={100}
              height={100}
              className="hover:scale-110 hover:rotate-3 transition-all duration-300"
            />
            <span>{mood.label}</span>
          </div>
        ))
          : moods
            .filter((mood) => mood.label === finalSelectedMood)
            .map((mood, index) => (
              <div
                key={index}
                className="text-center"
              >
                <Image
                  src={mood.image}
                  alt={mood.alt}
                  width={100}
                  height={100}
                />
                <span className="font-bold">{mood.label}</span>
              </div>
            ))
        }
      </div>
    </CardComponent>
  );
};

export default MoodSelectorComponent;
