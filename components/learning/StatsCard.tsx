import { Card, CardContent } from "@/components/ui/card";

interface StatsCardProps {
  label: string;
  value: string;
}

export default function StatsCard({ label, value }: StatsCardProps) {
  return (
    <Card className="rounded-2xl border-border/60 bg-muted/40 shadow-none">
      <CardContent className="space-y-2 p-4 text-center">
        <p className="text-xs text-muted-foreground">{label}</p>
        <h3 className="text-2xl font-black">{value}</h3>
      </CardContent>
    </Card>
  );
}