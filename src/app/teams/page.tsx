"use client";

import React from "react";
import { TeamTable } from "@/components/table/TeamTable";
import { TeamModals } from "@/components/modals/TeamModals";
import { TeamDrawers } from "@/components/drawers/TeamDrawers";

export default function TeamsPage() {
  return (
    <div className="space-y-8 bg-white p-8 rounded-lg">
      <TeamTable />
      <TeamModals />
      <TeamDrawers />
    </div>
  );
}
