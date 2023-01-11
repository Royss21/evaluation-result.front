export interface IHierarchy {
  id: number;
  name: string;
  levelId: number;
  levelName: string;
  hierarchyComponents: IHierarchyComponents[];
}

export interface IHierarchyComponents {
  id: number;
  hierarchyId: number;
  componentId: number;
  weight: number;
}
