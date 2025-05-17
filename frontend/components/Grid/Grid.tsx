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

interface GridComponentProps {
    data: Mood[] | Goal[]
    type: 'Mood' | 'Goal'
}

const GridComponent = ({ data, type }: GridComponentProps) => {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    const moodActions = (mood: Mood): Action[] => [
        {
            title: "Editar",
            icon: <Pencil size={16} />,
            onClick: () => console.log('Editar mood', mood.id)
        },
        {
            title: "Excluir",
            icon: <Trash2 size={16} />,
            onClick: () => console.log('Excluir mood', mood.id),
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
            onClick: () => console.log('Editar goal', goal.id)
        },
        {
            title: "Excluir",
            icon: <Trash2 size={16} />,
            onClick: () => console.log('Excluir mood', goal.id),
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
                },
                {
                    accessorKey: "note",
                    header: "Motivo",
                },
                {
                    accessorKey: "date",
                    header: "Data",
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
                    size: 200 // Tamanho padrão para datas
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
        state: {
            columnFilters,
        },
    })
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
        </div>
    )
}

export default GridComponent;