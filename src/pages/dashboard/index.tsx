import { useState, useRef, useEffect } from 'react';
import { ListFilter, CalendarDays } from 'lucide-react';
import MainDashboard from '../../components/dashboard';
import { Datas, Status } from '../../utils/mockApi';
import HomeButton from '../../components/button';
import HomeInput from '../../components/input';
import DashboardTable from './table';

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

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

  // Sort tasks by due date
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    return sortOrder === 'asc'
      ? new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      : new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
  });

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
      <div className='flex items-center justify-between mb-4 w-full'>
        <div className='hidden md:flex w-[60%]'>
          <HomeInput placeholder={'Search...'} type={'text'} width={'60%'} />
        </div>

        {/* Filter Button & Dropdown */}
        <div
          className='   flex items-center gap-2  justify-between '
          ref={dropdownRef}
        >
          <div
            className='hover:bg-[#F1EEF6]  rounded-md  cursor-pointer bg-[#A74F5D] text-white'
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          >
            <HomeButton
              title={'Sort by date'}
              iconSrc={<CalendarDays />}
              color={'white'}
            />
          </div>
          <div
            className='hover:bg-[#F1EEF6] rounded-md p-1 cursor-pointer'
            onClick={() => setIsOpen(!isOpen)}
          >
            <HomeButton title={'Filter'} iconSrc={<ListFilter />} />
          </div>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className='absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md p-2 z-10'>
              {['Pending', 'In Progress', 'Completed'].map((status) => (
                <p
                  key={status}
                  className='cursor-pointer p-2 hover:bg-gray-100'
                  onClick={() => {
                    setFilter(status);
                    setIsOpen(false);
                  }}
                >
                  {status}
                </p>
              ))}
              <p
                className='cursor-pointer p-2 hover:bg-gray-100 text-red-500'
                onClick={() => {
                  setFilter('');
                  setIsOpen(false);
                }}
              >
                Clear Filter
              </p>
            </div>
          )}
        </div>
      </div>

      <DashboardTable
        data={sortedTasks}
        updateStatus={updateStatus}
        setSortOrder={setSortOrder}
        sortOrder={sortOrder}
      />
    </MainDashboard>
  );
};

export default Dashboard;
