import React, { useState, useMemo } from "react";
import { 
  BATTING_FORMS_DATA, 
  PITCHING_FORMS_DATA 
} from "../data/formsData";
import { 
  Search, 
  Filter, 
  Sparkles, 
  User, 
  ExternalLink,
  Info
} from "lucide-react";

export const FormsSection: React.FC = () => {
  // Mode: 'batting' or 'pitching'
  const [formType, setFormType] = useState<"batting" | "pitching">("batting");

  // Search query
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Filters for Batting
  const [battingCategory, setBattingCategory] = useState<string>("すべて");
  const [battingHand, setBattingHand] = useState<string>("すべて");
  const [onlyFollowThrough, setOnlyFollowThrough] = useState<boolean>(false);
  const [onlyRealPlayers, setOnlyRealPlayers] = useState<boolean>(false);

  // Filters for Pitching
  const [pitchingCategory, setPitchingCategory] = useState<string>("すべて");
  const [pitchingHand, setPitchingHand] = useState<string>("すべて");

  // Filtered Batting Forms
  const filteredBatting = useMemo(() => {
    return BATTING_FORMS_DATA.filter((item) => {
      if (battingCategory !== "すべて" && item.formCategory !== battingCategory) return false;
      if (battingHand !== "すべて" && item.handedness !== battingHand) return false;
      if (onlyFollowThrough && !item.hasCustomFollowThrough) return false;
      if (onlyRealPlayers && item.playerName === "汎用") return false;

      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchName = item.formName.toLowerCase().includes(q);
        const matchPlayer = item.playerName.toLowerCase().includes(q);
        const matchCat = item.formCategory.toLowerCase().includes(q);
        if (!matchName && !matchPlayer && !matchCat) return false;
      }
      return true;
    });
  }, [searchQuery, battingCategory, battingHand, onlyFollowThrough, onlyRealPlayers]);

  // Filtered Pitching Forms
  const filteredPitching = useMemo(() => {
    return PITCHING_FORMS_DATA.filter((item) => {
      if (pitchingCategory !== "すべて" && item.formCategory !== pitchingCategory) return false;
      if (pitchingHand !== "すべて" && item.handedness !== pitchingHand) return false;
      if (onlyRealPlayers && item.playerName === "汎用") return false;

      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchName = item.formName.toLowerCase().includes(q);
        const matchPlayer = item.playerName.toLowerCase().includes(q);
        const matchCat = item.formCategory.toLowerCase().includes(q);
        if (!matchName && !matchPlayer && !matchCat) return false;
      }
      return true;
    });
  }, [searchQuery, pitchingCategory, pitchingHand, onlyRealPlayers]);

  const battingCategories = ["すべて", "スタンダード", "オープンスタンス", "クラウチング"];
  const pitchingCategories = ["すべて", "オーバースロー", "スリークォーター", "サイドスロー", "アンダースロー"];

  const followThroughCount = useMemo(() => BATTING_FORMS_DATA.filter(b => b.hasCustomFollowThrough).length, []);
  const realBattingPlayerCount = useMemo(() => BATTING_FORMS_DATA.filter(b => b.playerName !== "汎用").length, []);
  const realPitchingPlayerCount = useMemo(() => PITCHING_FORMS_DATA.filter(p => p.playerName !== "汎用").length, []);

  return (
    <div className="space-y-6">
      {/* Hero Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-600 via-orange-600 to-rose-700 p-6 text-white shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 rounded-full bg-black/20 px-3 py-1 text-xs font-bold backdrop-blur-sm border border-white/20 mb-2">
              <span>⚾ パワプロ2026 設定可能モーション図鑑</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight flex items-center gap-2">
              <span>打撃・投球フォーム ＆ 元ネタ選手一覧</span>
            </h2>
            <p className="text-xs sm:text-sm text-orange-100 mt-1 max-w-2xl leading-relaxed">
              エディットやサクセス育成で設定可能な全打撃フォーム（363種）および投球フォーム（521種）の元ネタ選手・OB名と、本塁打時の「固有フォロースルー」の有無を完全網羅！
            </p>
          </div>

          <div className="flex flex-row md:flex-col gap-2 shrink-0 text-xs">
            <div className="bg-black/30 backdrop-blur-md px-3 py-2 rounded-xl border border-white/20 flex items-center justify-between gap-3">
              <span className="text-orange-200">打撃フォーム:</span>
              <span className="font-extrabold text-white">{BATTING_FORMS_DATA.length}種 <span className="text-[10px] text-amber-300">({realBattingPlayerCount}選手)</span></span>
            </div>
            <div className="bg-black/30 backdrop-blur-md px-3 py-2 rounded-xl border border-white/20 flex items-center justify-between gap-3">
              <span className="text-orange-200">投球フォーム:</span>
              <span className="font-extrabold text-white">{PITCHING_FORMS_DATA.length}種 <span className="text-[10px] text-amber-300">({realPitchingPlayerCount}選手)</span></span>
            </div>
          </div>
        </div>

        {/* Source link footnote */}
        <div className="mt-4 pt-3 border-t border-white/20 flex flex-wrap items-center justify-between gap-2 text-[11px] text-orange-200">
          <div className="flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-amber-300" />
            <span>情報元: 宇宙、日本、練馬 様（AmberFeb）『パワフルプロ野球2026 打撃フォーム・投球フォーム一覧』準拠</span>
          </div>
          <a
            href="https://amberfeb.hatenablog.com/entry/2026/09/01/000000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-amber-200 hover:text-white underline font-bold"
          >
            元記事を開く <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Main Mode Switcher: Batting vs Pitching */}
      <div className="flex p-1.5 bg-slate-900 border border-slate-800 rounded-2xl">
        <button
          onClick={() => { setFormType("batting"); setSearchQuery(""); }}
          className={`flex-1 py-3 px-4 rounded-xl font-black text-sm transition-all flex items-center justify-center gap-2 ${
            formType === "batting"
              ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-orange-500/20 scale-[1.01]"
              : "text-slate-400 hover:text-white hover:bg-slate-800/60"
          }`}
        >
          <span className="text-lg">🏏</span>
          <span>打撃フォーム一覧</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-black/20 font-normal">
            全{BATTING_FORMS_DATA.length}種（固有フォロースルー{followThroughCount}種）
          </span>
        </button>

        <button
          onClick={() => { setFormType("pitching"); setSearchQuery(""); }}
          className={`flex-1 py-3 px-4 rounded-xl font-black text-sm transition-all flex items-center justify-center gap-2 ${
            formType === "pitching"
              ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20 scale-[1.01]"
              : "text-slate-400 hover:text-white hover:bg-slate-800/60"
          }`}
        >
          <span className="text-lg">⚾</span>
          <span>投球フォーム一覧</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-black/20 font-normal">
            全{PITCHING_FORMS_DATA.length}種
          </span>
        </button>
      </div>

      {/* Search & Filters Section */}
      <div className="bg-slate-900/90 border border-slate-800 p-4 sm:p-5 rounded-2xl space-y-4 shadow-sm">
        {/* Search input */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={
              formType === "batting"
                ? "フォーム名（スタンダード27、一本足...）または選手名（浅村、大谷、イチロー、王...）で検索"
                : "フォーム名（オーバースロー15、トルネード...）または選手名（ダルビッシュ、山本、野茂...）で検索"
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-slate-950 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs bg-slate-800 hover:bg-slate-700 text-slate-400 px-2 py-1 rounded-md"
            >
              クリア
            </button>
          )}
        </div>

        {/* Filters Row */}
        <div className="space-y-3">
          {/* Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
            <span className="text-slate-400 font-bold shrink-0 flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5 text-slate-500" /> 系統:
            </span>
            {(formType === "batting" ? battingCategories : pitchingCategories).map((cat) => {
              const currentCat = formType === "batting" ? battingCategory : pitchingCategory;
              const isSelected = currentCat === cat;
              return (
                <button
                  key={cat}
                  onClick={() => formType === "batting" ? setBattingCategory(cat) : setPitchingCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg font-bold whitespace-nowrap transition-all ${
                    isSelected
                      ? formType === "batting"
                        ? "bg-amber-500 text-slate-950 shadow-sm"
                        : "bg-blue-500 text-white shadow-sm"
                      : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Quick Toggles */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800/80 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              {/* Handedness filter */}
              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
                <span className="text-[11px] text-slate-400 px-1.5 font-bold">打/投:</span>
                {["すべて", "右", "左", ...(formType === "batting" ? ["両"] : [])].map((h) => {
                  const currentH = formType === "batting" ? battingHand : pitchingHand;
                  const isSelected = currentH === h;
                  return (
                    <button
                      key={h}
                      onClick={() => formType === "batting" ? setBattingHand(h) : setPitchingHand(h)}
                      className={`px-2 py-0.5 rounded font-bold transition-all ${
                        isSelected ? "bg-slate-700 text-white" : "text-slate-500 hover:text-slate-300"
                      }`}
                    >
                      {h}
                    </button>
                  );
                })}
              </div>

              {/* Batting only: Follow through toggle */}
              {formType === "batting" && (
                <button
                  onClick={() => setOnlyFollowThrough(!onlyFollowThrough)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold border transition-all ${
                    onlyFollowThrough
                      ? "bg-orange-500/20 text-orange-300 border-orange-500/50 shadow-sm shadow-orange-500/10"
                      : "bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200"
                  }`}
                >
                  <Sparkles className={`w-3.5 h-3.5 ${onlyFollowThrough ? "text-orange-400" : "text-slate-500"}`} />
                  <span>固有フォロースルー有りのみ ({followThroughCount})</span>
                </button>
              )}

              {/* Real player only toggle */}
              <button
                onClick={() => setOnlyRealPlayers(!onlyRealPlayers)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold border transition-all ${
                  onlyRealPlayers
                    ? "bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-sm"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200"
                }`}
              >
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span>元ネタ選手名有りのみ（汎用除く）</span>
              </button>
            </div>

            {/* Results Counter */}
            <div className="text-slate-400 font-bold">
              該当件数: <span className="text-white text-sm font-extrabold">{formType === "batting" ? filteredBatting.length : filteredPitching.length}</span> 件
            </div>
          </div>
        </div>
      </div>

      {/* Feature notice for Batting */}
      {formType === "batting" && (
        <div className="bg-orange-950/40 border border-orange-800/60 p-3.5 rounded-xl flex items-center gap-3 text-xs text-orange-200 shadow-sm">
          <div className="p-2 rounded-lg bg-orange-500 text-slate-950 shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <span className="font-black text-orange-300">オレンジ色のフォームは「固有フォロースルー」搭載！</span>
            <p className="text-[11px] text-orange-200/90 mt-0.5">
              ホームラン時に専用の確信歩きやバット投げなどの固有モーションが発動する特別なフォーム（全32種）です。自作選手のモーション付けに最適！
            </p>
          </div>
        </div>
      )}

      {/* Data Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/90 shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-950 text-slate-400 border-b border-slate-800 font-extrabold">
                <th className="py-3 px-4 w-36 whitespace-nowrap">フォーム名</th>
                <th className="py-3 px-3 w-28 whitespace-nowrap">系統</th>
                <th className="py-3 px-4 min-w-[220px]">元ネタ選手名 / 備考</th>
                <th className="py-3 px-3 w-16 text-center whitespace-nowrap">{formType === "batting" ? "打席" : "投球"}</th>
                {formType === "batting" && (
                  <th className="py-3 px-4 w-40 text-center whitespace-nowrap">固有フォロースルー</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-200">
              {formType === "batting" ? (
                filteredBatting.length > 0 ? (
                  filteredBatting.map((item) => (
                    <tr 
                      key={item.id} 
                      className={`transition-colors hover:bg-slate-800/50 ${
                        item.hasCustomFollowThrough 
                          ? "bg-orange-950/20 hover:bg-orange-950/30" 
                          : ""
                      }`}
                    >
                      {/* フォーム名 */}
                      <td className="py-3 px-4 font-black whitespace-nowrap">
                        <span className={item.hasCustomFollowThrough ? "text-orange-400" : "text-white"}>
                          {item.formName}
                        </span>
                      </td>

                      {/* 系統 */}
                      <td className="py-3 px-3 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[11px] font-semibold border border-slate-700/60">
                          {item.formCategory}
                        </span>
                      </td>

                      {/* 元ネタ選手名 */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`font-bold text-sm ${
                            item.playerName === "汎用" 
                              ? "text-slate-500 font-normal" 
                              : "text-amber-200"
                          }`}>
                            {item.playerName}
                          </span>
                          {item.playerName !== "汎用" && (
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold">
                              実在OB/現役
                            </span>
                          )}
                        </div>
                      </td>

                      {/* 利き腕 */}
                      <td className="py-3 px-3 text-center whitespace-nowrap">
                        <span className={`inline-block px-2 py-0.5 rounded font-black text-[11px] ${
                          item.handedness === "右" 
                            ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                            : item.handedness === "左"
                            ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                            : item.handedness === "両"
                            ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                            : "text-slate-600"
                        }`}>
                          {item.handedness}
                        </span>
                      </td>

                      {/* 固有フォロースルー */}
                      <td className="py-3 px-4 text-center whitespace-nowrap">
                        {item.hasCustomFollowThrough ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-black text-[11px] shadow-sm shadow-orange-500/20">
                            <Sparkles className="w-3 h-3" /> あり
                          </span>
                        ) : (
                          <span className="text-slate-600 text-[11px]">
                            なし
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-slate-500">
                      一致する打撃フォームが見つかりませんでした。検索条件を変更してください。
                    </td>
                  </tr>
                )
              ) : (
                filteredPitching.length > 0 ? (
                  filteredPitching.map((item) => (
                    <tr 
                      key={item.id} 
                      className="transition-colors hover:bg-slate-800/50"
                    >
                      {/* フォーム名 */}
                      <td className="py-3 px-4 font-black whitespace-nowrap text-white">
                        {item.formName}
                      </td>

                      {/* 系統 */}
                      <td className="py-3 px-3 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[11px] font-semibold border border-slate-700/60">
                          {item.formCategory}
                        </span>
                      </td>

                      {/* 元ネタ選手名 */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`font-bold text-sm ${
                            item.playerName === "汎用" 
                              ? "text-slate-500 font-normal" 
                              : "text-blue-200"
                          }`}>
                            {item.playerName}
                          </span>
                          {item.playerName !== "汎用" && (
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 font-bold">
                              実在OB/現役
                            </span>
                          )}
                        </div>
                      </td>

                      {/* 利き腕 */}
                      <td className="py-3 px-3 text-center whitespace-nowrap">
                        <span className={`inline-block px-2 py-0.5 rounded font-black text-[11px] ${
                          item.handedness === "右" 
                            ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                            : item.handedness === "左"
                            ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                            : "text-slate-600"
                        }`}>
                          {item.handedness}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-12 text-center text-slate-500">
                      一致する投球フォームが見つかりませんでした。検索条件を変更してください。
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
