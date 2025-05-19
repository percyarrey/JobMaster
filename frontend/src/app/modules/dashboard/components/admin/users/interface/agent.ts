export interface agent {
  service: {
    name: string;
  };
  profile: {
    userId: string;
    profilePic: string;
    type: string;
    fname: string;
    lname: string;
    blockedStatus?: string;
  };
}
