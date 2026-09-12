export type PositionType = "pitcher" | "catcher" | "fielder";

export interface FlowStep {
  no: number;
  destination: string;
  todo: string;
  estimate: string;
  nextPoints: string;
  cores: string;
  spaceTimeLv: string;
  recruitMember?: string; // 同行加入メンバー
  notes?: string;
  targetCombo?: string;   // 狙うコンボ
  comboChoice?: string;  // コンボ推奨選択肢
  highlight?: boolean;
}

export interface DateEventChoice {
  text: string;
  skills: string[];
  stats: string;
  note?: string;
}

export interface DateEvent {
  stepName: string;
  title: string;
  description: string;
  isGoldSkill?: boolean;
  pitcherEffect: {
    hasChoice: boolean;
    choices?: DateEventChoice[];
    directStats?: string;
    directSkills?: string[];
  };
  fielderEffect: {
    hasChoice: boolean;
    choices?: DateEventChoice[];
    directStats?: string;
    directSkills?: string[];
  };
}

export interface HeroineInfo {
  id: string;
  name: string;
  reading: string;
  school: string;
  firstSpaceTime: string;
  howToMeet: string;
  howToDate: string;
  lovePowerEffect: string;
  pitcherGoldSkills: {
    top: { choice: string; skill: string; desc: string };
    bottom: { choice: string; skill: string; desc: string };
  };
  fielderGoldSkills: {
    top: { choice: string; skill: string; desc: string };
    bottom: { choice: string; skill: string; desc: string };
  };
  dateEvents: DateEvent[];
  recommendPositions: string[];
  tips: string;
  color: string;
}

export interface ComboChoiceDetail {
  choiceName: string;
  effects: string[];
  stats: string;
  isBasicStat?: boolean;
  basicStatName?: string;
}

export interface ComboEvent {
  id: string;
  char1: { name: string; school: string };
  char2: { name: string; school: string };
  pitcherChoices: ComboChoiceDetail[];
  fielderChoices: ComboChoiceDetail[];
  hasPitcherBasicStat?: boolean;
  hasFielderBasicStat?: boolean;
}

export interface StrategyTip {
  title: string;
  timing: string;
  tag: string;
  description: string;
  details: string[];
  icon: string;
}
