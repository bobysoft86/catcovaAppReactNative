export interface OrganizationModel {
  id: number;
  name: string;
  phone?: string;
  address?: string;
  email?: string;
  members?: any[];
  membersCount?: number;
  openingRules?: OrganizationOpeningRule[];
  openingExceptions?:OrganizationOpeningException;

}



export interface OrganizationOpeningRule {
  id            : number 
  organizationId: number
  weekday:         string
  startTime     : String
  endTime        :String
  createdAt     :Date
  updatedAt      :Date
}

export interface OrganizationOpeningException {
  id: number
  organizationId: number
  date: Date
  isClosed: Boolean
  startTime: String
  endTime?: String
  note?: String
  createdAt: Date
  updatedAt: Date
}

export interface UserOrganization {
  id: number;
  organizationId: number;
  userId: number;
  role: string;
}

export enum Weekday {
  MON,
  TUE,
  WED,
  THU,
  FRI,
  SAT,
  SUN,
}
