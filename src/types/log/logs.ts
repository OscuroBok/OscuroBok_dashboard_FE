export interface logsFilterType {
  handleModuleTypeFilter: (_value: string) => void;
  handleActionTypeFilter: (_value: string) => void;
  moduleTypeFilterVal: string;
  actionTypeFilterVal: string;
  handleDateRangeFilter: (_start: string, _end: string) => void;
  from: string;
  to: string;
}

export interface logsType {
  _id: string;
  actionBy: string;
  actionText: string;
  actionType: string;
  moduleType: string;
  createdAt: string;
  updatedAt: string;
}

export interface ViewLogDetailsModalPropsType {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  recordId: string;
  domainId?: string;
  resetHandler?: () => void | any;
  handleClose?: () => void | any;
}

interface changeLogType {
  field: string;
  oldRecord: string;
  newRecord: string;
}

export interface logDetailsType {
  actionBy: {
    firstName: string;
    lastName: string;
    fullName: string;
  };
  actionText: string;
  actionType: string;
  createdAt: string;
  moduleType: string;
  changeLog: changeLogType;
}

interface ActionBy {
    firstName: string;
    lastName: string;
    fullName: string;
}

export interface ChangeLog {
    field: string;
    oldRecord: string;
    newRecord: string;
}

export interface logDetails {
  logDetails: {
    _id: string;
    actionType: string;
    actionBy: ActionBy;
    actionText: string;
    changeLog: ChangeLog[];
    createdAt: string;
    updatedAt: string;
  }
}

export interface moduleLogPayload {
  moduleId: string;
  moduleType: string;
}