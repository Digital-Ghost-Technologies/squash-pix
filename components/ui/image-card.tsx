"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ImageFile } from "@/lib/types/images";
import { Download, Trash2 } from "lucide-react";

interface ImageCardProps {
    image: ImageFile;
    onDelete: () => void;
    onDownload: () => void;
}

export function ImageCard({ image, onDelete, onDownload }: ImageCardProps) {
    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };

    const calculateCompressionRatio = (
        originalSize: number,
        compressedSize: number
    ): string => {
        if (compressedSize === 0 || originalSize === 0) return "0%";
        const ratio = ((originalSize - compressedSize) / originalSize) * 100;
        return `${Math.round(Math.max(0, ratio))}%`;
    };

    return (
        <Card className="w-full p-1">
            <CardContent className="flex items-center justify-between p-4">
                {/* Thumbnail + Info */}
                <div className="flex items-center gap-5">
                    <img
                        src={image.compressedUrl || image.originalUrl}
                        alt={image.file.name}
                        className="w-16 h-16 object-cover rounded-md border"
                    />
                    <div className="space-y-1">
                        <p className="text-sm font-medium">{image.file.name}</p>
                        <p className="text-xs text-muted-foreground">
                            Converted to {image.format.toUpperCase()}
                        </p>
                        <p className="text-sm text-muted-foreground">
                            {image.status === 'completed' && image.compressedSize > 0 ? (
                                <>
                                    <span className="text-emerald-600">{calculateCompressionRatio(image.originalSize, image.compressedSize)} smaller</span> (
                                    {formatFileSize(image.originalSize)} → {formatFileSize(image.compressedSize)})
                                </>
                            ) : image.status === 'processing' ? (
                                <span className="text-blue-600">Processing... {image.progress}%</span>
                            ) : image.status === 'error' ? (
                                <span className="text-red-600">Processing failed</span>
                            ) : (
                                <span className="text-gray-600">Size: {formatFileSize(image.originalSize)}</span>
                            )}
                        </p>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    <Button size="icon" variant="ghost" onClick={onDownload}>
                        <Download className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={onDelete}>
                        <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
