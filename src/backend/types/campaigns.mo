import Common "common";

module {
  public type CampaignStatus = { #draft; #sent };

  public type Campaign = {
    id : Common.CampaignId;
    var name : Text;
    var subject : Text;
    var senderName : Text;
    var body : Text;
    var status : CampaignStatus;
    var recipientCount : Nat;
    var sentAt : ?Common.Timestamp;
  };

  // Shared (immutable) version for API boundary
  public type CampaignView = {
    id : Common.CampaignId;
    name : Text;
    subject : Text;
    senderName : Text;
    body : Text;
    status : CampaignStatus;
    recipientCount : Nat;
    sentAt : ?Common.Timestamp;
  };

  public type CreateCampaignResult = { #ok : CampaignView; #err : Text };
  public type SendCampaignResult = { #ok; #err : Text };
};
