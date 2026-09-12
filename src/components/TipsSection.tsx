import React from "react";
import { strategyTips } from "../data/gameData";
import { Lightbulb, Star, Zap, Compass, Users, Trophy } from "lucide-react";

export const TipsSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Star":
        return <Star className="w-5 h-5 text-amber-400" />;
      case "Zap":
        return <Zap className="w-5 h-5 text-yellow-400" />;
      case "Compass":
        return <Compass className="w-5 h-5 text-blue-400" />;
      case "Users":
        return <Users className="w-5 h-5 text-emerald-400" />;
      case "Trophy":
        return <Trophy className="w-5 h-5 text-rose-400" />;
      default:
        return <Lightbulb className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-lg">
        <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-amber-400" />
          パラレルオールスターズ 攻略の鉄則・育成Tips
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
          星999投手・オールS野手を育成するための重要分岐・ターン管理・システム仕様まとめ。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {strategyTips.map((tip, idx) => (
          <div
            key={idx}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:border-slate-700 transition-all shadow-md"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-slate-800 border border-slate-700">
                    {getIcon(tip.icon)}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                      {tip.tag}
                    </span>
                    <div className="text-xs text-slate-400 font-semibold mt-0.5">
                      目安時期: {tip.timing}
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-base font-black text-white mb-2">{tip.title}</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                {tip.description}
              </p>
            </div>

            <div className="bg-slate-950/80 rounded-xl p-3.5 border border-slate-800 space-y-1.5">
              <div className="text-[11px] font-bold text-slate-400">実践のポイント</div>
              {tip.details.map((detail, dIdx) => (
                <div key={dIdx} className="text-xs text-slate-300 flex items-start gap-1.5">
                  <span className="text-blue-400 font-bold">•</span>
                  <span className="leading-relaxed">{detail}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
