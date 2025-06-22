import Button from "../Button/Button"
import Textarea from "../TextArea/TextArea"
import DatePicker from "../DatePicker/DatePicker"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import { Label } from "../ui/label"
import Select from "../Select/Select"
import { useMemo, useState } from "react"
import axiosService from "@/services/AxiosService"
import { User as FirebaseUser } from "@firebase/auth"
import { Goal } from "@/interfaces/Goal"
import { Mood } from "@/interfaces/Mood"
import ConfirmAlert from "../ConfirmAlert/ConfirmAlert"
import { Reaction } from "@/utils/enums/Reaction"

interface ButtonsheetComponentProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    action: "Create" | "Edit"
    model: "Goal" | "Mood"
    user: FirebaseUser
    goal?: Goal
    mood?: Mood
    onSuccess?: () => void
    onMoodCreated?: (newMood: Mood) => void
}

const ButtonsheetComponent = ({ open, onOpenChange, action, model, user, goal, mood, onSuccess, onMoodCreated }: ButtonsheetComponentProps) => {
    const [newMood, setNewMood] = useState<number | null>(null);
    const [newNote, setNewNote] = useState<string>("");
    const [newTitle, setNewTitle] = useState<string>("");
    const [newDeadline, setNewDeadline] = useState<Date | undefined>(undefined);
    const [toEditMood, setToEditMood] = useState<number | undefined>(mood?.mood);
    const [toEditNote, setToEditNote] = useState<string | undefined>(mood?.note);
    const [toEditTitle, setToEditTitle] = useState<string | undefined>(goal?.title);
    const [toEditDeadline, setToEditDeadline] = useState<Date | undefined>(
        goal?.deadline ? new Date(goal.deadline) : undefined
    );
    const [openConfirm, setOpenConfirm] = useState<boolean>(false);
    const [titleError, setTitleError] = useState<string>("");
    const [deadlineError, setDeadlineError] = useState<string>("");
    const [noteError, setNoteError] = useState<string>("");
    const [moodError, setMoodError] = useState<string>("");

    const createGoal = async () => {
        try {
            if (!newTitle && !newDeadline){
                setTitleError("Este campo é obrigatório");
                setDeadlineError("Este campo é obrigatório");
            }else if(!newTitle) {
                setTitleError("Este campo é obrigatório");
            } else if (newTitle.length < 3 || newTitle.length > 300) {
                setTitleError("A meta deve ter entre 3 a 300 caracteres");
            } else if (!newDeadline) {
                setDeadlineError("Este campo é obrigatório");
            } else {
                await axiosService.post("/api/goals/", {
                    userId: user.uid,
                    title: newTitle,
                    deadline: newDeadline?.toISOString() || "",
                });
                onSuccess?.();
                onOpenChange(false);
            }
        }catch(error){
            console.error("Erro ao criar meta");
        }
    }

    const createMood = async () => {
        try {
            if(!newMood && !newNote) {
                setMoodError("Este campo é obrigatório");
                setNoteError("Este campo é obrigatório");
            } else if (!newMood) {
                setMoodError("Este campo é obrigatório");
            } else if(!newNote) {
                setNoteError("Este campo é obrigatório");
            } else if(newNote.length < 3 || newNote.length > 300) {
                setNoteError("O motivo deve ter entre 3 a 300 caracteres");
            } else {
                const response = await axiosService.post("/api/moods/", {
                    userId: user.uid,
                    mood: newMood,
                    note: newNote || "",
                });
                onMoodCreated?.(response.data);
                onSuccess?.();
                onOpenChange(false);
            }
        }catch(error){
            console.error("Erro ao criar reação");
        }
    }

    const editGoal = async () => {
        try {
            if (!toEditTitle && !toEditDeadline){
                setTitleError("Este campo é obrigatório");
                setDeadlineError("Este campo é obrigatório");
            }else if(!toEditTitle) {
                setTitleError("Este campo é obrigatório");
            } else if (toEditTitle.length < 3 || toEditTitle.length > 300) {
                setTitleError("A meta deve ter entre 3 a 300 caracteres");
            } else if (!toEditDeadline) {
                setDeadlineError("Este campo é obrigatório");
            } else {
                await axiosService.patch(`/api/goals/${goal?.id}`, {
                    title: toEditTitle,
                    deadline: toEditDeadline?.toISOString() || "",
                });
                onSuccess?.();
                onOpenChange(false);
            }
        } catch (error) {
            console.error("Erro ao criar meta");
        }
    }

    const editMood = async () => {
        try {
            if(!toEditMood && !toEditNote) {
                setMoodError("Este campo é obrigatório");
                setNoteError("Este campo é obrigatório");
            } else if (!toEditMood) {
                setMoodError("Este campo é obrigatório");
            } else if(!toEditNote) {
                setNoteError("Este campo é obrigatório");
            } else if(toEditNote.length < 3 || toEditNote.length > 300) {
                setNoteError("O motivo deve ter entre 3 a 300 caracteres");
            } else {
                await axiosService.patch(`/api/moods/${mood?.id}`, {
                    mood: toEditMood,
                    note: toEditNote,
                });
                onSuccess?.();
                onOpenChange(false);
            }
        } catch (error) {
            console.error("Erro ao criar meta");
        }
    }

    const selectMoods = useMemo(() => [
        { title: "Feliz", value: Reaction.Feliz },
        { title: "Mais ou menos", value: Reaction.MaisOuMenos },
        { title: "Indiferente", value: Reaction.Indiferente },
        { title: "Triste", value: Reaction.Triste },
        { title: "Frustado", value: Reaction.Frustrante },
    ], []);

    const handleOpenChange = (isOpen: boolean) => {
        if (!isOpen) {
            setNewMood(null);
            setNewNote("");
            setNewTitle("");
            setNewDeadline(undefined);
            setToEditMood(undefined);
            setToEditNote(undefined);
            setToEditTitle(undefined);
            setToEditDeadline(undefined);
        }
        onOpenChange(isOpen);
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {model === "Goal" ?
                            action === "Create" ? "Cadastrar meta" : "Editar meta"
                            :
                            action === "Create" ? "Cadastrar humor": "Editar humor"
                        }
                    </DialogTitle>
                    <DialogDescription className="text-[12px] p-2 bg-[var(--light-green)]/50 rounded-[8px] my-4">
                        {model === "Goal" ? 
                            <p>✍️ Escreva uma meta clara e possível. Pense no que você quer alcançar e até quando.<br />🌱 Lembre-se: metas simples são mais fáceis de acompanhar — e cada passo importa.</p>
                            :
                            <p>💬 Tire um momento para se escutar com carinho.<br />Registre como foi o seu dia com sinceridade — sem pressa, sem julgamentos.<br />Escolha a reação que mais representa como você se sentiu.</p>
                        }
                    </DialogDescription>
                </DialogHeader>
                    <form>
                        <div className="flex flex-col gap-8">
                            {model === "Goal" ?
                                action === "Create" ? (
                                    <>
                                        <div>
                                            <Textarea label="Sua meta:" placeholder="Ex: Meditar 10 minutos pela manhã." id="goal" value={newTitle} maxLength={300} onChange={(e) => { setTitleError(""); setNewTitle(e.target.value) }} className={titleError ? "border-red-700" : ""} required />
                                            <div className="text-right text-sm text-muted-foreground mt-1">
                                                {newTitle.length}/300
                                            </div>
                                            
                                            {titleError && <p className="text-red-700 text-[12px]">{titleError}</p>}
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <Label>Data de conclusão:</Label>
                                            <DatePicker selected={newDeadline} onSelect={(date) => { setDeadlineError(""); setNewDeadline(date) }} className={deadlineError ? "border-red-700" : ""} />
                                            {deadlineError && <p className="text-red-700 text-[12px]">{deadlineError}</p>}
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div>
                                            <Textarea label="Sua meta:" placeholder="Ex: Meditar 10 minutos pela manhã." id="goal" value={toEditTitle} maxLength={300} onChange={(e) => { setTitleError(""); setToEditTitle(e.target.value) }} className={titleError ? "border-red-700" : ""} required />
                                            <div className="text-right text-sm text-muted-foreground mt-1">
                                                {toEditTitle?.length}/300
                                            </div>
                                            {titleError && <p className="text-red-700 text-[12px]">{titleError}</p>}
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <Label>Data de conclusão:</Label>
                                            <DatePicker selected={toEditDeadline} onSelect={(date) => { setDeadlineError(""); setToEditDeadline(date) }} className={deadlineError ? "border-red-700" : ""}></DatePicker>
                                            {deadlineError && <p className="text-red-700 text-[12px]">{deadlineError}</p>}
                                        </div>
                                    </>
                                )
                                :
                                action === "Create" ? (
                                    <>
                                        <div className="flex flex-col gap-2">
                                            <Label>Humor escolhido:</Label>
                                            <Select placeholder="Escolha seu humor" items={selectMoods} onChange={(value) => { setMoodError(""); setNewMood(Number(value)) }} className={moodError ? "border-red-700" : ""} />
                                            {moodError && <p className="text-red-700 text-[12px]">{moodError}</p>}
                                        </div>
                                        <div>
                                            <Textarea label="Motivo" placeholder="Ex: Consegui me alimentar de forma saudável hoje." id="motive" maxLength={300} value={newNote} onChange={(e) => { setNoteError(""); setNewNote(e.target.value) }} className={noteError ? "border-red-700" : ""} required/>
                                            <div className="text-right text-sm text-muted-foreground mt-1">
                                                {newNote.length}/300
                                            </div>
                                            {noteError && <p className="text-red-700 text-[12px]">{noteError}</p>}
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="flex flex-col gap-2">
                                            <Label>Humor escolhido:</Label>
                                            <Select placeholder="Escolha seu humor" items={selectMoods} value={toEditMood} onChange={(value) => { setMoodError(""); setToEditMood(Number(value)) }} className={moodError ? "border-red-700" : ""} />
                                            {moodError && <p className="text-red-700 text-[12px]">{moodError}</p>}
                                        </div>
                                        <div>
                                            <Textarea label="Motivo" placeholder="Ex: Consegui me alimentar de forma saudável hoje." id="motive" value={toEditNote} onChange={(e) => { setNoteError(""); setToEditNote(e.target.value) }} maxLength={300} className={noteError ? "border-red-700" : ""} required/>
                                            <div className="text-right text-sm text-muted-foreground mt-1">
                                                {toEditNote?.length}/300
                                            </div>
                                            {noteError && <p className="text-red-700 text-[12px]">{noteError}</p>}
                                        </div>
                                    </>
                                )
                            }
                        </div>
                    </form>
                <DialogFooter>
                    <Button onClick={() => {
                        if (action === "Create") {
                            model === "Goal" ? createGoal() : createMood();
                        } else {
                            model === "Goal" ? editGoal() : editMood();
                        }
                    }} className="mt-4">SALVAR
                    </Button>

                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ButtonsheetComponent