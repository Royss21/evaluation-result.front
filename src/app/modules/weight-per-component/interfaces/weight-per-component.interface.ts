export interface IWeightPerComponent {
  herarchyId: number;
  levelName: string;
  hierarchyName: string;
  components: Components[];
}

interface Components {
  componentId: number;
  componentName: string;
  weight: number;
}
