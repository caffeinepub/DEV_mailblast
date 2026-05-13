import List "mo:core/List";
import DashboardTypes "../types/dashboard";
import CampaignTypes "../types/campaigns";
import SubTypes "../types/subscribers";
import CampaignLib "../lib/campaigns";

mixin (
  subscribers : List.List<SubTypes.Subscriber>,
  campaigns : List.List<CampaignTypes.Campaign>,
) {
  public query func getDashboardStats() : async DashboardTypes.DashboardStats {
    let totalSubscribers = subscribers.size();
    let activeSubscribers = subscribers.filter(func(s : SubTypes.Subscriber) : Bool { s.status == #subscribed }).size();
    let sentCampaigns = campaigns.filter(func(c : CampaignTypes.Campaign) : Bool { c.status == #sent });
    let totalCampaignsSent = sentCampaigns.size();
    let lastCampaign = switch (sentCampaigns.last()) {
      case (null) { null };
      case (?c) { ?CampaignLib.toView(c) };
    };
    {
      totalSubscribers;
      activeSubscribers;
      totalCampaignsSent;
      lastCampaign;
    };
  };
};
