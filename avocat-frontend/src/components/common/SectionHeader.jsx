import { FaArrowLeft } from 'react-icons/fa';

const SectionHeader = ({ listName, icon, showBackButton }) => {
  return (
    <div className="relative flex flex-col items-center justify-center gap-4 rounded-3xl bg-gradient-day p-6 text-white shadow-lg transition-all duration-300 dark:bg-gradient-blue-dark dark:text-avocat-orange sm:flex-row sm:gap-8">
      {icon && (
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 shadow-md ring-1 ring-white/20 sm:absolute sm:left-6 sm:top-1/2 sm:h-20 sm:w-20 sm:-translate-y-1/2">
          <img
            src={icon}
            alt="Icon"
            className="h-12 w-12 object-contain drop-shadow-lg sm:h-14 sm:w-14"
          />
        </div>
      )}

      <h2 className="text-center text-xl font-extrabold tracking-wide sm:text-2xl md:text-3xl">
        {listName}
      </h2>

      {showBackButton && (
        <div className="sm:absolute sm:right-6 sm:top-1/2 sm:-translate-y-1/2">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 rounded-lg bg-gray-300 px-4 py-2 text-gray-800 shadow-md transition-transform duration-300 hover:scale-105 hover:bg-gray-400 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
          >
            <FaArrowLeft className="text-lg" />
            <span className="font-medium">رجوع</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default SectionHeader;
