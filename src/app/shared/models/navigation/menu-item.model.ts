import { ChildItem } from './child-item.model';
import { Badge } from '../profiles/badge.model';

export interface MenuItem {
  type: string;
  name?: string;
  state?: string;
  icon?: string;
  tooltip?: string;
  disabled?: boolean;
  sub?: Array<ChildItem>;
  badges?: Array<Badge>;
}
