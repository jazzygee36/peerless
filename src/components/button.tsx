import { buttonProps } from '../utils/interface';

const HomeButton = ({ title, bg, iconSrc }: buttonProps) => {
  return (
    <button
      className={`flex items-center gap-2 bg-${bg} p-2 text-[#172B4D] rounded-md h-[45px] text-[14px] font-semibold cursor-pointer`}
    >
      {typeof iconSrc === 'string' && (
        <img src={iconSrc} alt='icon' className='w-5 h-5' />
      )}
      {title}
    </button>
  );
};

export default HomeButton;
