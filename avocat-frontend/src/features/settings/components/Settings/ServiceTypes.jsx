import LookupManager from '../OfficeSettings/LookupManager';
import { useAuth } from '@shared/contexts/AuthContext';

const ServiceTypes = () => {
  const { user } = useAuth();
  const officeId = user?.officeId ?? user?.office_id;

  return (
    <LookupManager
      officeId={officeId}
      entity="service_types"
      titleKey="settings.lookups.entities.serviceTypes"
    />
  );
};

export default ServiceTypes;
