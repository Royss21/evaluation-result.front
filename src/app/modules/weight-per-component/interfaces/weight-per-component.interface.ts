export interface IWeightPerComponent {
  id: number;
  levelName: string;
  hierarchyName: string;
  hierarchyComponents: IHierarchyComponents[];
}

export interface IHierarchyComponents {
  id: number;
  weight: number;
  componentId: number;
  hierarchyId: number;
  hierarchyName: string;
  componentName: string;
}
