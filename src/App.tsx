import React, { useState } from "react";
import { Header } from "./components/Header";
import { FlowchartSection } from "./components/FlowchartSection";
import { HeroineSection } from "./components/HeroineSection";
import { ComboSection } from "./components/ComboSection";
import { TipsSection } from "./components/TipsSection";

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"flow" | "heroine" | "combo" | "tips">("flow");

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* ヘッダー */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* メインコンテンツ */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6">
        {activeTab === "flow" && <FlowchartSection />}
        {activeTab === "heroine" && <HeroineSection />}
        {activeTab === "combo" && <ComboSection />}
        {activeTab === "tips" && <TipsSection />}
      </main>

      {/* フッター */}
      <footer className="border-t border-slate-800/80 bg-slate-900/60 py-6 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 space-y-2">
          <p>
            パワプロ2026 サクセス『パラレルオールスターズ』特化 攻略ガイド
          </p>
          <div className="flex items-center justify-center space-x-4 text-[11px] text-slate-400">
            <span>情報参照元: <a href="https://game8.jp/pawapuro2026-2027/788147" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Game8 サクセス攻略</a></span>
            <span>•</span>
            <span>進行フロー: ユーザー作成まとめExcel準拠</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
