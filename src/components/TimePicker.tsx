import React from 'react';
import { TimePickerProps } from './types';

const TimePicker: React.FC<TimePickerProps> = ({ hours, minutes, period, frequency, onChange }) => {
    return (
        <div className="flex space-x-2">
            <select
                value={hours}
                onChange={(e) => onChange('hours', e.target.value)}
                className="px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
                {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
                    <option key={h} value={h.toString().padStart(2, '0')}>
                        {h.toString().padStart(2, '0')}
                    </option>
                ))}
            </select>

            <select
                value={minutes}
                onChange={(e) => onChange('minutes', e.target.value)}
                className="px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
                {Array.from({ length: 60 }, (_, i) => i).map((m) => (
                    <option key={m} value={m.toString().padStart(2, '0')}>
                        {m.toString().padStart(2, '0')}
                    </option>
                ))}
            </select>

            <select
                value={period}
                onChange={(e) => onChange('period', e.target.value)}
                className="px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
            </select>

            <select
                value={frequency}
                onChange={(e) => onChange('frequency', e.target.value)}
                className="px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
                <option value="once">Once</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
            </select>
        </div>
    );
};

export default TimePicker;