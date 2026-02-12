import { useEffect, useState } from 'react';
import { getReportsMetadata } from '@shared/services/api/reports';

export const useReportsMetadata = () => {
  const [metadata, setMetadata] = useState({ lawyers: [], courts: [], procedureTypes: [] });

  useEffect(() => {
    let mounted = true;
    getReportsMetadata()
      .then((data) => {
        if (mounted) setMetadata(data);
      })
      .catch(() => {
        if (mounted) setMetadata({ lawyers: [], courts: [], procedureTypes: [] });
      });

    return () => {
      mounted = false;
    };
  }, []);

  return metadata;
};
