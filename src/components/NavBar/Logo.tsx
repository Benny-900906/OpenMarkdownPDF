export const Logo = () : JSX.Element => {
  return (
    <div className="flex flex-row items-center gap-2">
      <img src="/favicon.png" alt="Open Markdown PDF Logo" className="w-6 h-6 border-none" />
      <span className="font-custom text-[#ffffff] font-bold">Open Markdown PDF</span>
    </div>
    
  );
}