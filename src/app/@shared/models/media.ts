export class Media {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  asset_id: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  public_id: string;
  version: number;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  resource_type: 'image' | 'video';
  type: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  created_at: string;
  bytes: number;
  width: number;
  height: number;
  url: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  secure_url: string;
}
