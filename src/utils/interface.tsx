import { ReactNode } from 'react';

export interface dashboardProps {
  title: string;
  setIsOpen?: (val: boolean) => void;
  isOpen?: boolean;
  children: React.ReactNode;
}
export interface headerProps {
  title: string;
}

export interface buttonProps {
  title: string;
  width?: string;
  height?: string;
  bg?: string;
  color?: string;
  iconSrc?: ReactNode;
}

export interface inputProps {
  placeholder: string;
  type: string;
  width: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}

export type Status = 'Pending' | 'In Progress' | 'Completed';

export interface DashboardTableProps {
  data: {
    id: number;
    title: string;
    description: string;
    status: Status;
    dueDate: string;
    assigned: string;
  }[];
  updateStatus: (id: number, newStatus: Status) => void;
  sortOrder: 'asc' | 'desc';
  setSortOrder: React.Dispatch<React.SetStateAction<'asc' | 'desc'>>;
}

export interface SelectedTableProps {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  status: string;
  assigned: string;
}
