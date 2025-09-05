import { QualityPreset, qualityPresets } from '@/lib/constants';
import { Settings, Zap } from 'lucide-react';
import { Button } from './button';

interface PresetSelectorProps {
    activePreset: string | null;
    onPresetSelect: (preset: QualityPreset) => void;
}

export function PresetSelector({ activePreset, onPresetSelect }: PresetSelectorProps) {

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2">
                <Settings className='w-4 h-4 text-indigo-500' />
                <span className="text-sm font-medium text-foreground">Quick Presets</span>
            </div>
            <div className="flex flex-row gap-8 space-y-2">
                {qualityPresets.map((preset) => (
                    <Button
                        key={preset.name}
                        variant={activePreset === preset.name ? 'default' : 'outline'}
                        className="flex flex-col text-left items-start h-full py-3 px-4 cursor-pointer"
                        onClick={() => onPresetSelect(preset)}
                    >
                        <div className='space-y-2'>
                            <h4>
                                {preset.name}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                                {preset.description}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                                <Zap className="w-3 h-3 text-indigo-500" />
                                <span className="text-xs text-muted-foreground">
                                    {preset.settings.format.toUpperCase()} @ {preset.settings.quality}%
                                </span>
                            </div>
                        </div>
                    </Button>
                ))}
            </div>
        </div>

    );
};
