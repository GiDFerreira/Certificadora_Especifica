"use client";

import CardComponent from "../Card/Card";


const MoodChartEmptyState = () => {
  return (
    <CardComponent className="bg-[var(--blue)] w-full h-64 py-24 px-14">
      <p className="text-sm text-center">
        Quando você tiver pelo menos 7 registros de humor, um gráfico será gerado para te ajudar a enxergar seus padrões emocionais com mais carinho e clareza. 📈
      </p>
    </CardComponent>
  );
};

export default MoodChartEmptyState;
