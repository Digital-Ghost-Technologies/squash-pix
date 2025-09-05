import { Image, Upload } from "lucide-react";
import React, { useCallback } from "react";

interface DropZoneProps {
    onFileSelected: (files: File[]) => void;
    isProcessing: boolean;
}

export const DropZone: React.FC<DropZoneProps> = ({ onFileSelected, isProcessing }) => {
    const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();

        const files = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('image/'));
        if (files.length > 0) {
            onFileSelected(files);
        }
    }, [onFileSelected]);

    const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []).filter(file => file.type.startsWith('image/'));
        if (files.length > 0) {
            onFileSelected(files);
        }
    }, [onFileSelected]);

    return (
        <div
            className={`relative border-dashed space-y-4 border-2 p-16 rounded-2xl shadow-sm text-center border-cyan-300 bg-gradient-to-br from-cyan-50 to-purple-50 hover:border-cyan-400 hover:from-cyan-100 hover:to-purple-100
                dark:border-cyan-400 dark:bg-gradient-to-br dark:from-cyan-800 dark:to-purple-700 dark:hover:border-cyan-300 dark:hover:from-cyan-700 dark:hover:to-purple-600
                ${isProcessing
                    ? 'cursor-not-allowed'
                    : 'cursor-pointer'}
            `}
            onDrop={handleDrop}
            onDragOver={handleDragOver}>
            <input type="file"
                multiple
                accept="image/*"
                onChange={handleFileInput}
                disabled={isProcessing}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="flex flex-col items-center gap-4">
                <div className="p-4 bg-primary rounded-2xl">
                    <Upload className="w-10 h-10 text-primary-foreground" />
                </div>
                <div className="space-y-4">
                    <h3 className="text-xl text-foreground">
                        {isProcessing ? 'Processing...' : 'Drag and drop your images here'}
                    </h3>
                    <p>
                        {isProcessing ? 'Please wait while we process your images.' : 'Or click to select files'}
                    </p>
                </div>
            </div>

            <div className="flex flex-row justify-center gap-2 items-center text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                    <Image className="w-4 h-4" />
                    <span>JPG</span>
                </div>
                <div className="flex items-center gap-1">
                    <Image className="w-4 h-4" />
                    <span>PNG</span>
                </div>
                <div className="flex items-center gap-1">
                    <Image className="w-4 h-4" />
                    <span>WebP</span>
                </div>
                <div className="flex items-center gap-1">
                    <Image className="w-4 h-4" />
                    <span>AVIF</span>
                </div>
            </div>
        </div>
    );
};
