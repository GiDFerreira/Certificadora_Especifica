import { X } from "lucide-react";
import Check from "@/public/concluida.png";
import Image from "next/image";
import { formatBrazilianDate } from "@/utils/dateUtils";
import Tooltip from "@/components/Tooltip/Tooltip";

interface CompletedGoalsComponent {
    metas: Goal[]
    onClose: (e: React.MouseEvent<HTMLDivElement>) => void
}

const CompletedGoalsComponent = ({ metas, onClose }: CompletedGoalsComponent) => {

    const trunkText = (text: string): string => {
        const limit = 80;
        if (text.length <= limit) return text;
        return text.substring(0, limit) + '...';
    }

    return (
        <div className="absolute flex flex-col gap-8 right-0 top-0 bottom-0 w-[380px] h-full bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
            <div>
                <div className="absolute top-2 right-2" onClick={onClose}>
                    <X size={18} />
                </div>
                {metas.length > 0 ?
                    <h1 className="text-[18px] font-semibold mb-1">As metas que você já concluiu</h1>
                    :
                    <h1 className="text-[18px] font-semibold mb-1">Você ainda não concluiu nenhuma meta</h1>
                }
                {
                    metas.length > 0 ?
                    <div className="text-[14px] text-[var(--gray)]">
                        <p>Você já concluiu <span className="text-[var(--darker-pink)]">{metas.length} metas</span> até aqui.</p>
                        <p>Cada uma delas é parte da sua história - pequenos passos que mostram o quanto você tem se cuidado.</p>
                        <p>E isso vale muito.</p>
                    </div>
                    :
                    <div className="text-[14px] text-[var(--gray)]">
                        <p>Conclua sua primeira meta para que você possa acompanhar sua evolução ao longo do tempo.</p>
                    </div>
                }
            </div>
            <div className="self-end flex flex-col gap-6 overflow-auto">
                {metas.map((meta, index) => (
                    <div key={index}>
                        <div className="flex gap-4 items-start w-[290px] bg-[var(--light-green)]/50 text-[14px] rounded-[8px] p-3">
                            <Image src={Check} className="w-4 h-4 mt-[2px]" alt="checked icon" />
                            <Tooltip content={meta.title}>
                                <p className="text-left">{trunkText(meta.title)}</p>
                            </Tooltip>
                        </div>
                        <p className="text-end text-[11px] text-[var(--black)]">Concluída em: {formatBrazilianDate(meta.completedDate)}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CompletedGoalsComponent;