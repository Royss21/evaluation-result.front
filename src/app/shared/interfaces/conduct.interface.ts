export interface IConductBySubcomponent {
  id: string | null;
  levelId: number;
  description: string | null;
  subcomponentId: string;
}

export interface IConductByLevel {
  id: number;
  name: string;
  description: string;
  conducts: IConductBySubcomponent[];
}

