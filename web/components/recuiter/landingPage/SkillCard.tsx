type skill = {
  id?: number;
  rank?: number;
  name: string;
  learners?: number;
  learner?: number;
  certificates?: number;
  relatedCert?: number;
  candidates?: number;
};

const SkillCard = ({ skill }: { skill: skill }) => (
  <div
    key={skill.id || skill.rank}
    onClick={() => (window.location.href = "/recuiter/skill")}
    className="min-w-[210px] bg-gray-100 rounded p-4 flex flex-col items-center cursor-pointer hover:bg-gray-200"
  >
    <div
      className="font-semibold mb-1 self-start overflow-x-hidden"
      style={{ color: "#000000" }}
    >
      #{skill.id || skill.rank} <br></br> {skill.name}
    </div>
    <div className="text-xs text-gray-500 self-start">
      Số lượng người học:
      <div className="font-bold" style={{ color: "#000000" }}>
        {(skill.learners || skill.learner || skill.candidates || 0).toLocaleString()}
      </div>
    </div>
    <div className="text-xs text-gray-500 self-start">
      Số lượng bằng cấp liên quan:
      <div className="font-bold" style={{ color: "#000000" }}>
        {(skill.certificates || skill.relatedCert || 0).toLocaleString()}
      </div>
    </div>
  </div>
);

export default SkillCard;