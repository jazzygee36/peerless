import { useState } from 'react';
import MainModal from '../../components/modal';
import { Status } from '../../utils/mockApi';
import { DashboardTableProps, SelectedTableProps } from '../../utils/interface';

const color: Record<Status, string> = {
  Pending: 'orange',
  Completed: 'green',
  'In Progress': '#5534A5',
};

const DashboardTable = ({
  data,
  updateStatus,
  sortOrder,
}: DashboardTableProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<SelectedTableProps | null>(null);

  const openModal = (transaction: SelectedTableProps) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedTransaction(null);
    setIsModalOpen(false);
  };

  return (
    <div className='overflow-x-auto'>
      <table className='min-w-full border-collapse border border-gray-300'>
        {/* Table Head */}
        <thead className='hidden md:table-header-group'>
          <tr className='bg-[#F9FAFB]'>
            <th className='p-3 border border-[#EAECF0] text-[#475467] text-sm font-medium text-left'>
              ID
            </th>
            <th className='p-3 border border-[#EAECF0] text-[#475467] text-sm font-medium text-left'>
              Title
            </th>
            <th className='p-3 border border-[#EAECF0] text-[#475467] text-sm font-medium text-left'>
              Description
            </th>
            <th className='p-3 border border-[#EAECF0] text-[#475467] text-sm font-medium text-left'>
              Status
            </th>
            <th className='p-3 border border-[#EAECF0] text-[#475467] text-sm font-medium text-left'>
              Due Date {sortOrder === 'asc' ? '↑' : '↓'}
            </th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {data.map((item) => (
            <tr
              onClick={() => openModal(item)}
              key={item.id}
              className='even:bg-gray-100 hover:bg-gray-200 cursor-pointer hidden md:table-row'
            >
              <td className='p-3 border border-[#EAECF0] text-sm'>{item.id}</td>
              <td className='p-3 border border-[#EAECF0] text-sm'>
                {item.title}
              </td>
              <td className='p-3 border border-[#EAECF0] text-sm'>
                {item.description}
              </td>
              <td
                className='p-3 border border-[#EAECF0]'
                onClick={(e) => e.stopPropagation()}
              >
                <select
                  className='px-2 py-1 rounded-md text-xs font-semibold border outline-none cursor-pointer'
                  style={{ color: color[item.status] }}
                  value={item.status}
                  onChange={(e) =>
                    updateStatus(item.id, e.target.value as Status)
                  }
                >
                  {Object.keys(color).map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </td>
              <td className='p-3 border border-[#EAECF0] text-sm'>
                {item.dueDate}
              </td>
            </tr>
          ))}

          {/* Mobile View */}
          {data.map((item) => (
            <tr
              key={item.id}
              className='md:hidden bg-white shadow-md rounded-lg p-4 my-2 block '
            >
              <td className='flex justify-between p-2'>
                <span className='text-gray-500 font-medium'>Title:</span>
                <span className='text-gray-700'>{item.title}</span>
              </td>
              <td className='flex justify-between p-2 '>
                <span className='text-gray-500 font-medium  '>
                  Description:
                </span>

                <span className='text-gray-500 font-medium text-right w-[60%]'>
                  {item.description}
                </span>
              </td>
              <td className='flex justify-between p-2'>
                <span className='text-gray-500 font-medium'>Status:</span>
                <select
                  className='px-2 py-1 rounded-md text-xs font-semibold border outline-none cursor-pointer'
                  style={{ color: color[item.status] }}
                  value={item.status}
                  onChange={(e) =>
                    updateStatus(item.id, e.target.value as Status)
                  }
                >
                  {Object.keys(color).map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </td>
              <td className='flex justify-between p-2'>
                <span className='text-gray-500 font-medium'>Due Date:</span>
                <span className='text-gray-700'>{item.dueDate}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      <MainModal isOpen={isModalOpen} onClose={closeModal}>
        {selectedTransaction ? (
          <div className='mt-6'>
            <div className='flex justify-between'>
              <p className='text-[#475467] text-sm font-medium'>Title:</p>
              <p className='text-[#475467] text-sm font-bold'>
                {selectedTransaction.title}
              </p>
            </div>
            <hr className='my-4' />

            <div className='flex justify-between items-center'>
              <p className='text-[#475467] text-sm font-medium'>Description</p>
              <p className='text-[#475467] text-sm font-bold '>
                {selectedTransaction.description}
              </p>
            </div>
            <hr className='my-4' />

            <div className='flex justify-between items-center'>
              <p className='text-[#475467] text-sm font-medium'>DueDate</p>
              <p className='text-[#475467] text-sm font-bold'>
                {selectedTransaction.dueDate}
              </p>
            </div>
            <hr className='my-4' />

            <div className='flex justify-between items-center'>
              <p className='text-[#475467] text-sm font-medium'>Status</p>
              <span
                style={{ color: color[selectedTransaction.status as Status] }}
                className='text-[#475467] text-sm font-bold'
              >
                {selectedTransaction.status}
              </span>
            </div>
            <hr className='my-4' />

            <div className='flex justify-between items-center'>
              <p className='text-[#475467] text-sm font-medium'>Assigned by</p>
              <p className='text-[#475467] text-sm font-bold'>
                {selectedTransaction.assigned}
              </p>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </MainModal>
    </div>
  );
};

export default DashboardTable;
