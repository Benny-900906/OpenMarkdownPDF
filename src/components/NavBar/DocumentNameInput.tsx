import { useDocumentNameStore } from '../../stores/useDocumentNameStore';

export const DocumentNameInput = () : JSX.Element => {

  const documentName : string = useDocumentNameStore((state) => state.documentName);
  const setDocumentName : (filename : string) => void = useDocumentNameStore((state) => state.setDocumentName);

  const handleDocNameChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setDocumentName(e.target.value);
  }

  return (
    <div className="sm:w-[50%] md:w-[70%] lg:w-[75%] flex flex-col">
      <span className="font-custom text-zinc-500 text-sm font-medium px-2">DOCUMENT NAME</span>
      <input 
        placeholder="untitled"
        className="font-custom p-2 outline-none text-[#000000] text-md font-normal bg-transparent"
        value={documentName}
        onChange={handleDocNameChange}
      />
    </div>
  );
}