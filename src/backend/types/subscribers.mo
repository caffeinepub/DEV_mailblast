import Common "common";

module {
  public type SubscriberStatus = { #subscribed; #unsubscribed };

  public type Subscriber = {
    id : Common.SubscriberId;
    var name : Text;
    var email : Text;
    var status : SubscriberStatus;
    dateAdded : Common.Timestamp;
  };

  // Shared (immutable) version for API boundary
  public type SubscriberView = {
    id : Common.SubscriberId;
    name : Text;
    email : Text;
    status : SubscriberStatus;
    dateAdded : Common.Timestamp;
  };

  public type AddSubscriberResult = { #ok : SubscriberView; #err : Text };
};
