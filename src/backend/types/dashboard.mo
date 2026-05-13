import Campaigns "campaigns";

module {
  public type DashboardStats = {
    totalSubscribers : Nat;
    activeSubscribers : Nat;
    totalCampaignsSent : Nat;
    lastCampaign : ?Campaigns.CampaignView;
  };
};
