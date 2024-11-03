export interface Medication {
    id: number;
    name: string;
    time: string;
    frequency: string;
}

export interface TimePickerProps {
    hours: string;
    minutes: string;
    period: string;
    frequency: string;
    onChange: (field: string, value: string) => void;
}