import { buttonProps } from '../utils/interface';

const HomeButton = ({ title, bg, iconSrc, color }: buttonProps) => {
  return (
    <button
      className={`flex items-center gap-2 bg-${bg} hover:text-black p-2 text-[#172B4D] rounded-md h-[45px] text-[14px] font-semibold cursor-pointer text-${color}`}
    >
      {typeof iconSrc === 'string' ? <img src={iconSrc} alt='icon' /> : iconSrc}
      {title}
    </button>
  );
};

export default HomeButton;
