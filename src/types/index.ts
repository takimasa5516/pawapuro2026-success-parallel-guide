export type PositionType = "pitcher" | "catcher" | "fielder";

export interface FlowStep {
  no: number;
  destination: string;
  todo: string;
  estimate: string;
  nextPoints: string;
  cores: string;
  spaceTimeLv: string;
  notes?: string;
  pair?: string;
  choice?: string;
  highlight?: boolean;
}

export interface HeroineChoice {
  choiceText: string;
  goldSkill: string;
  description: string;
  skillType: "pitcher" | "fielder";
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
