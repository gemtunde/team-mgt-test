import { redirect } from "next/navigation";

export default function HomePage() {
  // Redirect to teams page as it's the main feature
  redirect("/teams");
}
