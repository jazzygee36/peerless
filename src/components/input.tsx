import { inputProps } from '../utils/interface';

const HomeInput = ({ type, placeholder, width }: inputProps) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className='h-[35px] placeholder:text-[14px] outline-none border border-[#EAEAEA] rounded-[5px] px-4 text-[14px] text-[#000]  focus:ring-1 focus:ring-[#A74F5D]'
      style={{ width: `${width}` }}
    />
  );
};

export default HomeInput;
