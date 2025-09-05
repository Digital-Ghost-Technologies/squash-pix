"use client";

import { Zap } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Slider } from './slider';

interface QualitySliderProps {
    defaultQuality: number;
    onQualityCommit: (quality: number) => void;
    disabled?: boolean;
}

export function QualitySlider({ defaultQuality = 80, onQualityCommit, disabled = false }: QualitySliderProps) {

    const [quality, setQuality] = useState(defaultQuality);

    // Update local state when defaultQuality prop changes
    useEffect(() => {
        setQuality(defaultQuality);
    }, [defaultQuality]);

    const getQualityLabel = (value: number) => {
        if (value >= 90) return 'Highest';
        if (value >= 80) return 'High';
        if (value >= 70) return 'Medium';
        if (value >= 60) return 'Low';
        return 'Ultra Compressed';
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-foreground">
                    Compression Quality
                </label>
                <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-indigo-500" />
                    <span className="text-sm font-semibold">
                        {quality}% ({getQualityLabel(quality)})
                    </span>
                </div>
            </div>

            <div className="relative">
                <Slider
                    min={20}
                    max={100}
                    value={[quality]}
                    step={5}
                    onValueChange={(value) => setQuality(value[0])}
                    onValueCommit={(value) => onQualityCommit(value[0])}
                    disabled={disabled}
                />
            </div>
            <div className="flex justify-between text-xs">
                <span>More Compressed</span>
                <span>Higher Quality</span>
            </div>
        </div>
    );
}