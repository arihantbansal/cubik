export interface CloudflareResponseType {
  result: {
    id: string;
    filename: string;
    metadata: {
      key: string;
    };
    uploaded: Date;
    requireSignedURLs: boolean;
    variants: string[];
  };
  success: boolean;
  errors: any[];
  messages: any[];
}
