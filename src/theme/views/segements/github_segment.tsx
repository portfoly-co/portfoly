import React from 'react'
import { GitHubSegmentBlock, Image } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import Link from 'next/link'

type GitHubSegmentComponentProps = {
  segment: GitHubSegmentBlock
}

const GitHubSegmentComponent = ({ segment }: GitHubSegmentComponentProps) => {
  return (
    <section id="github" className="py-12 flex w-full bg-base-300">
      <div className="container mx-auto grid lg:grid-cols-2 w-full items-center justify-center px-2 gap-12">
        <div className="lg:order-2 flex flex-col items-center w-full">
          {segment.title && (
            <div>
              <RichText className="prose text-lg text-base-content" data={segment.title} />
            </div>
          )}{' '}
          {segment.call_to_action && (
            <>
              {segment.call_to_action.length > 0 && (
                <Link
                  href={segment.call_to_action[0].url}
                  target="_blank"
                  className="btn btn-secondary btn-lg mt-6"
                >
                  {segment.call_to_action[0].text}
                </Link>
              )}
            </>
          )}
        </div>

        <div className="p-6 overflow-hidden flex flex-col items-center lg:order-1">
          {segment.image && (
            <img
              className="aspect-video rounded-box border border-primary w-full object-cover max-w-[32em]"
              alt="github image"
              src={(segment.image as Image).url!}
            />
          )}
        </div>
      </div>
    </section>
  )
}

export default GitHubSegmentComponent
