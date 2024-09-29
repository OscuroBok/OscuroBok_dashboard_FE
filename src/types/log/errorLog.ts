export interface errorLogsType {
  _id: string;
  module: string;
  statusCode: number;
  method: string;
  errorMessage: string;
  createdAt: string;
  createdBy: {
    firstName: string;
    lastName: string;
  };
}

export interface errorLogDetails {
  _id: string;
  module: string;
  statusCode: number;
  method: string;
  errorMessage: string;
  createdAt: string;
  createdBy: {
    firstName: string;
    lastName: string;
  };
}

export interface errorLogsFilterType {
  handleModuleTypeFilter: (_value: string) => void;
  moduleTypeFilterVal: string;
  handleDateRangeFilter: (_start: string, _end: string) => void;
  from: string;
  to: string;
}