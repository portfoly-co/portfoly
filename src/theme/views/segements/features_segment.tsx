import React from 'react'
import { FeaturesSegmentBlock } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'

type FeaturesSegmentComponentProps = {
  segment: FeaturesSegmentBlock
}

const FeaturesSegmentComponent = ({ segment }: FeaturesSegmentComponentProps) => {
  if (!segment.features) {
    return null
  }

  return (
    <section id="features" className="py-12 flex w-full bg-base-200">
      <div className="container mx-auto flex flex-col w-full items-center justify-center px-2 gap-12">
        {segment.title && (
          <div className="flex flex-col items-center w-full">
            <RichText
              className="prose text-lg text-base-content w-full max-w-none"
              data={segment.title}
            />
          </div>
        )}
        <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
          {segment.features.map((item, index) => {
            const value = item
            return (
              <li key={index}>
                {index != 0 && <hr />}
                <div className="timeline-middle">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div
                  className={
                    index % 2 == 0 ? 'timeline-start mb-10 md:text-end' : 'timeline-end mb-10'
                  }
                >
                  <div className="text-lg font-black">{value.title}</div>
                  {value.description && (
                    <div>
                      <RichText className="prose" data={value.description} />
                    </div>
                  )}
                </div>
                {index != segment.features!.length - 1 && <hr />}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

export default FeaturesSegmentComponent
