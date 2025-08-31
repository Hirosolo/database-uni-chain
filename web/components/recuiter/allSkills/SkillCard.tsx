import React from 'react';
import { skill } from '../commonShare/allTypes';

const SkillCard = ({ skill }: { skill: skill }) => (
  <div
    key={skill.rank}
    className="flex items-center gap-4 mb-2 cursor-pointer hover:bg-gray-100 rounded px-2"
    style={{ color: '#707A83' }}
    onClick={() => window.location.href = '/recuiter/nftDetails'}
  >
    <span className="font-bold w-4">{skill.rank}</span>
    <img src="/avatar-user2.png" alt="Avatar" className="h-10 w-10 rounded rounded-xm" />
    <div>
      <div className="font-semibold" style={{color:'#04111D'}}>{skill.name}</div>
      <div className="text-xs" color="#707A83">{skill.role}</div>
    </div>
    <div className="ml-106 font-bold" style={{color: "#04111D"}}>{skill.learner.toLocaleString()}</div>
    <div className="ml-auto font-bold" style={{color: "#04111D"}}>{skill.relatedCert.toLocaleString()}</div>
  </div>
);

export default SkillCard;