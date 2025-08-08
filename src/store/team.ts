import { create } from "zustand";
import {
  Team,
  CreateTeamInput,
  UpdateTeamInput,
  TeamFilters,
  TeamSort,
  PaginationConfig,
} from "@/lib/types";
import { sleep, generateId } from "@/lib/utils";
import { mockTeams } from "@/data/team";
import { TeamFormData } from "@/lib/validations/team";

interface TeamsState {
  // Data
  teams: Team[];
  filteredTeams: Team[];

  // UI State
  loading: boolean;
  error: string | null;

  // Filters & Sorting
  filters: TeamFilters;
  sort: TeamSort;
  pagination: PaginationConfig;

  // Modal State
  isCreateModalOpen: boolean;
  isEditModalOpen: boolean;
  editingTeam: Team | null;
  isDeleteDialogOpen: boolean;
  deletingTeam: Team | null;

  // Drawer State
  isCreateDrawerOpen: boolean;
  isEditDrawerOpen: boolean;
  editingTeamDrawer: Team | null;

  // Confirmation Modal State
  isCreateConfirmModalOpen: boolean;
  isEditConfirmModalOpen: boolean;
  pendingCreateData: TeamFormData | null;
  pendingEditData: TeamFormData | null;

  // Actions
  setFilters: (filters: Partial<TeamFilters>) => void;
  setSort: (sort: TeamSort) => void;
  setPagination: (pagination: Partial<PaginationConfig>) => void;
  applyFiltersAndSort: () => void;

  // CRUD Operations
  createTeam: (input: CreateTeamInput) => Promise<void>;
  updateTeam: (input: UpdateTeamInput) => Promise<void>;
  deleteTeam: (id: string) => Promise<void>;

  // Modal Actions
  openCreateModal: () => void;
  closeCreateModal: () => void;
  openEditModal: (team: Team) => void;
  closeEditModal: () => void;
  openDeleteDialog: (team: Team) => void;
  closeDeleteDialog: () => void;

  // Drawer Actions
  openCreateDrawer: () => void;
  closeCreateDrawer: () => void;
  openEditDrawer: (team: Team) => void;
  closeEditDrawer: () => void;

  // Confirmation Modal Actions
  openCreateConfirmModal: (data: TeamFormData) => void;
  closeCreateConfirmModal: () => void;
  openEditConfirmModal: (data: TeamFormData) => void;
  closeEditConfirmModal: () => void;
  confirmCreateTeam: () => Promise<void>;
  confirmEditTeam: () => Promise<void>;

  // Utils
  resetError: () => void;
}

export const useTeamsStore = create<TeamsState>((set, get) => ({
  // Initial State
  teams: mockTeams,
  filteredTeams: mockTeams,
  loading: false,
  error: null,

  // Filters & Sorting
  filters: {
    search: "",
    entity: "",
    status: "all",
  },
  sort: {
    field: "updatedAt",
    direction: "desc",
  },
  pagination: {
    page: 1,
    pageSize: 10,
    totalItems: mockTeams.length,
    totalPages: Math.ceil(mockTeams.length / 10),
  },

  // Modal State
  isCreateModalOpen: false,
  isEditModalOpen: false,
  editingTeam: null,
  isDeleteDialogOpen: false,
  deletingTeam: null,

  // Drawer State
  isCreateDrawerOpen: false,
  isEditDrawerOpen: false,
  editingTeamDrawer: null,

  // Confirmation Modal State
  isCreateConfirmModalOpen: false,
  isEditConfirmModalOpen: false,
  pendingCreateData: null,
  pendingEditData: null,

  // Filter Actions
  setFilters: (newFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
      pagination: { ...state.pagination, page: 1 },
    }));
    get().applyFiltersAndSort();
  },

  setSort: (newSort) => {
    set({ sort: newSort });
    get().applyFiltersAndSort();
  },

  setPagination: (newPagination) => {
    set((state) => ({
      pagination: { ...state.pagination, ...newPagination },
    }));
  },

  applyFiltersAndSort: () => {
    const { teams, filters, sort } = get();

    // Apply filters
    let filtered = teams.filter((team) => {
      const matchesSearch =
        !filters.search ||
        team.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        team.code.toLowerCase().includes(filters.search.toLowerCase());

      const matchesEntity = team.entity
        .toLowerCase()
        .includes(filters.entity.toLowerCase());

      const matchesStatus =
        filters.status === "all" || team.status === filters.status;

      return matchesSearch && matchesStatus && matchesEntity;
    });

    // Apply sorting
    filtered.sort((a, b) => {
      const aValue = a[sort.field];
      const bValue = b[sort.field];

      if (aValue < bValue) return sort.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sort.direction === "asc" ? 1 : -1;
      return 0;
    });

    set((state) => ({
      filteredTeams: filtered,
      pagination: {
        ...state.pagination,
        totalItems: filtered.length,
        totalPages: Math.ceil(filtered.length / state.pagination.pageSize),
        page: Math.min(
          state.pagination.page,
          Math.ceil(filtered.length / state.pagination.pageSize) || 1
        ),
      },
    }));
  },

  // CRUD Operations with mock delays
  createTeam: async (input) => {
    set({ loading: true, error: null });

    try {
      // Simulate API delay
      await sleep(500);

      // Check for duplicate code
      const { teams } = get();
      const existingTeam = teams.find((team) => team.code === input.code);
      if (existingTeam) {
        throw new Error("Team code already exists");
      }

      const newTeam: Team = {
        ...input,
        id: generateId(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      set((state) => ({
        teams: [newTeam, ...state.teams],
        loading: false,
      }));

      get().applyFiltersAndSort();

      // Close both modal and drawer (whichever is open)
      get().closeCreateModal();
      get().closeCreateDrawer();
    } catch (error) {
      set({
        loading: false,
        error: error instanceof Error ? error.message : "Failed to create team",
      });
    }
  },

  updateTeam: async (input) => {
    set({ loading: true, error: null });

    try {
      // Simulate API delay
      await sleep(500);

      // Check for duplicate code (excluding current team)
      const { teams } = get();
      const existingTeam = teams.find(
        (team) => team.code === input.code && team.id !== input.id
      );
      if (existingTeam) {
        throw new Error("Team code already exists");
      }

      set((state) => ({
        teams: state.teams.map((team) =>
          team.id === input.id
            ? { ...team, ...input, updatedAt: new Date() }
            : team
        ),
        loading: false,
      }));

      get().applyFiltersAndSort();

      // Close both modal and drawer (whichever is open)
      get().closeEditModal();
      get().closeEditDrawer();
    } catch (error) {
      set({
        loading: false,
        error: error instanceof Error ? error.message : "Failed to update team",
      });
    }
  },

  deleteTeam: async (id) => {
    set({ loading: true, error: null });

    try {
      // Simulate API delay
      await sleep(500);

      set((state) => ({
        teams: state.teams.filter((team) => team.id !== id),
        loading: false,
      }));

      get().applyFiltersAndSort();
      get().closeDeleteDialog();
    } catch (error) {
      set({
        loading: false,
        error: error instanceof Error ? error.message : "Failed to delete team",
      });
    }
  },

  // Modal Actions
  openCreateModal: () => set({ isCreateModalOpen: true, error: null }),
  closeCreateModal: () => set({ isCreateModalOpen: false, error: null }),

  openEditModal: (team) =>
    set({
      isEditModalOpen: true,
      editingTeam: team,
      error: null,
    }),
  closeEditModal: () =>
    set({
      isEditModalOpen: false,
      editingTeam: null,
      error: null,
    }),

  openDeleteDialog: (team) =>
    set({
      isDeleteDialogOpen: true,
      deletingTeam: team,
      error: null,
    }),
  closeDeleteDialog: () =>
    set({
      isDeleteDialogOpen: false,
      deletingTeam: null,
      error: null,
    }),

  // Drawer Actions
  openCreateDrawer: () => set({ isCreateDrawerOpen: true, error: null }),
  closeCreateDrawer: () => set({ isCreateDrawerOpen: false, error: null }),

  openEditDrawer: (team) =>
    set({
      isEditDrawerOpen: true,
      editingTeamDrawer: team,
      error: null,
    }),
  closeEditDrawer: () =>
    set({
      isEditDrawerOpen: false,
      editingTeamDrawer: null,
      error: null,
    }),

  // Confirmation Modal Actions
  openCreateConfirmModal: (data) =>
    set({
      isCreateConfirmModalOpen: true,
      pendingCreateData: data,
      error: null,
    }),

  closeCreateConfirmModal: () =>
    set({
      isCreateConfirmModalOpen: false,
      pendingCreateData: null,
      error: null,
    }),

  openEditConfirmModal: (data) =>
    set({
      isEditConfirmModalOpen: true,
      pendingEditData: data,
      error: null,
    }),

  closeEditConfirmModal: () =>
    set({
      isEditConfirmModalOpen: false,
      pendingEditData: null,
      error: null,
    }),

  confirmCreateTeam: async () => {
    const { pendingCreateData } = get();
    if (pendingCreateData) {
      await get().createTeam(pendingCreateData);
      get().closeCreateConfirmModal();
    }
  },

  confirmEditTeam: async () => {
    const { pendingEditData, editingTeamDrawer } = get();
    if (pendingEditData && editingTeamDrawer) {
      await get().updateTeam({ ...pendingEditData, id: editingTeamDrawer.id });
      get().closeEditConfirmModal();
    }
  },

  resetError: () => set({ error: null }),
}));
