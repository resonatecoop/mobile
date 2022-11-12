export interface ReportErrorInfo {
  [k: string]: unknown;
}

export class ExtendedError extends Error {
  extraInfo: Record<string, unknown>;
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    this.extraInfo = {};
  }
  addExtraInfo(info: ReportErrorInfo) {
    Object.assign(this.extraInfo, info);
  }
}

export class FetchError extends ExtendedError {
  status: number;
  url: string;
  constructor(message: string, url: string, res?: Response) {
    super(message);
    this.status = res?.status ?? 500;
    this.url = url;
  }
}
