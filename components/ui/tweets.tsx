// @ts-nocheck
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Heart, Link, MessageCircle, Repeat } from "lucide-react";
import tweetParser from 'tweet-parser';

export interface Tweet {
  tweet_avatar: string,
  url: string,
  text: string,
  username: string,
  fullname: string,
  timestamp: Date,
  likes: number,
  retweets: number,
  replies: number
}

export interface Style {
  isLarge: boolean
}

const TWEET_PARSE_TYPE = {
  TEXT: "TEXT",
  USER: "USER",
  LINK: "LINK",
  HASH: "HASH"
}

const TweetRender = ({entry}) => {
  switch (entry.type) {
    case TWEET_PARSE_TYPE.HASH:
    case TWEET_PARSE_TYPE.LINK:
    case TWEET_PARSE_TYPE.USER:
      return <a className="text-blue-800" href={entry.url} target="_blank">{entry.content}</a>
  }
  return <>{entry.content}</>
}

function Tweet({ data, style }: { data: Tweet, style?: Style }) {
  const result = tweetParser(data.text);
  console.log({result})
  return <div>
    <div className="space-y-1">
      <div className="flex flex-col xs:flex-row gap-4">
        <Avatar>
          <AvatarImage src={data.tweet_avatar} alt={data.fullname} />
          <AvatarFallback>{data.fullname[0]}</AvatarFallback>
        </Avatar>
        <div className="">
          <h4 className={`${style?.isLarge ? "text-md" : "text-sm"} font-medium leading-none`}>
            <span>{data.fullname}, </span>
            <span className={`${style?.isLarge ? "text-md" : "text-sm"} text-muted-foreground`}> {new Date(data.timestamp).toDateString()}</span>
          </h4>
          <p className={`${style?.isLarge ? "text-md" : "text-sm"} text-muted-foreground mt-2 max-w-prose leading-relaxed`}>
            {result.map((entry, entryId) => (<span key={entryId}>
              <TweetRender entry={entry} />
            </span>))}
          </p>
          <div className="flex h-5 items-center mt-4 mb-2 space-x-4 text-md">
            <div className="flex flex-row justify-center gap-2 align-middle">
              <MessageCircle className="text-sm text-muted-foreground" />
              <span className="text-sm">{data.replies}</span>
            </div>

            <div className="flex flex-row justify-center gap-2 align-middle">
              <Repeat className="text-sm text-muted-foreground" />
              <span className="text-sm">{data.retweets}</span>
            </div>

            <div className="flex flex-row justify-center gap-2 align-middle">
              <Heart className="text-sm text-muted-foreground" />
              <span className="text-sm">{data.likes}</span>
            </div>

            <div className="flex flex-row justify-center gap-2 align-middle">
              <Link className="text-sm text-muted-foreground" />
              <a href={data.url} target="_blank" rel="noreferrer">
                <span className="text-sm hover:underline">View</span></a>
            </div>


          </div>
        </div>
      </div>
    </div>
    <Separator className="my-2 max-w-prose" />

  </div>
}

export default function Tweets({ data, style }: { data: Tweet[], style: Style }) {
  return <>
    <section className="grid place-content-center gap-2 bg-transparent">
      {data.map((tweet, tweetId) => <div key={tweetId}><Tweet data={tweet} style={style} /></div>)}
    </section>
  </>

}
