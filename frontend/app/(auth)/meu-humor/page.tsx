"use client";

import { useState } from "react";
import Grid from "@/components/Grid/Grid";
import { Mood } from "@/interfaces/Mood";
import { moodService } from "@/services/moodService";
import { useEffect } from "react";
import MoodChart from "@/components/MoodChart/MoodChart";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";
import LoggedUser from "@/components/LoggedUser/loggedUser";
import Buttonsheet from "@/components/Buttonsheet/Buttonsheet";
import MyBot from "@/components/Chatbot/Chatbot";
import MoodEmptyStateComponent from "@/components/MoodEmptyState/MoodEmptyState";
import MoodSelectorComponent from "@/components/MoodSelector/MoodSelectorComponent";
import CardComponent from "@/components/Card/Card";
import { Reaction } from "@/utils/enums/Reaction";
import { reactionDescriptions, reactionImages } from "@/utils/constants/reactionsMapping";



export default function MeuHumor() {
  const [moods, setMoods] = useState<Mood[]>([]);
  const [lastMood, setLastMood] = useState<Mood | null>(null);
  const [todayMood, setTodayMood] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const [createDialog, setCreateDialog] = useState<boolean>(false);
  const { userAuth } = useAuthContext();
  const router = useRouter();

  if (userAuth == null) {
    router.push("/login");
  }

  const handleDeleteMood = (id: string) => {
    setMoods(prev => prev.filter(mood => mood.id !== id));
  };

  useEffect(() => {
    const fetchMoods = async () => {
      try {
        const moodsFromBackend = await moodService.getMoods();

        const moodsWithSelected: Mood[] = moodsFromBackend.map((mood) => ({
          ...mood,
          selected: false,
        }));

        setMoods(moodsWithSelected);
      } catch (err) {
        console.error("Erro ao buscar moods:", err);
      }
    };
    fetchMoods();
  }, [refreshKey]);

  const lastMoods =
    moods.length >= 30
      ? moods.slice(-30)
      : moods.length >= 15
      ? moods.slice(-15)
      : moods.length >= 7
      ? moods.slice(-7)
      : [];

  const handleMoodCreated = (newMood: Mood) => {
    setLastMood(newMood);
    setTodayMood(reactionDescriptions[newMood.mood as Reaction]);
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <>
      {userAuth && (
        <div className="w-full p-4 md:p-12">
          <div className="flex justify-between items-center">
              <h1 className="font-bold text-xl text-center md:text-left md:text-3xl w-full"> Meu Humor </h1>
              <div className="flex items-center gap-2">
                <LoggedUser userName={userAuth.displayName ?? ""} userEmail={userAuth.email ?? ""} image={""}/>
              </div>
          </div>
          <div className="flex flex-col gap-4 mt-12">
              <div className="w-full flex justify-center">
                <span className="justify-between text-rose-400">
                Como você define seu dia hoje?
                </span>
              </div>
              <MoodSelectorComponent
                  selectedMoodFromParent={todayMood}
                  onMoodSelect={() => setCreateDialog(true)}
              />
          </div>
          
          {moods.length === 0 ? (
          <div className="mt-12">
              <MoodEmptyStateComponent onRegisterClick={() =>
              setCreateDialog(true)} />
          </div>
          ) : (
            <>
              <div className="my-12">
                  <Grid 
                    data={[...moods].sort((a, b) =>
                  new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime())}
                  type="Mood" 
                  user={userAuth} 
                  onDelete={handleDeleteMood} 
                  onSuccess={() => setRefreshKey(prev => prev + 1)} 
                  />
              </div>
                <MoodChart data={lastMoods} />
            </>
          )}
          {createDialog && (
          <Buttonsheet
            open={createDialog}
            onOpenChange={setCreateDialog}
            model="Mood"
            action="Create"
            user={userAuth}
            onSuccess={() =>
            setRefreshKey(prev => prev + 1)}
            onMoodCreated={handleMoodCreated}
          />
          )}
          <MyBot />
        </div>
      )}
    </>
  );
}
