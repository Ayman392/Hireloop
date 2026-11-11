"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Trash2Icon } from "lucide-react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@workspace/ui/components/alert-dialog"
import { Button } from "@workspace/ui/components/button"
import { toast } from "@workspace/ui/components/toast"
import { deleteJob } from "@/lib/actions/jobs"

type JobRow = {
  id: string
  title: string
}

export function DeleteJobDialog({ job }: { job: JobRow }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDelete = async () => {
    setIsDeleting(true)
    setError(null)

    try {
      await deleteJob(job.id)
      toast.add({
        title: "Job post deleted successfully",
        description: `${job.title} was deleted successfully.`,
        type: "success",
      })
      setOpen(false)
      router.refresh()
    } catch (cause) {
      setError(
        cause instanceof Error ? cause.message : "Unable to delete this job."
      )
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <AlertDialog
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen)
        if (nextOpen) setError(null)
      }}
    >
      <AlertDialogTrigger
        render={
          <Button
            variant="outline"
            size="icon-xs"
            aria-label={`Delete ${job.title}`}
            title="Delete job"
            className="border-white/10 bg-transparent text-white/45 hover:border-red-400/30 hover:bg-red-400/10 hover:text-red-300"
          >
            <Trash2Icon aria-hidden="true" />
          </Button>
        }
      />
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete {job.title}?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete this job posting. This action cannot be
            undone.
          </AlertDialogDescription>
          {error && (
            <p role="alert" className="text-sm text-destructive">
              {error}
            </p>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleting}
            variant="destructive"
          >
            {isDeleting ? "Deleting…" : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
