import { useState } from 'react';
import { JudgeIcon } from '../../assets/icons/index';
import CourtType from './courtTools/CourtType';
import CourtLevel from './courtTools/CourtLevel';
import Court from './courtTools/Court';

const CourtSetting = () => {
  const [showAddCourtTypeModal, setShowAddCourtTypeModal] = useState(false);
  const [showAddCourtLevelModal, setShowAddCourtLevelModal] = useState(false);
  const [showAddCourtModal, setShowAddCourtModal] = useState(false);

  return (
    <div className="p-4 space-y-6 bg-gray-300 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
      <div className="text-center">
        <div className="flex justify-center items-center space-x-0 text-2xl font-bold text-avocat-blue dark:text-avocat-orange">
          <img src={JudgeIcon} alt="Icon" className="w-8 h-8 ml-4" />
          إعدادات المحاكم
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center m-4 space-y-2 sm:space-y-0 sm:space-x-2">
        <button
          onClick={() => setShowAddCourtTypeModal(true)}
          className="flex-1 px-4 py-2 bg-gradient-blue-button text-white rounded hover:bg-gradient-red-button transition duration-200"
        >
          إضافة تصنيف المحكمة
        </button>
        <button
          onClick={() => setShowAddCourtLevelModal(true)}
          className="flex-1 px-4 py-2 bg-gradient-yellow-button t text-white rounded hover:bg-gradient-red-button t transition duration-200"
        >
          إضافة درجة المحكمة
        </button>
        <button
          onClick={() => setShowAddCourtModal(true)}
          className="flex-1 px-4 py-2 bg-gradient-green-button  hover:bg-gradient-red-button   rounded   transition duration-200"
        >
          إضافة محكمة
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CourtLevel
          show={showAddCourtLevelModal}
          handleClose={() => setShowAddCourtLevelModal(false)}
        />
        <CourtType
          show={showAddCourtTypeModal}
          handleClose={() => setShowAddCourtTypeModal(false)}
        />
      </div>

      <Court
        show={showAddCourtModal}
        handleClose={() => setShowAddCourtModal(false)}
      />
    </div>
  );
};

export default CourtSetting;
