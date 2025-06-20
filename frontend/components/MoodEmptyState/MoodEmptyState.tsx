"use client";

import { Button } from "@/components/ui/button";
import Card from "@/components/Card/Card";

interface MoodEmptyStateProps {
  onRegisterClick: () => void;
}

const MoodEmptyStateComponent = ({ onRegisterClick }: MoodEmptyStateProps) => {
  return (
    <Card className="w-full h-64 md:h-80 bg-muted flex flex-col items-center justify-center text-center gap-6 mt-12 px-4">
      <p className="max-w-md text-sm md:text-base text-muted-foreground">
        Perceber como você se sente é um passo importante no seu cuidado.
        Comece registrando seu primeiro humor por aqui.
      </p>
      <div className="mt-2">
        <Button onClick={onRegisterClick} className="px-6 py-2 text-sm font-semibold shadow-md">
          REGISTRAR
        </Button>
      </div>
    </Card>
  );
};

export default MoodEmptyStateComponent;