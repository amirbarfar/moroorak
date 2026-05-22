import DateNav from "@/components/ui/date-nav";

interface DateSelectorProps {
  selectedDate: string;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
}

export default function DateSelector({ selectedDate, onPrev, onNext, onToday }: DateSelectorProps) {
  return (
    <DateNav
      selectedDate={selectedDate}
      onPrev={onPrev}
      onNext={onNext}
      onToday={onToday}
      format="compact"
    />
  );
}
