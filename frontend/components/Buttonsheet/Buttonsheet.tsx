import Button from "../Button/Button"
import Input from "../Input/Input"
import DatePicker from "../DatePicker/DatePicker"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Label } from "../ui/label"
import Select from "../Select/Select"

interface ButtonsheetComponentProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    action: "Create" | "Edit"
    model: "Goal" | "Mood"
    onSave?: () => void //
}

const selectMoods = [
    {
        title: "Feliz",
        value: 1
    },
    {
        title: "Mais ou menos",
        value: 2
    },
    {
        title: "Indiferente",
        value: 3
    },
    {
        title: "Triste",
        value: 4
    },
    {
        title: "Frustado",
        value: 5
    },
]

const CreateGoal = () => {
    return (
        <>
            <Input label="Sua meta:" placeholder="Ex: Meditar 10 minutos pela manhã." id="goal" required />
            <div className="flex flex-col gap-2">
                <Label>Data de conclusão:</Label>
                <DatePicker></DatePicker>
            </div>
        </>
    )
}

const CreateMood = () => {
    return (
        <>
            <div className="flex flex-col gap-2">
                <Label>Humor escolhido:</Label>
                <Select placeholder="Escolha seu humor" items={selectMoods}></Select>
            </div>
            <Input label="Motivo" placeholder="Ex: Consegui me alimentar de forma saudável hoje." id="motive" required/>
        </>
    )
}

const EditGoal = () => {
    return (
        <>
            <Input label="Sua meta:" placeholder="Ex: Meditar 10 minutos pela manhã." id="goal" required />
            <div className="flex flex-col gap-2">
                <Label>Data de conclusão:</Label>
                <DatePicker></DatePicker>
            </div>
        </>
    )
}

const EditMood = () => {
    return (
        <>
            <div className="flex flex-col gap-2">
                <Label>Humor escolhido:</Label>
                <Select placeholder="Escolha seu humor" items={selectMoods}></Select>
            </div>
            <Input label="Motivo" placeholder="Ex: Consegui me alimentar de forma saudável hoje." id="motive" required/>
        </>
    )
}

const ButtonsheetComponent = ({ open, onOpenChange, action, model, onSave }: ButtonsheetComponentProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {model === "Goal" ? 
                            action === "Create" ? "Cadastrar meta" : "Editar meta"
                            :
                            action === "Create" ? "Cadastrar humor" : "Editar humor"
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
                                action === "Create" ? <CreateGoal /> : <EditGoal />
                                :
                                action === "Create" ? <CreateMood /> : <EditMood />
                            }
                        </div>
                    </form>
                <DialogFooter>
                    <Button onClick={onSave} className="mt-4">SALVAR</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ButtonsheetComponent