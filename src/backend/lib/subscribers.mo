import List "mo:core/List";
import Time "mo:core/Time";
import Types "../types/subscribers";
import Common "../types/common";

module {
  public func toView(s : Types.Subscriber) : Types.SubscriberView {
    {
      id = s.id;
      name = s.name;
      email = s.email;
      status = s.status;
      dateAdded = s.dateAdded;
    };
  };

  public func addSubscriber(
    subscribers : List.List<Types.Subscriber>,
    nextId : Nat,
    name : Text,
    email : Text,
  ) : Types.AddSubscriberResult {
    let exists = subscribers.find(func(s : Types.Subscriber) : Bool { s.email == email });
    switch (exists) {
      case (?_) { #err("A subscriber with this email already exists") };
      case (null) {
        let sub : Types.Subscriber = {
          id = nextId;
          var name = name;
          var email = email;
          var status = #subscribed;
          dateAdded = Time.now();
        };
        subscribers.add(sub);
        #ok(toView(sub));
      };
    };
  };

  public func listSubscribers(subscribers : List.List<Types.Subscriber>) : [Types.SubscriberView] {
    subscribers.map<Types.Subscriber, Types.SubscriberView>(func(s) { toView(s) }).toArray();
  };

  public func toggleStatus(
    subscribers : List.List<Types.Subscriber>,
    id : Common.SubscriberId,
  ) : ?Types.SubscriberView {
    switch (subscribers.find(func(s : Types.Subscriber) : Bool { s.id == id })) {
      case (null) { null };
      case (?sub) {
        sub.status := switch (sub.status) {
          case (#subscribed) { #unsubscribed };
          case (#unsubscribed) { #subscribed };
        };
        ?toView(sub);
      };
    };
  };

  public func bulkImport(
    subscribers : List.List<Types.Subscriber>,
    nextId : Nat,
    entries : [(Text, Text)],
  ) : (Nat, Nat) {
    var imported = 0;
    var skipped = 0;
    var currentId = nextId;

    for ((name, email) in entries.values()) {
    let exists = subscribers.find(func(s : Types.Subscriber) : Bool { s.email == email });
      switch (exists) {
        case (?_) { skipped += 1 };
        case (null) {
          let sub : Types.Subscriber = {
            id = currentId;
            var name = name;
            var email = email;
            var status = #subscribed;
            dateAdded = Time.now();
          };
          subscribers.add(sub);
          currentId += 1;
          imported += 1;
        };
      };
    };

    (imported, skipped);
  };

  public func getSubscribed(subscribers : List.List<Types.Subscriber>) : [Types.SubscriberView] {
    subscribers
      .filter(func(s : Types.Subscriber) : Bool { s.status == #subscribed })
      .map<Types.Subscriber, Types.SubscriberView>(func(s) { toView(s) })
      .toArray();
  };
};
