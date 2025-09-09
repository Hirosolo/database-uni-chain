import { candidate } from "../commonShare/allTypes";

export default function ProfileInformation({ candidate }: { candidate: candidate })
{
    return (
        <section className="flex items-center justify-between gap-6 px-8 mt-6">
            <div className="flex items-center text-sm text-gray-700 space-x-2">
            <span>
                NFTs <span className="font-bold">{candidate.NFT.length}</span>
            </span>
            <span>·</span>
            <span>
                Tham gia <span className="font-bold">T.4 2022</span>
            </span>
            <span>·</span>
            <span>
                Điểm danh tiếng <span className="font-bold">{candidate.repuPoints}</span>
            </span>
            <span>·</span>
            <span>
                Xếp hạng <span className="font-bold">#1</span>
            </span>
            </div>
        </section>
    );
}