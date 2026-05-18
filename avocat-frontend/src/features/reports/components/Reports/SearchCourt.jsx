  import { useEffect, useState } from 'react';
  import axios from 'axios';
  import api from '@shared/services/api/axiosConfig';
  import { useLanguage } from '@shared/contexts/LanguageContext';
  import { Button } from '@shared/ui/button';
  import CourtSearchResults from '@features/courts/components/CourtSearchResults';

  const SearchCourt = () => {
    const { t, isRTL } = useLanguage();
    const ct = (key) => t(`documents.courtSearch.${key}`);

    const [allData, setAllData] = useState({
      search_degrees: [],
      search_courts: [],
      search_case_types: [],
    });
    const [selectedDegree, setSelectedDegree] = useState('');
    const [selectedCourt, setSelectedCourt] = useState('');
    const [selectedCaseType, setSelectedCaseType] = useState('');
    const [selectedCaseYear, setSelectedCaseYear] = useState('');
    const [selectedCaseNumber, setSelectedCaseNumber] = useState('');
    const [searchResults, setSearchResults] = useState(null);

    useEffect(() => {
      api
        .get('/search-court')
        .then((response) => {
          setAllData(response.data);
        })
        .catch((error) => console.log(error));
    }, []);

    const handleDegreeChange = (event) => {
      const degreeValue = event.target.value;
      setSelectedDegree(degreeValue);
      setSelectedCourt('');
      setSelectedCaseType('');
    };

    const handleCourtChange = (event) => {
      const courtValue = event.target.value;
      setSelectedCourt(courtValue);
      setSelectedCaseType('');
    };

    const handleCaseTypeChange = (event) => {
      const caseTypeValue = event.target.value;
      setSelectedCaseType(caseTypeValue);
    };

    const handleSubmit = (event) => {
      event.preventDefault();

      const formData = {
        degree: selectedDegree,
        court: selectedCourt,
        caseType: selectedCaseType,
        caseYear: selectedCaseYear,
        caseNumber: selectedCaseNumber,
      };

      axios
        .post('https://search-api-production-6209.up.railway.app/search', formData)
        .then((response) => {
          setSearchResults(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const fieldClass =
      'w-full rounded-xl border border-border bg-background/80 px-3 py-2.5 text-sm text-foreground shadow-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25';

    return (
      <div
        className="min-h-0 w-full bg-muted/20 px-3 py-4 sm:px-5 sm:py-6 lg:px-8 lg:py-8"
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <div className="mx-auto max-w-5xl space-y-5">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-lg font-bold tracking-tight text-foreground sm:text-xl">{ct('heading')}</h3>
          </div>

          <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-muted-foreground">{ct('degree')}</label>
                  <select className={fieldClass} value={selectedDegree} onChange={handleDegreeChange}>
                    <option value="">{ct('selectDegree')}</option>
                    {allData.search_degrees.map((degree) => (
                      <option key={degree.id} value={degree.degree_value}>
                        {degree.degree_name}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedDegree && (
                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-muted-foreground">{ct('court')}</label>
                    <select className={fieldClass} value={selectedCourt} onChange={handleCourtChange}>
                      <option value="">{ct('selectCourt')}</option>
                      {allData.search_courts
                        .filter((court) => court.degree_value === selectedDegree)
                        .map((court) => (
                          <option key={court.id} value={court.court_value}>
                            {court.court_name}
                          </option>
                        ))}
                    </select>
                  </div>
                )}

                {selectedCourt && (
                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-muted-foreground">{ct('caseType')}</label>
                    <select className={fieldClass} value={selectedCaseType} onChange={handleCaseTypeChange}>
                      <option value="">{ct('selectCaseType')}</option>
                      {allData.search_case_types
                        .filter(
                          (caseType) =>
                            caseType.degree_value === selectedDegree &&
                            caseType.court_value === selectedCourt,
                        )
                        .map((caseType) => (
                          <option key={caseType.id} value={caseType.case_type_value}>
                            {caseType.case_type_name}
                          </option>
                        ))}
                    </select>
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-muted-foreground">{ct('caseYear')}</label>
                  <input
                    type="number"
                    className={fieldClass}
                    value={selectedCaseYear}
                    onChange={(event) => setSelectedCaseYear(event.target.value)}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-muted-foreground">{ct('caseNumber')}</label>
                  <input
                    type="number"
                    className={fieldClass}
                    value={selectedCaseNumber}
                    onChange={(event) => setSelectedCaseNumber(event.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-1">
                <Button type="submit" className="min-w-[8rem]">
                  {ct('search')}
                </Button>
              </div>
            </form>
          </div>

          {searchResults && (() => {
            if (typeof searchResults === 'string') {
              return (
                <div className="rounded-2xl border border-border bg-card p-4 text-sm text-foreground shadow-sm sm:p-6">
                  <div className="court-search-results prose prose-sm max-w-none dark:prose-invert">
                    <div dangerouslySetInnerHTML={{ __html: searchResults }} />
                  </div>
                </div>
              );
            }
            // Unwrap common wrappers: {data: ...}, {result: ...}, {results: ...}
            let payload = searchResults;
            if (payload && typeof payload === 'object' && !Array.isArray(payload)) {
              if (payload.data !== undefined) payload = payload.data;
              else if (payload.result !== undefined) payload = payload.result;
              else if (payload.results !== undefined) payload = payload.results;
            }
            const items = Array.isArray(payload) ? payload : [payload];
            return (
              <div className="space-y-4">
                {items.map((item, idx) => (
                  <CourtSearchResults key={idx} data={item} />
                ))}
              </div>
            );
          })()}
        </div>
      </div>
    );
  };

  export default SearchCourt;
