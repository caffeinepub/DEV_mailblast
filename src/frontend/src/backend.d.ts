import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Timestamp = bigint;
export type AddSubscriberResult = {
    __kind__: "ok";
    ok: SubscriberView;
} | {
    __kind__: "err";
    err: string;
};
export type CreateCampaignResult = {
    __kind__: "ok";
    ok: CampaignView;
} | {
    __kind__: "err";
    err: string;
};
export type SendCampaignResult = {
    __kind__: "ok";
    ok: null;
} | {
    __kind__: "err";
    err: string;
};
export interface CampaignView {
    id: CampaignId;
    status: CampaignStatus;
    subject: string;
    body: string;
    name: string;
    sentAt?: Timestamp;
    senderName: string;
    recipientCount: bigint;
}
export type CampaignId = bigint;
export interface DashboardStats {
    lastCampaign?: CampaignView;
    activeSubscribers: bigint;
    totalCampaignsSent: bigint;
    totalSubscribers: bigint;
}
export type SubscriberId = bigint;
export interface SubscriberView {
    id: SubscriberId;
    status: SubscriberStatus;
    name: string;
    email: string;
    dateAdded: Timestamp;
}
export enum CampaignStatus {
    sent = "sent",
    draft = "draft"
}
export enum SubscriberStatus {
    unsubscribed = "unsubscribed",
    subscribed = "subscribed"
}
export interface backendInterface {
    addSubscriber(name: string, email: string): Promise<AddSubscriberResult>;
    bulkImportSubscribers(entries: Array<[string, string]>): Promise<{
        imported: bigint;
        skipped: bigint;
    }>;
    createCampaign(name: string, subject: string, senderName: string, body: string): Promise<CreateCampaignResult>;
    getDashboardStats(): Promise<DashboardStats>;
    listCampaigns(): Promise<Array<CampaignView>>;
    listSubscribers(): Promise<Array<SubscriberView>>;
    sendCampaign(id: bigint): Promise<SendCampaignResult>;
    toggleSubscriberStatus(id: bigint): Promise<SubscriberView | null>;
}
