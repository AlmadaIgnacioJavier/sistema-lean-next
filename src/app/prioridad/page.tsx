"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

import UrgencyForm from "./components/UrgencyForm";
import RulesList from "./components/RulesList";
import HelpCard from "./components/HelpCard";
import { Colors, UrgencyRule, ShippingType } from "./components/types";

export default function UrgencyRulesPage() {
  const form = useForm<{
    shippingType: ShippingType;
    keywords: string[];
    labelText: string;
    color: Colors;
    createdDays: number;
  }>({
    defaultValues: {
      shippingType: "me1",
      keywords: [],
      labelText: "Prioridad alta",
      color: Colors.Rojo,
      createdDays: 0,
    },
  });

  const [rules, setRules] = React.useState<UrgencyRule[]>([]);
  const [editing, setEditing] = React.useState<string | null>(null);

  const onSubmit = (data: {
    shippingType: ShippingType;
    keywords: string[];
    labelText: string;
    color: Colors;
    createdDays: number;
  }) => {
    // Validations are handled in the form component where toast is used; here we keep logic minimal
    if (editing) {
      setRules((prev) =>
        prev.map((r) => (r.id === editing ? { ...r, ...data } : r))
      );
      setEditing(null);
    } else {
      const newRule: UrgencyRule = {
        id: crypto.randomUUID(),
        shippingType: data.shippingType,
        keywords: data.keywords,
        labelText: data.labelText.trim(),
        color: data.color,
        createdDays: data.createdDays,
        enabled: true,
      };
      setRules((prev) => [newRule, ...prev]);
    }
    form.reset({ ...data, keywords: [] });
  };

  const editRule = (id: string) => {
    const r = rules.find((x) => x.id === id);
    if (!r) return;
    setEditing(id);
    form.reset({
      shippingType: r.shippingType,
      keywords: r.keywords,
      labelText: r.labelText,
      color: r.color,
      createdDays: r.createdDays,
    });
  };

  const removeRule = (id: string) => {
    setRules((prev) => prev.filter((r) => r.id !== id));
  };

  const toggleEnable = (id: string, v: boolean) => {
    setRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, enabled: v } : r))
    );
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 py-6 md:px-6 lg:px-8 space-y-6">
      <UrgencyForm
        form={form}
        editing={editing}
        setEditing={setEditing}
        onSubmit={onSubmit}
        rules={rules}
      />

      <RulesList
        rules={rules}
        editRule={editRule}
        removeRule={removeRule}
        toggleEnable={toggleEnable}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        <HelpCard />
      </motion.div>
    </div>
  );
}
