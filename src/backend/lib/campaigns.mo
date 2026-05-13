import List "mo:core/List";
import Types "../types/campaigns";
import Common "../types/common";

module {
  public func toView(c : Types.Campaign) : Types.CampaignView {
    {
      id = c.id;
      name = c.name;
      subject = c.subject;
      senderName = c.senderName;
      body = c.body;
      status = c.status;
      recipientCount = c.recipientCount;
      sentAt = c.sentAt;
    };
  };

  public func createCampaign(
    campaigns : List.List<Types.Campaign>,
    nextId : Nat,
    name : Text,
    subject : Text,
    senderName : Text,
    body : Text,
  ) : Types.CampaignView {
    let campaign : Types.Campaign = {
      id = nextId;
      var name = name;
      var subject = subject;
      var senderName = senderName;
      var body = body;
      var status = #draft;
      var recipientCount = 0;
      var sentAt = null;
    };
    campaigns.add(campaign);
    toView(campaign);
  };

  public func listCampaigns(campaigns : List.List<Types.Campaign>) : [Types.CampaignView] {
    campaigns.map<Types.Campaign, Types.CampaignView>(func(c) { toView(c) }).toArray();
  };

  public func getCampaign(
    campaigns : List.List<Types.Campaign>,
    id : Common.CampaignId,
  ) : ?Types.Campaign {
    campaigns.find(func(c : Types.Campaign) : Bool { c.id == id });
  };

  public func markSent(
    campaign : Types.Campaign,
    recipientCount : Nat,
    sentAt : Common.Timestamp,
  ) {
    campaign.status := #sent;
    campaign.recipientCount := recipientCount;
    campaign.sentAt := ?sentAt;
  };
};
