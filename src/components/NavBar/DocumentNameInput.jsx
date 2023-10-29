import { useDocumentNameStore } from '../../stores/useDocumentNameStore';

export const DocumentNameInput = () => {

  const documentName = useDocumentNameStore((state) => state.documentName);
  const setDocumentName = useDocumentNameStore((state) => state.setDocumentName);

  const handleDocNameChange = (e) => {
    setDocumentName(e.target.value);
  }

  return (
    <div className="sm:w-[50%] md:w-[70%] lg:w-[75%] flex flex-col">
      <span className="font-custom text-[#000000] text-sm font-thin px-2">DOCUMENT NAME</span>
      <input 
        placeholder="untitled"
        className="font-custom p-2 outline-none text-[#000000] text-md font-normal bg-transparent"
        value={documentName}
        onChange={handleDocNameChange}
      />
    </div>
  );
}