import React, { useState } from "react";
import { PositionType, FlowStep } from "../types";
import { pitcherFlow, catcherFlow, fielderFlow } from "../data/gameData";
import { CheckCircle2, Circle, AlertTriangle, Sparkles, Filter, UserPlus } from "lucide-react";

export const FlowchartSection: React.FC = () => {
  const [position, setPosition] = useState<PositionType>("pitcher");
  const [checkedSteps, setCheckedSteps] = useState<Record<string, boolean>>({});
  const [showOnlyHighlight, setShowOnlyHighlight] = useState<boolean>(false);

  const currentFlow: FlowStep[] =
    position === "pitcher"
      ? pitcherFlow
      : position === "catcher"
      ? catcherFlow
      : fielderFlow;

  const filteredFlow = showOnlyHighlight
    ? currentFlow.filter((step) => step.highlight)
    : currentFlow;

  const toggleCheck = (no: number) => {
    const key = `${position}-${no}`;
    setCheckedSteps((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const resetChecks = () => {
    setCheckedSteps({});
  };

  return (
    <div className="space-y-6">
      {/* 上部コントロール */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></span>
              シナリオ進行フローチャート
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Excelまとめデータに基づく全17工程の最適巡回ルート。チェックを入れて進行管理できます。
            </p>
          </div>

          {/* ポジション切り替えボタン */}
          <div className="flex items-center bg-slate-800 p-1 rounded-xl border border-slate-700/60 self-start sm:self-auto">
            <button
              onClick={() => setPosition("pitcher")}
              className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                position === "pitcher"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              ⚾ 投手編
            </button>
            <button
              onClick={() => setPosition("catcher")}
              className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                position === "catcher"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              🧤 捕手編
            </button>
            <button
              onClick={() => setPosition("fielder")}
              className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                position === "fielder"
                  ? "bg-amber-600 text-white shadow-sm"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              🏏 野手編
            </button>
          </div>
        </div>

        {/* 絞り込み & リセットバー */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between flex-wrap gap-2 text-xs">
          <button
            onClick={() => setShowOnlyHighlight(!showOnlyHighlight)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-colors border ${
              showOnlyHighlight
                ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                : "bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200"
            }`}
          >
            <Filter className="w-3.5 h-3.5" />
            <span>重要イベント・分岐のみ表示</span>
          </button>

          <button
            onClick={resetChecks}
            className="text-slate-400 hover:text-rose-400 transition-colors"
          >
            チェック全解除
          </button>
        </div>
      </div>

      {/* フローカード一覧 */}
      <div className="space-y-3.5">
        {filteredFlow.map((step) => {
          const isChecked = !!checkedSteps[`${position}-${step.no}`];
          return (
            <div
              key={step.no}
              onClick={() => toggleCheck(step.no)}
              className={`group relative rounded-2xl border transition-all duration-200 cursor-pointer overflow-hidden p-4 sm:p-5 ${
                isChecked
                  ? "bg-slate-900/50 border-slate-800 opacity-65"
                  : step.highlight
                  ? "bg-gradient-to-r from-slate-900 via-slate-900 to-blue-950/40 border-blue-500/40 hover:border-blue-400 shadow-md shadow-blue-500/5"
                  : "bg-slate-900 border-slate-800 hover:border-slate-700"
              }`}
            >
              <div className="flex items-start gap-3 sm:gap-4">
                {/* チェックアイコン */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleCheck(step.no);
                  }}
                  className="mt-0.5 text-slate-500 hover:text-blue-400 transition-colors shrink-0"
                >
                  {isChecked ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                  ) : (
                    <Circle className="w-6 h-6 text-slate-600 group-hover:text-slate-400" />
                  )}
                </button>

                {/* メインコンテンツ */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center flex-wrap gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-blue-500/20 text-blue-300 border border-blue-500/30">
                      STEP {step.no}
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-1.5">
                      <span>{step.destination}</span>
                    </h3>
                    <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-semibold border border-slate-700">
                      目安: {step.estimate}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-purple-950/60 text-purple-300 font-semibold border border-purple-800/40">
                      時空Lv: {step.spaceTimeLv}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-amber-950/60 text-amber-300 font-semibold border border-amber-800/40">
                      使用コア: {step.cores}
                    </span>
                  </div>

                  {/* TODO & 同行メンバー */}
                  <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800/80 mb-3 space-y-2">
                    <div>
                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                        TODO / 行動目標
                      </div>
                      <div className="text-sm font-semibold text-slate-100 whitespace-pre-line leading-relaxed">
                        {step.todo}
                      </div>
                    </div>

                    {step.recruitMember && (
                      <div className="pt-2 border-t border-slate-800/60 flex items-center gap-1.5 text-xs">
                        <UserPlus className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="text-slate-400 font-medium">同行・加入:</span>
                        <span className="font-bold text-emerald-300">{step.recruitMember}</span>
                      </div>
                    )}
                  </div>

                  {/* 必要ポイント & 狙うコンボ情報 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs">
                    {/* 必要ポイント */}
                    <div className="bg-slate-800/60 rounded-lg p-2.5 border border-slate-700/40 flex items-center justify-between">
                      <span className="text-slate-400 font-medium">次に必要なポイント:</span>
                      <span className="font-bold text-sky-300">{step.nextPoints || "なし"}</span>
                    </div>

                    {/* 狙うコンボメモ */}
                    {step.targetCombo ? (
                      <div className="bg-slate-800/60 rounded-lg p-2.5 border border-slate-700/40">
                        <div className="flex items-center justify-between gap-1 text-amber-400 font-bold mb-1">
                          <span className="flex items-center gap-1">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>推奨コンボ目標: {step.targetCombo}</span>
                          </span>
                        </div>
                        <div className="text-slate-200 font-medium whitespace-pre-line">
                          {step.comboChoice}
                        </div>
                      </div>
                    ) : (
                      <div className="bg-slate-800/40 rounded-lg p-2.5 border border-slate-700/30 text-slate-500 italic">
                        コンボ指定なし（クリア・経験点優先）
                      </div>
                    )}
                  </div>

                  {/* 備考・特記事項 */}
                  {step.notes && (
                    <div className="mt-2.5 bg-amber-500/10 border border-amber-500/20 rounded-lg p-2.5 flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div className="text-xs font-medium text-amber-200/90 whitespace-pre-line leading-relaxed">
                        {step.notes}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
