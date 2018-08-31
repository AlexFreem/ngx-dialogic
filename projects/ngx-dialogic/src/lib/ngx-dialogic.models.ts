export interface DialogConfig {
  resolve?: Object;
  data?: Object;
  options?: DialogConfigOptions;
}

export interface DialogConfigOptions {
  closeOnOverlay?: boolean;
  isTopAligned?: boolean;
}
