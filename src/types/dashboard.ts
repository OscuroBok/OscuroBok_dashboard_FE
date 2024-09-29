export interface DashboardTopDomains {
    _id: string;
    user: string;
    zoneDetails: ZoneDetails;
    createdBy: Createdby;
    createdAt: string;
    updatedAt: string;
}

interface Createdby {
    firstName: string;
    lastName: string;
}

interface ZoneDetails {
    id: string;
    name: string;
    status: string;
}

export interface DashboardDomains {
    totalDomain: number;
    activeDomainCount: number;
    pendingDomainCount: number;
}

export interface DashboardUsers {
    totalUsers: number;
    activeUserCount: number;
    inactiveUserCount: number;
    blockedUserCount: number;
    archivedUserCount: number;
}

export interface DashboardDnsRecordTemplates {
    totalDnsTemplates: number;
    aRecordsCount: number;
    cnameRecordsCount: number;
    txtRecordsCount: number;
}

// export interface dashboardResType {
//     topDomains: DashboardTopDomains;
//     domains: DashboardDomains;
//     users: DashboardUsers | null; 
//     dns_record_templates: DashboardDnsRecordTemplates;
// }
