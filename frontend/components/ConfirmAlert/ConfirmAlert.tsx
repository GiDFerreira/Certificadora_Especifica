import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";

interface ConfirmAlertComponentProps {
  children: React.ReactNode
  onConfirm: () => void
}

const ConfirmAlertComponent = ({ children, onConfirm }: ConfirmAlertComponentProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        {children}
      </AlertDialogTrigger>
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
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Continuar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ConfirmAlertComponent;