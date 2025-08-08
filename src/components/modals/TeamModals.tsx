"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { TeamForm } from "@/components/forms/TeamForm";
import { TeamFormData } from "@/lib/validations/team";
import { useTeamsStore } from "@/store/team";
import { Loader2 } from "lucide-react";
import Image from "next/image";

export function TeamModals() {
  const {
    isCreateModalOpen,
    isEditModalOpen,
    isDeleteDialogOpen,
    isCreateConfirmModalOpen,
    isEditConfirmModalOpen,
    isSuccessModalOpen,
    successMessage,
    successType,
    editingTeam,
    deletingTeam,
    pendingCreateData,
    pendingEditData,
    loading,
    error,
    createTeam,
    updateTeam,
    deleteTeam,
    closeCreateModal,
    closeEditModal,
    closeDeleteDialog,
    closeCreateConfirmModal,
    closeEditConfirmModal,
    closeSuccessModal,
    confirmCreateTeam,
    confirmEditTeam,
  } = useTeamsStore();

  const handleCreateSubmit = async (data: TeamFormData) => {
    await createTeam(data);
  };

  const handleEditSubmit = async (data: TeamFormData) => {
    if (editingTeam) {
      await updateTeam({ ...data, id: editingTeam.id });
    }
  };

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
      {/* Create Team Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={closeCreateModal}>
        <DialogContent
          className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto"
          aria-describedby="create-team-description"
        >
          <DialogHeader>
            <DialogTitle>Create New Team</DialogTitle>
            <p
              id="create-team-description"
              className="text-sm text-muted-foreground"
            >
              Add a new team to your organization. All fields are required.
            </p>
          </DialogHeader>
          <TeamForm
            onSubmit={handleCreateSubmit}
            loading={loading}
            error={error}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Team Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={closeEditModal}>
        <DialogContent
          className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto"
          aria-describedby="edit-team-description"
        >
          <DialogHeader>
            <DialogTitle>Edit Team</DialogTitle>
            <p
              id="edit-team-description"
              className="text-sm text-muted-foreground"
            >
              Update the team information. All fields are required.
            </p>
          </DialogHeader>
          <TeamForm
            onSubmit={handleEditSubmit}
            initialData={editingTeam}
            loading={loading}
            error={error}
          />
        </DialogContent>
      </Dialog>

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
              with code "{pendingEditData?.code}"? This will modify the existing
              team information.
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
            <AlertDialogTitle className="text-center">
              Delete Team
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              Are you sure you want to delete the team "{deletingTeam?.name}"?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="w-full">
            <AlertDialogCancel disabled={loading} className="w-full">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={loading}
              className="w-full bg-destructive text-destructive-foreground hover:bg-destructive/90"
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

      {/* Success Modal */}
      <AlertDialog open={isSuccessModalOpen} onOpenChange={closeSuccessModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <Image
              src="/user-delete.svg"
              alt="delete team"
              width={50}
              height={50}
            />
            <AlertDialogTitle className="text-center">
              {successType === "create" && "Team Created Successfully!"}
              {successType === "update" && "Team Updated Successfully!"}
              {successType === "delete" && "Team Deleted Successfully!"}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              {successType === "create" &&
                `The team "${successMessage}" has been created and added to your organization.`}
              {successType === "update" &&
                `The team "${successMessage}" has been updated successfully.`}
              {successType === "delete" &&
                `The team "${successMessage}" has been deleted from your organization.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={closeSuccessModal}
              className="text-center"
            >
              Done
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
