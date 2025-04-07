export interface IWordPressUrlField {
  label: string;
  value: string;
  siteFetchHandler: () => Promise<void>;
  onChange: (s: string) => void;
  siteName: string;
  key: string;
}
