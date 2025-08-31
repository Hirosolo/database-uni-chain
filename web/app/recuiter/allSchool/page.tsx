"use client";
import NavBar from "@/components/recuiter/commonShare/NavBar";
import AllSchoolHeader from "@/components/recuiter/allSchool/AllSchoolHeader";
import Pagination from "@/components/recuiter/commonShare/Pagination";
import SchoolToolbar from "@/components/recuiter/allSchool/SchoolToolBar";
import AllSchoolList from "@/components/recuiter/allSchool/AllSchoolList";
import data from "@/data/fetchedData.json";
import { school } from "@/components/recuiter/commonShare/allTypes";

const { certificates } = data;

const schoolsData: school[] = Object.values(
  certificates.reduce((acc, cert) => {
    const issuerName = cert.issuer.name ?? 'Unknown Issuer';
    if (!acc[issuerName]) {
      acc[issuerName] = {
        rank: Object.keys(acc).length + 1,
        name: issuerName,
        role: cert.issuer.location ?? 'Unknown Location',
        candidates: 0, // This would need to be calculated if we had candidate data
        certificates: 0,
      };
    }
    acc[issuerName].certificates += 1;
    // You would also increment candidates here if you have that data
    return acc;
  }, {} as { [key: string]: school })
);


const allSchools = () => (
    <div>
        <NavBar/>
        <div className="bg-gray-50 min-h-screen p-8">
            <AllSchoolHeader />
            <div className="px-8">
                <SchoolToolbar />
                <AllSchoolList schools={schoolsData}/>
                <Pagination />
            </div>
        </div>
    </div>
);

export default allSchools;