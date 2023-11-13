type InputDataType = {
  name: string;
  type: string;
  placeholder: string;
  value: string;
  setValue: Function;
}

export default function Input({ name, type, placeholder, value, setValue} : InputDataType) {
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setValue(value);
  };

  return (
    <div className="relative mx-[30px] my-[26px]">
      <label htmlFor={name}
        className="absolute px-4 text-dark bg-white ml-6 -mt-2 text-md font-semibold">{name}</label>
      <input 
        id={name}
        name={name}
        value={value}
        type={type}
        placeholder={placeholder}
        onChange={handleInput}
        className="h-[60px] w-full border border-dark rounded-full px-[36px]" />
    </div>
  )
}