import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "../ui/alert-dialog"
import { useEffect, useState } from "react"

interface ConfirmAlertComponentProps {
  onConfirm: () => void
  onClose: () => void
}

const ConfirmAlertComponent = ({ onConfirm, onClose }: ConfirmAlertComponentProps) => {
  const [open, setOpen] = useState(true)

  useEffect(() => {
    setOpen(true)
  }, [])

  const handleConfirm = () => {
    onConfirm()
    setOpen(false)
    onClose()
  }

  const handleCancel = () => {
    setOpen(false)
    onClose()
  }

  return (
    <AlertDialog open={open} onOpenChange={(val) => !val && handleCancel()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Está tudo certo para continuar?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Essa é uma ação definitiva e não poderá ser revertida depois. Se você estiver seguro disso, pode seguir — estamos com você ;)
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel}>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>Continuar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ConfirmAlertComponent
