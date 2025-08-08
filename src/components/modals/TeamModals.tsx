"use client";
import React from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useTeamsStore } from "@/store/team";
import { Loader2 } from "lucide-react";
import Image from "next/image";

export function TeamModals() {
  const {
    isDeleteDialogOpen,
    isCreateConfirmModalOpen,
    isEditConfirmModalOpen,
    deletingTeam,
    pendingCreateData,
    pendingEditData,
    loading,
    deleteTeam,
    closeDeleteDialog,
    closeCreateConfirmModal,
    closeEditConfirmModal,
    confirmCreateTeam,
    confirmEditTeam,
  } = useTeamsStore();

  const handleDeleteConfirm = async () => {
    if (deletingTeam) {
      await deleteTeam(deletingTeam.id);
    }
  };

  const handleConfirmCreate = async () => {
    await confirmCreateTeam();
  };

  const handleConfirmEdit = async () => {
    await confirmEditTeam();
  };

  return (
    <>
      {/* Create Team Confirmation Modal */}
      <AlertDialog
        open={isCreateConfirmModalOpen}
        onOpenChange={closeCreateConfirmModal}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Team Creation</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to create the team "
              {pendingCreateData?.name}" with code "{pendingCreateData?.code}"?
              This will add the team to your organization.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmCreate} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Team"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {/* Edit Team Confirmation Modal */}
      <AlertDialog
        open={isEditConfirmModalOpen}
        onOpenChange={closeEditConfirmModal}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Team Update</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to update the team "{pendingEditData?.name}"
              with code "{pendingEditData?.code}"?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmEdit} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Team"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={closeDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader className="flex items-center justify-end">
            <Image
              src="/user-delete.svg"
              alt="delete team"
              width={50}
              height={50}
            />
            <AlertDialogTitle>Delete Team</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the team "{deletingTeam?.name}"?
              This action cannot be undone and will permanently remove all team
              data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="w-full">
            <AlertDialogCancel disabled={loading} className="w-full">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={loading}
              className=" w-full bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete Team"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
