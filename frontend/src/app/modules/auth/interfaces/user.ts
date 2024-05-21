export interface User {
  accounttype: string;
  fname?: string | null | undefined;
  lname?: string | null | undefined;
  email?: string | null | undefined;
  town?: string | null | undefined;
  country?: string | null | undefined;
  password?: string | undefined;
  sendEmails?: boolean | undefined;
}
