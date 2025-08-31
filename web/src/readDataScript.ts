import { ethers } from 'ethers';
import axios from 'axios';
import fs from 'fs';
import path from 'path';

// Contract ABIs
const EDU_HUB_ABI = [
  "function authorizedIssuers(address) view returns (bool)",
  "function issuerMetaData(address) view returns (string)",
  "function eduNFTs(address) view returns (bool)",
  "function studentReputation(address) view returns (uint256)"
];

const CERT_NFT_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function tokenURI(uint256) view returns (string)",
  "function ownerOf(uint256) view returns (address)",
  "function balanceOf(address) view returns (uint256)",
  "function tokenOfOwnerByIndex(address, uint256) view returns (uint256)",
  "function tokenCounter() view returns (uint256)",
  "function point() view returns (uint256)",
  "function level() view returns (uint256)",
  "function issueDate() view returns (uint256)",
  "function expireDate() view returns (uint256)",
  "function owner() view returns (address)",
  "function issuer() view returns (address)",
  "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)"
];

// Configuration
const CONFIG = {
  RPC_URL: 'https://sepolia.base.org',
  HUB_ADDRESS: '0x4B581d01AFF9D688384F507208e56f70f71B1838',
  HOLDER_ADDRESS: '0x97BDEF86bC409CA4A65D361AC12B09F59C442178',
  KNOWN_CERT_CONTRACTS: [
    '0x42681995ee04EA5045c6392B13ABcF10748E6376'
  ]
};

interface NFTMetadata {
  image?: string;
  description?: string;
  skill?: string;
  evidence?: string;
  [key: string]: any;
}

interface IssuerMetadata {
  issuer?: {
    issuerName?: string;
    description?: string;
    location?: string;
    social?: string[];
  };
  [key: string]: any;
}

interface CertificateInfo {
  contractAddress: string;
  tokenId: number;
  name: string;
  symbol: string;
  level: number;
  point: number;
  issueDate: Date;
  expireDate: Date;
  mintDate: Date | null;
  holder: string;
  issuerAddress: string;
  issuerMetadata: IssuerMetadata;
  tokenURI: string;
  metadata: NFTMetadata;
  hubAddress: string;
  studentReputation: number;
  isExpired: boolean;
}

class NFTInfoRetriever {
  private provider: ethers.JsonRpcProvider;
  private hubAddress: string;

  constructor(rpcUrl: string, hubAddress: string) {
    this.provider = new ethers.JsonRpcProvider(rpcUrl);
    this.hubAddress = ethers.getAddress(hubAddress);
  }

  private async fetchIPFSData(ipfsUrl: string): Promise<any> {
    try {
      console.log(`Fetching IPFS data: ${ipfsUrl}`);
      
      if (!ipfsUrl || ipfsUrl.trim() === '') {
        console.warn('Empty IPFS URL provided');
        return {};
      }
      
      // Convert IPFS URL to HTTP gateway URL with multiple gateway fallbacks
      let httpUrl = ipfsUrl.trim();
      if (httpUrl.startsWith('ipfs://')) {
        const hash = httpUrl.replace('ipfs://', '');
        
        // Try multiple IPFS gateways in order
        const gateways = [
          `https://gateway.pinata.cloud/ipfs/${hash}`,
          `https://cloudflare-ipfs.com/ipfs/${hash}`,
          `https://dweb.link/ipfs/${hash}`,
          `https://ipfs.io/ipfs/${hash}`,
          `https://gateway.ipfs.io/ipfs/${hash}`
        ];
        
        for (const gateway of gateways) {
          try {
            console.log(`Trying gateway: ${gateway}`);
            const response = await axios.get(gateway, { 
              timeout: 10000,
              headers: {
                'Accept': 'application/json',
                'User-Agent': 'Mozilla/5.0 (compatible; NFTRetriever/1.0)'
              }
            });
            
            console.log(`✅ Successfully fetched IPFS data via ${gateway}`);
            return response.data;
          } catch (gatewayError) {
            const gatewayErrorMessage = gatewayError instanceof Error ? gatewayError.message : 'Unknown error';
            console.warn(`❌ Gateway ${gateway} failed: ${gatewayErrorMessage}`);
            continue;
          }
        }
        
        throw new Error('All IPFS gateways failed');
      } else {
        // Direct HTTP URL
        const response = await axios.get(httpUrl, { 
          timeout: 15000,
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'Mozilla/5.0 (compatible; NFTRetriever/1.0)'
          }
        });
        
        console.log(`✅ Successfully fetched data from ${httpUrl}`);
        return response.data;
      }
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.warn(`❌ Failed to fetch IPFS data from ${ipfsUrl}: ${errorMessage}`);
      return {};
    }
  }

  private async getTokensOwnedBy(contractAddress: string, holderAddress: string): Promise<number[]> {
    console.log(`Checking tokens owned by ${holderAddress} in contract ${contractAddress}`);
    
    try {
      // Ensure addresses are properly checksummed
      const checksummedContract = ethers.getAddress(contractAddress);
      const checksummedHolder = ethers.getAddress(holderAddress);
      
      const certContract = new ethers.Contract(checksummedContract, CERT_NFT_ABI, this.provider);
      
      const balance = await certContract.balanceOf(checksummedHolder);
      console.log(`Balance: ${balance} tokens`);
      
      if (Number(balance) === 0) {
        return [];
      }
      
      const tokens: number[] = [];
      
      // Try tokenOfOwnerByIndex first (ERC721Enumerable)
      try {
        for (let i = 0; i < Number(balance); i++) {
          const tokenId = await certContract.tokenOfOwnerByIndex(checksummedHolder, i);
          tokens.push(Number(tokenId));
        }
        console.log(`Found tokens via enumeration: ${tokens}`);
        return tokens;
      } catch (error) {
        console.log('tokenOfOwnerByIndex not available, scanning all tokens...');
      }
      
      // Fallback: check all tokens individually
      try {
        const tokenCounter = await certContract.tokenCounter();
        console.log(`Scanning ${tokenCounter} tokens...`);
        
        for (let tokenId = 0; tokenId < Number(tokenCounter); tokenId++) {
          try {
            const owner = await certContract.ownerOf(tokenId);
            if (owner.toLowerCase() === checksummedHolder.toLowerCase()) {
              tokens.push(tokenId);
              console.log(`Found owned token: ${tokenId}`);
            }
          } catch (error) {
            // Token doesn't exist or error - continue scanning
            continue;
          }
        }
      } catch (error) {
        console.warn('tokenCounter not available, cannot scan tokens');
      }
      
      return tokens;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error(`Error getting tokens owned by address: ${errorMessage}`);
      return [];
    }
  }

  private async getMintDate(contractAddress: string, tokenId: number): Promise<Date | null> {
    try {
      const certContract = new ethers.Contract(contractAddress, CERT_NFT_ABI, this.provider);
      
      // Get current block number to limit search range
      const latestBlock = await this.provider.getBlockNumber();
      const fromBlock = Math.max(0, latestBlock - 10000); // Limit to last 10k blocks to avoid RPC issues
      
      console.log(`Searching for mint event from block ${fromBlock} to ${latestBlock}`);
      
      // Get Transfer events for this token (from zero address = mint)
      const filter = certContract.filters.Transfer(ethers.ZeroAddress, null, tokenId);
      
      try {
        const events = await certContract.queryFilter(filter, fromBlock, 'latest');
        
        if (events.length > 0) {
          const mintEvent = events[0];
          const block = await this.provider.getBlock(mintEvent.blockNumber);
          if (block) {
            console.log(`✅ Found mint date: ${new Date(block.timestamp * 1000).toISOString()}`);
            return new Date(block.timestamp * 1000);
          }
        } else {
          console.log('No mint events found in recent blocks');
        }
      } catch (logsError) {
        console.warn('Event query failed, trying alternative approach...');
        
        // Alternative: try to get transaction receipt if we have recent transaction data
        // For now, just return null as fallback
        return null;
      }
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.warn(`Could not fetch mint date for token ${tokenId}: ${errorMessage}`);
    }
    return null;
  }

  async getCertificateInfo(
    contractAddress: string, 
    tokenId: number, 
    holderAddress: string,
    studentReputation: number
  ): Promise<CertificateInfo | null> {
    try {
      console.log(`\n📋 Processing Certificate: Contract ${contractAddress}, Token ${tokenId}`);
      
      // Ensure addresses are properly checksummed
      const checksummedContract = ethers.getAddress(contractAddress);
      const checksummedHolder = ethers.getAddress(holderAddress);
      
      const certContract = new ethers.Contract(checksummedContract, CERT_NFT_ABI, this.provider);
      const hubContract = new ethers.Contract(this.hubAddress, EDU_HUB_ABI, this.provider);

      // Verify ownership first
      console.log('🔍 Verifying ownership...');
      const owner = await certContract.ownerOf(tokenId);
      if (owner.toLowerCase() !== checksummedHolder.toLowerCase()) {
        console.log(`❌ Token ${tokenId} not owned by ${holderAddress}`);
        return null;
      }

      console.log('📊 Fetching basic contract data...');
      
      // Get basic contract data with error handling
      let name = 'Unknown';
      let symbol = 'UNK';
      let tokenURI = '';
      let issuerAddress = ethers.ZeroAddress;

      try {
        [name, symbol, tokenURI, issuerAddress] = await Promise.all([
          certContract.name(),
          certContract.symbol(),
          certContract.tokenURI(tokenId),
          certContract.issuer() // Use issuer() instead of owner()
        ]);
      } catch (error) {
        console.warn('Error fetching basic contract data, using defaults');
        // Try individually
        try { name = await certContract.name(); } catch (e) { /* use default */ }
        try { symbol = await certContract.symbol(); } catch (e) { /* use default */ }
        try { tokenURI = await certContract.tokenURI(tokenId); } catch (e) { /* use default */ }
        try { issuerAddress = await certContract.issuer(); } catch (e) { 
          // Fallback to owner() if issuer() doesn't exist (old contracts)
          try { issuerAddress = await certContract.owner(); } catch (e2) { /* use default */ }
        }
      }

      console.log(`✅ Basic data: ${name} (${symbol}), Issuer: ${issuerAddress}`);

      // Get other fields with individual error handling and fallbacks
      let point = 0;
      let level = 0;
      let issueDate = Math.floor(Date.now() / 1000);
      let expireDate = Math.floor(Date.now() / 1000) + (365 * 24 * 60 * 60);

      try {
        point = Number(await certContract.point());
        console.log(`✅ Point: ${point}`);
      } catch (error) {
        console.warn('⚠️ Could not fetch point, using default: 0');
      }

      try {
        level = Number(await certContract.level());
        console.log(`✅ Level: ${level}`);
      } catch (error) {
        console.warn('⚠️ Could not fetch level, using default: 0');
      }

      try {
        issueDate = Number(await certContract.issueDate());
        console.log(`✅ Issue Date: ${new Date(issueDate * 1000).toISOString()}`);
      } catch (error) {
        console.warn('⚠️ Could not fetch issueDate, using current time');
      }

      try {
        expireDate = Number(await certContract.expireDate());
        console.log(`✅ Expire Date: ${new Date(expireDate * 1000).toISOString()}`);
      } catch (error) {
        console.warn('⚠️ Could not fetch expireDate, using default (+1 year)');
      }

      console.log('🏢 Fetching issuer metadata...');
      
      // Get issuer metadata
      let issuerMetadata: IssuerMetadata = {};
      try {
        console.log(`Getting metadata for issuer: ${issuerAddress}`);
        const issuerMetaDataURI = await hubContract.issuerMetaData(issuerAddress);
        console.log(`Issuer metadata URI: ${issuerMetaDataURI}`);
        
        if (issuerMetaDataURI && issuerMetaDataURI.trim() !== '') {
          issuerMetadata = await this.fetchIPFSData(issuerMetaDataURI);
          
          // Display issuer info immediately after fetching
          if (issuerMetadata.issuer) {
            console.log(`✅ Issuer Data Retrieved:`);
            console.log(`   🏫 Name: ${issuerMetadata.issuer.issuerName || 'N/A'}`);
            console.log(`   📝 Description: ${issuerMetadata.issuer.description || 'N/A'}`);
            console.log(`   📍 Location: ${issuerMetadata.issuer.location || 'N/A'}`);
            console.log(`   🌐 Website: ${issuerMetadata.issuer.social?.[0] || 'N/A'}`);
          } else {
            console.log('✅ Issuer metadata fetched but no issuer object found');
          }
        } else {
          console.log('⚠️ No issuer metadata URI found');
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.warn(`Could not fetch issuer metadata: ${errorMessage}`);
      }

      console.log('🎨 Fetching token metadata...');
      
      // Get token metadata
      let metadata: NFTMetadata = {};
      if (tokenURI && tokenURI.trim() !== '') {
        metadata = await this.fetchIPFSData(tokenURI);
      }

      console.log('⏰ Fetching mint date...');
      
      // Get mint date
      const mintDate = await this.getMintDate(contractAddress, tokenId);

      const certInfo: CertificateInfo = {
        contractAddress: checksummedContract,
        tokenId,
        name,
        symbol,
        level: level,
        point: point,
        issueDate: new Date(issueDate * 1000),
        expireDate: new Date(expireDate * 1000),
        mintDate: mintDate || new Date(issueDate * 1000),
        holder: checksummedHolder,
        issuerAddress: ethers.getAddress(issuerAddress),
        issuerMetadata,
        tokenURI,
        metadata,
        hubAddress: this.hubAddress,
        studentReputation,
        isExpired: new Date(expireDate * 1000) < new Date()
      };

      console.log('✅ Certificate data retrieved successfully');
      return certInfo;

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error(`❌ Error getting certificate info for ${contractAddress}:${tokenId}: ${errorMessage}`);
      return null;
    }
  }

  async getAllCertificatesForHolder(holderAddress: string): Promise<CertificateInfo[]> {
    console.log(`\n🔍 Scanning for certificates owned by: ${holderAddress}`);
    
    const hubContract = new ethers.Contract(this.hubAddress, EDU_HUB_ABI, this.provider);
    const certificates: CertificateInfo[] = [];

    try {
      // Ensure holder address is properly formatted
      const checksummedHolder = ethers.getAddress(holderAddress);
      
      // Get student reputation
      console.log('📈 Getting student reputation...');
      let reputation = 0;
      try {
        reputation = Number(await hubContract.studentReputation(checksummedHolder));
        console.log(`Student reputation: ${reputation} points`);
      } catch (error) {
        console.warn('Could not fetch student reputation, using default: 0');
      }
      
      // Use known cert contracts
      const certContracts = [...CONFIG.KNOWN_CERT_CONTRACTS];
      
      // Try to discover more cert contracts by scanning recent blocks
      try {
        console.log('🔎 Discovering additional cert contracts...');
        const additionalContracts = await this.discoverCertContracts();
        certContracts.push(...additionalContracts);
      } catch (error) {
        console.warn('Contract discovery failed, using known contracts only');
      }

      // Remove duplicates
      const uniqueContracts = [...new Set(certContracts)];
      console.log(`📝 Checking ${uniqueContracts.length} cert contract(s)...`);

      for (const certContract of uniqueContracts) {
        try {
          console.log(`\n🔍 Scanning contract: ${certContract}`);
          
          // Ensure contract address is properly formatted
          const checksummedContract = ethers.getAddress(certContract);
          
          // Verify this is an eduNFT and get issuer info
          let isEduNFT = false;
          let issuerInfo = '';
          try {
            isEduNFT = await hubContract.eduNFTs(checksummedContract);
            if (isEduNFT) {
              // Get the real issuer address from the contract (not owner which is hub)
              const tempCertContract = new ethers.Contract(checksummedContract, CERT_NFT_ABI, this.provider);
              let issuerAddr = ethers.ZeroAddress;
              
              try {
                issuerAddr = await tempCertContract.issuer();
                console.log(`✅ Real issuer address: ${issuerAddr}`);
              } catch (e) {
                // Fallback to owner() for older contracts
                issuerAddr = await tempCertContract.owner();
                console.log(`⚠️ Using owner() as issuer (legacy): ${issuerAddr}`);
              }
              
              // Get issuer metadata to display during scanning
              try {
                const issuerMetaURI = await hubContract.issuerMetaData(issuerAddr);
                console.log(`Issuer metadata URI: ${issuerMetaURI}`);
                
                if (issuerMetaURI && issuerMetaURI.trim() !== '') {
                  const issuerMeta = await this.fetchIPFSData(issuerMetaURI);
                  if (issuerMeta.issuer?.issuerName) {
                    issuerInfo = issuerMeta.issuer.issuerName;
                    console.log(`🏫 Institution: ${issuerInfo}`);
                    console.log(`📝 Description: ${issuerMeta.issuer.description || 'N/A'}`);
                    console.log(`📍 Location: ${issuerMeta.issuer.location || 'N/A'}`);
                    console.log(`🌐 Website: ${issuerMeta.issuer.social?.[0] || 'N/A'}`);
                  } else {
                    issuerInfo = issuerAddr;
                    console.log(`⚠️ No issuer name found in metadata`);
                  }
                } else {
                  issuerInfo = issuerAddr;
                  console.log(`⚠️ No issuer metadata URI found`);
                }
              } catch (e) {
                issuerInfo = issuerAddr;
                const errorMessage = e instanceof Error ? e.message : 'Unknown error';
                console.warn(`Could not fetch issuer metadata: ${errorMessage}`);
              }
            }
          } catch (error) {
            console.warn(`Could not verify eduNFT status for ${checksummedContract}`);
            continue;
          }
          
          if (!isEduNFT) {
            console.log(`❌ ${checksummedContract} is not registered as eduNFT`);
            continue;
          }
          
          console.log(`✅ ${checksummedContract} is registered as eduNFT`);
          
          const tokens = await this.getTokensOwnedBy(checksummedContract, checksummedHolder);
          console.log(`Found ${tokens.length} owned token(s) in this contract`);
          
          for (const tokenId of tokens) {
            const certInfo = await this.getCertificateInfo(
              checksummedContract, 
              tokenId, 
              checksummedHolder, 
              reputation
            );
            if (certInfo) {
              certificates.push(certInfo);
              console.log(`✅ Added certificate: ${certInfo.name} (Token ${tokenId})`);
            }
          }
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          console.error(`❌ Error processing contract ${certContract}: ${errorMessage}`);
        }
      }
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error(`❌ Error in getAllCertificatesForHolder: ${errorMessage}`);
    }

    return certificates;
  }

  private async discoverCertContracts(): Promise<string[]> {
    try {
      // Get recent blocks and scan for contract creations from the hub
      const latestBlock = await this.provider.getBlockNumber();
      const fromBlock = Math.max(0, latestBlock - 1000);
      
      console.log(`Scanning blocks ${fromBlock} to ${latestBlock} for cert contract creations...`);
      
      // This is a simplified discovery - in practice you'd use events
      const contracts: string[] = [];
      
      // For now, return empty array as we're using known contracts
      return contracts;
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.warn(`Contract discovery failed: ${errorMessage}`);
      return [];
    }
  }

  // Add method to get provider for testing
  getProvider(): ethers.JsonRpcProvider {
    return this.provider;
  }
}

// Utility functions
function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function printSeparator(title: string): void {
  const separator = '='.repeat(60);
  console.log(`\n${separator}`);
  console.log(`  ${title.toUpperCase()}`);
  console.log(separator);
}

function printSubsection(title: string): void {
  console.log(`\n--- ${title} ---`);
}

function formatCertificateOutput(cert: CertificateInfo, index: number): void {
  printSeparator(`Certificate #${index + 1}`);
  
  console.log(`📄 Certificate Name: ${cert.name}`);
  console.log(`🔖 Symbol: ${cert.symbol}`);
  console.log(`🆔 Token ID: ${cert.tokenId}`);
  console.log(`📍 Contract: ${cert.contractAddress}`);
  console.log(`⭐ Level: ${cert.level}`);
  console.log(`🎯 Points: ${cert.point}`);
  console.log(`📅 Issue Date: ${formatDate(cert.issueDate)}`);
  console.log(`⏰ Mint Date: ${cert.mintDate ? formatDate(cert.mintDate) : 'Unknown'}`);
  console.log(`⌛ Expire Date: ${formatDate(cert.expireDate)}`);
  console.log(`🔴 Status: ${cert.isExpired ? 'EXPIRED' : 'ACTIVE'}`);
  
  printSubsection('Issuer Information');
  console.log(`🏛️  Address: ${cert.issuerAddress}`);
  if (cert.issuerMetadata.issuer) {
    const issuer = cert.issuerMetadata.issuer;
    console.log(`🏫 Institution: ${issuer.issuerName || 'N/A'}`);
    console.log(`📝 Description: ${issuer.description || 'N/A'}`);
    console.log(`📍 Location: ${issuer.location || 'N/A'}`);
    if (issuer.social && issuer.social.length > 0) {
      console.log(`🌐 Website: ${issuer.social[0]}`);
    }
  }
  
  printSubsection('Certificate Metadata');
  console.log(`📝 Description: ${cert.metadata.description || 'N/A'}`);
  console.log(`🛠️  Skills: ${cert.metadata.skill || 'N/A'}`);
  console.log(`🔗 Evidence: ${cert.metadata.evidence || 'N/A'}`);
  console.log(`🖼️  Image: ${cert.metadata.image || 'N/A'}`);
  console.log(`🌐 Token URI: ${cert.tokenURI}`);
}

async function fetchCompleteNFTData(): Promise<void> {
  printSeparator('NFT Data Retrieval System');
  
  console.log('🚀 Initializing connection to Base Sepolia...');
  console.log(`📡 RPC Endpoint: ${CONFIG.RPC_URL}`);
  console.log(`🏢 Hub Contract: ${CONFIG.HUB_ADDRESS}`);
  console.log(`👤 Target Holder: ${CONFIG.HOLDER_ADDRESS}`);
  
  try {
    // Initialize retriever
    const retriever = new NFTInfoRetriever(CONFIG.RPC_URL, CONFIG.HUB_ADDRESS);
    
    // Test connection
    console.log('\n🔌 Testing blockchain connection...');
    const provider = retriever.getProvider();
    const network = await provider.getNetwork();
    const blockNumber = await provider.getBlockNumber();
    console.log(`✅ Connected to network: ${network.name} (Chain ID: ${network.chainId})`);
    console.log(`📦 Latest block: ${blockNumber}`);
    
    // Get all certificates
    console.log('\n🔍 Starting certificate scan...');
    const certificates = await retriever.getAllCertificatesForHolder(CONFIG.HOLDER_ADDRESS);
    
    if (certificates.length === 0) {
      console.log('\n❌ No certificates found for this address.');
      console.log('This could mean:');
      console.log('  • The address has no certificates');
      console.log('  • The contracts are not registered in the hub');
      console.log('  • RPC connection issues');
    }
    
    // Display summary
    printSeparator('Scan Results Summary');
    console.log(`👤 Holder: ${CONFIG.HOLDER_ADDRESS}`);
    console.log(`📊 Total Certificates: ${certificates.length}`);
    console.log(`🎯 Total Reputation Points: ${certificates[0]?.studentReputation || 0}`);
    console.log(`📈 Certificate Points: ${certificates.reduce((sum, cert) => sum + cert.point, 0)}`);
    
    const activeCerts = certificates.filter(cert => !cert.isExpired);
    const expiredCerts = certificates.filter(cert => cert.isExpired);
    console.log(`✅ Active Certificates: ${activeCerts.length}`);
    console.log(`❌ Expired Certificates: ${expiredCerts.length}`);
    
    // Display each certificate
    certificates.forEach((cert, index) => {
      formatCertificateOutput(cert, index);
    });
    
    // Display JSON output
    printSeparator('Raw JSON Data');
    const outputData = {
      scan: {
        timestamp: new Date().toISOString(),
        holder: CONFIG.HOLDER_ADDRESS,
        hubContract: CONFIG.HUB_ADDRESS,
        network: 'Base Sepolia'
      },
      summary: {
        totalCertificates: certificates.length,
        activeCertificates: activeCerts.length,
        expiredCertificates: expiredCerts.length,
        totalReputationPoints: certificates[0]?.studentReputation || 0,
        totalCertificatePoints: certificates.reduce((sum, cert) => sum + cert.point, 0)
      },
      certificates: certificates.map(cert => ({
        basic: {
          contractAddress: cert.contractAddress,
          tokenId: cert.tokenId,
          name: cert.name,
          symbol: cert.symbol,
          holder: cert.holder
        },
        details: {
          level: cert.level,
          points: cert.point,
          issueDate: cert.issueDate.toISOString(),
          expireDate: cert.expireDate.toISOString(),
          mintDate: cert.mintDate?.toISOString() || null,
          isExpired: cert.isExpired
        },
        issuer: {
          address: cert.issuerAddress,
          name: cert.issuerMetadata.issuer?.issuerName,
          description: cert.issuerMetadata.issuer?.description,
          location: cert.issuerMetadata.issuer?.location,
          website: cert.issuerMetadata.issuer?.social?.[0]
        },
        metadata: {
          description: cert.metadata.description,
          skills: cert.metadata.skill,
          evidence: cert.metadata.evidence,
          image: cert.metadata.image,
          tokenURI: cert.tokenURI
        },
        blockchain: {
          hubAddress: cert.hubAddress,
          studentReputation: cert.studentReputation
        }
      }))
    };
    
    console.log(JSON.stringify(outputData, null, 2));

    // Write data to JSON file
    const outputPath = path.join(process.cwd(), 'data', 'fetchedData.json');
    try {
      fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2));
      console.log(`
✅ Data successfully written to ${outputPath}`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error(`
❌ Error writing data to file: ${errorMessage}`);
    }
    
    printSeparator('Scan Complete');
    console.log('✅ All certificate data retrieved successfully!');
    console.log(`📊 Summary: ${certificates.length} certificate(s) found`);
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error(`\n❌ Fatal error during execution: ${errorMessage}`);
    throw error;
  }
}

// Main execution function
async function main(): Promise<void> {
  console.log('🎓 Educational NFT Certificate Retriever');
  console.log('Base Sepolia Network Scanner');
  console.log(`Timestamp: ${new Date().toISOString()}\n`);
  
  try {
    await fetchCompleteNFTData();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error(`\n💥 Script execution failed: ${errorMessage}`);
    if (typeof process !== 'undefined') {
      process.exit(1);
    }
  }
}

// Execute if run directly
if (typeof require !== 'undefined' && require.main === module) {
  main().catch(error => {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error(`Unhandled error: ${errorMessage}`);
    if (typeof process !== 'undefined') {
      process.exit(1);
    }
  });
}

export { NFTInfoRetriever, fetchCompleteNFTData, type CertificateInfo };