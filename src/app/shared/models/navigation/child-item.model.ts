export interface ChildItem {
  type?: string;
  name: string;
  state?: string;
  icon?: string;
  sub?: Array<ChildItem>;
}
