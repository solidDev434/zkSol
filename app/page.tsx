import SwapForm from "@/components/SwapForm";

function Swap() {
  return (
    <section className="bg-red-full flex items-center justify-center">
      <div className="w-xl space-y-4">
        <h1 className="text-2xl font-semibold text-white">Swap</h1>

        {/* Swap Form */}
        <SwapForm />
      </div>
    </section>
  );
}

export default Swap;