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
import { Checkbox } from "@/components/ui/checkbox"
import { useMemo, useState } from "react"
import { Mood } from "@/interfaces/Mood"
import { Goal } from "@/interfaces/Goal"
import Dropdown from "../Dropdown/Dropdown"
import { Action } from "@/interfaces/Action"
import { Archive, Pencil, Trash2 } from "lucide-react"
import { formatBrazilianDate } from "@/utils/dateUtils"
import { Reaction } from "@/utils/enums/Reaction"
import { reactionImages } from "@/utils/constants/reactionsMapping"
import ButtonsheetComponent from "../Buttonsheet/Buttonsheet"
import { User } from "@firebase/auth"
import ConfirmAlertComponent from "../ConfirmAlert/ConfirmAlert"
import { moodService } from "@/services/moodService"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../ui/pagination"

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


    const handleDelete = async () => {
        if (!itemToDelete) return;

        try {
            if(type == "Mood")
                await moodService.deleteMood(itemToDelete.id);
            onDelete?.(itemToDelete.id);

        } catch (error) {
            console.error("Erro ao excluir mood:", error);
        } finally {
            setSelectedMood(null); 
        }
    };

    const moodActions = (mood: Mood): Action[] => [
        {
            title: "Editar",
            icon: <Pencil size={16} />,
            onClick: () => {
                setSelectedModel("Mood");
                setSelectedMood(mood); 
                setAction("Edit");
                setOpen(true);
            }
        },
        {
            title: "Excluir",
            icon: <Trash2 size={16} />,
            onClick: () => {
                setItemToDelete(mood)
            }  
        }
    ]

    const goalActions = (goal: Goal): Action[] => [
        {
            title: "Marcar como concluída",
            icon: <Archive size={16} />,
            onClick: () => console.log('Arquivar goal', goal.id)
        },
        {
            title: "Editar",
            icon: <Pencil size={16} />,
            onClick: () => {
                setSelectedModel("Goal");
                setSelectedGoal(goal); 
                setAction("Edit");
                setOpen(true)
            }
        },
        {
            title: "Excluir",
            icon: <Trash2 size={16} />,
            onClick: () => {
                setItemToDelete(goal)
            },
        }
    ]

    const columns = useMemo<ColumnDef<Mood | Goal>[]>(() => {
        if (type === 'Mood') {
            return [
                {
                    id: "select",
                    cell: ({ row }) => (
                    <Checkbox
                        checked={row.getIsSelected()}
                        onCheckedChange={(value) => row.toggleSelected(!!value)}
                        aria-label="Selecionar linha"
                    />
                    ),
                    enableSorting: false,
                    enableHiding: false,
                },
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
                    id: "select",
                    cell: ({ row }) => (
                        <Checkbox 
                            checked={row.getIsSelected()}
                            onCheckedChange={(value) => row.toggleSelected(!!value)}
                            aria-label="Selecionar linha"
                        />
                    ),
                    enableSorting: false,
                    enableHiding: false,
                    size: 60 // Tamanho fixo para o checkbox
                },
                {
                    accessorKey: "title",
                    header: "Título",
                    size: 500, // Tamanho aumentado para 500px
                    cell: ({ row }) => (
                        <div className="w-[500px] truncate">
                            {row.getValue("title")}
                        </div>
                    )
                },
                {
                    accessorKey: "deadline",
                    header: "Data de entrega",
                    size: 200, // Tamanho padrão para datas
                    cell: ({row}) => {
                        const rawDate = row.getValue<string>("deadline");
                        const date = new Date(rawDate);
                        return date.toISOString().split("T")[0];
                    }
                },
                {
                    id: "actions",
                    enableHiding: false,
                    size: 120, // Tamanho fixo para ações
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
                pageSize: 4
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
                    
                    {/* Mostra sempre a primeira página */}
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
                    
                    {/* Mostra ellipsis se não estiver perto do início */}
                    {table.getState().pagination.pageIndex > 2 && (
                        <PaginationItem>
                        <PaginationEllipsis />
                        </PaginationItem>
                    )}
                    
                    {/* Mostra páginas próximas à atual */}
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
                    
                    {/* Mostra ellipsis se não estiver perto do fim */}
                    {table.getState().pagination.pageIndex < table.getPageCount() - 3 && (
                        <PaginationItem>
                        <PaginationEllipsis />
                        </PaginationItem>
                    )}
                    
                    {/* Mostra sempre a última página */}
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
                            e.preventDefault()
                            table.nextPage()
                        }}
                        isActive={table.getCanNextPage()}
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

            { itemToDelete && (
                <ConfirmAlertComponent
                    onConfirm={handleDelete}
                    onClose={() => setItemToDelete(null)}
                />
                )
            }
        </div>
    )
}

export default GridComponent;