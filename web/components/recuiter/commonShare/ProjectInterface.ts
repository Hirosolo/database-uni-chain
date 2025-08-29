export interface Issuer {
  issuerName: string;
  description: string;
  issuerAddress: string;
  location: string;
  social: string[];
}

export interface Certificate {
  certificateId: string;
  certificateAddress: string;
  certificateName: string;
  type: string;
  level: string;
  points: number;
  ownerAddress: string;
  issuerName: string;
  issuedDate: string;
  expiryDate: string;
  description: string;
  skills: string[];
}

export interface Skill {
  skillID: string;
  skillName: string;
  field: string;
  description: string;
}

export interface SkillOfCertificate {
  skillID: string;
  certificateAddress: string;
}

export interface studentPersonalInformation {
  name: string;
  age: number;
  avatar: string;
  coverImage: string;
  bio: string;
  socialLinks: {
    website?: string;
    github?: string;
    linkedin?: string;
    email?: string;
  };
}

export interface Student {
  studentAddress: string;
  position: string;
  field?: string;            
  description?: string;      
  social?: string[];         
  personalInformation: studentPersonalInformation;
  points: number;
  rank: number;
  joinDate: string;
  NFTs: Certificate[];
}

export interface NFTFilters {
  type: string[];
  education: string[];
  level: string[];
}

export type FilterKey = 'type' | 'education' | 'level';
