import List "mo:core/List";
import Time "mo:core/Time";
import CampaignTypes "../types/campaigns";
import SubTypes "../types/subscribers";
import CampaignLib "../lib/campaigns";
import SubLib "../lib/subscribers";

mixin (
  campaigns : List.List<CampaignTypes.Campaign>,
  subscribers : List.List<SubTypes.Subscriber>,
) {
  type EmailMarketingCanister = actor {
    sendBulkEmail : (
      subject : Text,
      senderName : Text,
      htmlBody : Text,
      recipients : [{ name : Text; email : Text }],
    ) -> async { #ok; #err : Text };
  };

  let emailMarketing : EmailMarketingCanister = actor "aaaaa-aa";

  public func createCampaign(
    name : Text,
    subject : Text,
    senderName : Text,
    body : Text,
  ) : async CampaignTypes.CreateCampaignResult {
    if (name == "") return #err("Campaign name cannot be empty");
    if (subject == "") return #err("Subject cannot be empty");
    if (senderName == "") return #err("Sender name cannot be empty");
    let view = CampaignLib.createCampaign(campaigns, campaigns.size(), name, subject, senderName, body);
    #ok(view);
  };

  public query func listCampaigns() : async [CampaignTypes.CampaignView] {
    CampaignLib.listCampaigns(campaigns);
  };

  public func sendCampaign(id : Nat) : async CampaignTypes.SendCampaignResult {
    switch (CampaignLib.getCampaign(campaigns, id)) {
      case (null) { #err("Campaign not found") };
      case (?campaign) {
        if (campaign.status == #sent) return #err("Campaign has already been sent");
        let activeSubscribers = SubLib.getSubscribed(subscribers);
        if (activeSubscribers.size() == 0) return #err("No active subscribers to send to");
        let recipients = activeSubscribers.map(
          func(s : SubTypes.SubscriberView) : { name : Text; email : Text } { { name = s.name; email = s.email } }
        );
        try {
          let result = await emailMarketing.sendBulkEmail(
            campaign.subject,
            campaign.senderName,
            campaign.body,
            recipients,
          );
          switch (result) {
            case (#ok) {
              CampaignLib.markSent(campaign, activeSubscribers.size(), Time.now());
              #ok;
            };
            case (#err(msg)) { #err(msg) };
          };
        } catch (_) {
          #err("Failed to send emails. Please try again.");
        };
      };
    };
  };
};
