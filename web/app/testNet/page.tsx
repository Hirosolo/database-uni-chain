import TestNetHeader from "@/components/testNet/TestNetHeader";
import TestNetForm from "@/components/testNet/TestNetForm";
import TestNetUnityInformation from "@/components/testNet/TestNetUnityInformation";
import TestNetFAQ from "@/components/testNet/TestNetFAQ";

export default function testNet() {
  return (
    <div className="flex flex-col items-center min-h-screen min-w-screen">
      <div className="flex flex-col items-center justify w-full px-6">
        <TestNetHeader/>
        <TestNetForm/>
        <TestNetUnityInformation/>
        <TestNetFAQ/>
      </div>
    </div>
  );
}
