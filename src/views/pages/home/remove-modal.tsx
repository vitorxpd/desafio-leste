import { Button } from '@/views/components/ui/button'

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../../components/ui/alert-dialog'

interface IRemoveModal {
  open: boolean
  onClose: () => void
  onRemove: () => void
}

export function RemoveModal({ open, onClose, onRemove }: IRemoveModal) {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="w-[320px] sm:w-fit">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete contact
            and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>

          <Button
            variant="destructive"
            className="!m-0"
            onClick={() => {
              onRemove()
              onClose()
            }}
          >
            Remove
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
