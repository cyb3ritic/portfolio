import React from "react";
import { Trophy, ShieldCheck, Flag, ExternalLink } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import AsciiArt, { ASCII_ART } from "./AsciiArt";
import { achievements, ctfRankings } from "@/data/achievements";
import { useTilt } from "@/hooks/useTilt";
import { cn } from "@/lib/utils";

const CtfRankCard: React.FC<{ ctf: (typeof ctfRankings)[number] }> = ({ ctf }) => {
  const { tiltStyle, isHovered, handlers } = useTilt();

  const isGreen = ctf.accent === "green";
  const isBlue = ctf.accent === "blue";

  const cardClass = isGreen ? "card-green" : isBlue ? "card-blue" : "card-purple";

  const badgeBgClass = isGreen
    ? "bg-cyber-green/10 text-cyber-green border-cyber-green/30"
    : isBlue
    ? "bg-cyber-blue/10 text-cyber-blue border-cyber-blue/30"
    : "bg-cyber-purple/10 text-cyber-purple border-cyber-purple/30";

  return (
    <div
      className={cn(
        `cyber-card ${cardClass} cyber-card-3d p-6 shadow-lg glow-${ctf.accent} transition-all duration-300 hover:scale-[1.02]`,
        isHovered && "shadow-xl"
      )}
      style={tiltStyle}
      {...handlers}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className={`inline-block text-xs font-mono font-bold px-2.5 py-1 rounded border ${badgeBgClass}`}>
            {ctf.platform}
          </span>
          <h3 className="text-xl font-bold mt-2 text-white">{ctf.rank}</h3>
        </div>
        <Flag className={`text-cyber-${ctf.accent}`} size={28} />
      </div>

      <p className="text-gray-300 text-sm mb-4">
        Active handle: <span className="font-mono font-bold text-white">@{ctf.username}</span>
      </p>

      <ul className="space-y-2 mb-6 text-sm text-gray-300">
        {ctf.highlights.map((h, i) => (
          <li key={i} className="flex items-center">
            <span className={`text-cyber-${ctf.accent} mr-2`}>▶</span>
            {h}
          </li>
        ))}
      </ul>

      <a
        href={ctf.profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center text-xs font-mono font-bold text-cyber-${ctf.accent} hover:underline`}
      >
        View Verified Profile
        <ExternalLink size={14} className="ml-1" />
      </a>

      <div className={cn(
        "absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300",
        isHovered && "opacity-10"
      )}>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMDAwIi8+CjxwYXRoIGQ9Ik0wIDVMNSAwWk02IDRMNCA2Wk0tMSAxTDEgLTFaIiBzdHJva2U9IiMyMjIiIHN0cm9rZS13aWR0aD0iMSIvPgo8L3N2Zz4=')] opacity-20" />
      </div>
    </div>
  );
};

const AchievementCard: React.FC<{ ach: (typeof achievements)[number] }> = ({ ach }) => {
  const { tiltStyle, isHovered, handlers } = useTilt();

  const cardVariantClass =
    ach.variant === "green"
      ? "card-green"
      : ach.variant === "blue"
      ? "card-blue"
      : "card-purple";

  const textVariantClass =
    ach.variant === "green"
      ? "text-cyber-green"
      : ach.variant === "blue"
      ? "text-cyber-blue"
      : "text-cyber-purple";

  return (
    <div
      className={cn(
        `cyber-card ${cardVariantClass} cyber-card-3d p-6 transition-all duration-300 hover:scale-[1.02]`,
        isHovered && "shadow-lg"
      )}
      style={tiltStyle}
      {...handlers}
    >
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs font-mono text-gray-400">
          {ach.platformOrOrg} • {ach.date}
        </span>
        <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded border border-${ach.variant}/30 ${textVariantClass}`}>
          {ach.metric}
        </span>
      </div>

      <h3 className={`text-lg font-bold mb-2 text-white flex items-center`}>
        <ShieldCheck className={`mr-2 ${textVariantClass}`} size={18} />
        {ach.title}
      </h3>

      <p className="text-gray-300 text-sm mb-4">{ach.description}</p>

      {ach.link && (
        <a
          href={ach.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center text-xs font-mono text-gray-400 hover:${textVariantClass} transition-colors`}
        >
          Learn details <ExternalLink size={12} className="ml-1" />
        </a>
      )}

      <div className={cn(
        "absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300",
        isHovered && "opacity-10"
      )}>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMDAwIi8+CjxwYXRoIGQ9Ik0wIDVMNSAwWk02IDRMNCA2Wk0tMSAxTDEgLTFaIiBzdHJva2U9IiMyMjIiIHN0cm9rZS13aWR0aD0iMSIvPgo8L3N2Zz4=')] opacity-20" />
      </div>
    </div>
  );
};

const AchievementsSection: React.FC = () => {
  return (
    <section id="achievements" className="py-20 relative bg-gradient-to-b from-transparent via-cyber-purple/5 to-transparent">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">

          <AnimatedSection animation="fade-up">
            <h2 className="text-3xl font-bold mb-4 flex items-center">
              <Trophy className="mr-2 text-cyber-purple" size={24} />
              <span className="cyber-text-gradient">Achievements & Research</span>
            </h2>

            <p className="text-gray-300 mb-10 max-w-3xl">
              Highlights from competitive Capture The Flag (CTF) platforms, open-source security tool releases, and continuous vulnerability research.
            </p>

            {/* CTF Rank Cards */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {ctfRankings.map((ctf) => (
                <CtfRankCard key={ctf.platform} ctf={ctf} />
              ))}
            </div>

            {/* Achievements Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {achievements.map((ach) => (
                <AchievementCard key={ach.id} ach={ach} />
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
