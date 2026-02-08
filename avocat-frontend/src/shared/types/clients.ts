export interface Client {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  status?: 'active' | 'inactive' | 'pending';
  type?: 'individual' | 'company';
  created_at?: string;
  updated_at?: string;
}

export interface ClientCreateDTO {
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  type?: 'individual' | 'company';
}

export interface ClientUpdateDTO extends Partial<ClientCreateDTO> {
  status?: 'active' | 'inactive' | 'pending';
}
