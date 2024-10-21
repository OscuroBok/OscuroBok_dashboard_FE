export interface actionTypeFilterType {
    handleActionTypeFilter: (_value: string) => void;
    actionTypeFilterVal: string;
    handleDateRangeFilter: (_start: string, _end: string) => void;
    from: string;
    to: string;
  }

export interface logLocalDataType {
  created: {
    label: string;
    color: string;
    icon: Element;
    chipLabel?: string;
  },
  updated: {
    label: string;
    color: string;
    icon: Element;
    chipLabel?: string;
  },
  deleted: {
    label: string;
    color: string;
    icon: Element;
    chipLabel?: string;
  }
}