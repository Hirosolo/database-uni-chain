import { candidate } from "../commonShare/allTypes";

const CandidateItem = ({ candidate }: { candidate: candidate }) => (
  <div
    key={candidate.rank}
    className="flex items-center gap-4 mb-2 cursor-pointer hover:bg-gray-100 rounded px-2"
    style={{ color: "#707A83" }}
    onClick={() => (window.location.href = "/recuiter/profile")}
  >
    <span className="font-bold w-4">{candidate.rank}</span>
    <img src="/avatar-user2.png" alt="Avatar" className="h-8 w-8" />
    <div>
      <div className="font-semibold" style={{ color: "#04111D" }}>
        {candidate.name}
      </div>
      <div className="text-xs" color="#707A83">
        {candidate.role}
      </div>
    </div>
    <div className="ml-auto font-bold" style={{ color: "#04111D" }}>
      {candidate.repuPoints.toLocaleString()}
    </div>
  </div>
);

export default CandidateItem;
