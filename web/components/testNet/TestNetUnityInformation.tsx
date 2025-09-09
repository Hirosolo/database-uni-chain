export default function TestNetUnityInformation() {
  return (
    <section
      className="text-white w-200 rounded-2xl mt-2 p-8 bg-blue-800"
    >
      <h1 className="text-2xl font-bold mb-6">Token Utility Information</h1>
      <ul className="space-y-4 ml-4 list-disc text-white/95">
        <li>Mint certificate NFTs</li>
        <li>Join learning contests</li>
        <li>Get discounts on premium courses (fiat payments)</li>
      </ul>
      <div className="w-full flex justify-end mt-8">
        <button
          className="px-6 py-2 rounded-xl font-semibold hover:bg-blue-700 bg-blue-600"
        >
          Start learning on UNI-Chain DApp
        </button>
      </div>
    </section>
  );
}
