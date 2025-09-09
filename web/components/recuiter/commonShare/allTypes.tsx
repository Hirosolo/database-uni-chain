export type skill = {
  rank: number;
  name: string;
  learner: number;
  relatedCert: number;
  role?: string;
};

export type school ={
    rank: number;
    name: string; 
    role: string;
    candidates: number;
    certificates: number;
    logo?: string;
}

export type candidate = {
  rank: number;
  name: string;
  role: string;
  cerPoints: number;
  repuPoints: number;
  NFT: NFTDetail[];
  description?: string;
};

export type NFTDetail = {
  name: string;
  ownerAddress: string;
  type: string;
  status: string;
  issuer: string;
  issueDate: string;
  expiredDate: string;
  contractAddress: string;
  description: string;
  skills: string[];
};

export interface scan {
  timestamp: string;
  holder: string;
  hubContract: string;
  network: string;
}

export interface summary {
  totalCertificates: number;
  activeCertificates: number;
  expiredCertificates: number;
  totalReputationPoints: number;
  totalCertificatePoints: number;
}

export interface basic {
  contractAddress: string;
  tokenId: number;
  name: string;
  symbol: string;
  holder: string;
}

export interface details {
  level: number;
  points: number;
  issueDate: string;
  expireDate: string;
  mintDate: string;
  isExpired: boolean;
}

export interface issuer {
  address: string;
  name: string;
  description: string;
  location: string;
  website: string;
}

export interface metadata {
  tokenURI: string;
}

export interface blockchain {
  hubAddress: string;
  studentReputation: number;
}

export interface certificates {
  basic: basic;
  details: details;
  issuer: issuer;
  metadata: metadata;
  blockchain: blockchain;
}

export interface NFT {
  scan: scan;
  summary: summary;
  certificates: certificates[];
}
