import { upcomingClass } from "../../functions/lib/introClass";

export function IntroClassLocation() {
  return (
    <div className="space-y-3 text-sm text-[#303331] leading-relaxed">
      <p className="font-semibold text-[#171918]">{upcomingClass.location}</p>
      <p>{upcomingClass.meeting}</p>
      <a href={upcomingClass.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-block text-[#243B45] underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#243B45]">Directions to Lake Ontario Park</a>
    </div>
  );
}
