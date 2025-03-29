export type Status = 'Pending' | 'In Progress' | 'Completed';

export const Datas: {
  id: number;
  title: string;
  description: string;
  status: Status;
  dueDate: string;
  assigned: string;
}[] = [
  {
    id: 1,
    title: 'Dashboard UI',
    description: 'Design the dashboard UI with charts and tables.',
    status: 'Pending',
    dueDate: '2025-10-01',
    assigned: 'John Doe',
  },
  {
    id: 2,
    title: 'Submit Btn',
    description: 'Submit button not functioning properly.',
    status: 'In Progress',
    dueDate: '2023-10-02',
    assigned: 'Daniel',
  },
  {
    id: 3,
    title: 'Pagination',
    description: 'Add pagination to the dashboard table.',
    status: 'Completed',
    dueDate: '2021-10-03',
    assigned: 'Samson',
  },
  {
    id: 4,
    title: 'Transaction Modal',
    description: 'Create the transaction modal transaction page.',
    status: 'Pending',
    dueDate: '2024-04-01',
    assigned: 'Thompson',
  },
  {
    id: 5,
    title: 'Reuseable Components',
    description: 'Implement reuseable component.',
    status: 'In Progress',
    dueDate: '2024-04-05',
    assigned: 'Dunsi',
  },
  {
    id: 6,
    title: 'Deploy to Production',
    description: 'Push the application to the live server.',
    status: 'Completed',
    dueDate: '2024-04-10',
    assigned: 'Paul',
  },
];
