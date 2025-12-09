export type ModuleType = 'upload' | 'draw';

export interface ModuleConfig {
  id: ModuleType;
  title: string;
  description: string;
  icon: string;
  steps: {
    number: number;
    title: string;
    description: string;
  }[];
}