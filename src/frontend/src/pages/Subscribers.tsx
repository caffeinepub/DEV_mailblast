import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UserPlus, ToggleLeft, ToggleRight, Upload } from "lucide-react";
import { toast } from "sonner";
import {
  useSubscribers,
  useAddSubscriber,
  useToggleSubscriberStatus,
  useBulkImportSubscribers,
} from "@/hooks/useSubscribers";
import { SubscriberStatus } from "@/types";

function AddSubscriberDialog() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { mutate, isPending } = useAddSubscriber();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    mutate(
      { name, email },
      {
        onSuccess: () => {
          toast.success("Subscriber added");
          setName("");
          setEmail("");
          setOpen(false);
        },
        onError: (err) => toast.error(err.message),
      }
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" data-ocid="add-subscriber-btn">
          <UserPlus className="w-4 h-4 mr-2" />
          Add Subscriber
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-display">Add Subscriber</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <Label htmlFor="sub-name">Name</Label>
            <Input
              id="sub-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jane Smith"
              required
              data-ocid="subscriber-name-input"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="sub-email">Email</Label>
            <Input
              id="sub-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jane@example.com"
              required
              data-ocid="subscriber-email-input"
            />
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={isPending}
            data-ocid="add-subscriber-submit"
          >
            {isPending ? "Adding…" : "Add Subscriber"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function BulkImportDialog() {
  const [open, setOpen] = useState(false);
  const [csv, setCsv] = useState("");
  const { mutate, isPending } = useBulkImportSubscribers();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const entries: Array<[string, string]> = csv
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const [name, email] = line.split(",").map((s) => s.trim());
        return [name ?? "", email ?? ""] as [string, string];
      })
      .filter(([, email]) => email.includes("@"));

    if (!entries.length) {
      toast.error("No valid entries found. Use format: name,email");
      return;
    }

    mutate(entries, {
      onSuccess: () => {
        toast.success(`Imported ${entries.length} subscriber(s)`);
        setCsv("");
        setOpen(false);
      },
      onError: (err) => toast.error(err.message),
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" data-ocid="bulk-import-btn">
          <Upload className="w-4 h-4 mr-2" />
          Bulk Import
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-display">Bulk Import Subscribers</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <Label htmlFor="bulk-csv">
              CSV Data{" "}
              <span className="text-muted-foreground font-normal">
                (one per line: name,email)
              </span>
            </Label>
            <Textarea
              id="bulk-csv"
              value={csv}
              onChange={(e) => setCsv(e.target.value)}
              placeholder={"Jane Smith,jane@example.com\nJohn Doe,john@example.com"}
              rows={8}
              required
              data-ocid="bulk-import-csv-input"
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Lines without a valid email address will be skipped.
          </p>
          <Button
            type="submit"
            className="w-full"
            disabled={isPending}
            data-ocid="bulk-import-submit"
          >
            {isPending ? "Importing…" : "Import Subscribers"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function SubscribersActions() {
  return (
    <div className="flex items-center gap-2">
      <BulkImportDialog />
      <AddSubscriberDialog />
    </div>
  );
}

export default function Subscribers() {
  const { data: subscribers, isLoading } = useSubscribers();
  const { mutate: toggle } = useToggleSubscriberStatus();

  function handleToggle(id: bigint) {
    toggle(id, {
      onSuccess: () => toast.success("Status updated"),
      onError: () => toast.error("Failed to update status"),
    });
  }

  return (
    <Layout title="Subscribers" actions={<SubscribersActions />}>
      <div className="p-6">
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-14 w-full rounded-lg" />
            ))}
          </div>
        ) : !subscribers?.length ? (
          <div
            className="text-center py-16 rounded-xl border border-dashed border-border"
            data-ocid="subscribers-empty"
          >
            <UserPlus className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <p className="font-display font-semibold text-foreground mb-1">
              No subscribers yet
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              Add your first subscriber to get started.
            </p>
            <AddSubscriberDialog />
          </div>
        ) : (
          <div className="rounded-xl border border-border overflow-hidden shadow-subtle">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/40 border-b border-border">
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                    Name
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                    Email
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                    Status
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                    Date Added
                  </th>
                  <th className="text-right px-4 py-3 font-medium text-muted-foreground">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border bg-card">
                {subscribers.map((sub) => (
                  <tr
                    key={String(sub.id)}
                    className="hover:bg-muted/20 transition-smooth"
                    data-ocid="subscriber-row"
                  >
                    <td className="px-4 py-3 font-medium text-foreground">
                      {sub.name}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {sub.email}
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        variant={
                          sub.status === SubscriberStatus.subscribed
                            ? "default"
                            : "secondary"
                        }
                      >
                        {sub.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground text-xs">
                      {new Date(Number(sub.dateAdded) / 1_000_000).toLocaleDateString(
                        undefined,
                        { year: "numeric", month: "short", day: "numeric" }
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleToggle(sub.id)}
                        data-ocid="toggle-subscriber-btn"
                        aria-label={`Toggle ${sub.name} status`}
                      >
                        {sub.status === SubscriberStatus.subscribed ? (
                          <ToggleRight className="w-4 h-4 text-primary" />
                        ) : (
                          <ToggleLeft className="w-4 h-4 text-muted-foreground" />
                        )}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
}
