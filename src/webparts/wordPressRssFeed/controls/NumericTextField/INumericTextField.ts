export interface INumericTextField {
  label: string;
  value: string;
  onChange?: (newVal: string) => void;
  key: string;
  min: number;
  max: number;
}
