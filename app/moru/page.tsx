import Tweets from "@/components/ui/tweets";
import { getActorFeeds } from "@/lib/server";
import fallbackData from "./fallback.json"


export default async function MoruPage() {
  const data = await getActorFeeds(process.env.ACTOR_MORU as string, fallbackData as object[])
  return (
    <>
      <Tweets data={data} style={{isLarge: false}} />
    </>
  )
}
