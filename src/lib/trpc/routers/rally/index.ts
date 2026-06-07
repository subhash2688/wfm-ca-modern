import { router } from "@/lib/trpc/init";
import { campusRouter } from "./campus";
import { shiftRouter } from "./shift";
import { volunteerRouter } from "./volunteer";
import { signupRouter } from "./signup";
import { dashboardRouter } from "./dashboard";

export const rallyRouter = router({
  campus: campusRouter,
  shift: shiftRouter,
  volunteer: volunteerRouter,
  signup: signupRouter,
  dashboard: dashboardRouter,
});
