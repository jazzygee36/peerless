import { useState, useRef, useEffect } from 'react';
import { ListFilter } from 'lucide-react';
import MainDashboard from '../../components/mainDashboard';
import DashboardTable from './table';
import { Datas, Status } from '../../utils/mockApi';
import HomeButton from '../../components/button';

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState('');
  const [tasks, setTasks] = useState<
    {
      id: number;
      title: string;
      description: string;
      status: Status;
      dueDate: string;
      assigned: string;
    }[]
  >([]); // Initial data from mock API

  useEffect(() => {
    // Simulate fetching data from an API
    return setTasks(Datas);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filtered data based on selected status
  const filteredTasks = filter
    ? tasks.filter((item) => item.status === filter)
    : tasks;

  // Function to update task status
  const updateStatus = (id: number, newStatus: Status) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  };

  return (
    <MainDashboard title={'Dashboard'}>
      <div className='flex items-center justify-between'>
        <div></div>

        {/* Filter Button & Dropdown */}
        <div
          className='relative  hover:bg-[#F1EEF6] rounded-md p-1 cursor-pointer'
          onClick={() => setIsOpen(!isOpen)}
          ref={dropdownRef}
        >
          <HomeButton title={'Filter'} iconSrc={<ListFilter />} />

          {/* Dropdown Menu */}
          {isOpen && (
            <div className='absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md p-2 z-10'>
              {['Pending', 'In Progress', 'Completed'].map((status) => (
                <p
                  key={status}
                  className='cursor-pointer p-2 hover:bg-gray-100'
                  onClick={() => setFilter(status)}
                >
                  {status}
                </p>
              ))}
              <p
                className='cursor-pointer p-2 hover:bg-gray-100 text-red-500'
                onClick={() => setFilter('')}
              >
                Clear Filter
              </p>
            </div>
          )}
        </div>
      </div>

      <DashboardTable data={filteredTasks} updateStatus={updateStatus} />
    </MainDashboard>
  );
};

export default Dashboard;
