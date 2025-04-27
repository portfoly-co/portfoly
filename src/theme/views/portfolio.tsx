import React from 'react'
import { Theme } from '@/payload-types'
import FooterSegmentComponent from './segments/footer_segment'
import ContactSegmentComponent from './segments/contact_segment'
import HeaderSegmentComponent from './segments/header_segment'
import NavbarSegmentComponent from './segments/navbar_segment'
import FeaturesSegmentComponent from './segments/features_segment'
import GitHubSegmentComponent from './segments/github_segment'

type PortfolioPageProps = {
  theme: Theme
}

const PortfolioPage = ({ theme }: PortfolioPageProps) => {
  return (
    <>
      {theme.layout &&
        theme.layout.map((segment, index) => {
          if (segment.blockType == 'header_segment') {
            return <HeaderSegmentComponent key={index} segment={segment} theme={theme} />
          }

          if (segment.blockType == 'navbar_segment') {
            return <NavbarSegmentComponent key={index} segment={segment} theme={theme} />
          }

          if (segment.blockType == 'contact_segment') {
            return <ContactSegmentComponent key={index} segment={segment} theme={theme} />
          }

          if (segment.blockType == 'footer_segment') {
            return <FooterSegmentComponent key={index} segment={segment} theme={theme} />
          }

          if (segment.blockType == 'features_segment') {
            return <FeaturesSegmentComponent key={index} segment={segment} />
          }

          if (segment.blockType == 'github_segment') {
            return <GitHubSegmentComponent key={index} segment={segment} />
          }
          return null
        })}
    </>
  )
}

export default PortfolioPage
