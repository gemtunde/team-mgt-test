"use client";
import React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
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
import { X, Loader2, Check } from "lucide-react";
import Image from "next/image";

export function TeamDrawers() {
  const {
    isCreateDrawerOpen,
    isEditDrawerOpen,
    isCreateConfirmModalOpen,
    isEditConfirmModalOpen,
    isSuccessModalOpen,
    successMessage,
    successType,
    editingTeamDrawer,
    pendingCreateData,
    pendingEditData,
    loading,
    error,
    closeCreateDrawer,
    closeEditDrawer,
    closeCreateConfirmModal,
    closeEditConfirmModal,
    closeSuccessModal,
    confirmCreateTeam,
    confirmEditTeam,
  } = useTeamsStore();

  const handleCreateSubmit = async (data: TeamFormData) => {
    // This will be handled by the form component now
    console.log("Create submit:", data);
  };

  const handleEditSubmit = async (data: TeamFormData) => {
    // This will be handled by the form component now
    console.log("Edit submit:", data);
  };

  const handleConfirmCreate = async () => {
    await confirmCreateTeam();
  };

  const handleConfirmEdit = async () => {
    await confirmEditTeam();
  };

  return (
    <>
      {/* Create Team Drawer */}
      <Drawer open={isCreateDrawerOpen} onOpenChange={closeCreateDrawer}>
        <DrawerContent
          className="h-[96vh] max-w-[600px] ml-auto px-8"
          aria-describedby="create-team-description"
        >
          <DrawerHeader className="flex items-center justify-between">
            <DrawerTitle>New Team</DrawerTitle>
            <div onClick={closeCreateDrawer} className="cursor-pointer">
              <X />
            </div>
          </DrawerHeader>
          <hr />
          <div className="px-4 pb-4 mt-4">
            <TeamForm
              onSubmit={handleCreateSubmit}
              loading={loading}
              error={error}
            />
          </div>
        </DrawerContent>
      </Drawer>

      {/* Edit Team Drawer */}
      <Drawer open={isEditDrawerOpen} onOpenChange={closeEditDrawer}>
        <DrawerContent
          className="h-[96vh] max-w-[600px] ml-auto px-8 overflow-y-auto"
          aria-describedby="edit-team-description"
        >
          <DrawerHeader className="text-left">
            <DrawerTitle>Edit Team</DrawerTitle>
            <p
              id="edit-team-description"
              className="text-sm text-muted-foreground"
            >
              Update the team information. All fields are required.
            </p>
          </DrawerHeader>
          <div className="px-4 pb-4">
            <TeamForm
              onSubmit={handleEditSubmit}
              initialData={editingTeamDrawer}
              loading={loading}
              error={error}
            />
          </div>
        </DrawerContent>
      </Drawer>

      {/* Create Team Confirmation Modal */}
      <AlertDialog
        open={isCreateConfirmModalOpen}
        onOpenChange={closeCreateConfirmModal}
      >
        <AlertDialogContent>
          <AlertDialogHeader className="flex items-center justify-end">
            <Image
              src="/user-setting.svg"
              alt="update team"
              width={50}
              height={50}
            />
            <AlertDialogTitle className="text-center">
              Confirm Team Creation
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              Are you sure you want to create the team "
              {pendingCreateData?.name}" with code "{pendingCreateData?.code}"?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="w-full">
            <AlertDialogCancel className="w-full" disabled={loading}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="w-full"
              onClick={handleConfirmCreate}
              disabled={loading}
            >
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
          <AlertDialogHeader className="flex items-center justify-end">
            <Image
              src="/user-setting.svg"
              alt="update team"
              width={50}
              height={50}
            />
            <AlertDialogTitle className="text-center">
              Update Team
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              Are you sure you want to update the team "{pendingEditData?.name}"
              with code "{pendingEditData?.code}"?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="w-full">
            <AlertDialogCancel className="w-full" disabled={loading}>
              Close
            </AlertDialogCancel>
            <AlertDialogAction
              className="w-full"
              onClick={handleConfirmEdit}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Yes, Update Team"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Success Modal */}
      <AlertDialog open={isSuccessModalOpen} onOpenChange={closeSuccessModal}>
        <AlertDialogContent>
          <AlertDialogHeader className="flex items-center justify-end">
            <div className="flex items-center justify-center bg-green-600 w-20 h-20 rounded-full">
              <Check className="w-15 h-15 text-white" />
            </div>
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
            <AlertDialogAction onClick={closeSuccessModal} className="w-full">
              Done
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {/* <AlertDialog open={isSuccessModalOpen} onOpenChange={closeSuccessModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-green-600">
              {successType === "create" && "Team Created Successfully!"}
              {successType === "update" && "Team Updated Successfully!"}
              {successType === "delete" && "Team Deleted Successfully!"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {successType === "create" &&
                `The team "${successMessage}" has been created and added to your organization.`}
              {successType === "update" &&
                `The team "${successMessage}" has been updated successfully.`}
              {successType === "delete" &&
                `The team "${successMessage}" has been deleted from your organization.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={closeSuccessModal}>
              OK
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog> */}
    </>
  );
}
