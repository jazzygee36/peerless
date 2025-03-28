import { useState } from 'react';
import MainModal from '../../components/modal';
import { Status } from '../../utils/mockApi';
import { DashboardTableProps, SelectedTableProps } from '../../utils/interface';

const color: Record<Status, string> = {
  Pending: 'orange',
  Completed: 'green',
  'In Progress': '#5534A5',
};

const DashboardTable = ({ data, updateStatus }: DashboardTableProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<SelectedTableProps | null>(null);
  const openModal = (transaction: SelectedTableProps) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setSelectedTransaction(null);
    setIsModalOpen(false);
  };
  return (
    <div className='overflow-x-auto'>
      <table className='w-full border-collapse border border-gray-300'>
        {/* Table Head */}
        <thead>
          <tr className='bg-[#F9FAFB]'>
            <th className='p-3 text-left border border-[#EAECF0] text-[#475467] text-[14px] font-medium'>
              ID
            </th>
            <th className='p-3 text-left border border-[#EAECF0] text-[#475467] text-[14px] font-medium'>
              Title
            </th>
            <th className='p-3 text-left border border-[#EAECF0] text-[#475467] text-[14px] font-medium'>
              Description
            </th>
            <th className='p-3 text-left border border-[#EAECF0] text-[#475467] text-[14px] font-medium'>
              Status
            </th>
            <th className='p-3 text-left border border-[#EAECF0] text-[#475467] text-[14px] font-medium'>
              Due Date
            </th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {data.map((item) => (
            <tr
              onClick={() => openModal(item)}
              key={item.id}
              className='even:bg-gray-100 hover:bg-gray-200 cursor-pointer'
            >
              <td className='p-3 border border-[#EAECF0]'>{item.id}</td>
              <td className='p-3 border border-[#EAECF0]'>{item.title}</td>
              <td className='p-3 border border-[#EAECF0]'>
                {item.description}
              </td>
              <td
                className='p-3 border border-[#EAECF0] relative'
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
              <td className='p-3 border border-[#EAECF0]'>{item.dueDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <MainModal isOpen={isModalOpen} onClose={closeModal}>
        {selectedTransaction ? (
          <div>
            <div className='flex justify-between '>
              <p className='text-[#475467] text-[14px] font-medium'>Title:</p>
              <p className='text-[#475467] text-[14px] font-bold'>
                {selectedTransaction.title}
              </p>
            </div>
            <hr className='my-4' />

            <div className='flex justify-between items-center'>
              <p className='text-[#475467] text-[14px] font-medium'>
                Description
              </p>
              <p className='text-[#475467] text-[14px] font-bold'>
                {selectedTransaction.description}
              </p>
            </div>
            <hr className='my-4' />

            <div className='flex justify-between items-center'>
              <p className='text-[#475467] text-[14px] font-medium'>DueDate</p>
              <p className='text-[#475467] text-[14px] font-bold'>
                {selectedTransaction.dueDate}
              </p>
            </div>
            <hr className='my-4' />

            <div className='flex justify-between items-center'>
              <p className='text-[#475467] text-[14px] font-medium '>Status</p>
              <span
                style={{ color: color[selectedTransaction.status as Status] }}
                className='text-[#475467] text-[14px] font-bold'
              >
                {selectedTransaction.status}
              </span>
            </div>
            <hr className='my-4' />

            <div className='flex justify-between items-center'>
              <p className='text-[#475467] text-[14px] font-medium'>
                Assigned by
              </p>
              <p className='text-[#475467] text-[14px] font-bold'>
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
