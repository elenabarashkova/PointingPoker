import { useState } from 'react';

interface UseTooltip {
  tooltipIsVisible: boolean;
  showTooltip: () => void;
  hideTooltip: () => void;
}

export const useTooltip = (): UseTooltip => {
  const [tooltipIsVisible, setTooltipIsVisible] = useState<boolean>(false);

  const showTooltip = () => {
    if (!tooltipIsVisible) {
      setTooltipIsVisible(true);
    }
  };

  const hideTooltip = () => {
    if (tooltipIsVisible) {
      setTooltipIsVisible(false);
    }
  };

  return { tooltipIsVisible, showTooltip, hideTooltip };
};
