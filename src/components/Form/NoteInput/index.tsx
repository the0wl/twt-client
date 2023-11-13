type NoteInputDataType = {
  name: string;
  type: string;
  placeholder: string;
  value: string;
  setValue: Function;
}

export default function NoteInput({ name, type, placeholder, value, setValue} : NoteInputDataType) {
  const handleTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    
    textarea.style.height = 'auto';

    if (textarea.value !== "") {
      textarea.style.height = textarea.scrollHeight + 'px';
    } else {
      textarea.style.height = '48px';
    } 

    setValue(textarea.value);
  };

  return (
    <div className="mx-[30px]">
      <textarea 
        id={name}
        name={name}
        value={value}
        onInput={handleTextArea}
        placeholder={placeholder}
        className={`h-12 w-full placeholder:text-semiLight
          ${type === 'title' ? "text-2xl font-semibold" : "text-base font-normal"}
          resize-none border-none focus:ring-0 focus:outline-none shadow-none`} />
    </div>
  )
}