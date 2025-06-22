import { MouseEventHandler } from "react"

export interface Action {
    title: string
    onClick: MouseEventHandler<HTMLDivElement>
    icon: React.ReactNode
    className?: string
}