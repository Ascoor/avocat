export interface LegalCase {
  id: string;
  case_number?: string;
  title: string;
  description?: string;
  status?: 'open' | 'closed' | 'pending' | 'in_progress';
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  client_id?: string;
  lawyer_id?: string;
  court_id?: string;
  case_type?: string;
  filing_date?: string;
  hearing_date?: string;
  created_at?: string;
  updated_at?: string;
}

export interface LegalCaseCreateDTO {
  title: string;
  case_number?: string;
  description?: string;
  status?: 'open' | 'closed' | 'pending' | 'in_progress';
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  client_id?: string;
  lawyer_id?: string;
  court_id?: string;
  case_type?: string;
  filing_date?: string;
  hearing_date?: string;
}

export interface LegalCaseUpdateDTO extends Partial<LegalCaseCreateDTO> {}
