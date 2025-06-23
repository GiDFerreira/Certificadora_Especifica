"use client"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useMemo, useState } from "react"
import { Mood } from "@/interfaces/Mood"
import { Goal } from "@/interfaces/Goal"
import Dropdown from "../Dropdown/Dropdown"
import { Action } from "@/interfaces/Action"
import { FileCheck, Pencil, Trash2 } from "lucide-react"
import { formatBrazilianDate } from "@/utils/dateUtils"
import { Reaction } from "@/utils/enums/Reaction"
import { reactionImages } from "@/utils/constants/reactionsMapping"
import ButtonsheetComponent from "../Buttonsheet/Buttonsheet"
import { User } from "@firebase/auth"
import ConfirmAlertComponent from "../ConfirmAlert/ConfirmAlert"
import { moodService } from "@/services/moodService"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../ui/pagination"
import { goalsService } from "@/services/goalsService"

interface GridComponentProps {
    data: Mood[] | Goal[]
    type: 'Mood' | 'Goal'
    user: User
    onDelete?: (id: string) => void
    onSuccess: () => void
}

const GridComponent = ({ data, type, user, onDelete, onSuccess }: GridComponentProps) => {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [open, setOpen] = useState(false);
    const [selectedModel, setSelectedModel] = useState<"Mood" | "Goal" | null>(null);
    const [action, setAction] = useState<"Create" | "Edit">("Edit");
    const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
    const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
    const [itemToDelete, setItemToDelete] = useState<Mood | Goal | null>(null);
    const [goalToCheck, setGoalToCheck] = useState<Goal | null>(null);

    const handleDelete = async () => {
        if (!itemToDelete) return;

        try {
            if(type === "Mood"){
                await moodService.deleteMood(itemToDelete.id);
                onDelete?.(itemToDelete.id);
            }
            if(type === "Goal") {
                await goalsService.deleteGoal(itemToDelete.id);
                onDelete?.(itemToDelete.id);
            }
        } catch (error) {
            console.error("Erro ao excluir mood");
        } finally {
            setSelectedMood(null); 
        }
    };

    const handleCheckGoal = async () => {
        if (!goalToCheck) return;

        try {
            await goalsService.checkGoal(goalToCheck.id);
            onSuccess();
        } catch(e) {
            console.error("Erro ao concluir meta");
        }
    }

    const moodActions = (mood: Mood): Action[] => [
        {
            title: "Editar",
            icon: <Pencil size={16} color="black" />,
            onClick: () => {
                setSelectedModel("Mood");
                setSelectedMood(mood); 
                setAction("Edit");
                setOpen(true);
            }
        },
        {
            title: "Excluir",
            icon: <Trash2 size={16} color="red" />,
            onClick: () => {
                setItemToDelete(mood)
            }  
        }
    ]

    const goalActions = (goal: Goal): Action[] => [
        {
            title: "Marcar como concluída",
            icon: <FileCheck size={16} color="black" />,
            onClick: () => {
                setGoalToCheck(goal);
            }
        },
        {
            title: "Editar",
            icon: <Pencil size={16} color="black" />,
            onClick: () => {
                setSelectedModel("Goal");
                setSelectedGoal(goal); 
                setAction("Edit");
                setOpen(true)
            }
        },
        {
            title: "Excluir",
            icon: <Trash2 size={16} color="red" />,
            onClick: () => {
                setItemToDelete(goal)
            },
            className: "text-red-700"
        }
    ]

    const columns = useMemo<ColumnDef<Mood | Goal>[]>(() => {
        if (type === 'Mood') {
            return [
               {
                    accessorKey: "mood",
                    header: "Reação",
                    cell: ({ row }) => {
                        const moodValue = row.getValue("mood") as 1 | 2 | 3 | 4 | 5;
                        const imgSrc = reactionImages[moodValue as Reaction];

                        return (
                        <div>
                            <img src={imgSrc} alt={`Reação ${moodValue}`} className="w-12 h-12" />
                        </div>
                        );
                    },
                },

                {
                    accessorKey: "note",
                    header: "Motivo",
                     cell: ({ row }) => (
                        <div className="whitespace-normal break-words max-w-xs">
                            {row.getValue("note")}
                        </div>
                    )
                },
                {
                    accessorKey: "createdAt",
                    header: "Data",
                    cell: ({ row }) => {
                        return (
                            <div>
                                {formatBrazilianDate(row.getValue("createdAt"))}
                            </div>
                        )
                    }
                },
        
                {
                    id: "actions",
                    enableHiding: false,
                    cell: ({ row }) => {
                        const mood = moodActions(row.original as Mood) 
                        return (
                            <Dropdown label="Ações" actions={mood} />
                        )
                    }
                }
            ]
        } else {
            return [
                {
                    accessorKey: "title",
                    header: "Título",
                    size: 500,
                    cell: ({ row }) => (
                        <div className="w-[500px] truncate">
                            {row.getValue("title")}
                        </div>
                    )
                },
                {
                    accessorKey: "deadline",
                    header: "Data de entrega",
                    size: 200,
                    cell: ({ row }) => {
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        const deadline =new Date(row.getValue("deadline"));

                        return (
                            <div className={deadline < today ? 'text-red-700' : ''}>
                                {formatBrazilianDate(row.getValue("deadline"))}
                            </div>
                        )
                    }
                },
                {
                    id: "actions",
                    enableHiding: false,
                    size: 120,
                    cell: ({ row }) => {
                        const goal = goalActions(row.original as Goal)
                        return <Dropdown label="Ações" actions={goal} />
                    }
                }
            ]
        }
        
    }, [type]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        initialState: {
            pagination: {
                pageSize: type === 'Mood' ? 4 : 8
            }
        },
        state: {
            columnFilters,
        },
    });

    const handleOpenChange = (isOpen: boolean) => {
        if (!isOpen) {
            setSelectedModel(null);
            setSelectedMood(null);
            setSelectedGoal(null);
        }
        setOpen(isOpen);
    };

    return (
        <div className="w-full">
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                            return (
                                <TableHead key={header.id}>
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                </TableHead>
                            )
                            })}
                        </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                            key={row.id}
                            data-state={row.getIsSelected() && "selected"}
                            >
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id}>
                                {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                )}
                                </TableCell>
                            ))}
                            </TableRow>
                        ))
                        ) : (
                        <TableRow>
                            <TableCell
                            colSpan={columns.length}
                            className="h-24 text-center"
                            >
                            Nenhum resultado encontrado.
                            </TableCell>
                        </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end py-4">
                <Pagination>
                    <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                            e.preventDefault()
                            table.previousPage()
                        }}
                        isActive={table.getCanPreviousPage()}
                        />
                    </PaginationItem>
                    
                    <PaginationItem>
                        <PaginationLink
                        href="#"
                        onClick={(e) => {
                            e.preventDefault()
                            table.setPageIndex(0)
                        }}
                        isActive={0 === table.getState().pagination.pageIndex}
                        >
                        1
                        </PaginationLink>
                    </PaginationItem>
                    
                    {table.getState().pagination.pageIndex > 2 && (
                        <PaginationItem>
                        <PaginationEllipsis />
                        </PaginationItem>
                    )}
                    
                    {Array.from({ length: table.getPageCount() })
                        .map((_, index) => index)
                        .filter(index => 
                        index > 0 && 
                        index < table.getPageCount() - 1 &&
                        Math.abs(index - table.getState().pagination.pageIndex) <= 1
                        )
                        .map(index => (
                        <PaginationItem key={index}>
                            <PaginationLink
                            href="#"
                            onClick={(e) => {
                                e.preventDefault()
                                table.setPageIndex(index)
                            }}
                            isActive={index === table.getState().pagination.pageIndex}
                            >
                            {index + 1}
                            </PaginationLink>
                        </PaginationItem>
                        ))}
                    
                    {table.getState().pagination.pageIndex < table.getPageCount() - 3 && (
                        <PaginationItem>
                        <PaginationEllipsis />
                        </PaginationItem>
                    )}
                    
                    {table.getPageCount() > 1 && (
                        <PaginationItem>
                        <PaginationLink
                            href="#"
                            onClick={(e) => {
                            e.preventDefault()
                            table.setPageIndex(table.getPageCount() - 1)
                            }}
                            isActive={(table.getPageCount() - 1) === table.getState().pagination.pageIndex}
                        >
                            {table.getPageCount()}
                        </PaginationLink>
                        </PaginationItem>
                    )}
                    
                    <PaginationItem>
                        <PaginationNext
                            href="#"
                            onClick={(e) => {
                            e.preventDefault();
                            if (table.getCanNextPage()) {
                                table.nextPage();
                            }
                            }}
                            className={!table.getCanNextPage() ? "pointer-events-none opacity-50" : ""}
                        />
                    </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>

            {selectedModel && (
                <ButtonsheetComponent
                    open={open}
                    onOpenChange={handleOpenChange}
                    model={selectedModel}
                    action={action}
                    user={user} 
                    mood={selectedModel === "Mood" ? selectedMood ?? undefined : undefined}
                    goal={selectedModel === "Goal" ? selectedGoal ?? undefined : undefined}
                    onSuccess={onSuccess}
                />
                )
            }

            {itemToDelete && (
                <ConfirmAlertComponent
                    onConfirm={handleDelete}
                    onClose={() => setItemToDelete(null)}
                />
                )
            }
            {goalToCheck && (
                <ConfirmAlertComponent
                    onConfirm={handleCheckGoal}
                    onClose={() => setGoalToCheck(null)}
                />
            )}
        </div>
    )
}

export default GridComponent;