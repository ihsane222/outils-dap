import { Composition } from "remotion";
import { HelloWorld, myCompSchema } from "./HelloWorld";
import { Logo, myCompSchema2 } from "./HelloWorld/Logo";
import { Courtis, COURTIS_TOTAL_FRAMES } from "./Courtis";
import { CourtisAutomations, AUTOMATIONS_TOTAL_FRAMES } from "./CourtisAutomations";
import { DAPModuleTemplate, DAP_MODULE_FRAMES } from "./DAPModuleTemplate";
import { MODULES_DATA } from "./modulesData";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* ==================== DAP ACADEMY — 19 modules ==================== */}
      {MODULES_DATA.map((data) => (
        <Composition
          key={data.num}
          id={`DAPModule${data.num}`}
          component={DAPModuleTemplate}
          durationInFrames={DAP_MODULE_FRAMES}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{ data }}
        />
      ))}

      {/* ==================== COURTIS ==================== */}
      <Composition
        id="Courtis"
        component={Courtis}
        durationInFrames={COURTIS_TOTAL_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* ==================== COURTIS AUTOMATIONS ==================== */}
      <Composition
        id="CourtisAutomations"
        component={CourtisAutomations}
        durationInFrames={AUTOMATIONS_TOTAL_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* ==================== Hello World (template) ==================== */}
      <Composition
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={myCompSchema}
        defaultProps={{
          titleText: "Welcome to Remotion",
          titleColor: "#000000",
          logoColor1: "#91EAE4",
          logoColor2: "#86A8E7",
        }}
      />

      <Composition
        id="OnlyLogo"
        component={Logo}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={myCompSchema2}
        defaultProps={{
          logoColor1: "#91dAE2" as const,
          logoColor2: "#86A8E7" as const,
        }}
      />
    </>
  );
};
