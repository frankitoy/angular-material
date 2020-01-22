export interface Ask {
  id?: string | number;
  user_id?: string | number;
  description?: string;
  title?: string;
  address?: string;
  latlong?: any;
  is_open?: boolean;
  views?: number;
  shares?: number;
  recs?: number;
  expires_at?: string;
  created_at?: string;
}
