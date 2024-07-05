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
          <DrawerContent
            className="max-h-[320px] overflow-auto no-scrollbar"
            onInteractOutside={onClose}
          >
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
            className="h-[420px] max-w-[640px]"
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
