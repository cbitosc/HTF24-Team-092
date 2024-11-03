import { Medication } from './types';

class NotificationManager {
    private static audioContext: AudioContext | null = null;
    private static notificationSound: AudioBuffer | null = null;
    private static notificationTimers: Map<number, NodeJS.Timeout> = new Map();

    static async initialize() {
        try {
            this.audioContext = new AudioContext();
            const response = await fetch('https://assets.mixkit.co/active_storage/sfx/933/933-preview.mp3');
            const arrayBuffer = await response.arrayBuffer();
            this.notificationSound = await this.audioContext.decodeAudioData(arrayBuffer);
            return true;
        } catch (error) {
            console.error('Failed to initialize audio:', error);
            return false;
        }
    }

    static async playNotificationSound() {
        if (!this.audioContext || !this.notificationSound) {
            await this.initialize();
        }

        try {
            if (this.audioContext?.state === 'suspended') {
                await this.audioContext.resume();
            }

            const source = this.audioContext!.createBufferSource();
            source.buffer = this.notificationSound!;
            source.connect(this.audioContext!.destination);
            source.start(0);
        } catch (error) {
            console.error('Failed to play notification sound:', error);
        }
    }

    static async showNotification(medicationName: string) {
        try {
            await this.playNotificationSound();

            // Create a custom notification UI element
            const notificationElement = document.createElement('div');
            notificationElement.className = 'fixed top-4 right-4 bg-white rounded-lg shadow-xl p-4 z-50 animate-slide-in';
            notificationElement.style.maxWidth = '300px';

            notificationElement.innerHTML = `
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <img src="https://cdn-icons-png.flaticon.com/512/822/822143.png" class="h-10 w-10" alt="Medication" />
          </div>
          <div class="ml-3 w-15 flex-1">
            <p class="text-sm font-medium text-gray-900">Time for Medication!</p>
            <p class="mt-1 text-sm text-gray-500">It's time to take ${medicationName}</p>
          </div>
          <button class="ml-4 text-gray-400 hover:text-gray-500 focus:outline-none">
            <span class="sr-only">Close</span>
            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      `;

            document.body.appendChild(notificationElement);

            // Add click handler to close button
            const closeButton = notificationElement.querySelector('button');
            closeButton?.addEventListener('click', () => {
                notificationElement.classList.add('animate-slide-out');
                setTimeout(() => notificationElement.remove(), 300);
            });

            // Auto-remove after 10 seconds
            setTimeout(() => {
                if (document.body.contains(notificationElement)) {
                    notificationElement.classList.add('animate-slide-out');
                    setTimeout(() => notificationElement.remove(), 300);
                }
            }, 10000);

        } catch (error) {
            console.error('Error showing notification:', error);
        }
    }

    static scheduleNotification(medication: Medication) {
        // Clear existing timer for this medication if it exists
        if (this.notificationTimers.has(medication.id)) {
            clearTimeout(this.notificationTimers.get(medication.id));
        }

        const [medTime, medPeriod] = medication.time.split(' ');
        let [medHours, medMinutes] = medTime.split(':');

        // Convert to 24-hour format
        let hours24 = parseInt(medHours);
        if (medPeriod === 'PM' && hours24 !== 12) {
            hours24 += 12;
        } else if (medPeriod === 'AM' && hours24 === 12) {
            hours24 = 0;
        }

        const now = new Date();
        const scheduledTime = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            hours24,
            parseInt(medMinutes)
        );

        // If time has passed today, schedule for tomorrow
        if (scheduledTime.getTime() < now.getTime()) {
            scheduledTime.setDate(scheduledTime.getDate() + 1);
        }

        const timeUntilNotification = scheduledTime.getTime() - now.getTime();
        console.log(`Scheduling notification for ${medication.name} in ${timeUntilNotification / 1000} seconds`);

        const timerId = setTimeout(async () => {
            await this.showNotification(medication.name);

            // Reschedule based on frequency
            if (medication.frequency === 'daily') {
                this.scheduleNotification(medication);
            } else if (medication.frequency === 'weekly') {
                medication.time = this.getNextWeekTime(scheduledTime);
                setTimeout(() => this.scheduleNotification(medication), 100);
            }
        }, timeUntilNotification);

        this.notificationTimers.set(medication.id, timerId);
        return timerId;
    }

    static getNextWeekTime(date: Date): string {
        const nextWeek = new Date(date);
        nextWeek.setDate(nextWeek.getDate() + 7);
        const hours = nextWeek.getHours();
        const minutes = nextWeek.getMinutes().toString().padStart(2, '0');
        const period = hours >= 12 ? 'PM' : 'AM';
        const hours12 = hours % 12 || 12;
        return `${hours12}:${minutes} ${period}`;
    }

    static clearNotification(medicationId: number) {
        if (this.notificationTimers.has(medicationId)) {
            clearTimeout(this.notificationTimers.get(medicationId));
            this.notificationTimers.delete(medicationId);
        }
    }
}

export default NotificationManager;