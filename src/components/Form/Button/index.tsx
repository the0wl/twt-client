type InputDataType = {
  text: string;
  type?: "button" | "submit" | "reset";
  onClick?: Function
}

export default function Input({ text, type, onClick } : InputDataType) {
  const handleButtonClick = () => {
    if (!onClick) return 
    onClick()
  }

  return (
    <div className="flex mx-[30px] my-[26px]">
      <button 
        type={type} 
        className="flex bg-dark w-full h-[60px] items-center justify-center rounded-full"
        onClick={handleButtonClick}>
        <span className='font-bold text-md text-light'>
          {text}
        </span>
      </button>
    </div>
  )}