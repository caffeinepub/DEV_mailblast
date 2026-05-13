import List "mo:core/List";
import SubTypes "../types/subscribers";
import SubLib "../lib/subscribers";

mixin (
  subscribers : List.List<SubTypes.Subscriber>,
) {
  public func addSubscriber(name : Text, email : Text) : async SubTypes.AddSubscriberResult {
    SubLib.addSubscriber(subscribers, subscribers.size(), name, email);
  };

  public query func listSubscribers() : async [SubTypes.SubscriberView] {
    SubLib.listSubscribers(subscribers);
  };

  public func toggleSubscriberStatus(id : Nat) : async ?SubTypes.SubscriberView {
    SubLib.toggleStatus(subscribers, id);
  };

  public func bulkImportSubscribers(entries : [(Text, Text)]) : async { imported : Nat; skipped : Nat } {
    let (imported, skipped) = SubLib.bulkImport(subscribers, subscribers.size(), entries);
    { imported; skipped };
  };
};
