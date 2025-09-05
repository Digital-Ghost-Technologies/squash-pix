import { supportedFormats } from '@/lib/constants';
import { Button } from './button';

interface FormatSelectorProps {
    selectedFormat: string;
    onFormatChange: (format: string) => void;
}

export function FormatSelector({ selectedFormat, onFormatChange }: FormatSelectorProps) {
    return (
        <div className="space-y-3">
            <label className="block text-sm font-medium text-foreground">
                Output Format
            </label>
            <div className="flex flex-row gap-4">
                {supportedFormats.map((format) => (
                    <Button
                        size="lg"
                        key={format.value}
                        onClick={() => onFormatChange(format.value)}
                        variant={selectedFormat === format.value ? 'default' : 'outline'}
                        className="cursor-pointer">
                        {format.label}
                    </Button>
                ))}
            </div>
        </div>
    );
}