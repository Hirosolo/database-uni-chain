import {
  Issuer,
  Certificate,
  Skill,
  SkillOfCertificate,
  studentPersonalInformation,
  Student,
  NFTFilters,
} from "./ProjectInterface";

const sampleIssuer: Issuer = {
  issuerName: "ĐẠI HỌC CÔNG NGHỆ THÔNG TIN – ĐHQG TP. HỒ CHÍ MINH",
  description:
    "UIT là một trong những trường top đầu về CNTT tại Việt Nam, hơn 10.000 chứng chỉ đã được phát hành và xác thực trên hệ thống",
  issuerAddress: "0x316253675",
  location: "TP. Hồ Chí Minh",
  social: ["https://www.uit.edu.vn/"],
};

const participants = 10000;

export const trendingSkills: Skill[] = [
  {
    skillID: "SKL001",
    skillName: "Blockchain Development",
    field: "Software Development",
    description: "Development of decentralized applications"
  },
  {
    skillID: "SKL002",
    skillName: "Data Analysis",
    field: "Data Science",
    description: "Analysis of complex data sets"
  },
  {
    skillID: "SKL003",
    skillName: "English",
    field: "Language",
    description: "Professional business English"
  },
  {
    skillID: "SKL004",
    skillName: "AI Fundamentals",
    field: "Artificial Intelligence",
    description: "Basic concepts of AI and ML"
  },
  {
    skillID: "SKL005",
    skillName: "System Design",
    field: "Software Architecture",
    description: "Designing scalable systems"
  }
];

const sampleCertificate: Certificate = {
  certificateId: "cert-001",
  certificateAddress: "0x187245123",
  certificateName: "Blockchain Development",
  type: "Degree",
  level: "Easy",
  points: 1000,
  ownerAddress: "0x316253675",
  issuerName: "Blockchain Academy",
  issuedDate: "2024-01-01",
  expiryDate: "2026-01-01",
  description: "This certificate verifies the successful completion of the Blockchain Development program.",
  skills: [
    trendingSkills[0].skillName, // "Blockchain Development"
    trendingSkills[4].skillName, // "System Design"
  ],
};

export const sampleCertificates: Certificate[] = [...Array(8)].map(() => ({ ...sampleCertificate }));

export const sampleStudentPersonalInformation: studentPersonalInformation = {
  name: "Tong Thuan Nguyen",
  age: 18,
  avatar: "/avatar-user.png",
  coverImage: "/profile-cover.png",
  bio: "A passionate student learning full-stack development.",
  socialLinks: {
    website: "https://example.com",
    github: "https://github.com/tongthuannguyen",
    linkedin: "https://linkedin.com/in/tongthuannguyen",
    email: "tongthuan@example.com",
  },
};

export const sampleStudents: Student[] = [
  {
    studentAddress: "0xstudent1",
    position: "Software Engineer",
    personalInformation: sampleStudentPersonalInformation,
    points: 5740,
    rank: 1,
    joinDate: "2021-09-01",
    NFTs: [sampleCertificate],
  },
].concat(
  Array.from({ length: 9 }, (_, i) => ({
    studentAddress: `0xstudent${i + 2}`,
    position: "Student",
    personalInformation: sampleStudentPersonalInformation,
    points: 5740 - i * 100,
    rank: i + 2,
    joinDate: "2021-09-01",
    NFTs: [sampleCertificate],
  }))
);

export const sampleSkill = trendingSkills[0];

export {
    sampleIssuer,
    sampleCertificate,
    participants,
};