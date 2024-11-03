
interface AppointmentProps {
  doctor: string;
  specialty: string;
  date: string; // Date as a string for display
}

const AppointmentCard = ({ doctor, specialty, date }: AppointmentProps) => {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
      <div>
        <p className="font-medium text-gray-800">{doctor}</p>
        <p className="text-sm text-gray-600">{specialty}</p>
      </div>
      <p className="text-sm text-blue-600">{date}</p>
    </div>
  );
};

export default AppointmentCard;