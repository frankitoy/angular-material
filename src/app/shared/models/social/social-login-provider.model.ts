export interface SocialLoginProvider {
  id?: string;
  shareUrl?: {
    phone?: string;
    pc?: string;
  };
}
