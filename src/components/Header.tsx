import React from "react";
import { Compass, Heart, Users, Lightbulb } from "lucide-react";

interface HeaderProps {
  activeTab: "flow" | "heroine" | "combo" | "tips";
  setActiveTab: (tab: "flow" | "heroine" | "combo" | "tips") => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "flow", label: "進行フロー", icon: Compass, badge: "投手/捕手/野手" },
    { id: "heroine", label: "彼女情報", icon: Heart, badge: "4名・金特選択肢" },
    { id: "combo", label: "コンボイベント", icon: Users, badge: "全11組" },
    { id: "tips", label: "攻略のコツ", icon: Lightbulb, badge: "★250分岐他" },
  ] as const;

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-amber-500 flex items-center justify-center text-xl shadow-md shadow-blue-500/20">
              ⚾
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  パワプロ2026
                </span>
                <span className="text-xs font-semibold text-amber-400">
                  サクセス特化
                </span>
              </div>
              <h1 className="text-lg sm:text-xl font-black tracking-tight text-white">
                パラレルオールスターズ 攻略ナビ
              </h1>
            </div>
          </div>

          {/* タブナビゲーション */}
          <nav className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-150 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/30 ring-2 ring-blue-400/40"
                      : "bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400"}`} />
                  <span>{tab.label}</span>
                  <span
                    className={`hidden md:inline-block text-[10px] px-1.5 py-0.2 rounded font-normal ${
                      isActive ? "bg-blue-800 text-blue-100" : "bg-slate-700 text-slate-400"
                    }`}
                  >
                    {tab.badge}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};
