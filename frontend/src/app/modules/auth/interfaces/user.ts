export interface User {
  id: number;
  companyId?: Number;
  accounttype: string;
  fname?: string | undefined;
  lname?: string | undefined;
  email?: string | undefined;
  town?: string | null | undefined;
  country?: string | undefined;
  password?: string | undefined;
  sendEmails?: boolean | undefined;
}
