"use client";

import { useState, useEffect, useCallback } from "react";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/planning/Header";
import PlannerCard from "@/components/planning/PlannerCard";
import TaskDialog from "@/components/planning/TaskDialog";
import Timeline from "@/components/planning/Timeline";
import { Task } from "@/components/planning/types";
import { api } from "@/lib/api";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { TaskSchema, TaskFormData } from "@/lib/validations/schemas";
import { todayTehran } from "@/lib/utils";

export default function PlanningPage() {
  const [selectedDate, setSelectedDate] = useState(() => todayTehran());
  const [tasks, setTasks] = useState<Task[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");

  const completedCount = tasks.filter((t) => t.completed).length;

  const fetchTasks = useCallback(async (date: string) => {
    try {
      const data = await api(`/api/tasks?date=${date}`, { method: "GET" });
      setTasks(data.tasks);
    } catch {
      setTasks([]);
    }
  }, []);

  useEffect(() => {
    fetchTasks(selectedDate);
  }, [selectedDate, fetchTasks]);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setTime("");
    setEditingTask(null);
  };

  const { submit: submitTask, isLoading: savingTask } = useFormSubmit<TaskFormData>({
    schema: TaskSchema,
    endpoint: editingTask ? `/api/tasks/${editingTask.id}` : "/api/tasks",
    method: editingTask ? "PATCH" : "POST",
    onSuccess: (data) => {
      if (editingTask) {
        setTasks((prev) => prev.map((t) => t.id === editingTask.id ? data.task : t));
      } else {
        setTasks((prev) => [...prev, data.task].sort((a, b) => a.time.localeCompare(b.time)));
      }
      resetForm();
      setOpenModal(false);
    },
  });

  const changeDay = (direction: "next" | "prev") => {
    const date = new Date(selectedDate);
    date.setDate(date.getDate() + (direction === "next" ? 1 : -1));
    setSelectedDate(date.toISOString().split("T")[0]);
  };

  const goToday = () => setSelectedDate(todayTehran());

  const handleSave = () =>
    submitTask({ date: selectedDate, title, description, time: time || "" });

  const deleteTask = async (id: string) => {
    try {
      await api(`/api/tasks/${id}`, { method: "DELETE" });
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch {
      // ignore
    }
  };

  const toggleTask = async (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;
    try {
      const data = await api(`/api/tasks/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ completed: !task.completed }),
      });
      setTasks((prev) => prev.map((t) => t.id === id ? data.task : t));
    } catch {
      // ignore
    }
  };

  const openEdit = (task: Task) => {
    setEditingTask(task);
    setTitle(task.title);
    setDescription(task.description);
    setTime(task.time);
    setOpenModal(true);
  };

  const openAdd = () => {
    resetForm();
    setOpenModal(true);
  };

  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden">
      <section className="relative bg-linear-to-b from-muted/50 to-background">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.12),transparent_30%),radial-gradient(circle_at_bottom_left,hsl(var(--ring)/0.08),transparent_30%)]" />
        <div className="container relative mx-auto px-6 py-16 md:py-24">
          <div className="grid items-center gap-8 lg:gap-14 lg:grid-cols-2">
            <div className="space-y-5">
              <Header />
            </div>
            <div className="relative flex justify-center">
              <PlannerCard
                selectedDate={selectedDate}
                total={tasks.length}
                completed={completedCount}
                onPrev={() => changeDay("prev")}
                onNext={() => changeDay("next")}
                onToday={goToday}
                onAdd={openAdd}
              />
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-16">
        <div className="mb-10 flex flex-col gap-3 text-center">
          <Badge variant="secondary" className="mx-auto rounded-full px-3 py-1 text-xs">
            تایم‌لاین روز
          </Badge>
          <h2 className="text-2xl font-black tracking-tight sm:text-3xl md:text-4xl">
            برنامه‌های امروز
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-8 text-muted-foreground">
            تسک‌هات رو یکی یکی تیک بزن و پیشرفتت رو ببین.
          </p>
        </div>

        <Timeline
          tasks={tasks}
          onToggle={toggleTask}
          onEdit={openEdit}
          onDelete={deleteTask}
        />
      </div>

      <TaskDialog
        open={openModal}
        onOpenChange={setOpenModal}
        editingTask={editingTask}
        title={title}
        description={description}
        time={time}
        onTitleChange={setTitle}
        onDescriptionChange={setDescription}
        onTimeChange={setTime}
        onSave={handleSave}
        isLoading={savingTask}
      />
    </main>
  );
}