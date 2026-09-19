import React, { useState } from "react";
import { comboEventsData } from "../data/gameData";
import { Users, Search, Sparkles, Award } from "lucide-react";

export const ComboSection: React.FC = () => {
  const [position, setPosition] = useState<"pitcher" | "fielder">("pitcher");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterBasicOnly, setFilterBasicOnly] = useState(false);

  const filteredCombos = comboEventsData.filter((combo) => {
    // 基礎能力フィルター
    if (filterBasicOnly) {
      if (position === "pitcher" && !combo.hasPitcherBasicStat) return false;
      if (position === "fielder" && !combo.hasFielderBasicStat) return false;
    }

    if (!searchQuery.trim()) return true;

    const query = searchQuery.toLowerCase();
    const matchName =
      combo.char1.name.toLowerCase().includes(query) ||
      combo.char2.name.toLowerCase().includes(query) ||
      combo.char1.school.toLowerCase().includes(query) ||
      combo.char2.school.toLowerCase().includes(query);

    const choices = position === "pitcher" ? combo.pitcherChoices : combo.fielderChoices;
    const matchEffects = choices.some(
      (c) =>
        c.choiceName.toLowerCase().includes(query) ||
        c.effects.some((e) => e.toLowerCase().includes(query))
    );

    return matchName || matchEffects;
  });

  return (
    <div className="space-y-6">
      {/* 上部コントロール */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-amber-500" />
              コンボイベント一覧（全11組）
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              2キャラを仲間にするとランダム発生。全基礎経験点+48＆強力特能・基礎能力Lv3のコツを獲得！
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
              ⚾ 投手効果
            </button>
            <button
              onClick={() => setPosition("fielder")}
              className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                position === "fielder"
                  ? "bg-amber-600 text-white shadow-sm"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              🏏 野手効果
            </button>
          </div>
        </div>

        {/* 検索 ＆ 基礎能力コツフィルター */}
        <div className="mt-4 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="キャラ名、学校、獲得コツ名（例: 球速、ミート、逃げ球）で検索..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <button
            onClick={() => setFilterBasicOnly(!filterBasicOnly)}
            className={`flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold border transition-all ${
              filterBasicOnly
                ? "bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-sm"
                : "bg-slate-800 text-slate-300 border-slate-700 hover:text-white"
            }`}
          >
            <Award className="w-4 h-4 text-amber-400" />
            <span>★ 基礎能力Lv3コツ持ちのみ</span>
          </button>
        </div>
      </div>

      {/* Game8推奨: 基礎能力Lv3コツ早見パネル */}
      <div className="bg-gradient-to-br from-amber-950/30 via-slate-900 to-slate-900 border border-amber-500/30 rounded-2xl p-4 sm:p-5 shadow-lg">
        <div className="flex items-center gap-2 mb-3">
          <Award className="w-5 h-5 text-amber-400" />
          <h3 className="text-sm sm:text-base font-black text-amber-300">
            【最重要】基礎能力Lv3コツ獲得コンボ早見表（Game8推奨・経験点大幅節約）
          </h3>
        </div>
        <p className="text-xs text-slate-300 mb-3.5 leading-relaxed">
          基礎能力のLv3コツはサクセス育成において最大の経験点節約になります。育成ポジションに合わせて対象キャラを優先して仲間にしましょう。
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {position === "pitcher" ? (
            <>
              <div className="bg-slate-950/70 border border-amber-500/20 rounded-xl p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-bold text-amber-400">⚡ 球速 Lv3</span>
                  <span className="text-[10px] text-slate-500 font-mono">+48pt全種</span>
                </div>
                <div className="text-xs font-bold text-white mb-1">神宮寺 光 × 美一式 高伊</div>
                <div className="text-[11px] text-blue-400">選:【アイドルになればモテモテだ！】</div>
              </div>
              <div className="bg-slate-950/70 border border-amber-500/20 rounded-xl p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-bold text-amber-400">🎯 コントロール Lv3</span>
                  <span className="text-[10px] text-slate-500 font-mono">+48pt全種</span>
                </div>
                <div className="text-xs font-bold text-white mb-1">ハルキ × 早川 あおい</div>
                <div className="text-[11px] text-blue-400">選:【話題をすり替える】</div>
              </div>
              <div className="bg-slate-950/70 border border-amber-500/20 rounded-xl p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-bold text-amber-400">💪 スタミナ Lv3</span>
                  <span className="text-[10px] text-slate-500 font-mono">+48pt全種</span>
                </div>
                <div className="text-xs font-bold text-white mb-1">黒珠 真 × 松倉 宗光</div>
                <div className="text-[11px] text-blue-400">選:【黒珠の練習相手になる】</div>
              </div>
            </>
          ) : (
            <>
              <div className="bg-slate-950/70 border border-amber-500/20 rounded-xl p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-bold text-amber-400">🎯 ミート Lv3</span>
                  <span className="text-[10px] text-slate-500 font-mono">+48pt全種</span>
                </div>
                <div className="text-xs font-bold text-white mb-1">神宮寺 光 × 美一式 高伊</div>
                <div className="text-[11px] text-blue-400">選:【アイドルはナンパな存在】</div>
              </div>
              <div className="bg-slate-950/70 border border-amber-500/20 rounded-xl p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-bold text-amber-400">💥 パワー Lv3</span>
                  <span className="text-[10px] text-slate-500 font-mono">+48pt全種</span>
                </div>
                <div className="text-xs font-bold text-white mb-1">美藤 千尋 × 明智 光秀</div>
                <div className="text-[11px] text-emerald-400">選: 選択肢なし (確定入手)</div>
              </div>
              <div className="bg-slate-950/70 border border-amber-500/20 rounded-xl p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-bold text-amber-400">🛡️ 守備力 Lv3</span>
                  <span className="text-[10px] text-slate-500 font-mono">+48pt全種</span>
                </div>
                <div className="text-xs font-bold text-white mb-1">猪狩 守 × 橘 みずき</div>
                <div className="text-[11px] text-blue-400">選:【猪狩と話す】</div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* コンボ一覧 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCombos.map((combo) => {
          const choices = position === "pitcher" ? combo.pitcherChoices : combo.fielderChoices;
          const hasBasic = position === "pitcher" ? combo.hasPitcherBasicStat : combo.hasFielderBasicStat;

          return (
            <div
              key={combo.id}
              className={`rounded-2xl border transition-all overflow-hidden flex flex-col ${
                hasBasic
                  ? "bg-slate-900 border-amber-500/40 shadow-md shadow-amber-500/5"
                  : "bg-slate-900 border-slate-800"
              }`}
            >
              {/* カードヘッダー */}
              <div className="p-4 bg-slate-950/80 border-b border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="text-sm sm:text-base font-black text-white">
                    {combo.char1.name}{" "}
                    <span className="text-slate-500 font-normal text-xs">×</span>{" "}
                    {combo.char2.name}
                  </div>
                </div>

                {hasBasic && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    基礎コツ獲得
                  </span>
                )}
              </div>

              {/* 所属高校 */}
              <div className="px-4 py-1.5 bg-slate-950/40 text-[11px] text-slate-400 flex items-center gap-3 border-b border-slate-800/40">
                <span>{combo.char1.name}: <strong className="text-slate-300 font-semibold">{combo.char1.school}</strong></span>
                <span>•</span>
                <span>{combo.char2.name}: <strong className="text-slate-300 font-semibold">{combo.char2.school}</strong></span>
              </div>

              {/* 選択肢と獲得効果 */}
              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2.5">
                  {choices.map((choice, cIdx) => (
                    <div
                      key={cIdx}
                      className={`p-3 rounded-xl border ${
                        choice.isBasicStat
                          ? "bg-amber-950/20 border-amber-500/40 ring-1 ring-amber-500/20"
                          : "bg-slate-950/60 border-slate-800/80"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-bold text-blue-400">
                          {choice.choiceName}
                        </span>
                        {choice.isBasicStat && (
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-500 text-slate-950">
                            ★{choice.basicStatName}Lv3
                          </span>
                        )}
                      </div>

                      {/* コツ一覧 */}
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {choice.effects.map((eff, effIdx) => (
                          <span
                            key={effIdx}
                            className={`text-xs px-2 py-0.5 rounded font-bold ${
                              eff.includes("Lv3") && choice.isBasicStat && (eff.includes("球速") || eff.includes("コントロール") || eff.includes("スタミナ") || eff.includes("ミート") || eff.includes("パワー") || eff.includes("守備力"))
                                ? "bg-amber-400 text-slate-950 shadow-sm"
                                : "bg-slate-800 text-slate-200 border border-slate-700/60"
                            }`}
                          >
                            {eff}
                          </span>
                        ))}
                      </div>

                      {/* 経験点 */}
                      <div className="text-[11px] text-emerald-400/90 font-mono">
                        経験点: {choice.stats}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
