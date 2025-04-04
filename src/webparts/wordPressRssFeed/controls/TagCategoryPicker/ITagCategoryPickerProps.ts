export interface ITagCategoryPickerProps {
  label: string;
  selectedKeys: number[];
  options: { key: number; text: string }[];
  onChange: (selectedKeys: number[]) => void;
  key: string;
}
