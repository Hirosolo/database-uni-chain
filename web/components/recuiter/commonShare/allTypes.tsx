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
}

export type candidate = {
  rank: number;
  name: string;
  role: string;
  score: number;
  NFT: NFTDetail[];
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

export type Certificate = {
  basic: {
    contractAddress: string;
    tokenId: number;
    name: string;
    symbol: string;
    holder: string;
  };
  details: {
    level: number;
    points: number;
    issueDate: string;
    expireDate: string;
    mintDate: string | null;
    isExpired: boolean;
  };
  issuer: {
    address: string;
    name?: string;
    description?: string;
    location?: string;
    website?: string;
  };
  metadata: {
    description?: string;
    skills?: string;
    evidence?: string;
    image?: string;
    tokenURI: string;
  };
  blockchain: {
    hubAddress: string;
    studentReputation: number;
  };
};
