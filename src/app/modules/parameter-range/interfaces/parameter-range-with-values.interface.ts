import { IParameterValue } from './parameter-value.interface';

export interface IParameterRangeWithValues {
  id?: string;
  name: string;
  description: string;
  isInternalConfiguration: boolean;
  parametersValue: IParameterValue[];
}
