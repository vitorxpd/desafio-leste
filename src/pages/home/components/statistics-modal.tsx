import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { isMobile } from '@/lib/utils'

import { StatisticsContent } from './statistics-content'

interface IStatisticsModalProps {
  open: boolean
  onClose: () => void
}

export function StatisticsModal({ open, onClose }: IStatisticsModalProps) {
  return (
    <>
      {isMobile && (
        <Drawer open={open} onClose={onClose}>
          <DrawerContent className="max-h-[320px]" onInteractOutside={onClose}>
            <DrawerHeader className="hidden">
              <DrawerTitle>Statiscs</DrawerTitle>
              <DrawerDescription>Gender and Language</DrawerDescription>
            </DrawerHeader>

            <StatisticsContent />
          </DrawerContent>
        </Drawer>
      )}

      {!isMobile && (
        <Dialog open={open} onOpenChange={onClose}>
          <DialogContent
            className="h-[400px] max-w-[440px] p-0"
            onInteractOutside={onClose}
          >
            <DialogHeader className="hidden">
              <DialogTitle>Statiscs</DialogTitle>
              <DialogDescription>Gender and Language</DialogDescription>
            </DialogHeader>

            <StatisticsContent />
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
