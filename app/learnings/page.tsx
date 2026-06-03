"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useTranslations } from "next-intl";
import HeroSection from "@/components/learning/HeroSection";
import FilterBar from "@/components/learning/FilterBar";
import LearningList from "@/components/learning/LearningList";
import LearningDialog from "@/components/learning/LearningDialog";
import { LearningItem, Tag } from "@/components/learning/types";
import { api } from "@/lib/api";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { LearningSchema, LearningFormData } from "@/lib/validations/schemas";
import { todayTehran as todayKey } from "@/lib/utils";

export default function LearningPage() {
  const t = useTranslations("learning");
  const [items, setItems] = useState<LearningItem[]>([]);
  const [open, setOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<LearningItem | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState<Tag>("عمومی");
  const [search, setSearch] = useState("");
  const [filterTag, setFilterTag] = useState<Tag | "همه">("همه");

  const fetchItems = useCallback(async () => {
    try {
      const data = await api("/api/learnings", { method: "GET" });
      setItems(data.items);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const todayItems = useMemo(() => items.filter((i) => i.date === todayKey()), [items]);
  const weekItems = useMemo(() => {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return items.filter((i) => new Date(i.date) >= weekAgo);
  }, [items]);

  const filtered = useMemo(() => {
    return items.filter((i) => {
      const matchSearch = i.title.includes(search) || i.description.includes(search);
      const matchTag = filterTag === "همه" || i.tag === filterTag;
      return matchSearch && matchTag;
    });
  }, [items, search, filterTag]);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setTag("عمومی");
    setEditingItem(null);
  };

  const { submit: submitLearning, isLoading: savingLearning } = useFormSubmit<LearningFormData>({
    schema: LearningSchema,
    endpoint: editingItem ? `/api/learnings/${editingItem.id}` : "/api/learnings",
    method: editingItem ? "PATCH" : "POST",
    onSuccess: (data) => {
      if (editingItem) {
        setItems((prev) => prev.map((i) => i.id === editingItem.id ? data.item : i));
      } else {
        setItems((prev) => [data.item, ...prev]);
      }
      resetForm();
      setOpen(false);
    },
  });

  const handleAdd = () => {
    resetForm();
    setOpen(true);
  };

  const handleEdit = (item: LearningItem) => {
    setEditingItem(item);
    setTitle(item.title);
    setDescription(item.description);
    setTag(item.tag);
    setOpen(true);
  };

  const handleSave = () => submitLearning({ title, description, tag });

  const handleDelete = async (id: string) => {
    if (!confirm(t("deleteConfirm"))) return;
    try {
      await api(`/api/learnings/${id}`, { method: "DELETE" });
      setItems((prev) => prev.filter((i) => i.id !== id));
    } catch {
      // ignore
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden">
      <HeroSection
        todayCount={todayItems.length}
        weekCount={weekItems.length}
        totalCount={items.length}
        onAdd={handleAdd}
      />

      <div className="container mx-auto px-6 py-16">
        <div className="mb-10 flex flex-col gap-3 text-center">
          <span className="mx-auto rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
            {t("list.badge")}
          </span>
          <h2 className="text-2xl font-black tracking-tight sm:text-3xl md:text-4xl">{t("list.title")}</h2>
          <p className="mx-auto max-w-2xl text-base leading-8 text-muted-foreground">
            {t("list.description")}
          </p>
        </div>

        <FilterBar
          search={search}
          onSearchChange={setSearch}
          filterTag={filterTag}
          onFilterChange={setFilterTag}
        />

        <LearningList items={filtered} onEdit={handleEdit} onDelete={handleDelete} />
      </div>

      <LearningDialog
        open={open}
        onOpenChange={(v) => {
          if (!v) resetForm();
          setOpen(v);
        }}
        editingItem={editingItem}
        title={title}
        description={description}
        tag={tag}
        onTitleChange={setTitle}
        onDescriptionChange={setDescription}
        onTagChange={setTag}
        onSave={handleSave}
        isLoading={savingLearning}
      />
    </main>
  );
}
