import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Users, Mail, Send, TrendingUp } from "lucide-react";
import { useDashboardStats } from "@/hooks/useDashboard";
import { CampaignStatus } from "@/types";

function StatCard({
  title,
  value,
  icon: Icon,
  loading,
}: {
  title: string;
  value: string;
  icon: React.ElementType;
  loading: boolean;
}) {
  return (
    <Card className="shadow-subtle">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="w-4 h-4 text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className="h-8 w-24" />
        ) : (
          <p className="text-2xl font-display font-bold text-foreground">
            {value}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export default function Dashboard() {
  const { data: stats, isLoading } = useDashboardStats();

  return (
    <Layout title="Dashboard">
      <div className="p-6 space-y-6">
        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard
            title="Total Subscribers"
            value={stats ? String(stats.totalSubscribers) : "0"}
            icon={Users}
            loading={isLoading}
          />
          <StatCard
            title="Active Subscribers"
            value={stats ? String(stats.activeSubscribers) : "0"}
            icon={TrendingUp}
            loading={isLoading}
          />
          <StatCard
            title="Campaigns Sent"
            value={stats ? String(stats.totalCampaignsSent) : "0"}
            icon={Send}
            loading={isLoading}
          />
        </div>

        {/* Last campaign */}
        <Card className="shadow-subtle">
          <CardHeader>
            <CardTitle className="font-display text-base">
              Last Campaign
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-4 w-64" />
              </div>
            ) : stats?.lastCampaign ? (
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-medium text-foreground truncate">
                    {stats.lastCampaign.name}
                  </p>
                  <p className="text-sm text-muted-foreground truncate mt-0.5">
                    {stats.lastCampaign.subject}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {String(stats.lastCampaign.recipientCount)} recipients
                  </p>
                </div>
                <Badge
                  variant={
                    stats.lastCampaign.status === CampaignStatus.sent
                      ? "default"
                      : "secondary"
                  }
                  className="flex-shrink-0"
                >
                  <Mail className="w-3 h-3 mr-1" />
                  {stats.lastCampaign.status}
                </Badge>
              </div>
            ) : (
              <div
                className="text-center py-8 rounded-lg bg-muted/40"
                data-ocid="no-campaigns-empty"
              >
                <Mail className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  No campaigns sent yet
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
