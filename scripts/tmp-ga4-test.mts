import { getGa4Summary, isGa4Configured } from "../lib/ga4"

const run = async () => {
  console.log("[v0] isGa4Configured:", isGa4Configured())
  const res = await getGa4Summary(7)
  console.log("[v0] status:", res.status)
  if (res.status === "ok") {
    console.log("[v0] totals:", JSON.stringify(res.totals))
    console.log("[v0] topPages count:", res.topPages?.length ?? 0)
    console.log("[v0] daily points:", res.daily?.length ?? 0)
  } else if (res.status === "error") {
    console.log("[v0] message:", res.message)
  }
}

run()
