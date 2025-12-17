export interface OrganizationModel {
  id: number;
  name: string;
  phone?: string;
  address?: string;
  email?: string;        
  members?: any[];
  membersCount?: number; 
}

export interface UserOrganization {
  id: number;
  organizationId: number;
  userId: number;
  role: string;
}