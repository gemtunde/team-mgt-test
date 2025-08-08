"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { teamSchema, type TeamFormData } from "@/lib/validations/team";
import { Team } from "@/lib/types";
import { Loader2 } from "lucide-react";
import { entities, managers } from "@/data/team";
import { useTeamsStore } from "@/store/team";

interface TeamFormProps {
  onSubmit: (data: TeamFormData) => Promise<void> | void;
  initialData?: Team | null;
  loading?: boolean;
  error?: string | null;
}

export function TeamForm({
  onSubmit,
  initialData,
  loading = false,
  error,
}: TeamFormProps) {
  const {
    closeCreateDrawer,
    closeEditDrawer,
    openCreateConfirmModal,
    openEditConfirmModal,
  } = useTeamsStore();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
    reset,
  } = useForm<TeamFormData>({
    resolver: zodResolver(teamSchema),
    mode: "onBlur",
    defaultValues: initialData
      ? {
          name: initialData.name,
          description: initialData.description,
          code: initialData.code,
          email: initialData.email,
          entity: initialData.entity,
          manager: initialData.manager,
          status: initialData.status,
        }
      : {
          name: "",
          description: "",
          code: "",
          email: "",
          entity: "",
          manager: "",
          status: "Active",
        },
  });

  const watchedStatus = watch("status");

  React.useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name,
        description: initialData.description,
        code: initialData.code,
        email: initialData.email,
        entity: initialData.entity,
        manager: initialData.manager,
        status: initialData.status,
      });
    }
  }, [initialData, reset]);

  const handleFormSubmit = async (data: TeamFormData) => {
    try {
      // If this is being used in a drawer, open confirmation modal
      // Otherwise, call onSubmit directly (for regular modal usage)
      if (initialData) {
        // For edit form, open edit confirmation modal
        openEditConfirmModal(data);
      } else {
        // For create form, open create confirmation modal
        openCreateConfirmModal(data);
      }
    } catch (err) {
      // Error handling is managed by the store
      console.error("Form submission error:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="space-y-6"
      noValidate
    >
      {error && (
        <div
          className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-md text-sm"
          role="alert"
          aria-live="polite"
        >
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6">
        {/* Entity */}
        <div className="space-y-2">
          <Label htmlFor="entity" className="text-sm font-medium">
            Entity *
          </Label>
          <Select
            value={watch("entity")}
            onValueChange={(value) => setValue("entity", value)}
            aria-invalid={!!errors.entity}
            aria-describedby={errors.entity ? "entity-error" : undefined}
          >
            <SelectTrigger
              className={
                errors.entity
                  ? "border-destructive focus-visible:ring-destructive"
                  : ""
              }
            >
              <SelectValue placeholder="Select a bank" />
            </SelectTrigger>
            <SelectContent>
              {entities.map((bank) => (
                <SelectItem key={bank} value={bank}>
                  {bank}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.entity && (
            <p
              id="entity-error"
              className="text-sm text-destructive"
              role="alert"
            >
              {errors.entity.message}
            </p>
          )}
        </div>

        {/* Team Name */}
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium">
            Team Name *
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="Enter team name"
            {...register("name")}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={
              errors.name
                ? "border-destructive focus-visible:ring-destructive"
                : ""
            }
          />
          {errors.name && (
            <p
              id="name-error"
              className="text-sm text-destructive"
              role="alert"
            >
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Team Code */}
        <div className="space-y-2">
          <Label htmlFor="code" className="text-sm font-medium">
            Code *
          </Label>
          <Input
            id="code"
            type="text"
            placeholder="e.g., DEV001"
            {...register("code")}
            aria-invalid={!!errors.code}
            aria-describedby={errors.code ? "code-error" : undefined}
            className={
              errors.code
                ? "border-destructive focus-visible:ring-destructive"
                : ""
            }
            style={{ textTransform: "uppercase" }}
          />
          {errors.code && (
            <p
              id="code-error"
              className="text-sm text-destructive"
              role="alert"
            >
              {errors.code.message}
            </p>
          )}
        </div>

        {/* Description - Full Width */}
        <div className="space-y-2">
          <Label htmlFor="description" className="text-sm font-medium">
            Description *
          </Label>
          <textarea
            id="description"
            rows={4}
            placeholder="Enter a detailed description of the team's purpose and responsibilities"
            {...register("description")}
            aria-invalid={!!errors.description}
            aria-describedby={
              errors.description ? "description-error" : undefined
            }
            className={`flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none ${
              errors.description
                ? "border-destructive focus-visible:ring-destructive"
                : ""
            }`}
          />
          {errors.description && (
            <p
              id="description-error"
              className="text-sm text-destructive"
              role="alert"
            >
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">
            Email *
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="team@company.com"
            {...register("email")}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={
              errors.email
                ? "border-destructive focus-visible:ring-destructive"
                : ""
            }
          />
          {errors.email && (
            <p
              id="email-error"
              className="text-sm text-destructive"
              role="alert"
            >
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Manager */}
        <div className="space-y-2">
          <Label htmlFor="manager" className="text-sm font-medium">
            Manager *
          </Label>
          <Select
            value={watch("manager")}
            onValueChange={(value) => setValue("manager", value)}
            aria-invalid={!!errors.manager}
            aria-describedby={errors.manager ? "manager-error" : undefined}
          >
            <SelectTrigger
              className={
                errors.manager
                  ? "border-destructive focus-visible:ring-destructive"
                  : ""
              }
            >
              <SelectValue placeholder="Select a manager" />
            </SelectTrigger>
            <SelectContent>
              {managers.map((manager) => (
                <SelectItem key={manager} value={manager}>
                  {manager}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.manager && (
            <p
              id="manager-error"
              className="text-sm text-destructive"
              role="alert"
            >
              {errors.manager.message}
            </p>
          )}
        </div>

        {/* Status */}
        <div className="space-y-2">
          <Label htmlFor="status" className="text-sm font-medium">
            Status *
          </Label>
          <Select
            value={watchedStatus}
            onValueChange={(value: "Active" | "Inactive") =>
              setValue("status", value, { shouldValidate: true })
            }
          >
            <SelectTrigger
              id="status"
              aria-invalid={!!errors.status}
              aria-describedby={errors.status ? "status-error" : undefined}
              className={
                errors.status
                  ? "border-destructive focus-visible:ring-destructive"
                  : ""
              }
            >
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          {errors.status && (
            <p
              id="status-error"
              className="text-sm text-destructive"
              role="alert"
            >
              {errors.status.message}
            </p>
          )}
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex items-center justify-center space-x-3 pt-4 border-t">
        <Button
          variant="outline"
          className="w-full"
          onClick={initialData ? closeEditDrawer : closeCreateDrawer}
        >
          Close
        </Button>
        <Button type="submit" disabled={loading || !isValid} className="w-full">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {initialData ? "Updating..." : "Creating..."}
            </>
          ) : initialData ? (
            "Update Team"
          ) : (
            "Create Team"
          )}
        </Button>
      </div>
    </form>
  );
}
