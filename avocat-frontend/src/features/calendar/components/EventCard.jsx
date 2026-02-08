const EventCard = ({ title, description, date }) => {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg">
      <h3 className="font-bold text-lg text-avocat-blue dark:text-avocat-orange">
        {title}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
      <p className="text-xs text-gray-500">📅 {date}</p>
    </div>
  );
};

export default EventCard;
