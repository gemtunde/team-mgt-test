"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Team, TeamTableColumn } from "@/lib/types";
import {
  Edit2,
  Trash2,
  ArrowUpDown,
  Search,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useTeamsStore } from "@/store/team";
import { truncateText } from "@/lib/helpers";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { getInitialsFromFullName } from "@/lib/utils";
import { entities } from "@/data/team";

const columns: TeamTableColumn[] = [
  { key: "name", label: "Name", sortable: true },
  { key: "description", label: "Description", sortable: false },
  { key: "code", label: "Code", sortable: true },
  { key: "email", label: "Email", sortable: true },
  { key: "entity", label: "Entity", sortable: true },
  { key: "manager", label: "Manager", sortable: true },
  { key: "actions", label: "Actions", sortable: false, width: "120px" },
];

export function TeamTable() {
  const [mounted, setMounted] = useState(false);
  const {
    filteredTeams,
    filters,
    sort,
    pagination,
    loading,
    setFilters,
    setSort,
    setPagination,
    openCreateDrawer,
    openEditDrawer,
    openDeleteDialog,
  } = useTeamsStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Team Management
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Manage your teams and their information
            </p>
          </div>
          <Button disabled className="sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Create Team
          </Button>
        </div>
        {/* Show loading skeleton */}
        <div className="bg-white rounded-lg border p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  // Calculate paginated data
  const startIndex = (pagination.page - 1) * pagination.pageSize;
  const endIndex = startIndex + pagination.pageSize;
  const paginatedTeams = filteredTeams.slice(startIndex, endIndex);

  const handleSort = (field: keyof Team) => {
    const newDirection =
      sort.field === field && sort.direction === "asc" ? "desc" : "asc";

    setSort({ field, direction: newDirection });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ search: e.target.value });
  };

  const handleEntityChange = (entity: string) => {
    setFilters({ entity });
  };

  const handlePageChange = (newPage: number) => {
    setPagination({ page: newPage });
  };

  const getSortIcon = (field: keyof Team) => {
    if (sort.field !== field) return <ArrowUpDown className="ml-1 h-4 w-4" />;
    return (
      <ArrowUpDown
        className={`ml-1 h-4 w-4 ${sort.direction === "asc" ? "rotate-180" : ""}`}
      />
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-[16px] font-bold text-[#333]">Team Management</h1>
        </div>
      </div>
      <hr />

      {/* Filters */}
      <div className="flex flex-col md:flex-row items-center justify-between  sm:flex-row gap-4 p-4 rounded-lg">
        <div className="flex  flex-col md:flex-row items-center gap-4 justify-between">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by name or code..."
              value={filters.search}
              onChange={handleSearchChange}
              className="pl-10"
              aria-label="Search teams"
            />
          </div>
          <div className="w-[300px] sm:w-48">
            <Select value={filters.entity} onValueChange={handleEntityChange}>
              <SelectTrigger aria-label="Filter by entity">
                <SelectValue placeholder="Filter by entity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Banks</SelectItem>
                {entities.map((bank: string) => (
                  <SelectItem key={bank} value={bank}>
                    {bank}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button onClick={openCreateDrawer} className="sm:w-auto w-full">
          <Plus className="mr-2 h-4 w-4" />
          Create Team
        </Button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full" role="table" aria-label="Teams table">
            <thead className="bg-[#1659E6] text-white border-b">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className="px-4 py-3 text-left text-sm font-medium text-white"
                    style={column.width ? { width: column.width } : undefined}
                  >
                    {column.sortable ? (
                      <button
                        onClick={() => handleSort(column.key as keyof Team)}
                        className="flex items-center hover:text-gray-700 focus:outline-none focus:text-gray-700"
                        aria-label={`Sort by ${column.label}`}
                      >
                        {column.label}
                        {getSortIcon(column.key as keyof Team)}
                      </button>
                    ) : (
                      column.label
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-4 py-8 text-center"
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                      <span className="text-sm text-gray-500">
                        Loading teams...
                      </span>
                    </div>
                  </td>
                </tr>
              ) : paginatedTeams.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-4 py-8 text-center"
                  >
                    <div className="text-sm text-gray-500">
                      {filters.search || filters.status !== "all"
                        ? "No teams match your search criteria"
                        : "No teams found"}
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedTeams.map((team) => (
                  <tr key={team.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 text-sm font-medium text-gray-900">
                      {team.name}
                    </td>
                    <td className="px-4 py-4 text-sm font-mono text-gray-900">
                      {team.code}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600">
                      <span title={team.description}>
                        {truncateText(team.description, 25)}
                      </span>
                    </td>

                    <td className="px-4 py-4 text-sm text-gray-600">
                      <p>{team.email}</p>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600">
                      {team.entity}
                    </td>
                    <td className="flex items-center justify-start gap-2 px-4 py-4 text-sm text-gray-600">
                      <Avatar>
                        <AvatarFallback className="bg-[#1659E6] text-white">
                          {getInitialsFromFullName(team.manager)}
                        </AvatarFallback>
                      </Avatar>
                      <p>{team.manager}</p>
                    </td>

                    <td className="px-4 py-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            openEditDrawer(team);
                          }}
                          aria-label={`Edit ${team.name}`}
                          className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openDeleteDialog(team)}
                          aria-label={`Delete ${team.name}`}
                          className="text-red-600 hover:text-red-800 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="px-4 py-3 border-t bg-gray-50 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing {startIndex + 1} to{" "}
              {Math.min(endIndex, pagination.totalItems)} of{" "}
              {pagination.totalItems} results
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page <= 1}
                aria-label="Previous page"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <span className="text-sm text-gray-700">
                Page {pagination.page} of {pagination.totalPages}
              </span>

              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page >= pagination.totalPages}
                aria-label="Next page"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
