import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Plus, Send, Mail, Eye } from "lucide-react";
import { toast } from "sonner";
import { useCampaigns, useCreateCampaign, useSendCampaign } from "@/hooks/useCampaigns";
import { CampaignStatus, type CampaignView } from "@/types";

function CreateCampaignDialog() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    subject: "",
    senderName: "",
    body: "",
  });
  const { mutate, isPending } = useCreateCampaign();

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    mutate(form, {
      onSuccess: () => {
        toast.success("Campaign created");
        setForm({ name: "", subject: "", senderName: "", body: "" });
        setOpen(false);
      },
      onError: (err) => toast.error(err.message),
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" data-ocid="create-campaign-btn">
          <Plus className="w-4 h-4 mr-2" />
          New Campaign
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display">New Campaign</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="camp-name">Campaign Name</Label>
              <Input
                id="camp-name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Spring Newsletter"
                required
                data-ocid="campaign-name-input"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="camp-sender">Sender Name</Label>
              <Input
                id="camp-sender"
                name="senderName"
                value={form.senderName}
                onChange={handleChange}
                placeholder="MailForest Team"
                required
                data-ocid="campaign-sender-input"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="camp-subject">Subject Line</Label>
            <Input
              id="camp-subject"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder="Your spring update is here 🌿"
              required
              data-ocid="campaign-subject-input"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="camp-body">Email Body</Label>
            <Textarea
              id="camp-body"
              name="body"
              value={form.body}
              onChange={handleChange}
              placeholder="Write your email content here…"
              rows={6}
              required
              data-ocid="campaign-body-input"
            />
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={isPending}
            data-ocid="create-campaign-submit"
          >
            {isPending ? "Creating…" : "Create Campaign"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function PreviewDialog({ campaign }: { campaign: CampaignView }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          data-ocid="preview-campaign-btn"
          aria-label={`Preview ${campaign.name}`}
        >
          <Eye className="w-3.5 h-3.5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="font-display">Email Preview</DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto space-y-3 pt-2">
          <div className="bg-muted/40 rounded-lg px-4 py-3 space-y-1 text-sm">
            <div className="flex gap-2">
              <span className="text-muted-foreground w-16 flex-shrink-0">From:</span>
              <span className="text-foreground font-medium">{campaign.senderName}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-muted-foreground w-16 flex-shrink-0">Subject:</span>
              <span className="text-foreground font-medium">{campaign.subject}</span>
            </div>
          </div>
          <div
            className="border border-border rounded-lg p-4 bg-card prose prose-sm max-w-none text-foreground"
            dangerouslySetInnerHTML={{ __html: campaign.body }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

function SendConfirmDialog({
  campaign,
  onConfirm,
  isPending,
}: {
  campaign: CampaignView;
  onConfirm: () => void;
  isPending: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        size="sm"
        onClick={() => setOpen(true)}
        disabled={isPending}
        data-ocid="send-campaign-btn"
      >
        <Send className="w-3.5 h-3.5 mr-1.5" />
        Send
      </Button>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display">
              Send "{campaign.name}"?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will send the campaign to{" "}
              <strong>{String(campaign.recipientCount)} active subscriber(s)</strong>.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="send-confirm-cancel">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setOpen(false);
                onConfirm();
              }}
              data-ocid="send-confirm-action"
            >
              <Send className="w-3.5 h-3.5 mr-1.5" />
              Send Campaign
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default function Campaigns() {
  const { data: campaigns, isLoading } = useCampaigns();
  const { mutate: sendCampaign, isPending: isSending } = useSendCampaign();

  function handleSend(id: bigint, name: string) {
    sendCampaign(id, {
      onSuccess: () => toast.success(`"${name}" sent successfully`),
      onError: (err) => toast.error(err.message),
    });
  }

  return (
    <Layout title="Campaigns" actions={<CreateCampaignDialog />}>
      <div className="p-6">
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-20 w-full rounded-xl" />
            ))}
          </div>
        ) : !campaigns?.length ? (
          <div
            className="text-center py-16 rounded-xl border border-dashed border-border"
            data-ocid="campaigns-empty"
          >
            <Mail className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <p className="font-display font-semibold text-foreground mb-1">
              No campaigns yet
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              Create your first campaign to start reaching subscribers.
            </p>
            <CreateCampaignDialog />
          </div>
        ) : (
          <div className="space-y-3">
            {campaigns.map((campaign) => (
              <div
                key={String(campaign.id)}
                className="bg-card border border-border rounded-xl p-4 shadow-subtle flex items-start justify-between gap-4 hover:shadow-elevated transition-smooth"
                data-ocid="campaign-row"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-display font-semibold text-foreground truncate">
                      {campaign.name}
                    </p>
                    <Badge
                      variant={
                        campaign.status === CampaignStatus.sent
                          ? "default"
                          : "secondary"
                      }
                      className="flex-shrink-0"
                    >
                      {campaign.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {campaign.subject}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    From: {campaign.senderName} ·{" "}
                    {String(campaign.recipientCount)} recipients
                    {campaign.status === CampaignStatus.sent && campaign.sentAt !== undefined && (
                      <>
                        {" · Sent "}
                        {new Date(Number(campaign.sentAt) / 1_000_000).toLocaleDateString(
                          undefined,
                          { year: "numeric", month: "short", day: "numeric" }
                        )}
                      </>
                    )}
                  </p>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <PreviewDialog campaign={campaign} />
                  {campaign.status === CampaignStatus.draft && (
                    <SendConfirmDialog
                      campaign={campaign}
                      onConfirm={() => handleSend(campaign.id, campaign.name)}
                      isPending={isSending}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
