import List "mo:core/List";
import SubTypes "types/subscribers";
import CampaignTypes "types/campaigns";
import SubscribersApi "mixins/subscribers-api";
import CampaignsApi "mixins/campaigns-api";
import DashboardApi "mixins/dashboard-api";

actor {
  let subscribers = List.empty<SubTypes.Subscriber>();
  let campaigns = List.empty<CampaignTypes.Campaign>();

  include SubscribersApi(subscribers);
  include CampaignsApi(campaigns, subscribers);
  include DashboardApi(subscribers, campaigns);
};
