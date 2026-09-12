import React, { useState } from "react";
import { heroinesData } from "../data/gameData";
import { HeroineInfo } from "../types";
import { Heart, Sparkles, MapPin, Calendar, ChevronDown, ChevronUp } from "lucide-react";

export const HeroineSection: React.FC = () => {
  const [selectedHeroine, setSelectedHeroine] = useState<HeroineInfo>(heroinesData[0]);
  const [position, setPosition] = useState<"pitcher" | "fielder">("pitcher");
  const [expandedDateStep, setExpandedDateStep] = useState<string | null>("デート 4回目");

  const toggleExpand = (stepName: string) => {
    setExpandedDateStep((prev) => (prev === stepName ? null : stepName));
  };

  return (
    <div className="space-y-6">
      {/* イントロバナー */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
              彼女攻略・デート選択肢＆金特完全データ
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              全4名の知合い方、出現時空、同行仕様、ラブパワー恩恵、およびデート1〜6回目の全選択肢・獲得コツを完全網羅！
            </p>
          </div>

          {/* 投手/野手切り替え */}
          <div className="flex items-center bg-slate-800 p-1 rounded-xl border border-slate-700/60 self-start sm:self-auto">
            <button
              onClick={() => setPosition("pitcher")}
              className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                position === "pitcher"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              ⚾ 投手効果・金特
            </button>
            <button
              onClick={() => setPosition("fielder")}
              className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                position === "fielder"
                  ? "bg-amber-600 text-white shadow-sm"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              🏏 野手効果・金特
            </button>
          </div>
        </div>

        {/* ヒロインセレクタ */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-5">
          {heroinesData.map((h) => {
            const isSelected = selectedHeroine.id === h.id;
            return (
              <button
                key={h.id}
                onClick={() => {
                  setSelectedHeroine(h);
                  setExpandedDateStep("デート 4回目");
                }}
                className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden ${
                  isSelected
                    ? "bg-slate-800 border-rose-500/80 shadow-md shadow-rose-500/10 ring-2 ring-rose-500/30"
                    : "bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] text-slate-400 font-medium">{h.school}</span>
                  {isSelected && <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />}
                </div>
                <div className="text-sm sm:text-base font-black text-white">{h.name}</div>
                <div className="text-[10px] text-slate-500">{h.reading}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 選択された彼女の詳細カード */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        {/* ヘッダーグラデーション */}
        <div className={`p-5 bg-gradient-to-r ${selectedHeroine.color} text-white`}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/20 backdrop-blur-sm">
                  {selectedHeroine.school}
                </span>
                <span className="text-xs font-semibold text-white/90">
                  初期出現: {selectedHeroine.firstSpaceTime}
                </span>
              </div>
              <h3 className="text-2xl font-black">{selectedHeroine.name}</h3>
              <p className="text-xs text-white/80 mt-0.5">{selectedHeroine.reading}</p>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {selectedHeroine.recommendPositions.map((pos, idx) => (
                <span
                  key={idx}
                  className="text-xs px-2.5 py-1 rounded-lg bg-slate-950/60 text-white font-bold backdrop-blur-sm border border-white/20"
                >
                  推奨: {pos}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 本文エリア */}
        <div className="p-4 sm:p-6 space-y-6">
          {/* 知合い方 ＆ ラブパワー */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800">
              <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                <MapPin className="w-4 h-4" />
                知合い方・出現時空・同行仕様
              </h4>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {selectedHeroine.howToMeet}
              </p>
            </div>

            <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                <Sparkles className="w-4 h-4" />
                ラブパワー恩恵＆差し入れ
              </h4>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {selectedHeroine.lovePowerEffect}
              </p>
            </div>
          </div>

          {/* デート4回目（イベント04）の金特ハイライト対比カード */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>金特獲得イベント（デート4回目）の選択肢分岐</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                  {position === "pitcher" ? "投手時" : "野手時"}
                </span>
              </h4>
            </div>

            {position === "pitcher" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* 選択肢上 */}
                <div className="bg-slate-950/90 rounded-xl p-4 border border-blue-500/50 relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-bl">
                    選択肢［上］
                  </div>
                  <div className="text-xs font-bold text-blue-400 mb-1">
                    {selectedHeroine.pitcherGoldSkills.top.choice}
                  </div>
                  <div className="text-lg font-black text-amber-300 mb-1 flex items-center gap-1.5">
                    <span>✨ {selectedHeroine.pitcherGoldSkills.top.skill}</span>
                    <span className="text-xs px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      Lv2コツ
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {selectedHeroine.pitcherGoldSkills.top.desc}
                  </p>
                </div>

                {/* 選択肢下 */}
                <div className="bg-slate-950/90 rounded-xl p-4 border border-purple-500/50 relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-purple-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-bl">
                    選択肢［下］
                  </div>
                  <div className="text-xs font-bold text-purple-400 mb-1">
                    {selectedHeroine.pitcherGoldSkills.bottom.choice}
                  </div>
                  <div className="text-lg font-black text-amber-300 mb-1 flex items-center gap-1.5">
                    <span>✨ {selectedHeroine.pitcherGoldSkills.bottom.skill}</span>
                    <span className="text-xs px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      Lv2コツ
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {selectedHeroine.pitcherGoldSkills.bottom.desc}
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* 選択肢上 */}
                <div className="bg-slate-950/90 rounded-xl p-4 border border-blue-500/50 relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-bl">
                    選択肢［上］
                  </div>
                  <div className="text-xs font-bold text-blue-400 mb-1">
                    {selectedHeroine.fielderGoldSkills.top.choice}
                  </div>
                  <div className="text-lg font-black text-amber-300 mb-1 flex items-center gap-1.5">
                    <span>✨ {selectedHeroine.fielderGoldSkills.top.skill}</span>
                    <span className="text-xs px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      Lv2コツ
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {selectedHeroine.fielderGoldSkills.top.desc}
                  </p>
                </div>

                {/* 選択肢下 */}
                <div className="bg-slate-950/90 rounded-xl p-4 border border-purple-500/50 relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-purple-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-bl">
                    選択肢［下］
                  </div>
                  <div className="text-xs font-bold text-purple-400 mb-1">
                    {selectedHeroine.fielderGoldSkills.bottom.choice}
                  </div>
                  <div className="text-lg font-black text-amber-300 mb-1 flex items-center gap-1.5">
                    <span>✨ {selectedHeroine.fielderGoldSkills.bottom.skill}</span>
                    <span className="text-xs px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      Lv2コツ
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {selectedHeroine.fielderGoldSkills.bottom.desc}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* デート全イベント詳細（1回目〜6回目） */}
          <div className="space-y-3 pt-2">
            <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-pink-400" />
              <span>デート進行別 全選択肢・効果・特能コツ一覧</span>
            </h4>

            <div className="space-y-2">
              {selectedHeroine.dateEvents.map((event, eIdx) => {
                const isExpanded = expandedDateStep === event.stepName;
                const effect = position === "pitcher" ? event.pitcherEffect : event.fielderEffect;

                return (
                  <div
                    key={eIdx}
                    className={`rounded-xl border transition-all overflow-hidden ${
                      event.isGoldSkill
                        ? "bg-slate-900 border-amber-500/50 ring-1 ring-amber-500/20"
                        : "bg-slate-950/70 border-slate-800"
                    }`}
                  >
                    {/* イベントタイトル行（アコーディオンヘッダー） */}
                    <button
                      onClick={() => toggleExpand(event.stepName)}
                      className="w-full p-3 sm:p-3.5 flex items-center justify-between text-left hover:bg-slate-800/40 transition-colors"
                    >
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span
                          className={`text-xs font-bold px-2 py-0.5 rounded ${
                            event.isGoldSkill
                              ? "bg-amber-500 text-slate-950"
                              : "bg-slate-800 text-slate-300"
                          }`}
                        >
                          {event.stepName}
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-white">
                          {event.title}
                        </span>
                        <span className="text-[11px] text-slate-400 hidden sm:inline">
                          — {event.description}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-slate-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-400" />
                        )}
                      </div>
                    </button>

                    {/* イベント詳細コンテンツ */}
                    {isExpanded && (
                      <div className="p-3 sm:p-4 border-t border-slate-800 bg-slate-950/90 space-y-2 text-xs">
                        {effect.hasChoice && effect.choices ? (
                          <div className="space-y-2">
                            {effect.choices.map((ch, chIdx) => (
                              <div
                                key={chIdx}
                                className="bg-slate-900 p-2.5 rounded-lg border border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
                              >
                                <div className="space-y-1">
                                  <div className="font-bold text-blue-400 flex items-center gap-1.5">
                                    <span>{ch.text}</span>
                                    {ch.note && (
                                      <span className="text-[10px] text-amber-300/80 font-normal">
                                        ({ch.note})
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-[11px] text-emerald-400 font-mono">
                                    {ch.stats}
                                  </div>
                                </div>

                                {ch.skills.length > 0 && (
                                  <div className="flex flex-wrap gap-1 shrink-0">
                                    {ch.skills.map((sk, skIdx) => (
                                      <span
                                        key={skIdx}
                                        className={`px-2 py-0.5 rounded font-bold text-xs ${
                                          sk.includes("✨")
                                            ? "bg-amber-400 text-slate-950 shadow-sm"
                                            : "bg-blue-950 text-blue-200 border border-blue-800/40"
                                        }`}
                                      >
                                        {sk}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <div className="space-y-1">
                              <span className="text-slate-400 font-medium">獲得効果:</span>
                              <div className="text-[11px] text-emerald-400 font-mono">
                                {effect.directStats}
                              </div>
                            </div>

                            {effect.directSkills && effect.directSkills.length > 0 && (
                              <div className="flex flex-wrap gap-1 shrink-0">
                                {effect.directSkills.map((sk, skIdx) => (
                                  <span
                                    key={skIdx}
                                    className="px-2 py-0.5 rounded font-bold text-xs bg-blue-950 text-blue-200 border border-blue-800/40"
                                  >
                                    {sk}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 育成ワンポイントアドバイス */}
          <div className="bg-slate-950/50 rounded-xl p-3.5 border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
            <span className="text-amber-400 font-bold">💡 育成アドバイス:</span>
            <span>{selectedHeroine.tips}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
