"use server";

import { type KindePageEvent } from "@kinde/infrastructure";
import { renderSlamsPage } from "../../../../ui/page";

export const pageSettings = {
  bindings: {
    "kinde.env": {},
  },
};

export default async function Page(event: KindePageEvent): Promise<string> {
  return renderSlamsPage(event, "login");
}
