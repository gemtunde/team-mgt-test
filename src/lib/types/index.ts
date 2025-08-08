export interface Team {
  id: string;
  name: string;
  description: string;
  code: string;
  email: string;
  entity: string;
  manager: string;
  status: "Active" | "Inactive";
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTeamInput {
  name: string;
  description: string;
  code: string;
  email: string;
  entity: string;
  manager: string;
  status: "Active" | "Inactive";
}

export interface UpdateTeamInput extends CreateTeamInput {
  id: string;
}

export interface TeamFilters {
  search: string;
  entity: string;
  status: "all" | "Active" | "Inactive";
}

export interface TeamSort {
  field: keyof Team;
  direction: "asc" | "desc";
}

export interface PaginationConfig {
  page: number;
  pageSize: 10 | 20;
  totalItems: number;
  totalPages: number;
}

export interface TeamTableColumn {
  key: keyof Team | "actions";
  label: string;
  sortable?: boolean;
  width?: string;
}

export interface ApiError {
  message: string;
  field?: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: ApiError;
  loading: boolean;
}
