import { useRef, useState } from "react";
import { CloudUpload } from "lucide-react";

const EvidenceDropzone = ({ onFilesSelected }) => {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length) {
      onFilesSelected?.(files);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files || []);
    if (files.length) {
      onFilesSelected?.(files);
    }
  };

  return (
    <div
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-colors
        bg-slate-50 dark:bg-slate-800/50 
        border-slate-200 dark:border-slate-700
        hover:bg-slate-100 dark:hover:bg-slate-800
        ${isDragging ? "border-emerald-500 bg-emerald-50/60 dark:bg-emerald-500/10" : ""}`}
    >
      <input
        ref={fileInputRef}
        type="file"
        name="evidence"
        multiple
        accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
        className="hidden"
        onChange={handleFileChange}
      />

      <CloudUpload size={32} className="text-emerald-500 mb-2" />
      <p className="text-sm font-medium text-[#0d141b] dark:text-slate-300">
        Click to upload or drag and drop
      </p>
      <p className="text-xs text-slate-400 mt-1">
        PDF, JPG, PNG or DOCX (max. 10MB)
      </p>
    </div>
  );
};

export default EvidenceDropzone;
