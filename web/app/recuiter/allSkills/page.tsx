"use client";
import NavBar from "@/components/recuiter/commonShare/NavBar";
import AllSkillHeader from "@/components/recuiter/allSkills/AllSkillHeader";
import SkillToolbar from "@/components/recuiter/allSkills/SkillToolbar";
import AllSkillList from "@/components/recuiter/allSkills/AllSkillList";
import Pagination from "@/components/recuiter/commonShare/Pagination";
import fetchedData from "@/data/fetchedData.json";
import { skill } from "@/components/recuiter/commonShare/allTypes";

const allSkills = () => {
    const skills: skill[] = fetchedData.certificates.map((cert, index) => ({
        rank: index + 1,
        name: cert.metadata.skills,
        learner: cert.blockchain.studentReputation,
        relatedCert: 1
    }));

    return (
        <div>
            <NavBar/>
            <div className="bg-gray-50 min-h-screen pb-8">
                <AllSkillHeader />
                <div className="px-8">
                    <SkillToolbar />
                    <AllSkillList skills={skills} />
                    <Pagination />
                </div>
            </div>
        </div>
    )
};

export default allSkills;