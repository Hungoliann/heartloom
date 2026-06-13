// src/components/accessibility/AccessibilityWidget.tsx
"use client";

import { useState } from "react";
import { Accessibility } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAccessibility } from "@/lib/accessibility/useAccessibility";
import type { TextScale } from "@/lib/accessibility/types";

export function AccessibilityWidget() {
  const { settings, setSetting, reset } = useAccessibility();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label="Accessibility settings"
          className="fixed bottom-5 left-5 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[color:var(--brand-amber)] text-[color:var(--parchment)] shadow-lg ring-offset-2 transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--brand-amber)]"
        >
          <Accessibility className="h-6 w-6" aria-hidden="true" />
        </button>
      </SheetTrigger>

      <SheetContent
        side="left"
        className="w-[88vw] max-w-sm overflow-y-auto bg-[color:var(--parchment)] text-[color:var(--charcoal)]"
      >
        <SheetHeader>
          <SheetTitle className="font-serif text-[color:var(--charcoal)]">
            Accessibility
          </SheetTitle>
          <SheetDescription className="text-[color:var(--muted-text)]">
            Adjust the site to your needs. Your choices are saved on this device.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 flex flex-col gap-6">
          {/* Text size */}
          <fieldset className="flex flex-col gap-3">
            <legend className="font-sans text-sm font-semibold">Text size</legend>
            <RadioGroup
              value={settings.textScale}
              onValueChange={(v) => setSetting("textScale", v as TextScale)}
              className="gap-2"
            >
              {(
                [
                  ["normal", "Normal"],
                  ["large", "Large"],
                  ["xlarge", "Extra large"],
                ] as [TextScale, string][]
              ).map(([value, label]) => (
                <div key={value} className="flex items-center gap-2">
                  <RadioGroupItem value={value} id={`text-${value}`} />
                  <Label htmlFor={`text-${value}`} className="cursor-pointer">
                    {label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </fieldset>

          {/* Switch rows */}
          <ToggleRow
            id="contrast"
            label="High contrast"
            description="Stronger colors and borders for easier reading."
            checked={settings.contrast === "high"}
            onChange={(c) => setSetting("contrast", c ? "high" : "normal")}
          />
          <ToggleRow
            id="motion"
            label="Reduce motion"
            description="Minimize animations and movement."
            checked={settings.reduceMotion}
            onChange={(c) => setSetting("reduceMotion", c)}
          />
          <ToggleRow
            id="cb"
            label="Colorblind-safe"
            description="Adjust colors and underline links."
            checked={settings.colorblindSafe}
            onChange={(c) => setSetting("colorblindSafe", c)}
          />
          <ToggleRow
            id="captions"
            label="Captions by default"
            description="Show captions on videos automatically."
            checked={settings.captionsDefault}
            onChange={(c) => setSetting("captionsDefault", c)}
          />

          <button
            type="button"
            onClick={reset}
            className="mt-2 self-start rounded-full border border-[color:var(--border-warm)] px-4 py-2 font-sans text-sm font-medium text-[color:var(--muted-text)] transition-colors hover:bg-[color:var(--parchment-2)]"
          >
            Reset to defaults
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function ToggleRow({
  id,
  label,
  description,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex flex-col">
        <Label htmlFor={id} className="cursor-pointer font-semibold">
          {label}
        </Label>
        <span className="font-sans text-xs text-[color:var(--muted-text)]">
          {description}
        </span>
      </div>
      <Switch id={id} checked={checked} onCheckedChange={onChange} />
    </div>
  );
}
