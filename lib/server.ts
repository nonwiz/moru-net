export async function getActorFeeds(actorId: string, fallback: object[] = []) {
  const res = await fetch(
    `https://api.apify.com/v2/actor-tasks/${actorId}/runs/last/dataset/items?token=` +
      process.env.APIFY_TOKEN,
    { next: { revalidate: 600 } }
  )
  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }
  const data = await res.json();
  if (data.length > 0) {
    return data;
  } else {
    return fallback;
  }
}
