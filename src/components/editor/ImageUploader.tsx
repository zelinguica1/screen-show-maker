import { useCallback, useRef, useState } from "react";
import { Upload, ImagePlus } from "lucide-react";

interface ImageUploaderProps {
  onUpload: (files: File[]) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files) return;
      const images = Array.from(files).filter((f) => f.type.startsWith("image/"));
      if (images.length > 0) onUpload(images);
    },
    [onUpload]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles]
  );

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={`
        relative flex flex-col items-center justify-center gap-3 p-8
        border-2 border-dashed rounded-lg cursor-pointer transition-all duration-200
        ${isDragging
          ? "border-primary bg-primary/10 scale-[1.02]"
          : "border-border hover:border-muted-foreground hover:bg-secondary/50"
        }
      `}
    >
      <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
        {isDragging ? (
          <ImagePlus className="w-6 h-6 text-primary" />
        ) : (
          <Upload className="w-6 h-6 text-muted-foreground" />
        )}
      </div>
      <div className="text-center">
        <p className="text-sm font-medium text-foreground">
          {isDragging ? "Solte as imagens aqui" : "Arraste imagens ou clique para enviar"}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          PNG, JPG, WebP — prints de tela do sistema
        </p>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
};
