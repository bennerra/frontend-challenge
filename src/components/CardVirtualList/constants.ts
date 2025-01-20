import { EScreenSize } from '@/common/e-screen-size';

export const ColumnsBreakpoints: Partial<Record<EScreenSize, number>> = {
  [EScreenSize.XXL]: 5,
  [EScreenSize.MXL]: 4,
  [EScreenSize.MD]: 3,
  [EScreenSize.SM]: 2,
};
