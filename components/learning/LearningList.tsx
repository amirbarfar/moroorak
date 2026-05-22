import { LearningItem } from "./types";
import LearningCard from "./LearningCard";
import EmptyState from "./EmptyState";

interface LearningListProps {
  items: LearningItem[];
  onEdit: (item: LearningItem) => void;
  onDelete: (id: string) => void;
}

export default function LearningList({ items, onEdit, onDelete }: LearningListProps) {
  if (items.length === 0) {
    return <EmptyState hasItems={false} />;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => (
        <LearningCard key={item.id} item={item} index={index} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}