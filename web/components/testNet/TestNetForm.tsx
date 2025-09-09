export default function TestNetForm() {
    return (
        <div className="flex w-200">
            <div className="text-black w-full mb-6">
                <p className="text-black font-bold text-2xl mb-2">UNI-CHAIN FAUCET</p>
                <p className="text-base mb-4">
                Claim free UNI-Token to explore and interact with the education ecosystem
                </p>
                <div className="flex gap-3 w-full">
                <input
                    className="flex-1 max-w-xl p-3 py-2 rounded-xl border shadow-sm font-medium placeholder:text-gray-400"
                    type="text"
                    placeholder="Wallet address or ENS name"
                ></input>
                <button className="px-5 py-2 hover:bg-blue-700 bg-blue-600   text-white rounded-xl shadow-md whitespace-nowrap ">
                    Receive 10 UNI
                </button>
                </div>
            </div>
        </div>
    )
}