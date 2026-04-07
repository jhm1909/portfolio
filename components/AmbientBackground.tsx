export default function AmbientBackground() {
  return (
    <div className="bg-ambient" aria-hidden="true">
      <div className="orb absolute top-[8%] left-[12%] w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full bg-sky-500/[0.035] blur-[120px]" />
      <div className="orb-reverse absolute top-[50%] right-[8%] w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-violet-500/[0.03] blur-[120px]" />
      <div className="orb absolute bottom-[5%] left-[30%] w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] rounded-full bg-indigo-500/[0.025] blur-[100px]" />
    </div>
  );
}
