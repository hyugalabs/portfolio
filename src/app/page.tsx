import { WovenLightHero } from "@/components/hero/woven-light-hero";
import { ProofStrip } from "@/components/home/proof-strip";
import { ServicesList } from "@/components/home/services-list";
import { ProcessLine } from "@/components/home/process-line";
import { Closing } from "@/components/home/closing";

export default function Home() {
  return (
    <main>
      <WovenLightHero />
      <ProofStrip />
      <ServicesList />
      <ProcessLine />
      <Closing />
    </main>
  );
}
